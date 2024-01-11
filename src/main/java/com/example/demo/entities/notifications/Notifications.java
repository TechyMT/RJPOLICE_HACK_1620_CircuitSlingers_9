package com.example.demo.entities.notifications;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Map;

@Data
@AllArgsConstructor

public class Notifications {

    private String recipientToken;
    private String title;
    private String body;

    public Notifications(String recipientToken){
        this.recipientToken = recipientToken;
        this.title = "Bank Fraud Detected";
        this.body = "Everything is freezed for now ";
    }
}
