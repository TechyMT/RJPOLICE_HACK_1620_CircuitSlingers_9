package com.example.demo.services;

import com.example.demo.entities.FraudNumbers;

public interface FraudNumbersServices {
    boolean isNumberFraud(String number);
    FraudNumbers addFraudNumber(FraudNumbers number);
}
