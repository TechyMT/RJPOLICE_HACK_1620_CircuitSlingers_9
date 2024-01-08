package com.example.demo.controller;


import com.example.demo.entities.Questionnaire;
import com.example.demo.entities.QuestionnaireList;
import com.example.demo.services.IncidentReportServices;
import com.fasterxml.jackson.core.JsonProcessingException;

import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;

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
        String urlAPI = "https://your-ngrok-url.com/api/generateDescription";
   //     String output = restTemplate.postForObject(urlAPI,description,String.class);
        String output = "{\"questions\":[{\"type\":\"clarify\",\"question\":\"Can you provide more details about the suspicious emails you received? (e.g. How often did you receive them, what did they Look like, were they personalized or generic?)\",\"answer\":\"Screenshot attached\"},{\"type\":\"specifics\",\"question\":\"Can you describe any patterns or behaviors you noticed in your online accounts that could indicate a breach? (e.g. Unusual login activity, unfamiliar device access, changes in password or security questions)\",\"answer\":\"I noticed some unusual login activity on my bank account and social media profiles\"}]}";

        try{
            return ResponseEntity.ok(objectMapper.readValue(output, QuestionnaireList.class));
        } catch (JsonProcessingException e) {
            throw new RuntimeException(e);
        }
    }

}
