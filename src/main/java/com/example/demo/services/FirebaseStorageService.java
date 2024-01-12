//package com.example.demo.services;
//
//import com.example.demo.dto.IncidentReportDto;
//import com.google.cloud.storage.*;
//import lombok.RequiredArgsConstructor;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.stereotype.Service;
//import org.springframework.web.multipart.MultipartFile;
//
//import java.io.IOException;
//import java.util.UUID;
//
//@Service
//@RequiredArgsConstructor
//public class FirebaseStorageService {
//
//    private final Storage storage;
//   // private final PdfGenerationService pdfGenerationService;
//
//    public String uploadFile(IncidentReportDto incidentReportDto) throws IOException {
//   //     byte[] pdfBytes = pdfGenerationService.createPdf(incidentReportDto);
//        String fileName = "lcwd.pdf";
//        BlobId blobId = BlobId.of("rjpolicehackathon.appspot.com", fileName);
// //       Blob blob = storage.create(BlobInfo.newBuilder(blobId).build(), pdfBytes);
//   //     return blob.getMediaLink();
//    }
//
//    private String generateUniqueFileName(String originalFileName) {
//        String extension = originalFileName.substring(originalFileName.lastIndexOf('.'));
//        return UUID.randomUUID() + extension;
//    }
//}
