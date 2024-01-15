import 'package:circuitslingers/controller/credentialcontroller.dart';
import 'package:circuitslingers/firebase/firebase_auth_servies.dart';
import 'package:circuitslingers/firebase/firebase_messaging.dart';
import 'package:circuitslingers/models/constants.dart';
import 'package:circuitslingers/views/Home.dart';

import 'package:circuitslingers/views/networking/networking.dart';
import 'package:circuitslingers/views/register_login/email_Auth.dart';
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
            color: Color(0xFF070288),
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
              color: Color(0xFF070288),
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
                          "Register Yourself",
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
                            style: const TextStyle(color: Colors.black),
                            decoration: InputDecoration(
                              filled: true,
                              floatingLabelBehavior:
                                  FloatingLabelBehavior.never,
                              fillColor: const Color(0xFFCBD5E1),
                              labelText: 'Email',
                              labelStyle: const TextStyle(color: Colors.black),
                              focusedBorder: OutlineInputBorder(
                                borderSide:
                                    const BorderSide(color: Colors.black),
                                borderRadius: BorderRadius.circular(20),
                              ),
                              enabledBorder: OutlineInputBorder(
                                borderSide:
                                    const BorderSide(color: Colors.black),
                                borderRadius: BorderRadius.circular(20),
                              ),
                            ),
                            onSaved: (value) =>
                                controller.emailController.text = value!),
                        const SizedBox(
                          height: 10,
                        ),
                        TextFormField(
                          obscureText: true,
                          controller: controller.passwordController,
                          style: const TextStyle(color: Colors.black),
                          decoration: InputDecoration(
                            filled: true,
                            floatingLabelBehavior: FloatingLabelBehavior.never,
                            fillColor: const Color(0xFFCBD5E1),
                            labelText: 'Enter a Strong Password',
                            labelStyle: const TextStyle(color: Colors.black),
                            focusedBorder: OutlineInputBorder(
                              borderSide: const BorderSide(color: Colors.black),
                              borderRadius: BorderRadius.circular(20),
                            ),
                            enabledBorder: OutlineInputBorder(
                              borderSide: const BorderSide(color: Colors.black),
                              borderRadius: BorderRadius.circular(20),
                            ),
                          ),
                          onSaved: (value) =>
                              controller.passwordController.text = value!,
                        ),
                        const SizedBox(height: 50),
                        ElevatedButton(
                          style: ElevatedButton.styleFrom(
                            backgroundColor: Color.fromARGB(255, 219, 11, 11),
                          ),
                          onPressed: () async {
                            if (_formKey.currentState!.validate()) {
                              await _signup();
                            }
                          },
                          child: const Row(
                            mainAxisAlignment: MainAxisAlignment.center,
                            children: [
                              Text(
                                "Register",
                                style: TextStyle(color: Colors.white),
                              ),
                              Icon(
                                Icons.login,
                                color: Colors.white,
                              ),
                            ],
                          ),
                        ),
                        const SizedBox(
                          height: 10,
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
                          height: 10,
                        ),
                        ElevatedButton(
                          onPressed: () async {
                            await _signUpWithGoogle();
                          },
                          child: const Text("Sign up with Google"),
                        ),
                        const SizedBox(
                          height: 10,
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
                          height: 10,
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
      //   await createUser();
      await controller.sign_login();
      await _firebaseMessage.getFirebaseToken();
      Get.offAll(() => EmailVerificationScreen());
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
