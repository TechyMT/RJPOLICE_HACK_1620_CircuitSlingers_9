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

    private String currentStatus;

    private String userId;

    private String city;

    private Integer flag;

    private String suggestions;

    private String reportURL;

    private String comments;

    private String updatedDate;

    private boolean pending;

    private String reportDate;

}
