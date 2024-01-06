import 'package:circuitslingers/views/MainView.dart';
import 'package:circuitslingers/views/user_views/ApplicationStatus.dart';
import 'package:circuitslingers/views/user_views/Awareness.dart';
import 'package:circuitslingers/views/user_views/NearbyStation.dart';
import 'package:circuitslingers/views/user_views/ReportCrime.dart';
import 'package:circuitslingers/views/chatbot/chat.dart';
import 'package:circuitslingers/views/user_views/newsPage.dart';
import 'package:flutter/material.dart';
import 'package:get/get.dart';

class CredentialController extends GetxController {
  final TextEditingController firstNameController = TextEditingController();
  final TextEditingController lastNameController = TextEditingController();
  final TextEditingController emailController = TextEditingController();
  final TextEditingController phoneController = TextEditingController();
  final TextEditingController countryController = TextEditingController();
  final TextEditingController stateController = TextEditingController();
  final TextEditingController cityController = TextEditingController();
  final TextEditingController passwordController = TextEditingController();

  RxBool isAuthenticated = false.obs;
  void setAuthenticated(bool value) {
    isAuthenticated.value = value;
  }

  final routes = <String>[
    'Report A Crime',
    'Chat With Our Bot',
    'News',
    'Check Application Status',
    'Locate Nearby Station',
    'Awareness and Training',
  ];

  final widgets = <Widget>[
    MainView(),
    ChatPage(),
    NewsPage(),
    ApplicationStatus(),
    NearbyStation(),
    Awareness(),
  ];

  final images = [
    'assets/1.jpg',
    'assets/2.jpg',
    'assets/3.jpg',
    'assets/4.jpg',
    'assets/5.jpg',
    'assets/6.jpg'
  ];
}
