package com.example.demo.services;

import com.example.demo.entities.fraudlent.FraudEmails;

public interface FraudEmailServices {
    boolean isEmailFraud(String email);

    FraudEmails addFraudEmail(FraudEmails email);

    void reportFraudEmail(FraudEmails email);
}
