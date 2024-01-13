import 'package:circuitslingers/models/constants.dart';
import 'package:circuitslingers/views/crime_report/file_a_report.dart';
import 'package:circuitslingers/views/crime_report/questionnaire_format.dart';
import 'package:circuitslingers/views/crime_report/report_form.dart';
import 'package:circuitslingers/views/crime_report/terms_conditions.dart';
import 'package:circuitslingers/views/register_login/landingpage.dart';
import 'package:circuitslingers/views/user_views/onboarding.dart';
import 'package:firebase_auth/firebase_auth.dart';
import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:shared_preferences/shared_preferences.dart';

class ReportCrime extends StatefulWidget {
  const ReportCrime({super.key});

  @override
  State<ReportCrime> createState() => _ReportCrimeState();
}

class _ReportCrimeState extends State<ReportCrime> {
  PageController _pageController = PageController();
  int _currentPage = 0;
  @override
  Widget build(BuildContext context) {
    List<Widget> pages = [
      FileAReport(
        pageController: _pageController,
      ),
      TermsAndConditions(
        controller: _pageController,
      ),
      ReportForm(
        pageController: _pageController,
      ),
      QuestionnaireFormat(
        pageController: _pageController,
      )
    ];
    return Scaffold(
      appBar: AppBar(
        flexibleSpace: Container(
          decoration: const BoxDecoration(
            gradient: AppGradients.linearGradient,
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
      body: PageView(
        physics: const NeverScrollableScrollPhysics(),
        controller: _pageController,
        onPageChanged: (int page) {
          setState(() {
            _currentPage = page;
          });
        },
        children: pages,
      ),
    );
  }
}
