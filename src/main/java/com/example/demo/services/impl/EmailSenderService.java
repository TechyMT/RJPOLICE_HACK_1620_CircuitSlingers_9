package com.example.demo.services.impl;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class EmailSenderService
{
    private final JavaMailSender mailSender;
    public void sendSimpleEmail(String toEmail,String body,String subject){
        SimpleMailMessage message = new SimpleMailMessage();
        message.setFrom("ameyasurana10@gmail.com");
        message.setText(body);
        message.setTo(toEmail);
        message.setSubject(subject);

        mailSender.send(message);
        System.out.println("mail Send");
    }
}
