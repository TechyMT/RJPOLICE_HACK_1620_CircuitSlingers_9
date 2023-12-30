import 'package:circuitslingers/views/Weather.dart';
import 'package:circuitslingers/views/landingpage.dart';
import 'package:circuitslingers/views/Register.dart';
import 'package:flutter/material.dart';
import 'package:animated_splash_screen/animated_splash_screen.dart';

class SplashPage extends StatelessWidget {
  const SplashPage({super.key});

  @override
  Widget build(BuildContext context) {
    return AnimatedSplashScreen(
      splash: 'assets/landing.gif',
      nextScreen: MainScreen(),
      splashTransition: SplashTransition.fadeTransition,
      backgroundColor: Colors.white,
    );
  }
}
