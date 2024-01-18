package com.example.demo.services.impl;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import java.util.Map;

@Service
@RequiredArgsConstructor
public class EmailSenderService
{
    private final JavaMailSender mailSender;
    public void sendCaseRegistrationCompletionEmail(String recipientEmail, Integer caseNumber, String reportURL) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(recipientEmail);
        message.setSubject("Case Registration Completion Notification");
        message.setText(buildCaseRegistrationCompletionEmailBody(caseNumber, reportURL));

        mailSender.send(message);
    }
    private String buildCaseRegistrationCompletionEmailBody(Integer caseNumber,String reportURL) {
        return
                        "We trust this email finds you in good health.\n\n" +
                        "We are pleased to inform you that your case has been successfully registered.Below are the details:\n\n" +
                        "Case Number: " + caseNumber + "\n"
                         + "Report: "+reportURL+ "\n" +
                        "Our team is diligently reviewing the details of the case, and you will be kept informed of any developments. Please make sure to reference the provided Case Number in any future communication related to this incident.\n\n" +
                        "We appreciate your cooperation in this matter.Please check your app or website to check your current status and comments . If you have any further questions or concerns, feel free to contact us.\n\n" +
                        "Thank you for your understanding.\n\n" +
                        "Sincerely,\n\n";
    }
    public void sendEFIRFilingConfirmationEmail(String recipientEmail, Integer caseNumber) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(recipientEmail);
        message.setSubject("eFIR Filing Confirmation Notification");
        message.setText(buildEFIRFilingConfirmationEmailBody(caseNumber));

        mailSender.send(message);
    }

    private String buildEFIRFilingConfirmationEmailBody(Integer caseNumber) {
        return
                        "We hope this email finds you well.\n\n" +
                        "This is to confirm that an Electronic First Information Report (eFIR) has been successfully filed for the reported incident associated with Case Number: " + caseNumber + ".\n\n" +
                        "Our team is diligently reviewing the details of the case, and you will be kept informed of any developments. Please make sure to reference the provided Case Number in any future communication related to this incident.\n\n" +
                        "We appreciate your cooperation in this matter.Please check your app or website to check your current status and comments . If you have any further questions or concerns, feel free to contact us.\n\n" +
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
    public void sendPoliceAssignEmail(String recipientEmail, String assignedPersonnel, Integer caseId, String reportUrl) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(recipientEmail);
        message.setSubject("Police Assignment Notification");
        message.setText(assignCaseEmailBody(assignedPersonnel, caseId, reportUrl));

        mailSender.send(message);
    }
    private String assignCaseEmailBody(String assignedPersonnel,Integer caseId,String reportUrl) {
        return
                "Dear " + assignedPersonnel + ",\n\n" +
                        "I trust this message finds you well.\n\n" +
                        "I am writing to inform you that you have been assigned a new case for investigation. The details of the case are as follows:\n" +
                        "Case ID:"+caseId+ "\n" +
                        "Report: "+reportUrl+ "\n" +
                        "Your expertise and dedication are crucial in resolving this matter. We trust that you will handle it with the utmost professionalism and diligence.\n\n" +
                        "Should you have any questions or require further information, please feel free to reach out.\n\n" +
                        "Thank you for your continued commitment to maintaining law and order.\n\n";
    }
    public void sendAccountFreezeNotificationEmail(String recipientEmail,String accountNumber) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(recipientEmail);
        message.setSubject("Account Freeze Notification");
        message.setText(buildAccountFreezeNotificationEmail( accountNumber));

        mailSender.send(message);
    }
    private String buildAccountFreezeNotificationEmail( String accountNumber) {
        return
                        "We hope this message finds you well.\n\n" +
                        "We regret to inform you that due to certain circumstances, your bank account with the following details has been temporarily frozen or restricted:\n" +
                        "Account Number: " + accountNumber + "\n\n" +
                        "This action has been taken in accordance with our internal security protocols to safeguard your account and prevent any unauthorized activities.\n\n" +
                        "Please be assured that our team is actively working to resolve the issue, and you will be notified once the situation is rectified. In the meantime, we kindly request your cooperation and patience.\n\n" +
                        "If you believe this action is in error or if you have any concerns, please contact our customer support . Our representatives will be happy to assist you in resolving this matter.\n\n" +
                        "We apologize for any inconvenience this may cause and appreciate your understanding in this matter.\n\n" +
                        "Thank you for your cooperation.\n\n" ;
    }

    public String builtEmailNotification(String email){
        return
                "Dear " + email + ",\n" +
                        "\n" +
                        "To improve your experience, we recommend using our app or website for faster reporting. Due to high helpline traffic, these options offer quicker responses.\n" +
                        "\n" +
                        "Download the app or visit the website today at https://rjpolice.netlify.app/!";
    }

    public void sendEmailNotification(String recipientEmail){
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(recipientEmail);
        message.setSubject("Large Traffic on Call");
        message.setText(builtEmailNotification(recipientEmail));
        mailSender.send(message);
    }
    public void sendAmountRecoveredEmail(String recipientEmail, String amountRecovered) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(recipientEmail);
        message.setSubject("Amount Recovery Update");
        message.setText(buildAmountRecoveredEmailBody(amountRecovered));

        mailSender.send(message);
    }

    private String buildAmountRecoveredEmailBody(String amountRecovered) {
        return
                "Dear User,\n\n" +
                        "We are pleased to inform you that the amount frozen "+amountRecovered+"in relation to your case has been successfully recovered. The recovered funds are now being processed for refunding with the banks.\n\n" +
                        "Our team has worked diligently to resolve this matter, and we appreciate your cooperation throughout the process. We understand the impact this may have had on you, and we aim to expedite the refund process as efficiently as possible.\n\n" +
                        "Once the refund process is completed, you will receive further communication regarding the status and details of the refund. If you have any questions or concerns, feel free to reach out to us.\n\n" +
                        "Thank you for your patience and understanding.\n\n" +
                        "Sincerely,\n" +
                        "Law Enforcement Team";
    }


}
