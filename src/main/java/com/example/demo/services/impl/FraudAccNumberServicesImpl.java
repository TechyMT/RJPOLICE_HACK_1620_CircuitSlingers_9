package com.example.demo.services.impl;

import com.example.demo.entities.fraudlent.FraudAccNumbers;
import com.example.demo.exceptions.AlreadyExistsException;
import com.example.demo.repository.FraudAccNumbersRepository;
import com.example.demo.services.FraudAccountServices;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class FraudAccNumberServicesImpl implements FraudAccountServices {

    private final FraudAccNumbersRepository accountRepository;
    @Override
    public boolean isNumberFraud(String number) {
        Optional<FraudAccNumbers> fraudNumber = Optional.ofNullable(accountRepository.findByAccountNumber(number));
        return fraudNumber.isPresent();
    }

    @Override
    public FraudAccNumbers addFraudAcc(FraudAccNumbers number) {
        if(Optional.ofNullable(accountRepository.findByAccountNumber(number.getAccountNumber())).isEmpty()){
            return accountRepository.save(number);
        }
        else{
            throw new AlreadyExistsException("This fraud Account Number already exists in the Database");
        }
    }
}