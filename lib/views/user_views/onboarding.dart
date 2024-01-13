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
      extendBody: true,
      body: OnBoardingSlider(
        pageBackgroundColor: Colors.black,
        headerBackgroundColor: Colors.black,
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
        skipTextButton: const Text('Skip'),
        trailing: const Text('Login'),
        background: [
          Image.asset('assets/mahal.jpg'),
          Image.asset('assets/mahal2.jpg'),
          Image.asset('assets/nightsky.jpg')
        ],
        totalPage: 3,
        speed: 1.8,
        pageBodies: [
          Stack(
            children: <Widget>[
              Image.asset(
                'assets/nightsky.jpg',
                width: double.infinity,
                height: double.infinity,
                fit: BoxFit.fill,
              ),
              Container(
                padding: const EdgeInsets.symmetric(horizontal: 40),
                // ignore: prefer_const_constructors
                child: Center(
                  child: const Column(
                    mainAxisAlignment: MainAxisAlignment.center,
                    children: <Widget>[
                      Text(
                        'Together for a \nBetter Future',
                        style: TextStyle(
                          color: Colors.white,
                          fontSize: 24,
                          fontWeight: FontWeight.bold,
                        ),
                        textAlign: TextAlign.center,
                      ),
                      SizedBox(height: 20),
                      Text(
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
            ],
          ),
          Stack(
            children: <Widget>[
              Image.asset(
                'assets/mahal2.jpg',
                width: double.infinity,
                height: double.infinity,
                fit: BoxFit.fill,
              ),
              Container(
                padding: const EdgeInsets.symmetric(horizontal: 40),
                // ignore: prefer_const_constructors
                child: Center(
                  child: const Column(
                    mainAxisAlignment: MainAxisAlignment.center,
                    children: <Widget>[
                      Text(
                        'Reduce the \nlevels of crime.',
                        style: TextStyle(
                          color: Colors.white,
                          fontSize: 24,
                          fontWeight: FontWeight.bold,
                        ),
                        textAlign: TextAlign.center,
                      ),
                      SizedBox(height: 20),
                      Text(
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
            ],
          ),
          Stack(
            children: <Widget>[
              Image.asset(
                'assets/mahal.jpg',
                width: double.infinity,
                height: double.infinity,
                fit: BoxFit.fill,
              ),
              Container(
                padding: const EdgeInsets.symmetric(horizontal: 40),
                // ignore: prefer_const_constructors
                child: Center(
                  child: const Column(
                    mainAxisAlignment: MainAxisAlignment.center,
                    children: <Widget>[
                      Text(
                        'Help victims\nget support',
                        style: TextStyle(
                          color: Colors.white,
                          fontSize: 24,
                          fontWeight: FontWeight.bold,
                        ),
                        textAlign: TextAlign.center,
                      ),
                      SizedBox(height: 20),
                      Text(
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
