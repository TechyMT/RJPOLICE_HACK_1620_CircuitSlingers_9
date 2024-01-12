package com.example.demo.entities;

import com.example.demo.entities.incidentchild.Questionnaire;
import com.example.demo.entities.incidentchild.SuspectInfo;
import com.example.demo.entities.incidentchild.UserAccountInfo;
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

    private String userIdentification;

    private String recipientToken;

    private String fullName;

    private String dateOfBirth;

    private String dateOfCrime;

    private String phoneNumber;

    private String dateOfReport;

    private String aadharNumber;

    private String pincode;

    private boolean isBankAccInvolved;

    private String incidentDescription;

    private String category;

    private SuspectInfo suspectInfo;

    private UserAccountInfo userAccountInfo;

    private String email;

    private List<String> evidencesURL;

    private String city;

    private List<Questionnaire> questionnaire;

    @DBRef
    private UserEntity user;

    @DBRef
    private List<ReportStatusEntity> reports = new ArrayList<>();

    private Integer trackId;

}
