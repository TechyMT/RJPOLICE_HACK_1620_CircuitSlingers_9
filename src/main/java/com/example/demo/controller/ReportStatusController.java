package com.example.demo.controller;

import com.example.demo.dto.IncidentReportDto;
import com.example.demo.dto.ReportStatusDto;
import com.example.demo.entities.ReportStatusEntity;
import com.example.demo.services.ReportStatusServices;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping(path = "/api/admin")
public class ReportStatusController {
    private final ReportStatusServices reportStatusServices;

    @PatchMapping(path = "/update")
    public ResponseEntity<ReportStatusDto> updateReport(
            @RequestBody ReportStatusDto reportStatusDto
    ){
        ReportStatusDto updatedReportStatus = reportStatusServices.updateReportStatus(reportStatusDto);
        return new ResponseEntity<>(updatedReportStatus, HttpStatus.OK);
    }

    @GetMapping(path = "/allStatus")
    public ResponseEntity<List<ReportStatusDto>> getAllStatuses(){
        List<ReportStatusDto> allReports = reportStatusServices.getAllReports();
        return new ResponseEntity<>(allReports,HttpStatus.OK);
    }

    @GetMapping(path = "/status/{track_id}")
    public ResponseEntity<IncidentReportDto> getReportForTrack(
            @PathVariable("track_id") Integer track
    ){
        IncidentReportDto reportDto = reportStatusServices.getSingleReport(track);
        return new ResponseEntity<>(reportDto,HttpStatus.OK);
    }

    @GetMapping(path = "/reports/{user_id}")
    public ResponseEntity<List<ReportStatusDto>> getReportForUser(
            @PathVariable("user_id") String id
    ){
        List<ReportStatusDto> statusDtoList = reportStatusServices.getReportsById(id);
        return  new ResponseEntity<>(statusDtoList,HttpStatus.OK);
    }
}
