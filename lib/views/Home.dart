import 'package:circuitslingers/controller/functionController.dart';
import 'package:circuitslingers/views/chatbot/chat.dart';
import 'package:circuitslingers/views/user_views/ApplicationStatus.dart';
import 'package:circuitslingers/views/user_views/Awareness.dart';
import 'package:circuitslingers/views/user_views/MainView.dart';
import 'package:circuitslingers/views/user_views/ReportCrime.dart';
import 'package:flutter/material.dart';
import 'package:get/get.dart';

class Home extends StatefulWidget {
  Home({super.key});

  @override
  State<Home> createState() => _HomeState();
}

class _HomeState extends State<Home> {
  int selectedIndex = 2;

  final FunctionController functionController = Get.put(FunctionController());

  @override
  Widget build(BuildContext context) {
    List<Widget> widgetOptions = <Widget>[
      const ReportCrime(),
      ApplicationStatus(),
      MainView(),
      FraudCheck(),
      ChatPage()
    ];

    void onItemTapped(int index) {
      setState(() {
        selectedIndex = index;
      });
    }

    return Scaffold(
      body: widgetOptions.elementAt(selectedIndex),
      bottomNavigationBar: SizedBox(
        height: MediaQuery.of(context).size.height * 0.09,
        child: BottomNavigationBar(
          type: BottomNavigationBarType.shifting,
          backgroundColor: const Color(0xFF0F0529),
          selectedItemColor: Color.fromARGB(255, 219, 11, 11),
          unselectedItemColor: Colors.white,
          items: const <BottomNavigationBarItem>[
            BottomNavigationBarItem(
              icon: Icon(Icons.text_snippet),
              label: 'Add Report',
              backgroundColor: Color(0xFF0F0529),
            ),
            BottomNavigationBarItem(
              icon: Icon(Icons.navigation),
              label: 'Check Status',
              backgroundColor: Color(0xFF0F0529),
            ),
            BottomNavigationBarItem(
              icon: Icon(Icons.home),
              label: 'Home',
              backgroundColor: Color(0xFF0F0529),
            ),
            BottomNavigationBarItem(
              icon: Icon(Icons.phishing),
              label: 'Fraud Check',
              backgroundColor: Color(0xFF0F0529),
            ),
            BottomNavigationBarItem(
              icon: Icon(Icons.chat),
              label: 'ChatBot',
              backgroundColor: Color(0xFF0F0529),
            ),
          ],
          currentIndex: selectedIndex,
          showUnselectedLabels: true,
          unselectedFontSize: 10,
          selectedFontSize: 15,
          onTap: onItemTapped,
        ),
      ),
    );
  }
}
