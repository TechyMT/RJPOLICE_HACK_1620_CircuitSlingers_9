package com.example.demo.services.impl;

import com.example.demo.dto.IncidentReportDto;
import com.example.demo.entities.*;
import com.example.demo.exceptions.NotFoundException;
import com.example.demo.exceptions.UnauthorizedException;
import com.example.demo.mappers.impl.IncidentReportMapperImpl;
import com.example.demo.repository.IncidentReportRepository;
import com.example.demo.repository.ReportStatusRepository;
import com.example.demo.repository.UserRepository;
import com.example.demo.services.IncidentReportServices;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.concurrent.Executors;
import java.util.concurrent.ScheduledExecutorService;
import java.util.concurrent.TimeUnit;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class IncidentReportServicesImpl implements IncidentReportServices {

    private final IncidentReportMapperImpl reportMapper;
    private final IncidentReportRepository reportRepository;
    private final UserRepository userRepository;
    private final FirebaseMessagingService messagingService;
    private final ReportStatusRepository statusRepository;
    private final ScheduledExecutorService scheduler = Executors.newScheduledThreadPool(1);

    @Override
    public IncidentReportDto createReport(IncidentReportDto incidentReportDto) {

        String userId = incidentReportDto.getUserIdentification();
        UserEntity user = userRepository.findByUserUID(userId)
                .orElseThrow(() -> new NotFoundException("User with ID " + userId + " not found"));

        IncidentReportEntity incidentReportEntity = reportMapper.mapTo(incidentReportDto);
        incidentReportEntity.setUser(user);
        IncidentReportEntity createdReport = reportRepository.save(incidentReportEntity);

        ReportStatusEntity reportStatusEntity = new ReportStatusEntity();
        reportStatusEntity.setCurrentStatus("Case Register , E-FIR filed");
        Integer track_id = (int)(Math.random()*1000);
        reportStatusEntity.setTrackId(track_id);
        reportStatusEntity.setPending(true);
        reportStatusEntity.setUserId(userId);
        reportStatusEntity.setReportDate(incidentReportDto.getDateOfReport());
        reportStatusEntity.setCity(incidentReportEntity.getCity());
        createdReport.setTrackId(track_id);
        reportStatusEntity.setIncidentReport(createdReport);
        ReportStatusEntity savedReportStatus = statusRepository.save(reportStatusEntity);
        createdReport.getReports().add(savedReportStatus);
        reportRepository.save(createdReport);
        scheduler.schedule(() -> {
            if (createdReport.isBankAccInvolved()) {
                System.out.println("Sending bank-related notification...");
                messagingService.sendNotificationByToken(new Notifications(incidentReportDto.getRecipientToken()));
            }
            System.out.println("Sending FIR notification...");
            messagingService.sendFIRnotification(new FIRClass(incidentReportDto.getRecipientToken()));
        }, 5, TimeUnit.SECONDS);

//        if (createdReport.isBankAccInvolved()){
//            System.out.println("Yes");
//            messagingService.sendNotificationByToken(new Notifications(incidentReportDto.getRecipientToken()));
//        }
//        messagingService.sendFIRnotification(new FIRClass(incidentReportDto.getRecipientToken()));
        return reportMapper.mapFrom(createdReport);
    }

    @Override
    public IncidentReportDto updateReport(String userId, String reportId, IncidentReportDto reportDto) {
        UserEntity user = userRepository.findByUserUID(userId)
                .orElseThrow(() -> new NotFoundException("User with ID " + userId + " not found"));
        IncidentReportEntity existingReport = reportRepository.findById(reportId)
                .orElseThrow(() -> new NotFoundException("Incident report with ID " + reportId + " not found"));
        if (!existingReport.getUser().getId().equals(userId)) {
            throw new UnauthorizedException("You are not authorized to update this incident report");
        }
        existingReport.setFullName(reportDto.getFullName());
        existingReport.setDateOfBirth(reportDto.getDateOfBirth());
        existingReport.setAadharNumber(reportDto.getAadharNumber());
        existingReport.setIncidentDescription(reportDto.getIncidentDescription());
  //      existingReport.setOnlineAccountInformation(reportDto.getOnlineAccountInformation());
        IncidentReportEntity updatedReport = reportRepository.save(existingReport);
        return reportMapper.mapFrom(updatedReport);
    }

    @Override
    public List<IncidentReportDto> getAllReports() {
        List<IncidentReportEntity> reportEntities = reportRepository.findAll();
        return reportEntities.stream().map(reportMapper::mapFrom).collect(Collectors.toList());
    }

    @Override
    public List<IncidentReportDto> getReportsforUser(String id) {
        Optional<UserEntity> userEntity = userRepository.findByUserUID(id);
        if (userEntity.isPresent()) {
            String id1 = userEntity.get().getId();
            List<IncidentReportEntity> incidentReports = reportRepository.findAllByUser(id1);
            return incidentReports.stream().map(reportMapper::mapFrom).collect(Collectors.toList());

        }
        else {
            throw  new NotFoundException(" User not Found ");
        }
    }

    @Override
    public List<IncidentReportDto> getReportsbyCity(String city) {
        List<IncidentReportEntity> reportEntity = reportRepository.findByCity(city);
        return reportEntity.stream().map(reportMapper::mapFrom).collect(Collectors.toList());
    }


}
