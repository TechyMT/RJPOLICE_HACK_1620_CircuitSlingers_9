import 'package:circuitslingers/views/Register.dart';
import 'package:circuitslingers/views/login.dart';
import 'package:flutter/material.dart';
import 'package:get/get.dart';

class LandingPage extends StatelessWidget {
  const LandingPage({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.black,
      body: Stack(
        children: [
          Image.asset(
            'assets/background.jpg',
            fit: BoxFit.cover,
            width: double.infinity,
            height: double.infinity,
            color: Colors.black.withOpacity(0.2),
            colorBlendMode: BlendMode.darken,
          ),
          Column(
            children: [
              SizedBox(
                height: MediaQuery.of(context).size.height * 0.2,
              ),
              const Padding(
                padding: EdgeInsets.fromLTRB(0, 8, 20, 20),
                child: Text(
                  "The Best",
                  style: TextStyle(fontSize: 50, color: Colors.white),
                ),
              ),
              const Padding(
                padding: EdgeInsets.fromLTRB(8.0, 8, 20, 20),
                child: Text(
                  "App for",
                  style: TextStyle(fontSize: 50, color: Colors.white),
                ),
              ),
              const Padding(
                padding: EdgeInsets.fromLTRB(16.0, 8, 20, 20),
                child: Text(
                  "Your Energy",
                  style: TextStyle(fontSize: 50, color: Colors.white),
                ),
              ),
              const SizedBox(
                height: 50,
              ),
              Center(
                child: Container(
                  height: MediaQuery.of(context).size.height * 0.06,
                  width: MediaQuery.of(context).size.width * 0.83,
                  decoration: const BoxDecoration(
                    borderRadius: BorderRadius.only(
                      topLeft: Radius.circular(20.0),
                      bottomLeft: Radius.circular(20.0),
                    ),
                  ),
                  child: ElevatedButton(
                    onPressed: () {
                      Get.to(
                        () => Register(),
                        transition: Transition.rightToLeft,
                        duration: Duration(milliseconds: 750),
                      );
                    },
                    child: const Text(
                      "Sign Up",
                      style: TextStyle(fontSize: 16),
                    ),
                  ),
                ),
              ),
              const SizedBox(
                height: 30,
              ),
              Center(
                child: Container(
                  height: MediaQuery.of(context).size.height * 0.06,
                  width: MediaQuery.of(context).size.width * 0.83,
                  decoration: const BoxDecoration(
                    borderRadius: BorderRadius.only(
                      topLeft: Radius.circular(20.0),
                      bottomLeft: Radius.circular(20.0),
                    ),
                  ),
                  child: ElevatedButton(
                    style: ElevatedButton.styleFrom(
                      backgroundColor: Color(0xFF78D6C6),
                    ),
                    onPressed: () {
                      Get.to(
                        () => Login(),
                        transition: Transition.rightToLeft,
                        duration: Duration(milliseconds: 750),
                      );
                    },
                    child: const Text(
                      "Login",
                      style: TextStyle(fontSize: 16),
                    ),
                  ),
                ),
              )
            ],
          ),
        ],
      ),
    );
  }
}
