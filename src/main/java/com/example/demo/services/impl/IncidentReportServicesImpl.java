package com.example.demo.services.impl;

import com.example.demo.dto.IncidentReportDto;
import com.example.demo.dto.IncidentResponseDto;
import com.example.demo.dto.ReportStatusDto;
import com.example.demo.dto.ReportTemplate;
import com.example.demo.entities.*;
import com.example.demo.entities.incidentchild.SuspectInfo;
import com.example.demo.entities.incidentchild.UserAccountInfo;
import com.example.demo.entities.notifications.FIRClass;
import com.example.demo.entities.notifications.Notifications;
import com.example.demo.exceptions.NotFoundException;
import com.example.demo.exceptions.UnauthorizedException;
import com.example.demo.mappers.impl.DataMapper;
import com.example.demo.mappers.impl.IncidentReportMapperImpl;
import com.example.demo.mappers.impl.ReportStatusMapperImpl;
import com.example.demo.repository.IncidentReportRepository;
import com.example.demo.repository.ReportStatusRepository;
import com.example.demo.repository.UserRepository;
import com.example.demo.services.IncidentReportServices;
import com.example.demo.services.ReportStatusServices;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.thymeleaf.TemplateEngine;
import org.thymeleaf.context.Context;
import java.text.SimpleDateFormat;
import java.util.*;
import java.util.concurrent.CompletableFuture;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class IncidentReportServicesImpl implements IncidentReportServices {

    private final IncidentReportMapperImpl reportMapper;
    private final IncidentReportRepository reportRepository;
    private final UserRepository userRepository;
    private final FirebaseMessagingService messagingService;
    private final DocumentGenerator documentGenerator;
    private final ReportStatusRepository statusRepository;
    private final ReportStatusMapperImpl statusMapper;
    private final ReportStatusServices reportStatusServices;
    private final DataMapper dataMapper;
    private final EmailSenderService senderService;
    @Override
    public IncidentResponseDto createReport(IncidentReportDto incidentReportDto) {

        String userId = incidentReportDto.getUserIdentification();
        UserEntity user = userRepository.findByUserUID(userId)
                .orElseThrow(() -> new NotFoundException("User with ID " + userId + " not found"));
        IncidentReportEntity incidentReportEntity = reportMapper.mapTo(incidentReportDto);
        incidentReportEntity.setUser(user);
        IncidentReportEntity createdReport = reportRepository.save(incidentReportEntity);
        ReportStatusDto reportStatusDto = createReport(userId,incidentReportDto,createdReport);
        createPdf(incidentReportDto, reportStatusDto);
        CompletableFuture<Void> addSuggestionsFuture = addSuggestionsAsync(reportStatusDto);
        CompletableFuture<Void> emailCompletionFuture = CompletableFuture.runAsync(() ->
                senderService.sendCaseRegistrationCompletionEmail(incidentReportDto.getEmail(), reportStatusDto.getTrackId(), reportStatusDto.getReportURL())
        );
        CompletableFuture<Void> notificationAndEmailFutures = CompletableFuture.runAsync(() -> {
            String recipientToken = incidentReportDto.getRecipientToken();
            if (recipientToken != null && !recipientToken.isEmpty()) {
                if (createdReport.isBankAccInvolved()) {
                    System.out.println("Sending bank-related notification...");
                    messagingService.sendNotificationByToken(new Notifications(recipientToken));
                }
                System.out.println("Sending FIR notification...");
                senderService.sendAccountFreezeNotificationEmail(incidentReportDto.getEmail(), incidentReportDto.getUserAccountInfo().getAccountNumber());
                messagingService.sendFIRnotification(new FIRClass(recipientToken));
            } else {
                System.out.println("Recipient token not present. No notifications will be sent.");
            }
        });
        CompletableFuture<Void> efirConfirmationEmailFuture = CompletableFuture.runAsync(() ->
                senderService.sendEFIRFilingConfirmationEmail(incidentReportDto.getEmail(), reportStatusDto.getTrackId())
        );
        CompletableFuture.allOf(addSuggestionsFuture,emailCompletionFuture, notificationAndEmailFutures, efirConfirmationEmailFuture).join();
        IncidentResponseDto incidentResponseDto = new IncidentResponseDto();
        incidentResponseDto.setTrack(reportStatusDto.getTrackId());
        incidentResponseDto.setSuggestions(reportStatusDto.getSuggestions());
        return incidentResponseDto;
    }

    public CompletableFuture<Void> addSuggestionsAsync(ReportStatusDto reportStatusDto) {
        return CompletableFuture.runAsync(() -> {
            reportStatusServices.addSuggestions(reportStatusDto);
        });
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

    public void createPdf(IncidentReportDto incidentReportDto,ReportStatusDto reportStatusDto){
        Map<String, String> placeholders = new HashMap<>();
        placeholders.put("userId", incidentReportDto.getUserIdentification());
        placeholders.put("fullName", incidentReportDto.getFullName());
        placeholders.put("dateOfBirth", incidentReportDto.getDateOfBirth());
        placeholders.put("aadharNumber", incidentReportDto.getAadharNumber());
        placeholders.put("incidentDescription", incidentReportDto.getIncidentDescription());
        placeholders.put("email", incidentReportDto.getEmail());
        placeholders.put("isBankAccInvolved", String.valueOf(incidentReportDto.isBankAccInvolved()));
        placeholders.put("phoneNumber", incidentReportDto.getPhoneNumber());
        placeholders.put("dateOfCrime", incidentReportDto.getDateOfCrime());
        placeholders.put("city",incidentReportDto.getCity());
        placeholders.put("pincode",incidentReportDto.getPincode());
        placeholders.put("category",incidentReportDto.getCategory());
        placeholders.put("dateOfReport",incidentReportDto.getDateOfReport());
        placeholders.put("evidencesURL",incidentReportDto.getEvidencesURL().toString());
        placeholders.put("questionnaire",incidentReportDto.getQuestionnaire().toString());
        UserAccountInfo userAccountInfo = incidentReportDto.getUserAccountInfo();
        placeholders.put("bankName", userAccountInfo.getBankName());
        placeholders.put("amountLost", String.valueOf(userAccountInfo.getAmountLost()));
        placeholders.put("dateOfTransaction", userAccountInfo.getDateOfTransaction());
        placeholders.put("transaction", userAccountInfo.getTransaction());
        placeholders.put("accountNumber", userAccountInfo.getAccountNumber());
        SuspectInfo suspectInfo = incidentReportDto.getSuspectInfo();
        placeholders.put("suspectBankName", suspectInfo.getSuspectBankName());
        placeholders.put("suspectPhoneNumber", suspectInfo.getSuspectPhoneNumber());
        placeholders.put("suspectAccountNumber", suspectInfo.getSuspectAccountNumber());

        String finalHtml;
        Context dataContext = dataMapper.setData(incidentReportDto);
        ReportTemplate reportTemplate = new ReportTemplate();
        finalHtml = replacePlaceholders(reportTemplate.templateContent, placeholders);
        documentGenerator.htmlToPdf(finalHtml,reportStatusDto);
    }

    public ReportStatusDto createReport(String userId, IncidentReportDto incidentReportDto, IncidentReportEntity createdReport){
        SimpleDateFormat sdf = new SimpleDateFormat("dd-MM-yyyy");
        String formattedDate = sdf.format(new Date());

        ReportStatusEntity reportStatusEntity = new ReportStatusEntity();
        reportStatusEntity.setCurrentStatus("Case Register , E-FIR filed");
        Integer track_id = (int)(Math.random()*1000);
        reportStatusEntity.setTrackId(track_id);
        reportStatusEntity.setPending(true);
        reportStatusEntity.setUserId(userId);
        reportStatusEntity.setFlag(0);
        reportStatusEntity.setUpdatedDate(formattedDate);
        reportStatusEntity.setReportDate(incidentReportDto.getDateOfReport());
        reportStatusEntity.setCity(incidentReportDto.getCity());
        createdReport.setTrackId(track_id);
        reportStatusEntity.setIncidentReport(createdReport);
        ReportStatusEntity savedReportStatus = statusRepository.save(reportStatusEntity);
        createdReport.getReports().add(savedReportStatus);
        reportRepository.save(createdReport);
        return statusMapper.mapFrom(savedReportStatus);
    }
    public static String replacePlaceholders(String template, Map<String, String> placeholders) {
        String result = template;
        for (Map.Entry<String, String> entry : placeholders.entrySet()) {
            String placeholder = "${" + entry.getKey() + "}";
            String replacement = entry.getValue();
            if (replacement != null) {
                result = result.replace(placeholder, replacement);
            }
        }
        return result;
    }
}
