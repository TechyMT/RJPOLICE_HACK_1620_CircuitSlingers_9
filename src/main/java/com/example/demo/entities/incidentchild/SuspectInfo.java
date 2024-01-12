package com.example.demo.entities.incidentchild;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class SuspectInfo {

    private String suspectBankName;
    private String suspectPhoneNumber;
    private String suspectAccountNumber;
}