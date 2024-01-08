package com.example.demo.services.impl;

import com.example.demo.dto.DetailsDto;
import com.example.demo.dto.IncidentReportDto;
import com.example.demo.dto.ReportStatusDto;
import com.example.demo.entities.IncidentReportEntity;
import com.example.demo.entities.ReportStatusEntity;
import com.example.demo.exceptions.NotFoundException;
import com.example.demo.mappers.impl.IncidentReportMapperImpl;
import com.example.demo.mappers.impl.ReportStatusMapperImpl;
import com.example.demo.repository.IncidentReportRepository;
import com.example.demo.repository.ReportStatusRepository;
import com.example.demo.repository.UserRepository;
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
    private  final UserRepository userRepository;
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
            if(!reportStatusDto.isPending()){
                existingStatus.setCurrentStatus("Case Completed");
            }
            else {
                existingStatus.setCurrentStatus(reportStatusDto.getCurrentStatus());
            }
            existingStatus.setPending(reportStatusDto.isPending());
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

    @Override
    public List<ReportStatusDto> getReportsById(String id) {
        if(userRepository.findByUserUID(id).isPresent()){
            List<ReportStatusEntity> reportStatusEntities = statusRepository.findAllByUserId(id);
            return reportStatusEntities.stream().map(reportMapper::mapFrom).collect(Collectors.toList());
        }
        else{
            throw new NotFoundException("User with "+id+" not found");
        }
    }

    @Override
    public DetailsDto getAllDetails(String city) {
        DetailsDto detailsDto = new DetailsDto();
        detailsDto.setTotalCases((int)reportRepository.count());
        detailsDto.setPending(statusRepository.countAllByPending(true));
        detailsDto.setCompleted((int)reportRepository.count()-statusRepository.countAllByPending(true));
        detailsDto.setCountByCities(statusRepository.countByCity(city));
        return detailsDto;
    }
}
