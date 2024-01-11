package com.example.demo.entities.fraudlent;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "fraudulent_acc_numbers")
public class FraudAccNumbers {

    @Id
    private String id;

    private String accountNumber;
}
