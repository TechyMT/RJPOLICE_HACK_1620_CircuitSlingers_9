package com.example.demo.services;

import com.example.demo.dto.IncidentReportDto;
import com.example.demo.dto.ReportStatusDto;

import java.util.List;

public interface ReportStatusServices {

    ReportStatusDto createReportStatus(ReportStatusDto reportStatusDto);

    ReportStatusDto updateReportStatus(ReportStatusDto reportStatusDto);

    List<ReportStatusDto> getAllReports();

    IncidentReportDto getSingleReport(Integer track);
}
