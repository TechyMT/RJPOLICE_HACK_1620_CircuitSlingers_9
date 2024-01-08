package com.example.demo.repository;

import com.example.demo.entities.IncidentReportEntity;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface IncidentReportRepository extends MongoRepository<IncidentReportEntity,String> {

    List<IncidentReportEntity> findAllByUser(String id);

    List<IncidentReportEntity> findByCity(String city);

    IncidentReportEntity findByTrackId(Integer id);

    @Override
    long count();
}
