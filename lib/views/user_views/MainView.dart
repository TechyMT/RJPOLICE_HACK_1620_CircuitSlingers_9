import 'package:circuitslingers/controller/functionController.dart';
import 'package:circuitslingers/models/NewsList.dart';
import 'package:circuitslingers/models/constants.dart';
import 'package:circuitslingers/views/register_login/landingpage.dart';
import 'package:circuitslingers/views/user_views/onboarding.dart';
import 'package:firebase_auth/firebase_auth.dart';
import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:get/get_core/src/get_main.dart';
import 'package:shared_preferences/shared_preferences.dart';

class MainView extends StatelessWidget {
  final FunctionController functionController = Get.put(FunctionController());

  MainView({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        flexibleSpace: Container(
          decoration: const BoxDecoration(
            color: Color(0xFF070288),
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
      body: Column(
        children: [
          Container(
            height: MediaQuery.of(context).size.height * 0.4,
            width: MediaQuery.of(context).size.width * 1,
            decoration: const BoxDecoration(
              color: Color(0xFF080460),
            ),
            child: Center(
              child: Image.asset("assets/cyber.png"),
            ),
          ),
          Container(
            height: MediaQuery.of(context).size.height * 0.1,
            width: MediaQuery.of(context).size.width * 1,
            child: Row(
              children: [
                Container(
                  width: MediaQuery.of(context).size.width * 0.5,
                  decoration: const BoxDecoration(
                    color: Color(0xFF080460),
                    borderRadius: BorderRadius.only(
                      bottomLeft: Radius.circular(40),
                    ),
                  ),
                  child: const Center(
                    child: Row(
                      mainAxisAlignment: MainAxisAlignment.center,
                      children: [
                        Icon(
                          Icons.call,
                          color: Colors.white,
                        ),
                        SizedBox(
                          width: 10,
                        ),
                        Text(
                          "Call Police",
                          style: TextStyle(fontSize: 18, color: Colors.white),
                        ),
                      ],
                    ),
                  ),
                ),
                Container(
                  width: MediaQuery.of(context).size.width * 0.5,
                  decoration: const BoxDecoration(
                    color: Color(0xFF412CBC),
                    borderRadius: BorderRadius.only(
                      bottomRight: Radius.circular(40),
                    ),
                  ),
                  child: const Center(
                    child: Row(
                      mainAxisAlignment: MainAxisAlignment.center,
                      children: [
                        Icon(
                          Icons.note_add,
                          color: Colors.white,
                        ),
                        SizedBox(
                          width: 10,
                        ),
                        Text(
                          "File A Report",
                          style: TextStyle(fontSize: 18, color: Colors.white),
                        ),
                      ],
                    ),
                  ),
                )
              ],
            ),
          ),
          Container(
            height: MediaQuery.of(context).size.height * 0.08,
            width: MediaQuery.of(context).size.width * 1,
            child: Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                const Padding(
                  padding: EdgeInsets.fromLTRB(30, 0, 0, 0),
                  child: Text(
                    "Latest Reports",
                    style: TextStyle(fontSize: 18, color: Colors.white),
                  ),
                ),
                Padding(
                  padding: const EdgeInsets.fromLTRB(0, 0, 30, 0),
                  child: GestureDetector(
                    onTap: () {},
                    child: const Text(
                      "See All",
                      style: TextStyle(
                          color: Colors.white,
                          decoration: TextDecoration.underline,
                          decorationColor: Colors.white,
                          fontSize: 18),
                    ),
                  ),
                ),
              ],
            ),
          ),
          Container(
            height: MediaQuery.of(context).size.height * 0.22,
            padding: const EdgeInsets.all(1),
            width: MediaQuery.of(context).size.width,
            child: NewsList(
              item: functionController.news,
            ),
          ),
        ],
      ),
    );
  }
}
