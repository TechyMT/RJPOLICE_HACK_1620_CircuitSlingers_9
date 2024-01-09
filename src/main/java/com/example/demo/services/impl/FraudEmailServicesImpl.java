package com.example.demo.services.impl;

import com.example.demo.entities.FraudEmails;
import com.example.demo.repository.FraudEmailsRepository;
import com.example.demo.services.FraudEmailServices;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class FraudEmailServicesImpl implements FraudEmailServices {

    private final FraudEmailsRepository emailsRepository;
    @Override
    public String isEmailFraud(String email)
    {
        Optional<FraudEmails> emails = Optional.ofNullable(emailsRepository.findByEmail(email));
        if(emails.isPresent()){
            return "Beware! Phishing Email";
        }
        else{
            return "Not in our Database";
        }
    }

    @Override
    public FraudEmails addFraudEmail(FraudEmails email) {
        return emailsRepository.save(email);
    }
}
