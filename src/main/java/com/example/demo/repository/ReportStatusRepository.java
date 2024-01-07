package com.example.demo.repository;

import com.example.demo.entities.ReportStatusEntity;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ReportStatusRepository extends MongoRepository<ReportStatusEntity,String> {

    Optional<ReportStatusEntity> findByTrackId(Integer id);
}
