package com.example.demo.services.impl;

import com.example.demo.entities.fraudlent.FraudEmails;
import com.example.demo.entities.fraudlent.FraudNumbers;
import com.example.demo.repository.FraudNumbersRepository;
import com.example.demo.services.FraudNumbersServices;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;
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
    public Map<String,String> reportFraudNumber(FraudNumbers numbers) {
            String number = numbers.getPhoneNumber();
            FraudNumbers existingNumber = numbersRepository.findByPhoneNumber(number);
        Map<String,String> resultMap = new HashMap<>();
        if (existingNumber != null) {
            existingNumber.setReportCount(existingNumber.getReportCount() + 1);
            numbersRepository.save(existingNumber);
            resultMap.put("message","This  has been reported by "+existingNumber.getReportCount()+" users");
        } else {
                numbers.setReportCount(1);
                numbersRepository.save(numbers);
            resultMap.put("message","This has been added to the black-listed list");

        }
        return resultMap;
    }


}
