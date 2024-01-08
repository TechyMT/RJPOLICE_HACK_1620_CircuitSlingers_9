package com.example.demo.repository;

import com.example.demo.entities.ReportStatusEntity;
import org.springframework.data.mongodb.repository.Aggregation;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@Repository
public interface ReportStatusRepository extends MongoRepository<ReportStatusEntity,String> {

    Optional<ReportStatusEntity> findByTrackId(Integer id);

    List<ReportStatusEntity> findAllByUserId(String id);

    Integer countAllByPending(boolean pending);

Integer countByCity(String city);





}
