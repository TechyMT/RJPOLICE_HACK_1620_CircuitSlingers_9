package com.example.demo.services.impl;

import com.example.demo.dto.ReportStatusDto;
import com.google.auth.oauth2.GoogleCredentials;
import com.google.cloud.storage.*;
import com.itextpdf.html2pdf.ConverterProperties;
import com.itextpdf.html2pdf.HtmlConverter;
import com.itextpdf.html2pdf.resolver.font.DefaultFontProvider;
import com.itextpdf.kernel.pdf.PdfWriter;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.io.ByteArrayOutputStream;
import java.io.FileInputStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.StandardOpenOption;
import java.util.concurrent.TimeUnit;

@Service
@RequiredArgsConstructor
public class DocumentGenerator {

    private final ReportStatusImpl reportService;

    public void htmlToPdf(String processedHtml, ReportStatusDto reportStatusDto) {
        try {
            ByteArrayOutputStream byteArrayOutputStream = new ByteArrayOutputStream();
            Path tempFilePath = Files.createTempFile("temp-pdf-", ".pdf");

            try (PdfWriter pdfWriter = new PdfWriter(byteArrayOutputStream)) {
                DefaultFontProvider defaultFont = new DefaultFontProvider(false, true, false);
                ConverterProperties converterProperties = new ConverterProperties();
                converterProperties.setFontProvider(defaultFont);
                HtmlConverter.convertToPdf(processedHtml, pdfWriter, converterProperties);
                Files.write(tempFilePath, byteArrayOutputStream.toByteArray(), StandardOpenOption.WRITE);
            }

            String mediaLink = uploadToFirebaseStorage(tempFilePath, reportStatusDto);
            if (mediaLink != null) {
                reportStatusDto.setReportURL(mediaLink);
            }
            reportService.addURLtoReport(reportStatusDto);
        } catch (Exception ex) {
            ex.printStackTrace();
        }
    }



    private String uploadToFirebaseStorage(Path filePath, ReportStatusDto reportStatusDto) {
        try {
            GoogleCredentials credentials = GoogleCredentials.fromStream(
                    new FileInputStream("src/main/resources/firebase-service-account.json")
            );
            System.out.println("Credentials loaded successfully.");
            Storage storage = StorageOptions.newBuilder()
                    .setCredentials(credentials)
                    .build()
                    .getService();
            String path = reportStatusDto.getUserId();
            String bucketName = "rjpolicehackathon.appspot.com";
            String storagePath = "user-reports/" + path + "/report";

            BlobInfo blobInfo = BlobInfo.newBuilder(bucketName, storagePath)
                    .setContentType("application/pdf")
                    .build();
            Blob blob = storage.create(blobInfo, Files.readAllBytes(filePath));
            return String.valueOf(storage.get(blob.getBlobId()).signUrl(30, TimeUnit.DAYS, Storage.SignUrlOption.httpMethod(HttpMethod.GET)));

        } catch (Exception e) {
            e.printStackTrace();
        }
        return null;
    }
}
