package com.example.demo.entities.notifications;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;

@Data
@NoArgsConstructor
public class UpdateNotifications {

    private String recipientToken;

    private String body;

    private String title;

    public UpdateNotifications(String recipientToken,String body ,String title){
        this.body = body;
        this.title  = title;
        this.recipientToken = recipientToken;
    }
}
