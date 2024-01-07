package com.example.demo.services.impl;

import com.example.demo.dto.IncidentReportDto;
import com.example.demo.dto.ReportStatusDto;
import com.example.demo.entities.IncidentReportEntity;
import com.example.demo.entities.ReportStatusEntity;
import com.example.demo.exceptions.NotFoundException;
import com.example.demo.mappers.impl.IncidentReportMapperImpl;
import com.example.demo.mappers.impl.ReportStatusMapperImpl;
import com.example.demo.repository.IncidentReportRepository;
import com.example.demo.repository.ReportStatusRepository;
import com.example.demo.services.ReportStatusServices;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ReportStatusImpl implements ReportStatusServices {

    private final ReportStatusRepository statusRepository;
    private final ReportStatusMapperImpl reportMapper;
    private final IncidentReportRepository reportRepository;
    private final IncidentReportMapperImpl incidentMapper;
    @Override
    public ReportStatusDto createReportStatus(ReportStatusDto reportStatusDto) {
        ReportStatusEntity reportEntity = reportMapper.mapTo(reportStatusDto);
        ReportStatusEntity savedEntity = statusRepository.save(reportEntity);
        return reportMapper.mapFrom(savedEntity);
    }

    @Override
    public ReportStatusDto updateReportStatus( ReportStatusDto reportStatusDto) {
        Optional<ReportStatusEntity> reportStatus = statusRepository.findByTrackId(reportStatusDto.getTrackId());
        if(reportStatus.isPresent()){
            ReportStatusEntity existingStatus = reportStatus.get();
            existingStatus.setCurrentStatus(reportStatusDto.getCurrentStatus());
            ReportStatusEntity updatedReport = statusRepository.save(existingStatus);
            return reportMapper.mapFrom(updatedReport);
        }
        else{
            throw new NotFoundException("ReportStatus of the" + reportStatusDto.getTrackId()+ "was not Found");
        }
    }

    @Override
    public List<ReportStatusDto> getAllReports() {
        return statusRepository.findAll().stream().map(reportMapper::mapFrom).collect(Collectors.toList());
    }

    @Override
    public IncidentReportDto getSingleReport(Integer track) {
        if(statusRepository.findByTrackId(track).isPresent()){
        IncidentReportEntity reportDto = reportRepository.findByTrackId(track);
        return incidentMapper.mapFrom(reportDto);
        }
        else{
            throw new NotFoundException("Not Found");
        }
    }
}