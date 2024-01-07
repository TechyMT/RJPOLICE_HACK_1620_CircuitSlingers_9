import 'package:flutter/material.dart';
import 'package:get/get.dart';

class TermsAndConditions extends StatefulWidget {
  final PageController controller;
  TermsAndConditions({super.key, required this.controller});

  @override
  State<TermsAndConditions> createState() => _TermsAndConditionsState();
}

class _TermsAndConditionsState extends State<TermsAndConditions> {
  List<bool> termsChecklist = [
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false
  ];
  bool allTermsChecked = false;

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            const Text(
              "Before proceeding, please acknowledge the",
              style: TextStyle(fontSize: 17),
            ),
            const Text(
              "following guidlines : ",
              style: TextStyle(fontSize: 17),
            ),
            const Divider(
              height: 10,
              thickness: 5,
            ),
            Expanded(
              child: ListView(
                children: [
                  buildCheckListTile(
                      "Emergency: ",
                      "This reporting system is not for emergencies. In case of an immediate threat, contact local emergency services.",
                      0),
                  buildCheckListTile(
                      "Location: ",
                      "Ensure the reported incident falls within the app's specified jurisdiction.",
                      1),
                  buildCheckListTile(
                      "Suspects:",
                      "Confirm there are no known suspects or suspect vehicle descriptions related to the cybercrime.",
                      2),
                  buildCheckListTile(
                      "Cybercrimes: ",
                      "Report incidents like identity fraud, unauthorized access, online fraud, or related cyber offenses.",
                      3),
                  buildCheckListTile(
                      "Confirmation: ",
                      "After completion, a temporary case number will be provided. Keep it for confirmation, not an official report number.",
                      4),
                  buildCheckListTile(
                      "Review Process: ",
                      "All reports will be reviewed for approval or denial based on provided information.",
                      5),
                  buildCheckListTile(
                      "Contact: ",
                      "Authorities may contact you if further investigation is needed.",
                      6),
                  buildCheckListTile(
                      "Accuracy: ",
                      "Provide accurate information. Filing a false report is prohibited and may result in legal consequences.",
                      7),
                ],
              ),
            ),
            const Divider(
              height: 10,
              thickness: 5,
            ),
            const SizedBox(
              height: 10,
            ),
            GestureDetector(
              onTap: () {
                if (allTermsChecked) {
                  widget.controller.nextPage(
                    duration: Duration(milliseconds: 500),
                    curve: Curves.ease,
                  );
                } else {
                  Get.snackbar('Error', 'All boxes must be Checked');
                }
              },
              child: Text(
                "Accept And Continue ",
                style: TextStyle(fontSize: 17),
              ),
            ),
            const SizedBox(
              height: 10,
            ),
          ],
        ),
      ),
    );
  }

  Widget buildCheckListTile(String title, String subtitle, int index) {
    return CheckboxListTile(
        title: Text(
          title,
          style: const TextStyle(
              color: Colors.white,
              decoration: TextDecoration.underline,
              decorationColor: Colors.white),
        ),
        subtitle: Text(
          subtitle,
          style: const TextStyle(color: Colors.white38),
        ),
        value: termsChecklist[index],
        onChanged: (val) {
          setState(() {
            termsChecklist[index] = val!;
            allTermsChecked = termsChecklist.every((element) => element);
          });
        });
  }
}
