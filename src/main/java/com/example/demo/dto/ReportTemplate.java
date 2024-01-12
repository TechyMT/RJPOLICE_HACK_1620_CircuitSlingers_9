package com.example.demo.dto;

public class ReportTemplate {

    public String templateContent = "<!DOCTYPE html>\n" +
            "<html lang=\"en\" xmlns:th=\"http://www.thymeleaf.org\">\n" +
            "<head>\n" +
            "    <meta charset=\"UTF-8\"/>\n" +
            "    <title>Incident Report</title>\n" +
            "</head>\n" +
            "<body>\n" +
            "<h1>User Information</h1>\n" +
            "<p th:text=\"${fullName}\">Full Name: </p>\n" +
            "<p th:text=\"${dateOfBirth}\">Date of Birth: </p>\n" +
            "<h1>Incident Details</h1>\n" +
            "<p th:text=\"${dateOfCrime}\">Date of Crime: </p>\n" +
            "<p th:text=\"${dateOfReport}\">Date of Report: </p>\n" +
            "\n" +
            "<h1>Evidences</h1>\n" +
            "<ul>\n" +
            "    <li th:each=\"evidence : ${evidencesURL}\" th:text=\"${evidence}\">Evidences URL: </li>\n" +
            "</ul>\n" +
            "\n" +
            "<h1>City</h1>\n" +
            "<p th:text=\"${city}\">City: </p>\n" +
            "</body>\n" +
            "</html>\n";
}
