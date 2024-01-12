package com.example.demo.controller;

import com.example.demo.dto.IncidentReportDto;
import com.example.demo.entities.IncidentReportEntity;
import com.example.demo.services.impl.FirebaseMessagingService;
import com.example.demo.services.IncidentReportServices;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping(path = "/api/report")
@RequiredArgsConstructor
public class IncidentReportController {

    private final IncidentReportServices reportServices;
    private final FirebaseMessagingService messagingService;


    @PostMapping(path = "/add")
    public ResponseEntity<IncidentReportDto> createReport(
        @RequestBody IncidentReportDto reportDto
    ) throws IOException {
        IncidentReportDto createdReport = reportServices.createReport(reportDto);
        return new ResponseEntity<>(createdReport, HttpStatus.CREATED);
    }

    @GetMapping(path = "/getReports")
    public ResponseEntity<List<IncidentReportDto>> getAllReports(){
        List<IncidentReportDto> listofReports = reportServices.getAllReports();
        return new ResponseEntity<>(listofReports,HttpStatus.OK);
    }

    @GetMapping(path = "/getReport/{id}")
    public ResponseEntity<List<IncidentReportDto>> getReportForUser(
            @PathVariable("id") String id
    ){
        List<IncidentReportDto> listOfReports = reportServices.getReportsforUser(id);
        return new ResponseEntity<>(listOfReports,HttpStatus.OK);
    }

    @GetMapping(path = "/getReport")
    public ResponseEntity<List<IncidentReportDto>> getReportForCity(
            @RequestParam("city") String city
    ){
        List<IncidentReportDto> reportEntities = reportServices.getReportsbyCity(city);
        return new ResponseEntity<>(reportEntities,HttpStatus.OK);
    }

}
