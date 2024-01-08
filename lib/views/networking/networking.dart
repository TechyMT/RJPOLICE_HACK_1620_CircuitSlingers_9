import 'package:circuitslingers/controller/detailsController.dart';
import 'package:circuitslingers/controller/functionController.dart';
import 'package:circuitslingers/models/Article.dart';
import 'package:circuitslingers/models/questionnaire.dart';
import 'package:firebase_auth/firebase_auth.dart';
import 'package:get/get.dart';
import 'package:http/http.dart' as http;
import 'dart:convert';

import 'package:shared_preferences/shared_preferences.dart';

Future<List<Article>> fetchNewsArticles() async {
  // const country = 'in';
  // const apiKey = '0bc05e4fd0574e81aa4de8e8e1388d1d';
  const query = 'cybercrime in india';

  final url = Uri.parse(
      'https://newsapi.org/v2/everything?q=$query&language=en&apiKey=0bc05e4fd0574e81aa4de8e8e1388d1d');
  final response = await http.get(url);
  if (response.statusCode == 200) {
    final Map<String, dynamic> data = json.decode(response.body);

    final List<dynamic> articlesData = data['articles'];
    final articles =
        articlesData.map((article) => Article.fromJson(article)).toList();
    return articles;
  } else {
    throw Exception('Failed to load news articles');
  }
}

Future<void> fetchData() async {
  final url = 'http://192.168.1.4:8080/api/admin/status/715';

  try {
    final response = await http.get(Uri.parse(url));
    if (response.statusCode != 200) {
      print('Error: ${response.statusCode}');
    }
  } catch (e) {
    print('Exception: $e');
  }
}

Future<void> createUser() async {
  User? user = FirebaseAuth.instance.currentUser;

  if (user != null) {
    final url = 'http://192.168.1.4:8080/api/add';
    final headers = {'Content-Type': 'application/json'};

    final userData = {
      'userUID': user.uid,
      'email': user.email,
      'phoneNumber': user.phoneNumber ?? '',
      'emailVerified': user.emailVerified,
      'creationTime': user.metadata.creationTime.toString(),
      'lastSignInTime': user.metadata.lastSignInTime.toString(),
    };
    final response = await http.post(
      Uri.parse(url),
      headers: headers,
      body: jsonEncode(userData),
    );
    if (response.statusCode != 200) {
      print('API call failed with status code: ${response.statusCode}');
    } else {
      print('User not authenticated.');
    }
  }
}

Future<void> fetchQuestions(String description) async {
  final FunctionController functionController = Get.put(FunctionController());
  final url = Uri.parse("http://192.168.1.5:8080/api/report/generateQuestions");
  try {
    functionController.isLoading.value = true;
    final response = await http.post(
      url,
      body: jsonEncode({'description': description}),
      headers: {"Content-Type": "application/json"},
    );

    if (response.statusCode == 200) {
      functionController.questionnaireList(
          QuestionnaireList.fromJson(json.decode(response.body)));
      functionController.answerQuestions.value = true;
    } else {
      throw Exception('Failed to load questions');
    }
  } finally {
    functionController.isLoading.value = false;
  }
}

Future<void> submitReport() async {
  final DetailsController controller = Get.put(DetailsController());
  final FunctionController functionController = Get.put(FunctionController());
  const url = 'http://192.168.1.5:8080/api/report/add';
  SharedPreferences sharedPreferences = await SharedPreferences.getInstance();
  String? uid = sharedPreferences.getString('userId');
  String? token = sharedPreferences.getString('recipientToken');
  final Map<String, dynamic> requestBody = {
    "userId": uid,
    "fullName": controller.fullNameController.text,
    "recipientToken": token,
    "dateOfBirth": controller.dateOfBirthController.text,
    "aadharNumber": controller.aadharNumberController.text,
    "incidentDescription": controller.incidentDescriptionController.text,
    "isBankAccInvolved": controller.isBankAccInvolved,
    "digitalEvidenceUrl": 'Links will be provided',
    "onlineAccountInformation":
        controller.onlineAccountInformationController.text,
    "witnesses": null,
    "questionnaire": functionController.answersList,
  };

  final response = await http.post(
    Uri.parse(url),
    headers: <String, String>{
      'Content-Type': 'application/json; charset=UTF-8',
    },
    body: jsonEncode(requestBody),
  );

  if (response.statusCode == 201) {
    functionController.isReportSubmitted.value = true;
    print('Response: ${response.body}');
  } else {
    print('Error: ${response.statusCode}');
    print('Error Body: ${response.body}');
    throw Exception('Failed to submit report');
  }
}
