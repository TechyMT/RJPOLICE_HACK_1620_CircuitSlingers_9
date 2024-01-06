import 'package:circuitslingers/controller/credentialcontroller.dart';
import 'package:circuitslingers/firebase/firebase_auth_servies.dart';
import 'package:circuitslingers/firebase/firebase_messaging.dart';
import 'package:circuitslingers/views/MainScreen.dart';
import 'package:circuitslingers/views/MainView.dart';
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
                        fontSize: 20,
                        fontWeight: FontWeight.bold,
                      ),
                      textAlign: TextAlign.center,
                    ),
                    const SizedBox(height: 10),
                    const Text(
                      "Log in to your account",
                      style: TextStyle(
                        fontSize: 14,
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
                    const SizedBox(height: 10),
                    ElevatedButton(
                      onPressed: () async {
                        if (_formKey.currentState!.validate()) {
                          await _login();
                        }
                      },
                      child: const Text("Login"),
                    ),
                    ElevatedButton(
                      onPressed: () async {
                        await _signInWithGoogle();
                      },
                      child: const Text("Sign in with Google"),
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
      controller.setAuthenticated(true);
      print(controller.isAuthenticated.value);
      await _messagingService.getFirebaseToken();
      Get.offAll(() => MainScreen());

      Get.snackbar("Success", "Login Successful");
    } else {
      Get.snackbar("Error", "Invalid credentials");
    }
  }

  Future<void> _signInWithGoogle() async {
    User? user = await _auth.signInWithGoogle();
    if (user != null) {
      controller.setAuthenticated(true);
      print(controller.isAuthenticated.value);
      Get.offAll(() => MainScreen());
      Get.snackbar("Success", "Google Sign-In Successful");
    } else {
      Get.snackbar("Error", "Google Sign-In Failed");
    }
  }

  Future<void> _loginWithFacebook() async {
    User? user = await _auth.loginWithFacebook();
    if (user != null) {
      controller.setAuthenticated(true);
      print(controller.isAuthenticated.value);
      Get.offAll(() => MainScreen());
      Get.snackbar("Success", "Facebook Login Successful");
    } else {
      Get.snackbar("Error", "Facebook Login Failed");
    }
  }
}
