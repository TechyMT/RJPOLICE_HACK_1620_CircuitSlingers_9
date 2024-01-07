package com.example.demo.services.impl;

import com.example.demo.entities.FraudEmails;
import com.example.demo.repository.FraudEmailsRepository;
import com.example.demo.services.FraudEmailServices;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class FraudEmailServicesImpl implements FraudEmailServices {

    private final FraudEmailsRepository emailsRepository;
    @Override
    public boolean isEmailFraud(String email) {
        return emailsRepository.findByEmail(email);
    }

    @Override
    public FraudEmails addFraudEmail(FraudEmails email) {
        return emailsRepository.save(email);
    }
}
