package com.example.demo.repository;

import com.example.demo.entities.FraudNumbers;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface FraudNumbersRepository extends MongoRepository<FraudNumbers, String> {
    FraudNumbers findByPhoneNumber(String phoneNumber);
}

