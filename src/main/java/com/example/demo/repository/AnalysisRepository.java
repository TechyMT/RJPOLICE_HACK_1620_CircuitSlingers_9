package com.example.demo.repository;

import com.example.demo.entities.AnalysisEntity;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface AnalysisRepository extends MongoRepository<AnalysisEntity,String> {
}
