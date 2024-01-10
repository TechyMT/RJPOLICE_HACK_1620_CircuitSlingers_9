package com.example.demo.entities;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserAccountInfo {
    private String amountLost;
    private String bankName;
    private String dateOfTransaction;
    private String transaction;
    private String accountNumber;
}
