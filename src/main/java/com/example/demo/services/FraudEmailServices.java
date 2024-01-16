package com.example.demo.services;

import com.example.demo.entities.fraudlent.FraudEmails;

import java.util.Map;

public interface FraudEmailServices {
    boolean isEmailFraud(String email);

    FraudEmails addFraudEmail(FraudEmails email);

    Map<String,String> reportFraudEmail(FraudEmails email);
}
