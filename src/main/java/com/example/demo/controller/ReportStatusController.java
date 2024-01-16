package com.example.demo.controller;

import com.example.demo.dto.AnalyticsDto;
import com.example.demo.dto.DetailsDto;
import com.example.demo.dto.IncidentReportDto;
import com.example.demo.dto.ReportStatusDto;
import com.example.demo.entities.ReportStatusEntity;
import com.example.demo.services.AnalysisServices;
import com.example.demo.services.ReportStatusServices;
import com.example.demo.services.impl.EmailSenderService;
import com.fasterxml.jackson.core.JsonProcessingException;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequiredArgsConstructor

@RequestMapping(path = "/api/admin")
public class ReportStatusController {
    private final ReportStatusServices reportStatusServices;
    private final EmailSenderService senderService;
    private final AnalysisServices analysisServices;

    @CrossOrigin(origins = "http://localhost:5173")
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
    public ResponseEntity<ReportStatusDto> getReportForTrack(
            @PathVariable("track_id") Integer track
    ){
//        IncidentReportDto reportDto = reportStatusServices.getSingleReport(track);
        ReportStatusDto reportDto = reportStatusServices.findReportByTrack(track);
        return new ResponseEntity<>(reportDto,HttpStatus.OK);
    }

    @GetMapping(path = "/reports/{user_id}")
    public ResponseEntity<List<ReportStatusDto>> getReportForUser(
            @PathVariable("user_id") String id
    ){
        List<ReportStatusDto> statusDtoList = reportStatusServices.getReportsById(id);
        return  new ResponseEntity<>(statusDtoList,HttpStatus.OK);
    }


    @GetMapping(path = "/allDetails")
    public ResponseEntity<DetailsDto> getDetails(
            @RequestParam("city") String city
    ){
        DetailsDto details = reportStatusServices.getAllDetails(city);
        return new ResponseEntity<>(details,HttpStatus.OK);
    }

    @GetMapping(path = "/all")
    public ResponseEntity< List<Map<String, Object>>> getDetails(
    ){
        List<Map<String, Object>> details = reportStatusServices.processData();
        return new ResponseEntity<>(details,HttpStatus.OK);
    }

    @GetMapping(path = "/chart-data")
    public Map<String,Object> getChartData(){
         final Map<String, Object> initialData = Map.of(
                "month", Map.of(
                        "series", List.of(
                                Map.of("name", "Pending", "data", List.of(23, 11, 22, 27, 13, 22, 37, 21, 44, 22, 30, 45)),
                                Map.of("name", "Completed", "data", List.of(30, 25, 36, 30, 45, 35, 64, 52, 59, 36, 39, 51))
                        ),
                        "categories", List.of(
                                "Sep", "Oct", "Nov", "Dec", "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug"
                        )
                ),
                "week", Map.of(
                        "series",List.of(
                                Map.of("name","Pending","data",List.of(10, 15, 8, 20, 18, 12, 15)),
                                 Map.of("name", "Completed", "data",List.of(8, 12, 10, 18, 15, 9, 13))
                         ),
                         "categories",List.of("Week 1",
                                 "Week 2",
                                 "Week 3",
                                 "Week 4",
                                 "Week 5",
                                 "Week 6",
                                 "Week 7"
                                 )
                ),
                "day", Map.of(
                         "series",List.of(
                                 Map.of("name","Pending","data",List.of(5, 3, 7, 6, 8, 4, 9, 5, 6, 7, 4, 6, 8, 10, 12,45,13)),
                                 Map.of("name", "Completed", "data",List.of(4, 6, 5, 8, 7, 3, 6, 4, 5, 6, 3, 5, 7, 9, 10,12,23))
                         ),
                         "categories",List.of( "Day 1", "Day 2", "Day 3", "Day 4", "Day 5", "Day 6", "Day 7",
                                 "Day 8", "Day 9", "Day 10", "Day 11", "Day 12", "Day 13", "Day 14", "Day 15","Day 16","Day 17"
                         )
                         )
        );
    return initialData;

}
    @PostMapping(path = "/assignCase")
    public ResponseEntity<Map<String,String>> assignCase(@RequestBody Map<String, Object> requestBody) {
        String policePersonnel = (String) requestBody.get("policePersonnel");
        String recipientEmail = (String) requestBody.get("email");
        Integer id = (Integer) requestBody.get("trackId");
        String url = (String) requestBody.get("reportURL");
        senderService.sendPoliceAssignEmail(recipientEmail, policePersonnel, id, url);
        Map<String, String> resultMap = new HashMap<>();
        resultMap.put("success", "Case Assigned");
        return new ResponseEntity<>(resultMap, HttpStatus.OK);
    }

    @PostMapping(path = "/getAnalysis")
    public ResponseEntity<AnalyticsDto> getMessageAndDate(
            @RequestBody AnalyticsDto analyticsDto
    ) throws JsonProcessingException {
        System.out.println("HEELO");
        AnalyticsDto createdDto = analysisServices.createAnalysis(analyticsDto);
        return new ResponseEntity<>(createdDto,HttpStatus.OK);
    }

    @GetMapping(path = "/getAllAnalysis")
    public ResponseEntity<List<AnalyticsDto>> getAll(){
        List<AnalyticsDto> alldata = analysisServices.getAllAnalytics();
        return new ResponseEntity<>(alldata,HttpStatus.OK);
    }

    @GetMapping(path = "/getSortedReports")
    public ResponseEntity<Map<String,List<ReportStatusDto>>> getSortedReports(){
        Map<String,List<ReportStatusDto>>  sortedReports = reportStatusServices.sortReportByDates();
        return new ResponseEntity<>(sortedReports,HttpStatus.OK);
    }

}