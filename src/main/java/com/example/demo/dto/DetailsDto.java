package com.example.demo.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class DetailsDto {
    private Integer totalCases;

    private Integer pending;

    private Integer completed;

    private Integer countByCities;

    private double percentageCompleted;

    private double percentagePending;
}
