import 'package:circuitslingers/views/register_login/landingpage.dart';
import 'package:firebase_auth/firebase_auth.dart';
import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:shared_preferences/shared_preferences.dart';

class AppGradients {
  static const Color color1 = Color(0xFF0F0529);
  static const Color color2 = Color(0xFFFF0000);
  static const LinearGradient linearGradient = LinearGradient(
    colors: [color1, color2],
    begin: Alignment.topLeft,
    end: Alignment.bottomRight,
  );
}

class CustomAppBar extends AppBar {
  CustomAppBar({Key? key}) : super(key: key);

  Widget build(BuildContext context) {
    return AppBar(
      flexibleSpace: Container(
        decoration: const BoxDecoration(
          gradient: AppGradients.linearGradient,
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
    );
  }
}
