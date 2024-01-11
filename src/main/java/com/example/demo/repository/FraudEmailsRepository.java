package com.example.demo.repository;

import com.example.demo.entities.fraudlent.FraudEmails;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface FraudEmailsRepository extends MongoRepository<FraudEmails,String> {

    FraudEmails findByEmail(String email);
}
