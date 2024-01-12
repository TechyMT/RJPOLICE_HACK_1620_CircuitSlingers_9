package com.example.demo.services.impl;

import com.example.demo.dto.IncidentReportDto;
import com.example.demo.entities.*;
import com.example.demo.entities.notifications.FIRClass;
import com.example.demo.entities.notifications.Notifications;
import com.example.demo.exceptions.NotFoundException;
import com.example.demo.exceptions.UnauthorizedException;
import com.example.demo.mappers.impl.DataMapper;
import com.example.demo.mappers.impl.IncidentReportMapperImpl;
import com.example.demo.repository.IncidentReportRepository;
import com.example.demo.repository.ReportStatusRepository;
import com.example.demo.repository.UserRepository;
//import com.example.demo.services.FirebaseStorageService;
import com.example.demo.services.IncidentReportServices;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.thymeleaf.TemplateEngine;
import org.thymeleaf.context.Context;

import java.io.IOException;
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
  //  private final FirebaseStorageService firebaseStorageService;
    private final DocumentGenerator documentGenerator;
    private final ReportStatusRepository statusRepository;
    private final TemplateEngine templateEngine;
 //   private final PdfGenerationService pdfGenerationService;
    private final DataMapper dataMapper;
    private final ScheduledExecutorService scheduler = Executors.newScheduledThreadPool(1);

    @Override
    public IncidentReportDto createReport(IncidentReportDto incidentReportDto) throws IOException {

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
        reportStatusEntity.setFlag(0);
        reportStatusEntity.setReportDate(incidentReportDto.getDateOfReport());
        reportStatusEntity.setCity(incidentReportEntity.getCity());
        createdReport.setTrackId(track_id);
        reportStatusEntity.setIncidentReport(createdReport);
        ReportStatusEntity savedReportStatus = statusRepository.save(reportStatusEntity);
        createdReport.getReports().add(savedReportStatus);
        reportRepository.save(createdReport);
        createPdf(incidentReportDto);
        //pdfGenerationService.generateAndSavePdf(incidentReportDto);
        scheduler.schedule(() -> {
            if (createdReport.isBankAccInvolved()) {
                System.out.println("Sending bank-related notification...");
                messagingService.sendNotificationByToken(new Notifications(incidentReportDto.getRecipientToken()));
            }
            System.out.println("Sending FIR notification...");
            messagingService.sendFIRnotification(new FIRClass(incidentReportDto.getRecipientToken()));
        }, 5, TimeUnit.SECONDS);
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

    public void createPdf(IncidentReportDto incidentReportDto){
        String finalHtml = null;
        Context dataContext = dataMapper.setData(incidentReportDto);
        String templateContent = "<!DOCTYPE html>\n" +
                "<html lang=\"en\" xmlns:th=\"http://www.thymeleaf.org\">\n" +
                "<head>\n" +
                "    <meta charset=\"UTF-8\"/>\n" +
                "    <title>Incident Report</title>\n" +
                "</head>\n" +
                "<body>\n" +
                "<h1>User Information</h1>\n" +
                "<p th:text=\"${fullName}\">Full Name: </p>\n" +
                "<p th:text=\"${dateOfBirth}\">Date of Birth: </p>\n" +
                "<h1>Incident Details</h1>\n" +
                "<p th:text=\"${dateOfCrime}\">Date of Crime: </p>\n" +
                "<p th:text=\"${dateOfReport}\">Date of Report: </p>\n" +
                "\n" +
                "<h1>Evidences</h1>\n" +
                "<ul>\n" +
                "    <li th:each=\"evidence : ${evidencesURL}\" th:text=\"${evidence}\">Evidences URL: </li>\n" +
                "</ul>\n" +
                "\n" +
                "<h1>City</h1>\n" +
                "<p th:text=\"${city}\">City: </p>\n" +
                "</body>\n" +
                "</html>\n";
        finalHtml = templateEngine.process(templateContent, dataContext);
        documentGenerator.htmlToPdf(finalHtml);
    }


}
