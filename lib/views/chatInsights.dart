import 'dart:convert';
import 'package:http/http.dart' as http;

import 'package:flutter/material.dart';

class ChatInsights extends StatefulWidget {
  @override
  _ChatPageState createState() => _ChatPageState();
}

class _ChatPageState extends State<ChatInsights> {
  TextEditingController textController = TextEditingController();
  String response = "";
  bool isLoading = false;
  Future<void> sendQuery(String query) async {
    if (query.isNotEmpty) {
      setState(() {
        isLoading = true;
      });

      final url = 'http://a61b-35-222-231-104.ngrok-free.app/get/$query';

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
        title: const Text('Get your Insights'),
        centerTitle: true,
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
