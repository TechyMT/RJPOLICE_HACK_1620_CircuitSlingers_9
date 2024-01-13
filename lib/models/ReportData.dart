import 'dart:convert';


  // To parse this JSON data, do
//
//     final welcome = welcomeFromJson(jsonString);

ReportData welcomeFromJson(String str) => ReportData.fromJson(json.decode(str));

String welcomeToJson(ReportData data) => json.encode(data.toJson());

class ReportData {
    String userIdentification;
    String fullName;
    String dateOfBirth;
    String aadharNumber;
    String incidentDescription;
    String city;
    String category;
    String transaction;
    String suspectPhoneNumber;
    String suspectAccDetails;
    String recipientToken;
    String onlineAccountInformation;
    List<Questionnaire> questionnaire;
    int trackId;
    bool isBankAccInvolved;

    ReportData({
        required this.userIdentification,
        required this.fullName,
        required this.dateOfBirth,
        required this.aadharNumber,
        required this.incidentDescription,
        required this.city,
        required this.category,
        required this.transaction,
        required this.suspectPhoneNumber,
        required this.suspectAccDetails,
        required this.recipientToken,
        required this.onlineAccountInformation,
        required this.questionnaire,
        required this.trackId,
        required this.isBankAccInvolved,
    });

    factory ReportData.fromJson(Map<String, dynamic> json) => ReportData(
        userIdentification: json["userIdentification"],
        fullName: json["fullName"],
        dateOfBirth: json["dateOfBirth"],
        aadharNumber: json["aadharNumber"],
        incidentDescription: json["incidentDescription"],
        city: json["city"],
        category: json["category"],
        transaction: json["transaction"],
        suspectPhoneNumber: json["suspectPhoneNumber"],
        suspectAccDetails: json["suspectAccDetails"],
        recipientToken: json["recipientToken"],
        onlineAccountInformation: json["onlineAccountInformation"],
        questionnaire: List<Questionnaire>.from(json["questionnaire"].map((x) => Questionnaire.fromJson(x))),
        trackId: json["trackId"],
        isBankAccInvolved: json["isBankAccInvolved"],
    );

    Map<String, dynamic> toJson() => {
        "userIdentification": userIdentification,
        "fullName": fullName,
        "dateOfBirth": dateOfBirth,
        "aadharNumber": aadharNumber,
        "incidentDescription": incidentDescription,
        "city": city,
        "category": category,
        "transaction": transaction,
        "suspectPhoneNumber": suspectPhoneNumber,
        "suspectAccDetails": suspectAccDetails,
        "recipientToken": recipientToken,
        "onlineAccountInformation": onlineAccountInformation,
        "questionnaire": List<dynamic>.from(questionnaire.map((x) => x.toJson())),
        "trackId": trackId,
        "isBankAccInvolved": isBankAccInvolved,
    };
}

class Questionnaire {

    String question;
    String response;

    Questionnaire({
   
        required this.question,
        required this.response,
    });

    factory Questionnaire.fromJson(Map<String, dynamic> json) => Questionnaire(

        question: json["question"],
        response: json["response"],
    );

    Map<String, dynamic> toJson() => {

        "question": question,
        "respnse": response,
    };
}
