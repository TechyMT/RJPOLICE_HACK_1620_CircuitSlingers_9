package com.example.demo.services;

import com.example.demo.entities.fraudlent.FraudAccNumbers;
import com.example.demo.repository.FraudAccNumbersRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;
import org.springframework.stereotype.Service;

@Service

public interface FraudAccountServices {

    boolean isNumberFraud(String number);

    FraudAccNumbers addFraudAcc(FraudAccNumbers number);

}
