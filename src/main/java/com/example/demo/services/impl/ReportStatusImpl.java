package com.example.demo.services.impl;

import com.example.demo.dto.DetailsDto;
import com.example.demo.dto.IncidentReportDto;
import com.example.demo.dto.ReportStatusDto;
import com.example.demo.entities.IncidentReportEntity;
import com.example.demo.entities.ReportStatusEntity;
import com.example.demo.entities.notifications.UpdateNotifications;
import com.example.demo.entities.UserEntity;
import com.example.demo.exceptions.NotFoundException;
import com.example.demo.mappers.impl.IncidentReportMapperImpl;
import com.example.demo.mappers.impl.ReportStatusMapperImpl;
import com.example.demo.repository.IncidentReportRepository;
import com.example.demo.repository.ReportStatusRepository;
import com.example.demo.repository.UserRepository;
import com.example.demo.services.ReportStatusServices;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.text.SimpleDateFormat;
import java.util.*;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ReportStatusImpl implements ReportStatusServices {

    private final ReportStatusRepository statusRepository;
    private final ReportStatusMapperImpl reportMapper;
    private final IncidentReportRepository reportRepository;
    private final IncidentReportMapperImpl incidentMapper;
    private final UserRepository userRepository;
    private final FirebaseMessagingService messagingService;
    private final EmailSenderService senderService;

    @Override
    public ReportStatusDto createReportStatus(ReportStatusDto reportStatusDto) {
        ReportStatusEntity reportEntity = reportMapper.mapTo(reportStatusDto);
        ReportStatusEntity savedEntity = statusRepository.save(reportEntity);
        return reportMapper.mapFrom(savedEntity);
    }

    @Override
    public ReportStatusDto updateReportStatus(ReportStatusDto reportStatusDto) {

        SimpleDateFormat sdf = new SimpleDateFormat("dd-MM-yyyy");
        Optional<ReportStatusEntity> reportStatus = statusRepository.findByTrackId(reportStatusDto.getTrackId());
        if (reportStatus.isPresent()) {
            IncidentReportEntity incidentReportEntity = reportRepository.findByTrackId(reportStatusDto.getTrackId());
            String recipientToken = incidentReportEntity.getRecipientToken();
            ReportStatusEntity existingStatus = reportStatus.get();
            if (!reportStatusDto.isPending()) {
                senderService.sendCaseCompletionEmail(incidentReportEntity.getEmail());
                existingStatus.setFlag(2);
                existingStatus.setCurrentStatus("Case Completed");
            } else {
                senderService.sendCaseUnderInvestigationEmail(incidentReportEntity.getEmail());
                existingStatus.setFlag(1);
                existingStatus.setCurrentStatus(reportStatusDto.getCurrentStatus());
            }
            existingStatus.setUpdatedDate(sdf.format(new Date()));
            if (recipientToken != null && !recipientToken.isEmpty()) {
                messagingService.sendUpdateNotifications(new UpdateNotifications(
                        recipientToken,
                        existingStatus.getCurrentStatus(),
                        "Update on your Track Id : " + reportStatusDto.getTrackId()));
            } else {
                System.out.println("Recipient token not present. No update notification will be sent.");
            }
            existingStatus.setPending(reportStatusDto.isPending());
            ReportStatusEntity updatedReport = statusRepository.save(existingStatus);
            return reportMapper.mapFrom(updatedReport);
        } else {
            throw new NotFoundException("ReportStatus of the" + reportStatusDto.getTrackId() + "was not Found");
        }
    }

    @Override
    public List<ReportStatusDto> getAllReports() {
        return statusRepository.findAll().stream().map(reportMapper::mapFrom).collect(Collectors.toList());
    }

    @Override
    public IncidentReportDto getSingleReport(Integer track) {
        if (statusRepository.findByTrackId(track).isPresent()) {
            IncidentReportEntity reportDto = reportRepository.findByTrackId(track);
            return incidentMapper.mapFrom(reportDto);
        } else {
            throw new NotFoundException("Not Found");
        }
    }
    @Override
    public List<ReportStatusDto> getReportsById(String id) {
        Optional<UserEntity> userEntityOptional = userRepository.findByUserUID(id);

        if (userEntityOptional.isPresent()) {
            List<ReportStatusEntity> reportStatusEntities = statusRepository.findAllByUserId(id);
    
            System.out.println(reportStatusEntities.size());
            return reportStatusEntities.stream().map(reportMapper::mapFrom).collect(Collectors.toList());
        } else {
            throw new NotFoundException("User with " + id + " not found");
        }
    }

    @Override
    public DetailsDto getAllDetails(String city) {
        DetailsDto detailsDto = new DetailsDto();
        int totalCases = (int) reportRepository.count();
        int pendingCases = statusRepository.countAllByPending(true);
        int completedCases = totalCases - pendingCases;
        double percentageCompleted = ((double) completedCases / totalCases) * 100;
        double percentagePending = ((double) pendingCases / totalCases) * 100;
        detailsDto.setTotalCases(totalCases);
        detailsDto.setPending(pendingCases);
        detailsDto.setCompleted(completedCases);
        detailsDto.setPercentageCompleted(percentageCompleted);
        detailsDto.setPercentagePending(percentagePending);
        detailsDto.setCountByCities(statusRepository.countByCity(city));
        return detailsDto;
    }

    @Override
    public List<Map<String, Object>> processData() {
        List<ReportStatusDto> statusDtoList = statusRepository.findAll().stream().map(reportMapper::mapFrom).toList();
        List<Map<String, Object>> resultMap = new ArrayList<>();
        for (ReportStatusDto dto : statusDtoList) {
            String reportDate = dto.getReportDate();
            boolean pendingStatus = dto.isPending();
            boolean found = false;
            for (Map<String, Object> dataMap : resultMap) {
                if (dataMap.containsKey("reportDate") && dataMap.get("reportDate").equals(reportDate)) {
                    found = true;
                    int completedCount = (int) dataMap.get("completed");
                    int pendingCount = (int) dataMap.get("pending");
                    if (!pendingStatus) {
                        completedCount++;
                        dataMap.put("completed", completedCount);
                    } else {
                        pendingCount++;
                        dataMap.put("pending", pendingCount);
                    }
                    break;
                }
            }
            if (!found) {
                Map<String, Object> dataMap = new HashMap<>();
                dataMap.put("reportDate", reportDate);
                dataMap.put("pending", pendingStatus ? 1 : 0);
                dataMap.put("completed", pendingStatus ? 0 : 1);
                resultMap.add(dataMap);
            }
        }
        return resultMap;
    }

    public void addURLtoReport(ReportStatusDto reportStatusDto) {
        Optional<ReportStatusEntity> reportStatus = statusRepository.findByTrackId(reportStatusDto.getTrackId());
        if (reportStatus.isPresent()) {
            ReportStatusEntity existingStatus = reportStatus.get();
            if (!reportStatusDto.getReportURL().isEmpty()) {
                existingStatus.setReportURL(reportStatusDto.getReportURL());
                statusRepository.save(existingStatus);
            }
        }
    }

    @Override
    public ReportStatusDto findReportByTrack(Integer id){
        Optional<ReportStatusEntity> reportStatusEntity = statusRepository.findByTrackId(id);
        if(reportStatusEntity.isPresent()){
            return reportMapper.mapFrom(reportStatusEntity.get());
        }
        else{
            throw new NotFoundException("No Report with track"+id+" was found");
        }
    }
}
