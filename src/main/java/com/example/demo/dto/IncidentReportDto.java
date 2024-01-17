package com.example.demo.dto;

import com.example.demo.entities.incidentchild.Questionnaire;
import com.example.demo.entities.incidentchild.SuspectInfo;
import com.example.demo.entities.incidentchild.UserAccountInfo;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Pattern;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class IncidentReportDto {

    private String userIdentification;

    @NotBlank(message = "Full name cannot be blank")
    private String fullName;

    @NotBlank(message = "Date of birth cannot be blank")
    private String dateOfBirth;

    @NotBlank(message = "Aadhar number cannot be blank")
    @Pattern(regexp = "\\d{12}", message = "Invalid Aadhar number format")
    private String aadharNumber;

    @NotBlank(message = "Incident description cannot be blank")
    private String incidentDescription;

    @NotBlank(message = "This cannot be empty")
    private String dateOfCrime;

    private String dateOfReport;

    private String phoneNumber;

    private String email;

    private String analysisMaterial;

    private List<String> evidencesURL;

    @NotBlank(message = "City has to be entered")
    private String city;

    @NotNull(message = "This is a required field")
    @JsonProperty("isBankAccInvolved")
    private boolean isBankAccInvolved;

    private String pincode;

    private UserAccountInfo userAccountInfo;

    private SuspectInfo suspectInfo;

    private String category;
    private String recipientToken;

    private List<Questionnaire> questionnaire;

    private Integer trackId;

}
