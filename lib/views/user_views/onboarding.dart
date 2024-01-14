import 'package:circuitslingers/models/constants.dart';
import 'package:circuitslingers/views/register_login/Register.dart';
import 'package:circuitslingers/views/register_login/login.dart';
import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:flutter_onboarding_slider/flutter_onboarding_slider.dart';
import 'package:get/get.dart';

class OnBoarding extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      // appBar: AppBar(
      //   backgroundColor: Color(0xFF6A8CB1),
      // ),
      body: OnBoardingSlider(
        headerBackgroundColor: const Color(0xFF6A8CB1),
        pageBackgroundColor: const Color(0xFF6A8CB1),
        finishButtonText: 'Register',
        onFinish: () {
          Get.to(() => Register());
        },
        trailingFunction: () {
          Get.to(() => Login());
        },
        finishButtonStyle: const FinishButtonStyle(
          backgroundColor: Colors.black,
        ),
        skipTextButton: const Text(
          'Skip',
          style: TextStyle(color: Colors.black, fontSize: 20),
        ),
        trailing: const Text(
          'Login',
          style: TextStyle(color: Colors.black, fontSize: 20),
        ),
        background: [
          Image.asset('assets/image_1.jpg'),
          Image.asset('assets/image_2.jpg'),
          Image.asset('assets/image_3.jpg')
        ],
        totalPage: 3,
        speed: 1.8,
        pageBodies: [
          Container(
            // ignore: prefer_const_constructors
            child: Center(
              child: Column(
                children: <Widget>[
                  const SizedBox(
                    height: 60,
                  ),
                  Row(
                    mainAxisAlignment: MainAxisAlignment.center,
                    children: [
                      Image.asset("assets/cyber.png", height: 60, width: 50),
                      const SizedBox(
                        width: 20,
                      ),
                      const Text(
                        "Dial 1930",
                        style: TextStyle(
                            fontSize: 25,
                            color: Colors.white,
                            fontWeight: FontWeight.bold),
                      ),
                    ],
                  ),
                  const SizedBox(
                    height: 150,
                  ),
                  const Text(
                    'Together for a \nBetter Future',
                    style: const TextStyle(
                      color: Colors.white,
                      fontSize: 24,
                      fontWeight: FontWeight.bold,
                    ),
                    textAlign: TextAlign.center,
                  ),
                  const SizedBox(height: 40),
                  const Text(
                    'Convenient and Effective way \nfor people to engage with \nRajasthan Police for cyber crime.',
                    style: TextStyle(
                      color: Colors.white,
                      fontSize: 16,
                    ),
                    textAlign: TextAlign.center,
                  ),
                ],
              ),
            ),
          ),
          Container(
            // ignore: prefer_const_constructors
            child: Center(
              child: Column(
                children: <Widget>[
                  const SizedBox(
                    height: 60,
                  ),
                  Row(
                    mainAxisAlignment: MainAxisAlignment.center,
                    children: [
                      Image.asset("assets/cyber.png", height: 60, width: 50),
                      const SizedBox(
                        width: 20,
                      ),
                      const Text(
                        "Dial 1930",
                        style: TextStyle(
                            fontSize: 25,
                            color: Colors.white,
                            fontWeight: FontWeight.bold),
                      ),
                    ],
                  ),
                  const SizedBox(
                    height: 150,
                  ),
                  const Text(
                    'Reduce the \nlevels of crime.',
                    style: TextStyle(
                      color: Colors.white,
                      fontSize: 24,
                      fontWeight: FontWeight.bold,
                    ),
                    textAlign: TextAlign.center,
                  ),
                  const SizedBox(height: 40),
                  const Text(
                    'Help bring the offender to justice\nand make sure this doesn’t happen \nto anyone else.',
                    style: TextStyle(
                      color: Colors.white,
                      fontSize: 16,
                    ),
                    textAlign: TextAlign.center,
                  ),
                ],
              ),
            ),
          ),
          Stack(
            children: <Widget>[
              Image.asset(
                'assets/image_3.jpg',
                width: double.infinity,
                height: double.infinity,
                fit: BoxFit.fill,
              ),
              Container(
                // ignore: prefer_const_constructors
                child: Center(
                  child: Column(
                    children: <Widget>[
                      const SizedBox(
                        height: 60,
                      ),
                      Row(
                        mainAxisAlignment: MainAxisAlignment.center,
                        children: [
                          Image.asset("assets/cyber.png",
                              height: 60, width: 50),
                          const SizedBox(
                            width: 20,
                          ),
                          const Text(
                            "Dial 1930",
                            style: TextStyle(
                                fontSize: 25,
                                color: Colors.white,
                                fontWeight: FontWeight.bold),
                          ),
                        ],
                      ),
                      const SizedBox(
                        height: 120,
                      ),
                      const Text(
                        'Help victims\nget support',
                        style: TextStyle(
                          color: Colors.white,
                          fontSize: 24,
                          fontWeight: FontWeight.bold,
                        ),
                        textAlign: TextAlign.center,
                      ),
                      const SizedBox(height: 40),
                      const Text(
                        'File  a crime report from your \nsmartphone and send photo\nand video evidence to police.',
                        style: TextStyle(
                          color: Colors.white,
                          fontSize: 16,
                        ),
                        textAlign: TextAlign.center,
                      ),
                    ],
                  ),
                ),
              ),
            ],
          ),
        ],
      ),
    );
  }
}
