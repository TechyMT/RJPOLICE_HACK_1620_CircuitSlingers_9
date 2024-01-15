import 'dart:convert';
import 'package:circuitslingers/models/constants.dart';
import 'package:circuitslingers/views/user_views/onboarding.dart';
import 'package:firebase_auth/firebase_auth.dart';
import 'package:get/get.dart';
import 'package:http/http.dart' as http;

import 'package:flutter/material.dart';
import 'package:shared_preferences/shared_preferences.dart';

class ChatPage extends StatefulWidget {
  @override
  _ChatPageState createState() => _ChatPageState();
}

class _ChatPageState extends State<ChatPage> {
  TextEditingController textController = TextEditingController();
  String response = "";
  bool isLoading = false;
  Future<void> sendQuery(String query) async {
    if (query.isNotEmpty) {
      setState(() {
        isLoading = true;
      });

      final url = 'http://27aa-34-90-180-201.ngrok-free.app/get/$query';

      final response = await http.get(Uri.parse(url));

      if (response.statusCode == 200) {
        final data = json.decode(response.body);
        final generatedText = data['Response'];

        setState(() {
          isLoading = false;
          this.response = generatedText;
          textController.text = '';
        });
      } else {
        print(response.statusCode);
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
              Get.offAll(() => OnBoarding());
            },
            icon: const Icon(Icons.logout),
          ),
        ],
      ),
      body: SingleChildScrollView(
        child: Padding(
          padding: const EdgeInsets.all(16.0),
          child: Column(
            children: <Widget>[
              TextField(
                controller: textController,
                decoration: const InputDecoration(
                  hintText: 'Enter your query...',
                ),
              ),
              const SizedBox(height: 16.0),
              ElevatedButton(
                onPressed: () async {
                  await sendQuery(textController.text);
                },
                child: const Text('Get Answer'),
              ),
              const SizedBox(height: 16.0),
              if (isLoading)
                const CircularProgressIndicator()
              else if (response.isNotEmpty)
                Text(
                  response,
                  style: const TextStyle(fontSize: 16.0, color: Colors.black),
                ),
            ],
          ),
        ),
      ),
    );
  }
}
