package com.example.demo.services.impl;

import com.example.demo.entities.fraudlent.FraudAccNumbers;
import com.example.demo.entities.fraudlent.FraudEmails;
import com.example.demo.repository.FraudEmailsRepository;
import com.example.demo.services.FraudEmailServices;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;
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
    public Map<String,String> reportFraudEmail(FraudEmails email) {
        String emails = email.getEmail();
        FraudEmails existingAccount = emailsRepository.findByEmail(emails);
        Map<String,String> resultMap = new HashMap<>();
        if (existingAccount != null) {
            existingAccount.setReportCount(existingAccount.getReportCount() + 1);
            emailsRepository.save(existingAccount);
            resultMap.put("message","This mail has been reported by "+existingAccount.getReportCount()+" users");

        } else {
            email.setReportCount(1);
            emailsRepository.save(email);
            resultMap.put("message","This has been added to the black-listed list");

        }
        return resultMap;
    }
}
