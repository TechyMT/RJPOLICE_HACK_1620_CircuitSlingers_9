package com.example.demo.entities;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "reportStatuses")
public class ReportStatusEntity {

    @Id
    private String id;

    @DBRef
    private IncidentReportEntity incidentReport;

    private Integer trackId;

    private String currentStatus;


}
