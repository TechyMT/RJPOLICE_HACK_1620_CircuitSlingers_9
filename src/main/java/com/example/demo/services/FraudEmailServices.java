package com.example.demo.services;

import com.example.demo.entities.FraudEmails;

public interface FraudEmailServices {
    boolean isEmailFraud(String email);

    FraudEmails addFraudEmail(FraudEmails email);
}