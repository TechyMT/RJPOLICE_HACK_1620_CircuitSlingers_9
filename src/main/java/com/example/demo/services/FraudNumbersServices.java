package com.example.demo.services;

import com.example.demo.entities.fraudlent.FraudNumbers;

import java.util.Map;

public interface FraudNumbersServices {
    boolean isNumberFraud(String number);
    FraudNumbers addFraudNumber(FraudNumbers number);

    Map<String,String> reportFraudNumber(FraudNumbers numbers);
}
