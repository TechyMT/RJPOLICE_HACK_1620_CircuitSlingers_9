package com.example.demo.services.impl;

import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.concurrent.CompletableFuture;

@Service
public class MessengerService {

    private final RestTemplate restTemplate;
    private final String apiUrl = "your_external_api_url_here";

    public MessengerService(RestTemplate restTemplate) {
        this.restTemplate = restTemplate;
    }

    public void sendOnBoardingMessage(String phoneNumber) {
        String message = "Go on this website https://rjpolice.netlify.app/";
        sendMessage(phoneNumber, message);
    }

    public CompletableFuture<Void> sendSubmissionMessage(String phoneNumber) {
        String message = "Your Report was submitted with the Rajasthan Police";
        sendMessage(phoneNumber, message);
        return null;
    }

    public void sendBankFreezeMessage(String phoneNumber){
        String message = "Your Bank accounts are freezed ";
        sendMessage(phoneNumber,message);
    }

    private void sendMessage(String phoneNumber, String message) {
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);

        String jsonPayload = "{\"phoneNumber\":\"" + phoneNumber + "\",\"message\":\"" + message + "\"}";
        HttpEntity<String> requestEntity = new HttpEntity<>(jsonPayload, headers);

        ResponseEntity<String> responseEntity = restTemplate.postForEntity(apiUrl, requestEntity, String.class);

    }
}
