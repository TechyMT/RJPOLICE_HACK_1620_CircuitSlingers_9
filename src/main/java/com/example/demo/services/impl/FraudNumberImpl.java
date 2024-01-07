package com.example.demo.services.impl;

import com.example.demo.entities.FraudNumbers;
import com.example.demo.repository.FraudNumbersRepository;
import com.example.demo.services.FraudNumbersServices;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class FraudNumberImpl implements FraudNumbersServices {

    private final FraudNumbersRepository numbersRepository;
    @Override
    public boolean isNumberFraud(String number) {
        FraudNumbers fraudNumbers = numbersRepository.findByPhoneNumber(number);
        return fraudNumbers != null;
    }
    @Override
    public FraudNumbers addFraudNumber(FraudNumbers number) {
        return numbersRepository.save(number);
    }


}
