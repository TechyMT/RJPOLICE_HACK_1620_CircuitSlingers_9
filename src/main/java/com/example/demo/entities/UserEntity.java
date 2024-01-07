package com.example.demo.entities;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Document(collection = "users")
public class UserEntity {

    @Id
    private String id;

    private String userUID;

    private String email;

    private String phoneNumber;

    private boolean emailVerified;

    private String creationTime;

    private String lastSignInTime;

    @DBRef
    private List<IncidentReportEntity> incidentReports;

}
