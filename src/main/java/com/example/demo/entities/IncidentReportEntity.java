package com.example.demo.entities;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.ArrayList;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Document(collection = "incident_reports")
public class IncidentReportEntity {
    @Id
    private String id;

    private String recipientToken;

    private String fullName;

    private String dateOfBirth;

    private String aadharNumber;

    private boolean isBankAccInvolved;

    private String incidentDescription;

    private String digitalEvidenceUrl;

    private String city;

    private String onlineAccountInformation;

    private List<String> witnesses;

    private List<Questionnaire> questionnaire;

    @DBRef
    private UserEntity user;

    @DBRef
    private List<ReportStatusEntity> reports = new ArrayList<>();

    private Integer trackId;

}
