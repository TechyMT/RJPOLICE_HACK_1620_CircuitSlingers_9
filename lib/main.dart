import 'package:circuitslingers/controller/credentialcontroller.dart';
import 'package:circuitslingers/views/MainScreen.dart';
import 'package:circuitslingers/views/MainView.dart';
import 'package:circuitslingers/views/register_login/landingpage.dart';
import 'package:circuitslingers/views/splashscreen.dart';
import 'package:firebase_auth/firebase_auth.dart';
import 'package:firebase_core/firebase_core.dart';
import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'firebase/firebase_options.dart';

void main() async {
  WidgetsFlutterBinding.ensureInitialized();
  await Firebase.initializeApp(
    options: DefaultFirebaseOptions.currentPlatform,
  );
  runApp(MyApp());
}

class MyApp extends StatelessWidget {
  final CredentialController controller = Get.put(CredentialController());
  MyApp({super.key});
  @override
  Widget build(BuildContext context) {
    print(controller.isAuthenticated.value);
    return GetMaterialApp(
      debugShowCheckedModeBanner: false,
      title: 'Flutter Demo',
      theme: ThemeData(
        textTheme: const TextTheme(
          bodyMedium: TextStyle(
            color: Colors.black,
          ),
        ),
        primaryColor: Colors.white,
        colorScheme: ColorScheme.fromSeed(seedColor: Colors.blue),
        useMaterial3: true,
      ),
      home: Obx(
        () {
          return controller.isAuthenticated.value ? MainView() : LandingPage();
        },
      ),
    );
  }
}
