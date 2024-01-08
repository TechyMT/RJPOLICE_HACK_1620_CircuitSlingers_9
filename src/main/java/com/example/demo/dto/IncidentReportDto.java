package com.example.demo.dto;

import com.example.demo.entities.Questionnaire;
import com.example.demo.entities.UserEntity;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.mongodb.core.mapping.DBRef;

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

    @NotBlank(message = "City has to be entered")
    private String city;

    @NotNull(message = "This is a required field")
    @JsonProperty("isBankAccInvolved")
    private boolean isBankAccInvolved;

    @NotBlank(message = "Required Field")
    private String category;

    private String transaction;

    private String suspectPhoneNumber;

    private String suspectAccDetails;

    @NotBlank(message = "Error Detected")
    private String recipientToken;

    private String onlineAccountInformation;

    private List<Questionnaire> questionnaire;

    private Integer trackId;

}