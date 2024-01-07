package com.example.demo.repository;

import com.example.demo.entities.FraudEmails;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface FraudEmailsRepository extends MongoRepository<FraudEmails,String> {

    boolean findByEmail(String email);
}
