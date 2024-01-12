import 'package:circuitslingers/controller/credentialcontroller.dart';
import 'package:circuitslingers/firebase/firebase_auth_servies.dart';
import 'package:circuitslingers/firebase/firebase_messaging.dart';
import 'package:circuitslingers/views/Home.dart';

import 'package:circuitslingers/views/networking/networking.dart';
import 'package:firebase_auth/firebase_auth.dart';
import 'package:flutter/material.dart';
import 'package:get/get.dart';

// ignore: must_be_immutable
class Register extends StatelessWidget {
  FirebaseAuthServices _auth = FirebaseAuthServices();
  FirebaseMessagingService _firebaseMessage = FirebaseMessagingService();
  final CredentialController controller = Get.put(CredentialController());
  final GlobalKey<FormState> _formKey = GlobalKey<FormState>();

  Register({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Scaffold(
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
          SingleChildScrollView(
            padding: const EdgeInsets.all(20),
            child: Form(
              key: _formKey,
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.stretch,
                children: [
                  const SizedBox(height: 20),
                  const Text(
                    "Registration",
                    style: TextStyle(
                      fontSize: 24,
                      fontWeight: FontWeight.bold,
                    ),
                    textAlign: TextAlign.center,
                  ),
                  const SizedBox(
                    height: 10,
                  ),
                  TextFormField(
                    controller: controller.emailController,
                    decoration: const InputDecoration(
                      labelText: "Email",
                      labelStyle: TextStyle(color: Colors.white),
                    ),
                    style: TextStyle(color: Colors.white),
                    validator: (value) {
                      if (value!.isEmpty) {
                        return 'Please enter your Email';
                      }
                      return null;
                    },
                  ),
                  const SizedBox(
                    height: 10,
                  ),
                  TextFormField(
                    obscureText: true,
                    controller: controller.passwordController,
                    decoration: const InputDecoration(
                      labelText: "Password",
                      labelStyle: TextStyle(color: Colors.white),
                    ),
                    style: TextStyle(color: Colors.white),
                    validator: (value) {
                      if (value!.isEmpty) {
                        return 'Please enter yor Password';
                      }
                      return null;
                    },
                  ),
                  const SizedBox(height: 20),
                  ElevatedButton(
                    onPressed: () async {
                      if (_formKey.currentState!.validate()) {
                        if (await _signup()) {
                          Get.snackbar("Success", "Registration Successful");
                          await createUser();
                          await controller.sign_login();
                          await _firebaseMessage.getFirebaseToken();
                          Get.offAll(() => Home());
                        } else {
                          Get.snackbar("Error", "Error in Registration");
                        }
                      }
                    },
                    child: const Text("Register"),
                  ),
                  ElevatedButton(
                    onPressed: () async {
                      await _signUpWithGoogle();
                    },
                    child: const Text("Sign up with Google"),
                  ),
                  ElevatedButton(
                    onPressed: () async {
                      await _signUpWithFacebook();
                    },
                    child: const Text("Sign up with Facebook"),
                  ),
                ],
              ),
            ),
          ),
        ],
      ),
    );
  }

  Future<bool> _signup() async {
    String email = controller.emailController.text;
    String password = controller.passwordController.text;
    User? user = await _auth.signupWithEmailandPassword(email, password);

    if (user != null) {
      return true;
    } else {
      return false;
    }
  }

  Future<void> _signUpWithGoogle() async {
    User? user = await _auth.signUpWithGoogle();
    if (user != null) {
      await createUser();
      await controller.sign_login();
      await _firebaseMessage.getFirebaseToken();
      Get.offAll(() => Home());
      Get.snackbar("Success", "Google Sign-Up Successful");
    } else {
      Get.snackbar("Error", "Google Sign-Up Failed");
    }
  }

  Future<void> _signUpWithFacebook() async {
    User? user = await _auth.signUpWithFacebook();
    if (user != null) {
      await createUser();
      await controller.sign_login();
      await _firebaseMessage.getFirebaseToken();
      Get.offAll(() => Home());
      Get.snackbar("Success", "Facebook Sign-Up Successful");
    } else {
      Get.snackbar("Error", "Facebook Sign-Up Failed");
    }
  }
}