package com.example.demo.services;

import com.example.demo.dto.IncidentReportDto;
import com.example.demo.entities.IncidentReportEntity;

import java.util.List;

public interface IncidentReportServices {

    IncidentReportDto createReport( IncidentReportDto incidentReportDto);

    IncidentReportDto updateReport(String userId, String report_id, IncidentReportDto incidentReportDto);

    List<IncidentReportDto> getAllReports();

    List<IncidentReportDto> getReportsforUser(String id);

    List<IncidentReportDto> getReportsbyCity(String city);
}
