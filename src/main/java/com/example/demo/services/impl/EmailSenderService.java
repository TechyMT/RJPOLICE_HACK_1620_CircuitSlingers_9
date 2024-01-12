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
    public void sendCaseRegistrationEmail(String recipientEmail) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(recipientEmail);
        message.setSubject("Case Registration and eFIR Filing Notification");
        message.setText(buildCaseRegistrationEmailBody());

        mailSender.send(message);
    }
    private String buildCaseRegistrationEmailBody() {
        return
                "We hope this email finds you well.\n\n" +
                "This is to inform you that your case has been successfully registered . An Electronic First Information Report (eFIR) has been filed for the reported incident.\n\n" +
                "Our team is diligently reviewing the details of the case, and you will be kept informed of any developments. Please make sure to reference the provided Case Number in any future communication related to this incident.\n\n" +
                "We appreciate your cooperation in this matter. If you have any further questions or concerns, feel free to contact us .\n\n" +
                "Thank you for your understanding.\n\n" +
                "Sincerely,\n\n";
    }
    public void sendCaseUnderInvestigationEmail(String recipientEmail) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(recipientEmail);
        message.setSubject("Case Under Investigation Update");
        message.setText(buildCaseUnderInvestigationEmailBody());

        mailSender.send(message);
    }

    private String buildCaseUnderInvestigationEmailBody() {
        return
                "We hope this email finds you well.\n\n" +
                "This is to inform you that your case, is currently under investigation. Our team is diligently working to gather all necessary information and assess the situation thoroughly.\n\n" +
                "We understand the importance of resolving this matter, and we assure you that we are committed to providing updates on the progress of the investigation. Your patience and cooperation are highly appreciated.\n\n" +
                "If you have any additional information or concerns, please do not hesitate to reach out to us.\n\n" +
                "Thank you for your understanding.\n\n";
    }
    public void sendCaseCompletionEmail(String recipientEmail) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(recipientEmail);
        message.setSubject("Case Completion Notification");
        message.setText(buildCaseCompletionEmailBody());

        mailSender.send(message);
    }

    private String buildCaseCompletionEmailBody() {
        return
                "We hope this email finds you well.\n\n" +
                "We are pleased to inform you that your case with has been successfully completed. Our team has thoroughly investigated the matter, and the necessary actions have been taken.\n\n" +
                "If you have any additional questions or require further assistance, please feel free to contact us .\n\n" +
                "Thank you for your cooperation throughout this process.\n\n" +
                "Sincerely,\n\n";
    }
}
