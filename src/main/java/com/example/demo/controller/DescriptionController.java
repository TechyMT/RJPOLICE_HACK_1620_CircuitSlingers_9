package com.example.demo.controller;


import com.example.demo.entities.incidentchild.Questionnaire;
import com.example.demo.entities.incidentchild.QuestionnaireList;
import com.example.demo.services.IncidentReportServices;
import com.fasterxml.jackson.core.JsonProcessingException;

import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;

import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

import java.util.List;

@RestController
@RequestMapping("api/report/")
@RequiredArgsConstructor
public class DescriptionController {

    public RestTemplate restTemplate;
    public IncidentReportServices reportServices;

    private final ObjectMapper objectMapper;

    @PostMapping(path = "/submit")
    public ResponseEntity<String> submitQuestionnaire(@RequestBody List<Questionnaire> questionnaire) {
        return ResponseEntity.ok("Questionnaire submitted successfully");
    }

    @PostMapping(path = "/generateQuestions")
    public ResponseEntity<QuestionnaireList> generateDesc(
            @RequestBody String description
    ){
//        String urlAPI = "http://a03f-35-245-174-48.ngrok-free.app/home";
//        HttpHeaders headers = new HttpHeaders();
//        headers.setContentType(MediaType.APPLICATION_JSON);
//        HttpEntity<String> requestEntity = new HttpEntity<>(description, headers);
//        RestTemplate restTemplate = new RestTemplate();
//        ResponseEntity<String> output = restTemplate.postForEntity(urlAPI, requestEntity, String.class);
        String urlAPI = "https://your-ngrok-url.com/api/generateDescription";
        //     String output = restTemplate.postForObject(urlAPI,description,String.class);
        String output = "  {\n" +
                "  \"questions\": [\n" +
                "    {\n" +
                "      \"question\": \"Can you describe the email you received from your bank, including any distinctive features or language used?\"\n" +
                "    },\n" +
                "    {\n" +
                "      \"question\": \"Did you notice any inconsistencies or red flags when reviewing the email?\"\n" +
                "    },\n" +
                "    {\n" +
                "      \"question\": \"How did you verify the authenticity of the email before providing your personal information?\"\n" +
                "    },\n" +
                "    {\n" +
                "      \"question\": \"Can you provide more details on the unauthorized transactions made on your account?\"\n" +
                "    },\n" +
                "    {\n" +
                "      \"question\": \"Have you experienced any other suspicious activity on your accounts since the initial incident?\"\n" +
                "    },\n" +
                "    {\n" +
                "      \"question\": \"What steps have you taken to protect your personal information and prevent similar incidents in the future?\"\n" +
                "    },\n" +
                "    {\n" +
                "      \"question\": \"Are there any additional details or concerns you would like to share regarding this incident?\"\n" +
                "}\n" +
                "]\n" +
                "}";

//        try {
//            QuestionnaireList questionnaireList = objectMapper.readValue(output.getBody(), QuestionnaireList.class);
//            return ResponseEntity.ok(questionnaireList);
//        } catch (JsonProcessingException e) {
//            throw new RuntimeException(e);
//        }
        try {
            QuestionnaireList questionnaireList = objectMapper.readValue(output, QuestionnaireList.class);
            return ResponseEntity.ok(questionnaireList);
        } catch (JsonProcessingException e) {
            throw new RuntimeException(e);
        }

    }

}
