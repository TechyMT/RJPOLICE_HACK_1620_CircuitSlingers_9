package com.example.demo.controller;


import com.example.demo.dto.ReportStatusDto;
import com.example.demo.dto.SuggestionDto;
import com.example.demo.entities.ReportStatusEntity;
import com.example.demo.entities.incidentchild.Questionnaire;
import com.example.demo.entities.incidentchild.QuestionnaireList;
import com.example.demo.mappers.impl.ReportStatusMapperImpl;
import com.example.demo.repository.ReportStatusRepository;
import com.example.demo.services.IncidentReportServices;
import com.example.demo.services.ReportStatusServices;
import com.fasterxml.jackson.core.JsonProcessingException;

import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;

import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("api/report/")
@RequiredArgsConstructor
public class DescriptionController {

    public final RestTemplate restTemplate;
    public final IncidentReportServices reportServices;
    private final ReportStatusRepository statusRepository;
    private final ReportStatusServices statusServices;

    private final ReportStatusMapperImpl statusMapper;

    private final ObjectMapper objectMapper;

    @PostMapping(path = "/submit")
    public ResponseEntity<String> submitQuestionnaire(@RequestBody List<Questionnaire> questionnaire) {
        return ResponseEntity.ok("Questionnaire submitted successfully");
    }

    @PostMapping(path = "/generateQuestions")
    public ResponseEntity<QuestionnaireList> generateDesc(
            @RequestBody String description
    ){
        String urlAPI = "http://7a93-35-227-94-79.ngrok-free.app/home";
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        HttpEntity<String> requestEntity = new HttpEntity<>(description, headers);
        RestTemplate restTemplate = new RestTemplate();
        ResponseEntity<String> output = restTemplate.postForEntity(urlAPI, requestEntity, String.class);
//              output = restTemplate.postForObject(urlAPI,description,String.class);
//        String output = "  {\n" +
//                "  \"questions\": [\n" +
//                "    {\n" +
//                "      \"question\": \"Can you describe the email you received from your bank, including any distinctive features or language used?\"\n" +
//                "    },\n" +
//                "    {\n" +
//                "      \"question\": \"Did you notice any inconsistencies or red flags when reviewing the email?\"\n" +
//                "    },\n" +
//                "    {\n" +
//                "      \"question\": \"How did you verify the authenticity of the email before providing your personal information?\"\n" +
//                "    },\n" +
//                "    {\n" +
//                "      \"question\": \"Can you provide more details on the unauthorized transactions made on your account?\"\n" +
//                "    },\n" +
//                "    {\n" +
//                "      \"question\": \"Have you experienced any other suspicious activity on your accounts since the initial incident?\"\n" +
//                "    },\n" +
//                "    {\n" +
//                "      \"question\": \"What steps have you taken to protect your personal information and prevent similar incidents in the future?\"\n" +
//                "    },\n" +
//                "    {\n" +
//                "      \"question\": \"Are there any additional details or concerns you would like to share regarding this incident?\"\n" +
//                "}\n" +
//                "]\n" +
//                "}";
        System.out.println(output.getBody());
        try {
            QuestionnaireList questionnaireList = objectMapper.readValue(output.getBody(), QuestionnaireList.class);
            if (questionnaireList.getQuestions() == null || questionnaireList.getQuestions().isEmpty()) {
                output = restTemplate.postForEntity(urlAPI, requestEntity, String.class);
                questionnaireList = objectMapper.readValue(output.getBody(), QuestionnaireList.class);
            }
            return ResponseEntity.ok(questionnaireList);
        } catch (JsonProcessingException e) {
            throw new RuntimeException(e);
        }

    }

    @PostMapping(path = "/getInformation")
    public ResponseEntity<String> getInformationOnCategoryAndDescription(
            @RequestBody SuggestionDto suggestionDto
    ) {
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        String urlAPI = "http://0189-34-121-251-160.ngrok-free.app/suggest";
        HttpEntity<SuggestionDto> requestEntity = new HttpEntity<>(suggestionDto, headers);
        ResponseEntity<String> responseEntity = new RestTemplate().postForEntity(urlAPI, requestEntity, String.class);
        String apiResponse = responseEntity.getBody();
        System.out.println(apiResponse);
        Optional<ReportStatusEntity> reportStatusEntity = statusRepository.findByTrackId(Integer.valueOf(suggestionDto.getTrackId()));
        if(reportStatusEntity.isPresent()) {
            System.out.println("Adding suggestions to report");
            ReportStatusDto reportStatusDto = statusMapper.mapFrom(reportStatusEntity.get());
            statusServices.updateReportStatusWithSuggestions(reportStatusDto,apiResponse);
        }
        return new ResponseEntity<>(apiResponse, HttpStatus.OK);
    }

}
