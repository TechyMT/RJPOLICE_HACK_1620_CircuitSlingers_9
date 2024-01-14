package com.example.demo.services.impl;

import com.example.demo.entities.fraudlent.FraudEmails;
import com.example.demo.entities.fraudlent.FraudNumbers;
import com.example.demo.repository.FraudNumbersRepository;
import com.example.demo.services.FraudNumbersServices;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class FraudNumberImpl implements FraudNumbersServices {

    private final FraudNumbersRepository numbersRepository;
    @Override
    public boolean isNumberFraud(String number) {
        Optional<FraudNumbers> fraudNumbers = Optional.ofNullable(numbersRepository.findByPhoneNumber(number));
        return fraudNumbers.isPresent();
    }

    @Override
    public FraudNumbers addFraudNumber(FraudNumbers number) {
        return numbersRepository.save(number);
    }

    @Override
    public void reportFraudNumber(FraudNumbers numbers) {
            String number = numbers.getPhoneNumber();
            FraudNumbers existingNumber = numbersRepository.findByPhoneNumber(number);
            if (existingNumber != null) {
                existingNumber.setReportCount(existingNumber.getReportCount() + 1);
            } else {
                numbers.setReportCount(1);
                numbersRepository.save(numbers);
            }
    }


}
