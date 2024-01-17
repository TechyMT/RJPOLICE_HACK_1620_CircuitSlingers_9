import 'package:circuitslingers/controller/ReportStatusController.dart';
import 'package:circuitslingers/models/blinkingText.dart';
import 'package:circuitslingers/models/constants.dart';
import 'package:circuitslingers/views/networking/networking.dart';
import 'package:circuitslingers/views/register_login/landingpage.dart';
import 'package:circuitslingers/views/user_views/onboarding.dart';
import 'package:firebase_auth/firebase_auth.dart';
import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'package:flutter_animated_button/flutter_animated_button.dart';

// ignore: must_be_immutable
class FraudCheck extends StatefulWidget {
  FraudCheck({super.key});

  @override
  State<FraudCheck> createState() => _FraudCheckState();
}

class _FraudCheckState extends State<FraudCheck> {
  bool _isPhoneNumberWidgetVisible = false;
  bool _isEmailWidgetVisible = false;
  bool _isAccountNumberWidgetVisible = false;
  final ReportStatusController controller = Get.put(ReportStatusController());

  TextEditingController emailController = TextEditingController();

  TextEditingController phoneNumberController = TextEditingController();

  TextEditingController accountNumberController = TextEditingController();

  @override
  Widget build(BuildContext context) {
    return Scaffold(
        appBar: AppBar(
          flexibleSpace: Container(
            decoration: const BoxDecoration(
              color: Color(0xFF070288),
            ),
          ),
          leading: Builder(builder: (BuildContext context) {
            return IconButton(
              iconSize: 30,
              onPressed: () {
                Scaffold.of(context).openDrawer();
              },
              icon: const Icon(
                Icons.menu,
                color: Colors.white,
              ),
            );
          }),
          title: Row(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              Image.asset("assets/cyber.png", height: 60, width: 50),
              const SizedBox(
                width: 20,
              ),
              const Text(
                "Dial 1930",
                style: TextStyle(fontSize: 25, color: Colors.white),
              ),
            ],
          ),
          actions: [
            IconButton(
              iconSize: 40,
              color: Colors.white,
              onPressed: () async {
                await FirebaseAuth.instance.signOut();
                SharedPreferences sharedPreferences =
                    await SharedPreferences.getInstance();
                sharedPreferences.clear();
                Get.offAll(() => OnBoarding());
              },
              icon: const Icon(Icons.logout),
            ),
          ],
        ),
        body: ListView(
          children: [
            SizedBox(
              height: MediaQuery.of(context).size.height * 0.1,
            ),
            Image.asset('assets/scam.png'),
            SizedBox(
              height: MediaQuery.of(context).size.height * 0.08,
            ),
            const Divider(
              thickness: 5,
            ),
            ListTile(
              leading: _isEmailWidgetVisible
                  ? const Icon(Icons.arrow_downward_outlined)
                  : const Icon(Icons.arrow_forward_ios),
              title: const Text('Check or Report For Email'),
              onTap: () {
                setState(() {
                  _isEmailWidgetVisible = !_isEmailWidgetVisible;
                });
              },
            ),
            Visibility(
              visible: _isEmailWidgetVisible,
              child: Column(
                children: [
                  Padding(
                    padding: const EdgeInsets.symmetric(horizontal: 20),
                    child: Form(
                      child: TextFormField(
                        controller: emailController,
                        keyboardType: TextInputType.emailAddress,
                        decoration: InputDecoration(
                          hintStyle: const TextStyle(
                              color: Colors.black, fontSize: 15),
                          labelText: 'Email',
                          hintText: 'Enter Email To Check or Report',
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
                      ),
                    ),
                  ),
                  const SizedBox(height: 20),
                  Row(
                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                    children: [
                      Padding(
                        padding: const EdgeInsets.fromLTRB(20, 0, 0, 0),
                        child: ElevatedButton(
                          style: ElevatedButton.styleFrom(
                            backgroundColor: Color.fromARGB(255, 219, 11, 11),
                          ),
                          onPressed: () async {
                            await checkEmail(emailController.text);
                          },
                          child: const Text(
                            'Check',
                            style: TextStyle(color: Colors.white),
                          ),
                        ),
                      ),
                      Padding(
                        padding: const EdgeInsets.fromLTRB(0, 0, 20, 0),
                        child: ElevatedButton(
                          style: ElevatedButton.styleFrom(
                              backgroundColor: Color(0xFF070288)),
                          onPressed: () async {
                            await reportEmail(emailController.text);
                          },
                          child: const Text(
                            'Report',
                            style: TextStyle(color: Colors.white),
                          ),
                        ),
                      ),
                    ],
                  ),
                  const SizedBox(height: 20),
                  Obx(
                    () => controller.isEmailchecked.value
                        ? BlinkingText(
                            padding: const EdgeInsets.all(0),
                            text: controller.phishingText.value,
                          )
                        : BlinkingText(
                            text: controller.reportEmailText.value,
                            padding: const EdgeInsets.all(0)),
                  ),
                ],
              ),
            ),
            const Divider(
              thickness: 5,
            ),
            ListTile(
              leading: _isPhoneNumberWidgetVisible
                  ? const Icon(Icons.arrow_downward_outlined)
                  : const Icon(Icons.arrow_forward_ios),
              title: const Text('Check For Phone Number'),
              onTap: () {
                setState(() {
                  _isPhoneNumberWidgetVisible = !_isPhoneNumberWidgetVisible;
                });
              },
            ),
            Visibility(
              visible: _isPhoneNumberWidgetVisible,
              child: Column(
                children: [
                  Padding(
                    padding: const EdgeInsets.symmetric(horizontal: 20),
                    child: Form(
                      child: TextFormField(
                        controller: phoneNumberController,
                        keyboardType: TextInputType.phone,
                        decoration: InputDecoration(
                          hintStyle: const TextStyle(
                              color: Colors.black, fontSize: 15),
                          labelText: 'Phone Number',
                          hintText: 'Enter Phone Number To Check',
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
                      ),
                    ),
                  ),
                  const SizedBox(height: 20),
                  Row(
                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                    children: [
                      Padding(
                        padding: const EdgeInsets.fromLTRB(20, 0, 0, 0),
                        child: ElevatedButton(
                          style: ElevatedButton.styleFrom(
                            backgroundColor: Color.fromARGB(255, 219, 11, 11),
                          ),
                          onPressed: () async {
                            await checkPhoneNumber(phoneNumberController.text);
                          },
                          child: const Text(
                            'Check',
                            style: TextStyle(color: Colors.white),
                          ),
                        ),
                      ),
                      Padding(
                        padding: const EdgeInsets.fromLTRB(0, 0, 20, 0),
                        child: ElevatedButton(
                          style: ElevatedButton.styleFrom(
                            backgroundColor: Color(0xFF070288),
                          ),
                          onPressed: () async {
                            await reportPhone(phoneNumberController.text);
                          },
                          child: const Text(
                            'Report',
                            style: TextStyle(color: Colors.white),
                          ),
                        ),
                      ),
                    ],
                  ),
                  const SizedBox(height: 20),
                  Obx(
                    () => controller.isPhoneNumberChecked.value
                        ? BlinkingText(
                            padding: const EdgeInsets.all(0),
                            text: controller.phoneNumberPhishingText.value,
                          )
                        : BlinkingText(
                            text: controller.reportPhoneNumberText.value,
                            padding: const EdgeInsets.all(0)),
                  ),
                ],
              ),
            ),
            const Divider(
              thickness: 5,
            ),
            ListTile(
              leading: _isAccountNumberWidgetVisible
                  ? const Icon(Icons.arrow_downward_outlined)
                  : const Icon(Icons.arrow_forward_ios),
              title: const Text('Check For Account Number'),
              onTap: () {
                setState(() {
                  _isAccountNumberWidgetVisible =
                      !_isAccountNumberWidgetVisible;
                });
              },
            ),
            Visibility(
              visible: _isAccountNumberWidgetVisible,
              child: Column(
                children: [
                  Padding(
                    padding: const EdgeInsets.symmetric(horizontal: 20),
                    child: Form(
                      child: TextFormField(
                        controller: accountNumberController,
                        keyboardType: TextInputType.text,
                        decoration: InputDecoration(
                          hintStyle: const TextStyle(
                              color: Colors.black, fontSize: 15),
                          labelText: 'Account Number',
                          hintText: 'Enter Account Number To Check',
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
                      ),
                    ),
                  ),
                  const SizedBox(height: 20),
                  Row(
                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                    children: [
                      Padding(
                        padding: const EdgeInsets.fromLTRB(20, 0, 0, 0),
                        child: ElevatedButton(
                          style: ElevatedButton.styleFrom(
                            backgroundColor: Color.fromARGB(255, 219, 11, 11),
                          ),
                          onPressed: () async {
                            await checkAccountNumber(
                                accountNumberController.text);
                          },
                          child: const Text(
                            'Check',
                            style: TextStyle(color: Colors.white),
                          ),
                        ),
                      ),
                      Padding(
                        padding: const EdgeInsets.fromLTRB(0, 0, 20, 0),
                        child: ElevatedButton(
                          style: ElevatedButton.styleFrom(
                            backgroundColor: Color(0xFF070288),
                          ),
                          onPressed: () async {
                            await reportAccNumber(accountNumberController.text);
                          },
                          child: const Text(
                            'Report',
                            style: TextStyle(color: Colors.white),
                          ),
                        ),
                      ),
                    ],
                  ),
                  const SizedBox(height: 20),
                  Obx(
                    () => controller.isAccountNumberChecked.value
                        ? BlinkingText(
                            padding: const EdgeInsets.all(0),
                            text: controller.accountNumberPhishingText.value,
                          )
                        : BlinkingText(
                            text: controller.reportAccNumberText.value,
                            padding: const EdgeInsets.all(0)),
                  ),
                ],
              ),
            ),
          ],
        ));
  }
}
