import 'package:circuitslingers/models/Article.dart';
import 'package:http/http.dart' as http;
import 'dart:convert';

Future<void> submitDataToApi(
    String firstName,
    String lastName,
    String city,
    String password,
    String email,
    String state,
    String phone,
    String country) async {
  final Map<String, dynamic> payload = {
    "firstName": firstName,
    "lastName": lastName,
    "city": city,
    "password": password,
    "email": email,
    "state": state,
    "phone": phone,
    "country": country,
  };

  const String apiUrl = "YOUR_API_ENDPOINT_URL_HERE";

  try {
    final response = await http.post(
      Uri.parse(apiUrl),
      headers: {"Content-Type": "application/json"},
      body: json.encode(payload),
    );

    if (response.statusCode == 200) {
      print("Data submitted successfully!");
    } else {
      print("Failed to submit data. Status code: ${response.statusCode}");
    }
  } catch (e) {
    print("An error occurred: $e");
  }
}

Future<void> login(String email, String password) async {
  final Map<String, dynamic> credentials = {
    "email": email,
    "password": password,
  };

  const String apiUrl = "YOUR_LOGIN_API_ENDPOINT_URL_HERE";

  try {
    final response = await http.post(
      Uri.parse(apiUrl),
      headers: {"Content-Type": "application/json"},
      body: json.encode(credentials),
    );

    if (response.statusCode == 200) {
      print("Login successful!");
    } else {
      print("Login failed. Status code: ${response.statusCode}");
    }
  } catch (e) {
    print("An error occurred: $e");
  }
}


Future<List<Article>> fetchNewsArticles() async {
  // const country = 'in';
  // const apiKey = '0bc05e4fd0574e81aa4de8e8e1388d1d';
  const query = 'cybercrime in india';

  final url = Uri.parse(
      'https://newsapi.org/v2/everything?q=$query&language=en&apiKey=0bc05e4fd0574e81aa4de8e8e1388d1d');
  final response = await http.get(url);

//eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ0ZWphc3Rob3JhdDFAZ21haWwuY29tIiwiaWF0IjoxNzAzOTMyMDY0LCJleHAiOjE3MDM5MzM1MDR9.qq4FJJugT8ro2PL8Qm38d_P8Eslk5id9XqYIGesKLpA
  if (response.statusCode == 200) {
    final Map<String, dynamic> data = json.decode(response.body);

    final List<dynamic> articlesData = data['articles'];
    print(articlesData);
    final articles =
        articlesData.map((article) => Article.fromJson(article)).toList();

    return articles;
  } else {
    throw Exception('Failed to load news articles');
  }
}

