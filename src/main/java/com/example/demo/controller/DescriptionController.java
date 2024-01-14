package com.example.demo.controller;


import com.example.demo.dto.SuggestionDto;
import com.example.demo.entities.incidentchild.Questionnaire;
import com.example.demo.entities.incidentchild.QuestionnaireList;
import com.example.demo.services.IncidentReportServices;
import com.fasterxml.jackson.core.JsonProcessingException;

import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;

import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("api/report/")
@RequiredArgsConstructor
public class DescriptionController {

    public RestTemplate restTemplate;
    public IncidentReportServices reportServices;

    private final ObjectMapper objectMapper;

    @PostMapping(path = "/submit")
    public ResponseEntity<String> submitQuestionnaire(@RequestBody List<Questionnaire> questionnaire) {
        return ResponseEntity.ok("Questionnaire submitted successfully");
    }

    @PostMapping(path = "/generateQuestions")
    public ResponseEntity<QuestionnaireList> generateDesc(
            @RequestBody String description
    ){
//        String urlAPI = "http://a03f-35-245-174-48.ngrok-free.app/home";
//        HttpHeaders headers = new HttpHeaders();
//        headers.setContentType(MediaType.APPLICATION_JSON);
//        HttpEntity<String> requestEntity = new HttpEntity<>(description, headers);
//        RestTemplate restTemplate = new RestTemplate();
//        ResponseEntity<String> output = restTemplate.postForEntity(urlAPI, requestEntity, String.class);
//              output = restTemplate.postForObject(urlAPI,description,String.class);
        String output = "  {\n" +
                "  \"questions\": [\n" +
                "    {\n" +
                "      \"question\": \"Can you describe the email you received from your bank, including any distinctive features or language used?\"\n" +
                "    },\n" +
                "    {\n" +
                "      \"question\": \"Did you notice any inconsistencies or red flags when reviewing the email?\"\n" +
                "    },\n" +
                "    {\n" +
                "      \"question\": \"How did you verify the authenticity of the email before providing your personal information?\"\n" +
                "    },\n" +
                "    {\n" +
                "      \"question\": \"Can you provide more details on the unauthorized transactions made on your account?\"\n" +
                "    },\n" +
                "    {\n" +
                "      \"question\": \"Have you experienced any other suspicious activity on your accounts since the initial incident?\"\n" +
                "    },\n" +
                "    {\n" +
                "      \"question\": \"What steps have you taken to protect your personal information and prevent similar incidents in the future?\"\n" +
                "    },\n" +
                "    {\n" +
                "      \"question\": \"Are there any additional details or concerns you would like to share regarding this incident?\"\n" +
                "}\n" +
                "]\n" +
                "}";
//        System.out.println(output.getBody());
//        try {
//            QuestionnaireList questionnaireList = objectMapper.readValue(output.getBody(), QuestionnaireList.class);
//            return ResponseEntity.ok(questionnaireList);
//        } catch (JsonProcessingException e) {
//            throw new RuntimeException(e);
//        }
        try {
            QuestionnaireList questionnaireList = objectMapper.readValue(output, QuestionnaireList.class);
            return ResponseEntity.ok(questionnaireList);
        } catch (JsonProcessingException e) {
            throw new RuntimeException(e);
        }

    }

    @PostMapping(path = "/getInformation")
    public ResponseEntity<String> getInformationOnCategoryAndDescription(
            @RequestBody SuggestionDto suggestionDto
            ){

//        HttpHeaders headers = new HttpHeaders();
//        headers.setContentType(MediaType.APPLICATION_JSON);
//        String urlAPI = "https://your-ngrok-url.com/api/generateDescription";
//        HttpEntity<SuggestionDto> requestEntity = new HttpEntity<>(suggestionDto, headers);
//        ResponseEntity<String> responseEntity = new RestTemplate().postForEntity(urlAPI, requestEntity, String.class);
//        String apiResponse = responseEntity.getBody();

        String output ="Step 1: Secure Your Account and Personal Information\n" +
                "\n" +
                "1.1.1 Immediately notify your bank about the incident and provide them with the necessary details to investigate and take action. This will help them identify and freeze any fraudulent accounts associated with your personal information.\n" +
                "\n" +
                "1.1.2 Change your bank's login credentials and update your multi-factor authentication (MFA) settings to further secure your account.\n" +
                "\n" +
                "1.1.3 Place a fraud alert on your credit reports to prevent any unauthorized usage of your personal information, such as opening new bank accounts or credit cards.\n" +
                "\n" +
                "1.1.4 Review your bank statements and transaction history to identify any suspicious activity. Notify your bank and report any unauthorized transactions to the relevant authorities.\n" +
                "\n" +
                "Step 2: Protect Your Digital Assets\n" +
                "\n" +
                "2.1.1 Update your devices' operating system and software to ensure you have the latest security patches and virus definitions.\n" +
                "\n" +
                "2.1.2 Use a robust antivirus program to scan your system for malware and vulnerabilities.\n" +
                "\n" +
                "2.1.3 Consider investing in cybersecurity software that offers enhanced protection for your digital assets, such as encryption tools or identity theft protection services.\n" +
                "\n" +
                "Step 3: Seek Legal Support\n" +
                "\n" +
                "3.1.1 Familiarize yourself with Indian laws and regulations regarding cybercrime, such as the Information Technology Act, 2000 (IT Act) and the Indian Penal Code. Understand your rights and options for seeking legal recourse.\n" +
                "\n" +
                "3.1.2 Consider consulting with a cybercrime lawyer who is knowledgeable about Indian laws and can provide personalized guidance on legal matters.\n" +
                "\n" +
                "Step 4: Monitor Your Personal Information\n" +
                "\n" +
                "4.1.1 Regularly check your credit reports and financial statements to detect any suspicious activity or unauthorized usage of your personal information.\n" +
                "\n" +
                "4.1.2 Monitor your bank accounts and credit cards for any unusual transactions, and report any discrepancies to the relevant authorities.\n" +
                "\n" +
                "4.1.3 Keep a close eye on your social media accounts and email addresses for any suspicious activity or phishing attempts.\n" +
                "\n" +
                "Additional Tips:\n" +
                "\n" +
                "* Document any correspondence or communication with the fraudsters, including screenshots and logs of their actions.\n" +
                "* Report the incident to the relevant authorities, such as the police or the Federal Bureau of Investigation (FBI).\n" +
                "* Consider joining a cybercrime support group to connect with others who have experienced similar situations.\n" +
                "\n" +
                "Remember, you're not alone in this fight. There are various resources available to help you recover from cyber fraud and protect your personal information. Please feel free to reach out to me if you have any further questions or concerns.\n" +
                "\n" +
                "---\n" +
                "\n" +
                "As an empathetic and capable AI assistant for the cyber police in India, I understand the gravity of the situation and am committed to providing personalized guidance to help you recover from the cyber fraud. Please feel free to reach out to me if you have any further questions or concerns, and I will do my best to assist you.";
        return new ResponseEntity<>(output, HttpStatus.OK);
    }

}
