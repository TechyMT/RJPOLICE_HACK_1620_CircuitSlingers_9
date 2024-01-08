import 'package:firebase_auth/firebase_auth.dart';
import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:shared_preferences/shared_preferences.dart';

class CredentialController extends GetxController {
  final TextEditingController emailController = TextEditingController();
  final TextEditingController passwordController = TextEditingController();

  List<int> tracking_ids = [];

  Future<void> sign_login() async {
    User? currentUser = FirebaseAuth.instance.currentUser;

    if (currentUser != null) {
      SharedPreferences sharedPreferences =
          await SharedPreferences.getInstance();
      sharedPreferences.setString('userId', currentUser.uid);
      //  print(sharedPreferences.getString('userId'));
    }
  }
}
