package com.example.demo.services.impl;

import com.example.demo.entities.fraudlent.FraudAccNumbers;
import com.example.demo.entities.fraudlent.FraudEmails;
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
    public boolean isEmailFraud(String email)
    {
        Optional<FraudEmails> emails = Optional.ofNullable(emailsRepository.findByEmail(email));
       return emails.isPresent();
    }

    @Override
    public FraudEmails addFraudEmail(FraudEmails email) {
        return emailsRepository.save(email);
    }

    @Override
    public void reportFraudEmail(FraudEmails email) {
        String emails = email.getEmail();
        FraudEmails existingAccount = emailsRepository.findByEmail(emails);
        if (existingAccount != null) {
            existingAccount.setReportCount(existingAccount.getReportCount() + 1);
        } else {
            email.setReportCount(1);
            emailsRepository.save(email);
        }
    }
}
