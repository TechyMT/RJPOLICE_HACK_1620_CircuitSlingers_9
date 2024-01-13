import 'package:circuitslingers/controller/credentialcontroller.dart';
import 'package:circuitslingers/firebase/firebase_auth_servies.dart';
import 'package:circuitslingers/firebase/firebase_messaging.dart';
import 'package:circuitslingers/models/constants.dart';
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
      appBar: AppBar(
        flexibleSpace: Container(
          decoration: const BoxDecoration(
            gradient: AppGradients.linearGradient,
          ),
        ),
        title: Row(
          children: [
            Padding(
              padding: const EdgeInsets.fromLTRB(50, 0, 0, 0),
              child: Image.asset("assets/cyber.png", height: 60, width: 50),
            ),
            const SizedBox(
              width: 20,
            ),
            const Text(
              "Dial 1930",
              style: TextStyle(fontSize: 25, color: Colors.white),
            ),
          ],
        ),
      ),
      body: Stack(
        children: [
          Container(
            decoration: const BoxDecoration(
              gradient: AppGradients.linearGradient,
            ),
          ),
          Center(
            child: SingleChildScrollView(
              child: Center(
                child: Form(
                  key: _formKey,
                  child: Padding(
                    padding: const EdgeInsets.all(20),
                    child: Column(
                      mainAxisSize: MainAxisSize.min,
                      crossAxisAlignment: CrossAxisAlignment.stretch,
                      children: [
                        const Text(
                          "Welcome ",
                          style: TextStyle(
                            fontSize: 25,
                            fontWeight: FontWeight.bold,
                            color: Colors.white,
                          ),
                          textAlign: TextAlign.center,
                        ),
                        const SizedBox(height: 20),
                        const Text(
                          "Registration",
                          style: TextStyle(
                            fontSize: 20,
                            color: Colors.white,
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
                          style: const TextStyle(color: Colors.white),
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
                          style: const TextStyle(color: Colors.white),
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
                              await _signup();
                            }
                          },
                          child: const Row(
                            mainAxisAlignment: MainAxisAlignment.center,
                            children: [
                              Text("Register"),
                              Icon(Icons.login),
                            ],
                          ),
                        ),
                        const SizedBox(
                          height: 20,
                        ),
                        const Row(children: <Widget>[
                          Expanded(child: Divider()),
                          Text(
                            "OR",
                            style: TextStyle(color: Colors.white),
                          ),
                          Expanded(child: Divider()),
                        ]),
                        const SizedBox(
                          height: 20,
                        ),
                        ElevatedButton(
                          onPressed: () async {
                            await _signUpWithGoogle();
                          },
                          child: const Text("Sign up with Google"),
                        ),
                        const SizedBox(
                          height: 20,
                        ),
                        const Row(children: <Widget>[
                          Expanded(child: Divider()),
                          Text(
                            "OR",
                            style: TextStyle(color: Colors.white),
                          ),
                          Expanded(child: Divider()),
                        ]),
                        const SizedBox(
                          height: 20,
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
              ),
            ),
          ),
        ],
      ),
    );
  }

  Future<void> _signup() async {
    String email = controller.emailController.text;
    String password = controller.passwordController.text;
    User? user = await _auth.signupWithEmailandPassword(email, password);

    if (user != null) {
  
      await createUser();
      await controller.sign_login();
      await _firebaseMessage.getFirebaseToken();
      Get.offAll(() => Home());
    } else {
      Get.snackbar("Error", "Error in Registration");
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
