import 'package:circuitslingers/controller/credentialcontroller.dart';
import 'package:circuitslingers/firebase/firebase_auth_servies.dart';
import 'package:circuitslingers/firebase/firebase_messaging.dart';
import 'package:circuitslingers/models/constants.dart';
import 'package:circuitslingers/views/Home.dart';
import 'package:circuitslingers/views/networking/networking.dart';
import 'package:firebase_auth/firebase_auth.dart';
import 'package:flutter/material.dart';
import 'package:get/get.dart';

class Login extends StatelessWidget {
  final FirebaseAuthServices _auth = FirebaseAuthServices();
  final FirebaseMessagingService _messagingService = FirebaseMessagingService();
  final GlobalKey<FormState> _formKey = GlobalKey<FormState>();
  final TextEditingController _emailController = TextEditingController();
  final TextEditingController _passwordController = TextEditingController();
  final CredentialController controller = Get.put(CredentialController());

  Login({Key? key}) : super(key: key);

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
      backgroundColor: Colors.black,
      body: Stack(
        children: [
          Container(
            decoration: const BoxDecoration(
              gradient: AppGradients.linearGradient,
            ),
          ),
          Center(
            child: Padding(
              padding: const EdgeInsets.all(20),
              child: Form(
                key: _formKey,
                child: Column(
                  mainAxisSize: MainAxisSize.min,
                  crossAxisAlignment: CrossAxisAlignment.stretch,
                  children: [
                    const Text(
                      "Welcome back",
                      style: TextStyle(
                        fontSize: 25,
                        fontWeight: FontWeight.bold,
                        color: Colors.white,
                      ),
                      textAlign: TextAlign.center,
                    ),
                    const SizedBox(height: 10),
                    const Text(
                      "Log in to your account",
                      style: TextStyle(
                        color: Colors.white,
                        fontSize: 20,
                      ),
                      textAlign: TextAlign.center,
                    ),
                    const SizedBox(height: 10),
                    TextFormField(
                      controller: _emailController,
                      decoration: const InputDecoration(
                          labelText: "Email",
                          labelStyle: TextStyle(color: Colors.white)),
                      style: const TextStyle(color: Colors.white),
                      validator: (value) {
                        if (value!.isEmpty) {
                          return 'Please enter your Email-Id';
                        }
                        return null;
                      },
                    ),
                    TextFormField(
                      controller: _passwordController,
                      decoration: const InputDecoration(
                        labelText: "Password",
                        labelStyle: TextStyle(color: Colors.white),
                      ),
                      style: const TextStyle(color: Colors.white),
                      obscureText: true,
                      validator: (value) {
                        if (value!.isEmpty) {
                          return 'Please enter your Password';
                        }
                        return null;
                      },
                    ),
                    const SizedBox(height: 30),
                    ElevatedButton(
                      onPressed: () async {
                        if (_formKey.currentState!.validate()) {
                          await _login();
                        }
                      },
                      child: const Row(
                        mainAxisAlignment: MainAxisAlignment.center,
                        children: [
                          Text("Login"),
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
                        await _signInWithGoogle();
                      },
                      child: const Text("Sign in with Google"),
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
                        await _loginWithFacebook();
                      },
                      child: const Text("Login with Facebook"),
                    ),
                    const SizedBox(height: 10),
                  ],
                ),
              ),
            ),
          ),
        ],
      ),
    );
  }

  Future<void> _login() async {
    String email = _emailController.text;
    String password = _passwordController.text;

    User? user = await _auth.signinWithEmailandPassword(email, password);
    if (user != null) {
      await controller.sign_login();
      await _messagingService.getFirebaseToken();
      Get.offAll(() => Home());

      Get.snackbar("Success", "Login Successful");
    } else {
      Get.snackbar("Error", "Invalid credentials");
    }
  }

  Future<void> _signInWithGoogle() async {
    User? user = await _auth.signInWithGoogle();
    if (user != null) {
      await controller.sign_login();
      await _messagingService.getFirebaseToken();
      Get.offAll(() => Home());
      Get.snackbar("Success", "Google Sign-In Successful");
    } else {
      Get.snackbar("Error", "Google Sign-In Failed");
    }
  }

  Future<void> _loginWithFacebook() async {
    User? user = await _auth.loginWithFacebook();
    if (user != null) {
      await controller.sign_login();
      await _messagingService.getFirebaseToken();
      Get.offAll(() => Home());
      Get.snackbar("Success", "Facebook Login Successful");
    } else {
      Get.snackbar("Error", "Facebook Login Failed");
    }
  }
}
