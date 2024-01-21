package com.example.demo.services.impl;

import com.example.demo.dto.AnalyticsDto;
import com.example.demo.entities.AnalysisEntity;
import com.example.demo.mappers.impl.AnalyticsMapperImpl;
import com.example.demo.repository.AnalysisRepository;
import com.example.demo.services.AnalysisServices;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class AnalysisServicesImpl implements AnalysisServices {

    private final AnalyticsMapperImpl analyticsMapper;
    private final AnalysisRepository analysisRepository;
    @Override
    public AnalyticsDto createAnalysis(AnalyticsDto analyticsDto) throws JsonProcessingException {
        String message = analyticsDto.getMessage();
        String date = analyticsDto.getReportDate();
        String category = analyticsDto.getCategory();
        String urlAPI = "http://2dde-34-90-120-65.ngrok-free.app/analysis";
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);

        Map<String, Object> requestBodyMap = new HashMap<>();
        requestBodyMap.put("message", message);
        requestBodyMap.put("reportDate", date);

        ObjectMapper objectMapper = new ObjectMapper();
        String requestBody = objectMapper.writeValueAsString(requestBodyMap);

        HttpEntity<String> requestEntity = new HttpEntity<>(requestBody, headers);

        RestTemplate restTemplate = new RestTemplate();
        ResponseEntity<String> responseEntity = restTemplate.postForEntity(urlAPI, requestEntity, String.class);
        String responseBody = responseEntity.getBody();

        AnalysisEntity analysisEntity = new AnalysisEntity();
        System.out.println("Hello");
        System.out.println(responseBody);

        try {
            JsonNode jsonNode = objectMapper.readTree(responseBody);
    //        String category = jsonNode.get("category").asText();

            String analysis = jsonNode.get("analysis").asText();
    //        System.out.println("Category: " + category);

            System.out.println("Analysis: " + analysis);

            analysisEntity.setCategory(category);
            analysisEntity.setAnalysis(analysis);
            analysisEntity.setMessage(message);
            analysisEntity.setReportDate(date);

            analysisRepository.save(analysisEntity);
        } catch (Exception e) {
            e.printStackTrace();
        }

        return analyticsMapper.mapFrom(analysisEntity);

    }
    @Override
    public List<AnalyticsDto> getAllAnalytics() {
        return analysisRepository.findAll().stream().map(analyticsMapper::mapFrom).collect(Collectors.toList());
    }

}
