package com.example.demo.entities.incidentchild;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class Questionnaire {
    private String type;
    private String question;
    private String answer;
}
