import 'package:awesome_dialog/awesome_dialog.dart';
import 'package:circuitslingers/controller/credentialcontroller.dart';
import 'package:circuitslingers/controller/detailsController.dart';
import 'package:circuitslingers/controller/functionController.dart';
import 'package:circuitslingers/models/question.dart';
import 'package:circuitslingers/views/Home.dart';
import 'package:circuitslingers/views/networking/networking.dart';
import 'package:flutter/material.dart';
import 'package:get/get.dart';

class QuestionnaireFormat extends StatelessWidget {
  final PageController pageController;
  final FunctionController functionController = Get.put(FunctionController());
  final DetailsController controller = Get.put(DetailsController());
  final CredentialController credentialController =
      Get.put(CredentialController());
  QuestionnaireFormat({super.key, required this.pageController});
  void showSuccessDialog(BuildContext context, int trackId) {
    AwesomeDialog(
      dialogBackgroundColor: Color(0xFF1D1D1D),
      titleTextStyle: TextStyle(color: Colors.white),
      descTextStyle: TextStyle(color: Colors.white),
      context: context,
      dialogType: DialogType.success,
      animType: AnimType.bottomSlide,
      title: 'Success',
      desc:
          'Your report has been submitted successfully.\nYour Tracking ID is $trackId.',
      btnOkOnPress: () {
        Get.offAll(() => Home());
      },
    ).show();
  }

  void showFailureDialog(BuildContext context) {
    AwesomeDialog(
      context: context,
      dialogType: DialogType.error,
      animType: AnimType.bottomSlide,
      titleTextStyle: TextStyle(color: Colors.white),
      descTextStyle: TextStyle(color: Colors.white),
      title: 'Error',
      desc: 'Failed to submit the report. Please try again.',
      btnOkOnPress: () {
        Get.offAll(() => Home());
      },
    ).show();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Column(
        children: [
          const SizedBox(
            height: 12,
          ),
          const Text(
            'Answer These',
            style: TextStyle(fontSize: 18, color: Colors.black),
          ),
          Expanded(
            child: Center(
              child: Obx(
                () {
                  if (functionController.questionnaireList.value != null) {
                    return ListView.builder(
                      itemCount: functionController
                          .questionnaireList.value!.questions.length,
                      itemBuilder: (context, index) {
                        final question = functionController
                            .questionnaireList.value!.questions[index];
                        return QuestionTile(question: question);
                      },
                    );
                  } else {
                    return const Text('Press the button to load questions.');
                  }
                },
              ),
            ),
          ),
          Row(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              ElevatedButton(
                style: ElevatedButton.styleFrom(
                  backgroundColor: Color.fromARGB(255, 219, 11, 11),
                ),
                onPressed: () {
                  pageController.previousPage(
                    duration: const Duration(milliseconds: 500),
                    curve: Curves.ease,
                  );
                },
                child: const Text('Previous',
                    style: TextStyle(color: Colors.white)),
              ),
              SizedBox(
                width: 30,
              ),
              ElevatedButton(
                style: ElevatedButton.styleFrom(
                  backgroundColor: Color(0xFF070288),
                ),
                onPressed: () async {
                  await functionController.submitAnswers();
                  int track_id = await submitReport();
                   makePostRequest();
                   giveSuggestions(track_id);
                  if (functionController.isReportSubmitted.value) {
                    await functionController.clearList();
                    await controller.clearControllers();
                    credentialController.tracking_ids.add(track_id);
                    showSuccessDialog(context, track_id);
                  } else {
                    showFailureDialog(context);
                  }
                },
                child: const Text(
                  'Submit Answers',
                  style: TextStyle(color: Colors.white),
                ),
              ),
            ],
          ),
        ],
      ),
    );
  }
}

class QuestionTile extends StatelessWidget {
  final Question question;

  QuestionTile({required this.question});

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.all(8.0),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(
            "Q. ${question.question}",
            style: const TextStyle(
                fontSize: 18, fontWeight: FontWeight.bold, color: Colors.black),
          ),
          const SizedBox(height: 8),
          TextField(
            style: const TextStyle(color: Colors.black),
            maxLines: 6,
            onChanged: (value) {
              question.response = value;
            },
            decoration: const InputDecoration(
              labelStyle: TextStyle(color: Colors.black),
              hintStyle: TextStyle(color: Colors.black),
              hintText: 'Type your answer here',
              border: OutlineInputBorder(),
            ),
          ),
          const SizedBox(height: 16),
        ],
      ),
    );
  }
}
