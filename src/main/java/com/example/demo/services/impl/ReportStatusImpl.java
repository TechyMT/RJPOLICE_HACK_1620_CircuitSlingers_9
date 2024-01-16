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
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.time.temporal.ChronoUnit;
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
            existingStatus.setSuggestions(reportStatusDto.getSuggestions());
            existingStatus.setComments(reportStatusDto.getComments());
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

    public void addSuggestionToReport(ReportStatusDto reportStatusDto){
        Optional<ReportStatusEntity> reportStatus = statusRepository.findByTrackId(reportStatusDto.getTrackId());
        if (reportStatus.isPresent()) {
            ReportStatusEntity existingStatus = reportStatus.get();
            if (!reportStatusDto.getSuggestions().isEmpty()) {
                existingStatus.setSuggestions(reportStatusDto.getSuggestions());
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

    @Override
    public void addSuggestions(ReportStatusDto reportStatusDto){
        //        HttpHeaders headers = new HttpHeaders();
//        headers.setContentType(MediaType.APPLICATION_JSON);
//        String urlAPI = "https://your-ngrok-url.com/api/generateDescription";
//        HttpEntity<SuggestionDto> requestEntity = new HttpEntity<>(suggestionDto, headers);
//        ResponseEntity<String> responseEntity = new RestTemplate().postForEntity(urlAPI, requestEntity, String.class);
//        String apiResponse = responseEntity.getBody();

        String output ="Step 1: Secure Your Account and Personal Information\n" +
                "\n" +
                "1.1.1 Immediately notify your bank about the incident and provide them with the necessary details to investigate and take action. This will help them identify and freeze any fraudulent accounts associated with your personal information.\n" +
                "\n" +
                "1.1.2 Change your bank's login credentials and update your multi-factor authentication (MFA) settings to further secure your account.\n" +
                "\n" +
                "1.1.3 Place a fraud alert on your credit reports to prevent any unauthorized usage of your personal information, such as opening new bank accounts or credit cards.\n" +
                "\n" +
                "1.1.4 Review your bank statements and transaction history to identify any suspicious activity. Notify your bank and report any unauthorized transactions to the relevant authorities.\n" +
                "\n" +
                "Step 2: Protect Your Digital Assets\n" +
                "\n" +
                "2.1.1 Update your devices' operating system and software to ensure you have the latest security patches and virus definitions.\n" +
                "\n" +
                "2.1.2 Use a robust antivirus program to scan your system for malware and vulnerabilities.\n" +
                "\n" +
                "2.1.3 Consider investing in cybersecurity software that offers enhanced protection for your digital assets, such as encryption tools or identity theft protection services.\n" +
                "\n" +
                "Step 3: Seek Legal Support\n" +
                "\n" +
                "3.1.1 Familiarize yourself with Indian laws and regulations regarding cybercrime, such as the Information Technology Act, 2000 (IT Act) and the Indian Penal Code. Understand your rights and options for seeking legal recourse.\n" +
                "\n" +
                "3.1.2 Consider consulting with a cybercrime lawyer who is knowledgeable about Indian laws and can provide personalized guidance on legal matters.\n" +
                "\n" +
                "Step 4: Monitor Your Personal Information\n" +
                "\n" +
                "4.1.1 Regularly check your credit reports and financial statements to detect any suspicious activity or unauthorized usage of your personal information.\n" +
                "\n" +
                "4.1.2 Monitor your bank accounts and credit cards for any unusual transactions, and report any discrepancies to the relevant authorities.\n" +
                "\n" +
                "4.1.3 Keep a close eye on your social media accounts and email addresses for any suspicious activity or phishing attempts.\n" +
                "\n" +
                "Additional Tips:\n" +
                "\n" +
                "* Document any correspondence or communication with the fraudsters, including screenshots and logs of their actions.\n" +
                "* Report the incident to the relevant authorities, such as the police or the Federal Bureau of Investigation (FBI).\n" +
                "* Consider joining a cybercrime support group to connect with others who have experienced similar situations.\n" +
                "\n" +
                "Remember, you're not alone in this fight. There are various resources available to help you recover from cyber fraud and protect your personal information. Please feel free to reach out to me if you have any further questions or concerns.\n" +
                "\n" +
                "---\n" +
                "\n";
        reportStatusDto.setSuggestions(output);
        addSuggestionToReport(reportStatusDto);
    }

    @Override
    public Map<String, List<ReportStatusDto>> sortReportByDates() {
        Map<String, List<ReportStatusDto>> categorizedReports = new HashMap<>();
        List<ReportStatusEntity> allReports = statusRepository.findAll();

        for (ReportStatusEntity report : allReports) {
            LocalDate reportLocalDate = LocalDate.parse(report.getReportDate(), DateTimeFormatter.ofPattern("dd-MM-yyyy"));
            LocalDate currentDate = LocalDate.now();
            long daysDifference = ChronoUnit.DAYS.between(reportLocalDate, currentDate);

            List<String> categories = new ArrayList<>();

            if (daysDifference <= 1) {
                categories.add("Last Day Reports");
            }
            if (daysDifference <= 7) {
                categories.add("Last 7 Days Reports");
            }
            if (daysDifference <= 30) {
                categories.add("Last 30 Days Reports");
            }
            for (String category : categories) {
                categorizedReports
                        .computeIfAbsent(category, k -> new ArrayList<>())
                        .add(reportMapper.mapFrom(report));
            }
        }
        categorizedReports.computeIfAbsent("All Reports", k -> new ArrayList<>())
                .addAll(allReports.stream()
                        .map(reportMapper::mapFrom)
                        .toList());

        return categorizedReports;
    }




}
