import 'package:circuitslingers/controller/ReportStatusController.dart';
import 'package:circuitslingers/controller/detailsController.dart';
import 'package:circuitslingers/controller/functionController.dart';
import 'package:circuitslingers/models/Article.dart';
import 'package:circuitslingers/models/ReportData.dart';
import 'package:circuitslingers/models/ReportStatus.dart';
import 'package:circuitslingers/models/questionnaire.dart';
import 'package:firebase_auth/firebase_auth.dart';
import 'package:firebase_core/firebase_core.dart';
import 'package:get/get.dart';
import 'package:http/http.dart' as http;
import 'dart:convert';
import 'package:intl/intl.dart';

import 'package:shared_preferences/shared_preferences.dart';

// Future<List<Article>> fetchNewsArticles() async {
//   // const country = 'in';
//   // const apiKey = '0bc05e4fd0574e81aa4de8e8e1388d1d';
//   const query = 'cybercrime in india';

//   final url = Uri.parse(
//       'https://newsapi.org/v2/everything?q=$query&language=en&apiKey=0bc05e4fd0574e81aa4de8e8e1388d1d');
//   final response = await http.get(url);
//   if (response.statusCode == 200) {
//     final Map<String, dynamic> data = json.decode(response.body);

//     final List<dynamic> articlesData = data['articles'];
//     final articles =
//         articlesData.map((article) => Article.fromJson(article)).toList();
//     return articles;
//   } else {
//     throw Exception('Failed to load news articles');
//   }
// }

Future<void> fetchData() async {
  final url = 'http://192.168.137.1:8080/api/admin/status/715';

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
    final url = 'http://192.168.137.1:8080/api/add';
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
    if (response.statusCode == 200) {
      print('API call failed with status code: ${response.statusCode}');
    } else {
      print('User not authenticated.');
    }
  }
}

Future<void> updateUser() async {
  User? user = FirebaseAuth.instance.currentUser;
  if (user != null) {
    final url = 'http://192.168.137.1:8080/api/update';
    final headers = {'Content-Type': 'application/json'};

    final userData = {'userUID': user.uid, 'emailVerified': true};

    final response = await http.post(Uri.parse(url),
        headers: headers, body: jsonEncode(userData));

    if (response.statusCode == 200) {
      print('Ok');
    } else {
      print('Not Ok');
    }
  }
}

