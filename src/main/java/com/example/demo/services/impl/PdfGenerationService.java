//package com.example.demo.services.impl;
//
//import com.example.demo.dto.IncidentReportDto;
//import com.lowagie.text.Document;
//
//import com.lowagie.text.Image;
//import com.lowagie.text.Paragraph;
//import com.lowagie.text.pdf.PdfWriter;
//import org.springframework.stereotype.Service;
//
//
//import java.io.*;
//import java.nio.file.Files;
//import java.nio.file.Path;
//import java.nio.file.Paths;
//import java.util.List;
//
//
//@Service
//public class PdfGenerationService {
//
//    public byte[] createPdf(IncidentReportDto incidentReportDto){
//            ByteArrayOutputStream out = new ByteArrayOutputStream();
//
//            try {
//                Document document = new Document();
//                PdfWriter.getInstance(document, out);
//                document.open();
//
//                addImageToDocument(document, "src/main/resources/logo.png");
//
//                addUserInformation(document, incidentReportDto);
//
//                addIncidentDetails(document, incidentReportDto);
//
//              addEvidences(document, incidentReportDto.getEvidencesURL());
//
//
//                addCity(document, incidentReportDto.getCity());
//
//                document.close();
//
//            } catch (Exception e) {
//                e.printStackTrace();
//            }
//
//            return out.toByteArray();
//        }
//
//        private void addTitle(Document document, String title) {
//            addParagraph(document, "Title: " + title);
//        }
//
//        private void addContent(Document document, String content) {
//            addParagraph(document, "Content: " + content);
//        }
//
//        private void addUserInformation(Document document, IncidentReportDto incidentReportDto) {
//            addParagraph(document, "Full Name: " + incidentReportDto.getFullName());
//            addParagraph(document, "Date of Birth: " + incidentReportDto.getDateOfBirth());
//            addParagraph(document, "Phone Number: " + incidentReportDto.getPhoneNumber());
//            addParagraph(document, "Aadhar Number: " + incidentReportDto.getAadharNumber());
//            // Add other user attributes
//        }
//    private void addImageToDocument(Document document, String imagePath) {
//        try {
//            Image image = Image.getInstance(imagePath);
//
//            // Calculate the position to center the image on the page
//            float xPosition = (document.getPageSize().getWidth() - image.getWidth()) / 2;
//            float yPosition = (document.getPageSize().getHeight() - image.getHeight()) / 2;
//
//            // Set the absolute position of the image
//            image.setAbsolutePosition(xPosition, yPosition);
//
//            // Add the image to the document
//            document.add(image);
//        } catch (Exception e) {
//            e.printStackTrace();
//        }
//    }
//        private void addIncidentDetails(Document document, IncidentReportDto incidentReportDto) {
//            addParagraph(document, "Date of Crime: " + incidentReportDto.getDateOfCrime());
//            addParagraph(document, "Date of Report: " + incidentReportDto.getDateOfReport());
//            addParagraph(document, "PIN Code: " + incidentReportDto.getPincode());
//            addParagraph(document, "Bank Account Involved: " + incidentReportDto.isBankAccInvolved());
//            addParagraph(document, "Incident Description: " + incidentReportDto.getIncidentDescription());
//            addParagraph(document, "Category: " + incidentReportDto.getCategory());
//            // Add other incident details
//        }
//
//        private void addEvidences(Document document, List<String> evidencesURL) {
//            addParagraph(document, "Evidences URLs: ");
//            for (String url : evidencesURL) {
//                addParagraph(document, "- " + url);
//            }
//        }
//
//        private void addCity(Document document, String city) {
//            addParagraph(document, "City: " + city);
//        }
//
//        private void addParagraph(Document document, String text) {
//            try {
//                Paragraph paragraph = new Paragraph(text);
//                document.add(paragraph);
//            } catch (Exception e) {
//                e.printStackTrace();
//            }
//    }
//    public String generateAndSavePdf(IncidentReportDto incidentReportDto) {
//        byte[] pdfBytes = createPdf(incidentReportDto);
//
//        String directoryPath = "src/main/resources/";
//        String fileName = "lcwd.pdf";
//
//        Path filePath = Paths.get(directoryPath, fileName);
//
//        try {
//            Files.write(filePath, pdfBytes);
//            return filePath.toString();
//        } catch (IOException e) {
//            e.printStackTrace();
//            return null;
//        }
//    }
//
//}
