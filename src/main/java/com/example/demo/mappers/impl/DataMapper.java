package com.example.demo.mappers.impl;

import com.example.demo.dto.IncidentReportDto;
import org.springframework.stereotype.Service;
import org.thymeleaf.context.Context;

@Service
public class DataMapper {

    public Context setData(IncidentReportDto incidentReportDto){
        Context context = new Context();

        // Add data to the Thymeleaf context
        context.setVariable("fullName", incidentReportDto.getFullName());
        context.setVariable("dateOfBirth", incidentReportDto.getDateOfBirth());
        context.setVariable("phoneNumber", incidentReportDto.getPhoneNumber());
        context.setVariable("aadharNumber", incidentReportDto.getAadharNumber());

        context.setVariable("dateOfCrime", incidentReportDto.getDateOfCrime());
        context.setVariable("dateOfReport", incidentReportDto.getDateOfReport());
        context.setVariable("pincode", incidentReportDto.getPincode());
        context.setVariable("bankAccInvolved", incidentReportDto.isBankAccInvolved());
        context.setVariable("incidentDescription", incidentReportDto.getIncidentDescription());
        context.setVariable("category", incidentReportDto.getCategory());

        context.setVariable("evidencesURL", incidentReportDto.getEvidencesURL());
        context.setVariable("city", incidentReportDto.getCity());
        return context;
    }
}
