package org.backend.hackathon.controller;

import lombok.RequiredArgsConstructor;
import org.backend.hackathon.auth.AuthenticationRequest;
import org.backend.hackathon.auth.AuthenticationResponse;
import org.backend.hackathon.service.AuthenticationService;
import org.backend.hackathon.auth.RegisterRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

@RestController
@RequestMapping("/api/v1/auth")
@RequiredArgsConstructor
public class AuthenticationController {

    private final AuthenticationService service;

    private final RestTemplate restTemplate;

    @PostMapping("/register")
    public ResponseEntity<AuthenticationResponse> register(
            @RequestBody RegisterRequest request
    ) {
        return ResponseEntity.ok(service.register(request));
    }
    @PostMapping("/authenticate")
    public ResponseEntity<AuthenticationResponse> authenticate(
            @RequestBody AuthenticationRequest request
    ) {
        return ResponseEntity.ok(service.authenticate(request));
    }
    @GetMapping("/news")
    public ResponseEntity<String> getNewsData(@RequestParam String query) {
        String apiKey = "0bc05e4fd0574e81aa4de8e8e1388d1d";
        String url = "https://newsapi.org/v2/everything?q=" + query + "&language=en&apiKey=" + apiKey;
        return restTemplate.getForEntity(url, String.class);
    }

}