package com.example.demo.dto;

import com.example.demo.entities.IncidentReportEntity;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ReportStatusDto {

    private Integer trackId;
  //  private IncidentReportEntity incidentReport;
    private String currentStatus;

    private String userId;

    private String city;

    private boolean pending;

}
