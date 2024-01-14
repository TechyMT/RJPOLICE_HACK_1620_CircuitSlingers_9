package com.example.demo.services.impl;

import com.example.demo.dto.AnalyticsDto;
import com.example.demo.entities.AnalysisEntity;
import com.example.demo.mappers.impl.AnalyticsMapperImpl;
import com.example.demo.repository.AnalysisRepository;
import com.example.demo.services.AnalysisServices;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
@RequiredArgsConstructor
public class AnalysisServicesImpl implements AnalysisServices {

    private final AnalyticsMapperImpl analyticsMapper;
    private final AnalysisRepository analysisRepository;
    @Override
    public AnalyticsDto createAnalysis(AnalyticsDto analyticsDto) {
        String message = analyticsDto.getMessage();
        String date = analyticsDto.getReportDate();
//        String urlAPI = "http://6785-34-136-27-38.ngrok-free.app/analysis";
//        HttpHeaders headers = new HttpHeaders();
//        headers.setContentType(MediaType.APPLICATION_JSON);
//        HttpEntity<String> requestEntity = new HttpEntity<>(message, headers);
//        RestTemplate restTemplate = new RestTemplate();
//        ResponseEntity<String> responseEntity = restTemplate.postForEntity(urlAPI, requestEntity, String.class);
//        String responseBody = responseEntity.getBody();
        AnalysisEntity analysisEntity =  new AnalysisEntity();

        String responseBody = "Sure, I can help you with that! Based on the information provided, here is the output in JSON format:\n\n{\n\"category\": \"Financial scam\",\n\"analysis\": \"The email is attempting to trick the recipient into renewing their NORTON 360 TOTAL PROTECTION subscription by claiming that their annual membership has been renewed and updated successfully. However, there are several red flags that indicate this email is likely a scam. Firstly, the sender's email address is from a free email provider (Gmail), which is a common tactic used by scammers to hide their true identity. Secondly, the email asks the recipient to call the scammer's phone number to claim a refund, which is a common tactic used by scammers to trick people into giving away personal information or paying fake fees. Lastly, the email contains poor grammar and punctuation, which is another indicator that it may be a scam. Based on these indicators, it is likely that this email is a financial scam, and the recipient should be cautious and not respond to it.\"\n}";

  //      System.out.println(responseBody);
        ObjectMapper objectMapper = new ObjectMapper();
        try {
            JsonNode jsonNode = objectMapper.readTree(responseBody);
            String category = jsonNode.get("category").asText();
            String analysis = jsonNode.get("analysis").asText();
            System.out.println("Category: " + category);
            System.out.println("Analysis: " + analysis);
            analysisEntity.setCategory(category);
            analysisEntity.setAnalysis(analysis);
            analysisEntity.setMessage(message);
            analysisEntity.setReportDate(date);
            analysisRepository.save(analysisEntity);
        } catch (Exception e) {
            e.printStackTrace();
            // Handle exception (e.g., JSON parsing error)
        }
        return analyticsMapper.mapFrom(analysisEntity);

    }
}
