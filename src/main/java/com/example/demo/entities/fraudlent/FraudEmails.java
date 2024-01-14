package com.example.demo.entities.fraudlent;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "fraudulent_mails")
public class FraudEmails {

    @Id
    private String id;
    private String email;

    private Integer reportCount;

}
