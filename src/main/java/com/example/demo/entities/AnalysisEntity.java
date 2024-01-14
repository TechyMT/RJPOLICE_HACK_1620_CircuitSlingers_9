package com.example.demo.entities;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "data_analytics")
public class AnalysisEntity {

    @Id
    private String id;

    private String message;

    private String category;

    private String analysis;

    private String reportDate;
}
