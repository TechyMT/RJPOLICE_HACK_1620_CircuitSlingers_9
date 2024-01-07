package com.example.demo.services.impl;

import com.example.demo.entities.FIRClass;
import com.example.demo.entities.Notifications;
import com.google.firebase.messaging.FirebaseMessaging;
import com.google.firebase.messaging.FirebaseMessagingException;
import com.google.firebase.messaging.Message;
import com.google.firebase.messaging.Notification;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class FirebaseMessagingService {

    @Autowired
    private FirebaseMessaging firebaseMessaging;

    public String sendNotificationByToken(Notifications notifications) {
        Notification notification = Notification.builder()
                .setTitle(notifications.getTitle())
                .setBody(notifications.getBody())
                .build();

        Message message = Message.builder()
                .setToken(notifications.getRecipientToken())
                .setNotification(notification)
                .build();
        System.out.println("Sent");
        System.out.println(notifications.getRecipientToken());
        System.out.println(notifications.getBody());
        System.out.println(notifications.getTitle());
        try{
            firebaseMessaging.send(message);
            return "Success ";
        }catch (FirebaseMessagingException e){
            e.printStackTrace();
            return "ERROR";
        }
    }

    public void sendFIRnotification(FIRClass firClass){
        Notification notification  = Notification.builder()
                .setBody(firClass.getBody())
                .setTitle(firClass.getTitle())
                .build();
        Message message = Message.builder()
                .setToken(firClass.getRecipientToken())
                .setNotification(notification)
                .build();
        try{
            firebaseMessaging.send(message);
        }catch (FirebaseMessagingException e){
            e.printStackTrace();
        }
    }
}
