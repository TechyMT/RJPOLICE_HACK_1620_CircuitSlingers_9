package com.example.demo.entities.notifications;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;

@Data
@AllArgsConstructor
@RequiredArgsConstructor
public class FIRClass {

    private String recipientToken;

    private String body;

    private String title;

    public FIRClass(String recipientToken){
        this.recipientToken = recipientToken;
        this.title = "E-FIR filed";
        this.body = "An E-FIR has ben filed for the police";
    }
}
