package com.example.demo.services;

import com.example.demo.dto.IncidentReportDto;
import com.example.demo.dto.IncidentResponseDto;
import com.example.demo.entities.IncidentReportEntity;

import java.io.IOException;
import java.util.List;

public interface IncidentReportServices {

    IncidentResponseDto createReport(IncidentReportDto incidentReportDto) throws IOException;

    IncidentReportDto updateReport(String userId, String report_id, IncidentReportDto incidentReportDto);

    List<IncidentReportDto> getAllReports();

    List<IncidentReportDto> getReportsforUser(String id);

    List<IncidentReportDto> getReportsbyCity(String city);
}
