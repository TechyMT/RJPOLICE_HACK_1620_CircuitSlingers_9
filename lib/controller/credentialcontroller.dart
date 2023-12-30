import 'package:circuitslingers/views/ApplicationStatus.dart';
import 'package:circuitslingers/views/Awareness.dart';
import 'package:circuitslingers/views/NearbyStation.dart';
import 'package:circuitslingers/views/ReportCrime.dart';
import 'package:circuitslingers/views/chat.dart';
import 'package:circuitslingers/views/newsPage.dart';
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

  final routes = <String>[
    'Report A Crime',
    'Chat With Our Bot',
    'News',
    'Check Application Status',
    'Locate Nearby Station',
    'Awareness and Training',
  ];

  final widgets = <Widget>[
    ReportCrime(),
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
