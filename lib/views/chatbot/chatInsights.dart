import 'dart:convert';
import 'package:circuitslingers/models/constants.dart';
import 'package:circuitslingers/views/register_login/landingpage.dart';
import 'package:firebase_auth/firebase_auth.dart';
import 'package:get/get.dart';
import 'package:http/http.dart' as http;

import 'package:flutter/material.dart';
import 'package:shared_preferences/shared_preferences.dart';

class ChatInsights extends StatefulWidget {
  @override
  _ChatPageState createState() => _ChatPageState();
}

class _ChatPageState extends State<ChatInsights> {
  TextEditingController textController = TextEditingController();
  String response = "";
  bool isLoading = false;

  Future<void> sendQuery(String text) async {
    print("hello");
    if (text.isNotEmpty) {
      setState(() {
        isLoading = true;
      });

      final url = 'http://b027-34-16-160-76.ngrok-free.app/get';
      final Map<String, String> body = {'query': text};
      print(body);
      try {
        print("Before HTTP POST");
        final response = await http.post(
          Uri.parse(url),
          headers: {'Content-Type': 'application/json'},
          body: jsonEncode(body),
        );
        print("After HTTP POST");
      } catch (error) {
        print("Error: $error");
        setState(() {
          isLoading = false;
          this.response = "Error: Unable to fetch data";
        });
      }
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        flexibleSpace: Container(
          decoration: const BoxDecoration(
            color: Color(0xFF080460),
          ),
        ),
        leading: Builder(builder: (BuildContext context) {
          return IconButton(
            iconSize: 30,
            onPressed: () {
              Scaffold.of(context).openDrawer();
            },
            icon: const Icon(
              Icons.menu,
              color: Colors.white,
            ),
          );
        }),
        title: Row(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            Image.asset("assets/cyber.png", height: 60, width: 50),
            const SizedBox(
              width: 20,
            ),
            const Text(
              "Dial 1930",
              style: TextStyle(fontSize: 25, color: Colors.white),
            ),
          ],
        ),
        actions: [
          IconButton(
            iconSize: 40,
            color: Colors.white,
            onPressed: () async {
              await FirebaseAuth.instance.signOut();
              SharedPreferences sharedPreferences =
                  await SharedPreferences.getInstance();
              sharedPreferences.clear();
              Get.offAll(() => const LandingPage());
            },
            icon: const Icon(Icons.account_circle),
          ),
        ],
      ),
      body: Column(
        children: <Widget>[
          Expanded(
            child: SingleChildScrollView(
              child: Padding(
                padding: const EdgeInsets.all(16.0),
                child: Column(
                  children: <Widget>[
                    if (response.isNotEmpty)
                      Text(
                        response,
                        style: const TextStyle(
                            fontSize: 16.0, color: Colors.black),
                      ),
                  ],
                ),
              ),
            ),
          ),
          Container(
            padding: const EdgeInsets.all(16.0),
            child: Row(
              children: <Widget>[
                Expanded(
                  child: TextField(
                    controller: textController,
                    decoration: const InputDecoration(
                      hintText: 'Enter your query...',
                    ),
                  ),
                ),
                const SizedBox(width: 16.0),
                ElevatedButton(
                  onPressed: isLoading
                      ? null
                      : () async {
                          await sendQuery(textController.text);
                        },
                  child: const Text('Get Answer'),
                ),
              ],
            ),
          ),
          if (isLoading) const CircularProgressIndicator(),
        ],
      ),
    );
  }
}