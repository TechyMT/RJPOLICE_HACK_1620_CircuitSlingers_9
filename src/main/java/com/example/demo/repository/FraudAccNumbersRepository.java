package com.example.demo.repository;

import com.example.demo.entities.fraudlent.FraudAccNumbers;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface FraudAccNumbersRepository extends MongoRepository<FraudAccNumbers,String> {
    FraudAccNumbers findByAccountNumber(String number);

}