Future<void> fetchQuestions(String description) async {
  final FunctionController functionController = Get.put(FunctionController());
  final url =
      Uri.parse("http://192.168.137.1:8080/api/report/generateQuestions");
  try {
    functionController.isLoading.value = true;
    final response = await http.post(
      url,
      body: jsonEncode({'description': description}),
      headers: {"Content-Type": "application/json"},
    );
    print(response.body);
    if (response.statusCode == 200) {
      print(response.statusCode);
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

Future<int> submitReport() async {
  final DetailsController controller = Get.put(DetailsController());
  final FunctionController functionController = Get.put(FunctionController());
  const url = 'http://192.168.137.1:8080/api/report/add';
  SharedPreferences sharedPreferences = await SharedPreferences.getInstance();
  String? uid = sharedPreferences.getString('userId');
  String? token = sharedPreferences.getString('recipientToken');

  final Map<String, dynamic> userAccInfo = {
    "amountLost": controller.amountLostController.text,
    "bankName": controller.userBankNameController.text,
    "dateOfTransaction": controller.dateOfTransactionController.text,
    "transaction": controller.transactionIdController.text,
    "accountNumber": controller.onlineAccountInformationController.text,
  };
  final Map<String, dynamic> suspectInfo = {
    "suspectBankName": controller.suspectBankNameController.text,
    "suspectPhoneNumber": controller.suspectNumberController.text,
    "suspectAccountNumber": controller.suspectAccController.text,
  };
  final now = DateTime.now();
  final formatter = DateFormat('dd-MM-yyyy');
  String date = formatter.format(now);

  final Map<String, dynamic> requestBody = {
    "userIdentification": uid,
    "fullName": controller.fullNameController.text,
    "recipientToken": token,
    "dateOfBirth": controller.dateOfBirthController.text,
    "aadharNumber": controller.aadharNumberController.text,
    "incidentDescription": controller.incidentDescriptionController.text,
    "pincode": controller.pincodeController.text,
    "suspectInfo": suspectInfo,
    "email": controller.emailController.text,
    "phoneNumber":controller.phoneNumberController.text,
    "userAccountInfo": userAccInfo,
    "evidencesURL": controller.evidenceURLs,
    "analysisMaterial": controller.messageorEmailController.text,
    "dateOfReport": date,
    "dateOfCrime": controller.dateOfCrimeController.text,
    "city": controller.cityController.text,
    "isBankAccInvolved": controller.isBankAccInvolved,
    "category": controller.categoryController.text,
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
    final Map<String, dynamic> responseData = jsonDecode(response.body);
    var track_id = responseData['trackId'];
    return track_id;
  } else {
    print('Error: ${response.statusCode}');
    print(response.body);
    throw Exception('Failed to submit report');
  }
}

Future<List<ReportStatusDto>> fetchReportStatusList() async {
  // final ReportStatusController reportStatusController = Get.find();
  SharedPreferences sharedPreferences = await SharedPreferences.getInstance();
  String? uid = sharedPreferences.getString('userId');
  final response = await http
      .get(Uri.parse('http://192.168.137.1:8080/api/admin/reports/$uid'));

  if (response.statusCode == 200) {
    List<dynamic> jsonList = json.decode(response.body);
    List<ReportStatusDto> reportList =
        jsonList.map((json) => ReportStatusDto.fromJson(json)).toList();
    return reportList;
  } else {
    print(response.statusCode);
    throw Exception('Failed to load report status list');
  }
}

// Future<ReportData> getReportData(int trackId) async {
//   final response = await http
//       .get(Uri.parse('http://192.168.181.81:8080/api/admin/status/$trackId'));

//   if (response.statusCode == 200) {
//     return welcomeFromJson(response.body);
//   } else {
//     throw Exception('Failed to load report data');
//   }
// }

Future<void> checkEmail(String email) async {
  final ReportStatusController controller = Get.put(ReportStatusController());
  final response = await http.get(
      Uri.parse('http://192.168.137.1:8080/api/fraud_search/emails/$email'));
  controller.isEmailchecked.value = true;
  if (response.statusCode == 200) {
    Map<String, dynamic> jsonResponse = json.decode(response.body);
    if (jsonResponse.containsKey('isFraud') && jsonResponse['isFraud'] == 1) {
      controller.setPhishingText('Phishing Email');
    } else {
      controller.setPhishingText(
          "No suspicious activity found . \nReport if you think it's suspicious");
    }
    print(response.statusCode);
  } else {
    print(response.statusCode);
    throw Exception('Failed to Load Data');
  }
}

Future<void> reportEmail(String email) async {
  final ReportStatusController reportStatusController =
      Get.put(ReportStatusController());
  final url =
      Uri.parse('http://192.168.137.1:8080/api/fraud_search/reportEmail');

  final response = await http.post(
    url,
    body: jsonEncode({'email': email}),
    headers: {"Content-Type": "application/json"},
  );

  if (response.statusCode == 200) {
    reportStatusController.isEmailchecked.value = false;
    print(response.body);
    Map<String, dynamic> mpp = json.decode(response.body);
    reportStatusController.reportEmailText.value = mpp["message"];
  } else {
    print('Error');
  }
}

Future<void> checkPhoneNumber(String phoneNumber) async {
  final ReportStatusController controller = Get.put(ReportStatusController());
  final response = await http.get(Uri.parse(
      'http://192.168.137.1:8080/api/fraud_search/numbers/$phoneNumber'));
  controller.isPhoneNumberChecked.value = true;
  if (response.statusCode == 200) {
    Map<String, dynamic> jsonResponse = json.decode(response.body);

    if (jsonResponse.containsKey('isFraud') && jsonResponse['isFraud'] == 1) {
      controller.setPhoneNumberPhishingText('Phishing Phone Number');
    } else {
      controller.setPhoneNumberPhishingText(
          "No suspicious activity found . \nReport if you think it's suspicious");
    }

    print(response.statusCode);
  } else {
    print(response.statusCode);
    throw Exception('Failed to Load Data');
  }
}

Future<void> reportPhone(String phone) async {
  final ReportStatusController reportStatusController =
      Get.put(ReportStatusController());
  final url =
      Uri.parse('http://192.168.137.1:8080/api/fraud_search/reportPhoneNumber');

  final response = await http.post(
    url,
    body: jsonEncode({'phoneNumber': phone}),
    headers: {"Content-Type": "application/json"},
  );

  if (response.statusCode == 200) {
    reportStatusController.isPhoneNumberChecked.value = false;
    print(response.body);
    Map<String, dynamic> mpp = json.decode(response.body);
    reportStatusController.reportPhoneNumberText.value = mpp["message"];
  } else {
    print('Error');
  }
}

Future<void> checkAccountNumber(String accountNumber) async {
  final ReportStatusController controller = Get.put(ReportStatusController());
  final response = await http.get(Uri.parse(
      'http://192.168.137.1:8080/api/fraud_search/accNumbers/$accountNumber'));
  controller.isAccountNumberChecked.value = true;
  if (response.statusCode == 200) {
    Map<String, dynamic> jsonResponse = json.decode(response.body);

    if (jsonResponse.containsKey('isFraud') && jsonResponse['isFraud'] == 1) {
      controller.setAccountNumberPhishingText('Phishing Account Number');
    } else {
      controller.setAccountNumberPhishingText(
          "No suspicious activity found . \nReport if you think it's suspicious");
    }

    print(response.statusCode);
  } else {
    print(response.statusCode);
    throw Exception('Failed to Load Data');
  }
}

Future<void> reportAccNumber(String accNumber) async {
  final ReportStatusController reportStatusController =
      Get.put(ReportStatusController());
  final url =
      Uri.parse('http://192.168.137.1:8080/api/fraud_search/reportAccNumber');

  final response = await http.post(
    url,
    body: jsonEncode({'accountNumber': accNumber}),
    headers: {"Content-Type": "application/json"},
  );

  if (response.statusCode == 200) {
    reportStatusController.isPhoneNumberChecked.value = false;
    print(response.body);
    Map<String, dynamic> mpp = json.decode(response.body);
    reportStatusController.reportPhoneNumberText.value = mpp["message"];
  } else {
    print('Error');
  }
}

Future<void> giveSuggestions(int trackId) async {
  final DetailsController controller = Get.put(DetailsController());
  final url = Uri.parse('http://192.168.137.1:8080/api/report/getInformation');

  final response = await http.post(
    url,
    headers: {
      "Content-Type": "application/json",
    },
    body: jsonEncode({
      'trackId': trackId,
      'description': controller.incidentDescriptionController.text,
      'category': controller.categoryController.text
    }),
  );

  if (response.statusCode == 200) {
    print(response.body);
  } else {
    print('Error');
  }
}

Future<void> makePostRequest() async {
  final DetailsController detailsController = Get.put(DetailsController());
  final String url = "http://192.168.137.1:8080/api/admin/getAnalysis";

  Map<String, String> requestBody = {
    "message": detailsController.messageorEmailController.text,
    "reportDate": detailsController.dateOfReportController.text,
  };

  try {
    final response = await http.post(
      Uri.parse(url),
      headers: {
        "Content-Type": "application/json",
      },
      body: jsonEncode(requestBody),
    );

    if (response.statusCode == 200) {
      print("POST request successful");
      print("Response: ${response.body}");
      // Handle the response as needed
    } else {
      print("POST request failed with status: ${response.statusCode}");
      print("Response: ${response.body}");
      // Handle the error
    }
  } catch (e) {
    print("Error making POST request: $e");
  }
}
