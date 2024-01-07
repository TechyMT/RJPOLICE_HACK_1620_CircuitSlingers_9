import 'package:circuitslingers/controller/credentialcontroller.dart';
import 'package:circuitslingers/controller/functionController.dart';
import 'package:circuitslingers/views/Home.dart';
import 'package:circuitslingers/views/register_login/landingpage.dart';

import 'package:firebase_core/firebase_core.dart';
import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'firebase/firebase_options.dart';

void main() async {
  WidgetsFlutterBinding.ensureInitialized();
  await Firebase.initializeApp(
    options: DefaultFirebaseOptions.currentPlatform,
  );
  runApp(MyApp());
}

class MyApp extends StatelessWidget {
  final FunctionController functionController = Get.put(FunctionController());
  final CredentialController controller = Get.put(CredentialController());

  MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return FutureBuilder<bool>(
      future: _checkUserIdExists(),
      builder: (context, snapshot) {
        if (snapshot.connectionState == ConnectionState.waiting) {
          return CircularProgressIndicator();
        } else {
          return GetMaterialApp(
            debugShowCheckedModeBanner: false,
            title: 'Flutter Demo',
            theme: ThemeData(
              scaffoldBackgroundColor: Color(0xFF1D1D1D),
              textTheme: const TextTheme(
                bodyMedium: TextStyle(
                  color: Colors.white,
                ),
              ),
              primaryColor: Colors.white,
              colorScheme: ColorScheme.fromSeed(seedColor: Colors.blue),
              useMaterial3: true,
            ),
            home: snapshot.data == true ? Home() : const LandingPage(),
          );
        }
      },
    );
  }

  Future<bool> _checkUserIdExists() async {
    //  await functionController.fetchNews();
    SharedPreferences prefs = await SharedPreferences.getInstance();
    String? userId = prefs.getString('userId');
    return userId != null && userId.isNotEmpty;
  }
}
