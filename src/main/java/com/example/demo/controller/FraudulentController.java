package com.example.demo.controller;

import com.example.demo.entities.FraudEmails;
import com.example.demo.entities.FraudNumbers;
import com.example.demo.services.FraudEmailServices;
import com.example.demo.services.FraudNumbersServices;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(path = "/api/fraud_search/")
@RequiredArgsConstructor
public class FraudulentController {

    private final FraudNumbersServices fraudNumbersServices;

    private final FraudEmailServices fraudEmailServices;


    @GetMapping(path = "/emails/{email}")
    public ResponseEntity<Boolean> checkEmail(
            @PathVariable("email") String email
    ){
        Boolean isFraud = fraudEmailServices.isEmailFraud(email);
        return new ResponseEntity<>(isFraud, HttpStatus.OK);
    }
    @GetMapping(path = "/numbers/{number}")
    public ResponseEntity<Boolean> checkPhoneNumber(@PathVariable("number") String number) {
        boolean isFraud = fraudNumbersServices.isNumberFraud(number);
        return new ResponseEntity<>(isFraud, HttpStatus.OK);
    }

    @PostMapping(path = "/addEmail")
    public ResponseEntity<FraudEmails> addFraudEmail(
            @RequestBody FraudEmails email
    ){
        FraudEmails savedEmail = fraudEmailServices.addFraudEmail(email);
        return new ResponseEntity<>(savedEmail,HttpStatus.OK);
    }

    @PostMapping(path = "/addNumber")
    public ResponseEntity<FraudNumbers> addFraudNumber(
            @RequestBody FraudNumbers number
    ){
        FraudNumbers savedNumber = fraudNumbersServices.addFraudNumber(number);
        return new ResponseEntity<>(savedNumber,HttpStatus.OK);
    }
}
