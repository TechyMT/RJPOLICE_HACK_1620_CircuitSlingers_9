import 'dart:io';
import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:file_picker/file_picker.dart';
import 'package:firebase_storage/firebase_storage.dart';
import 'package:shared_preferences/shared_preferences.dart';

class DetailsController extends GetxController {
  TextEditingController fullNameController = TextEditingController();
  TextEditingController dateOfBirthController = TextEditingController();
  TextEditingController aadharNumberController = TextEditingController();
  TextEditingController incidentDescriptionController = TextEditingController();
  TextEditingController cityController = TextEditingController();
  TextEditingController onlineAccountInformationController =
      TextEditingController();
  TextEditingController categoryController = TextEditingController();
  TextEditingController transactionIdController = TextEditingController();
  TextEditingController suspectNumberController = TextEditingController();
  TextEditingController suspectAccController = TextEditingController();
  TextEditingController amountLostController = TextEditingController();
  TextEditingController dateOfCrimeController = TextEditingController();
  TextEditingController dateOfReportController = TextEditingController();
  TextEditingController dateOfTransactionController = TextEditingController();
  TextEditingController userBankNameController = TextEditingController();
  TextEditingController suspectBankNameController = TextEditingController();
  TextEditingController pincodeController = TextEditingController();
  bool isBankAccInvolved = false;
  bool isSuspectDetailsInvolved = false;
  List<String> evidenceURLs = [];

  Future<void> clearControllers() async {
    fullNameController.text = '';
    dateOfBirthController.text = '';
    onlineAccountInformationController.text = '';
    cityController.text = '';
    incidentDescriptionController.text = '';
    aadharNumberController.text = '';
    categoryController.text = '';
    transactionIdController.text = '';
    suspectAccController.text = '';
    suspectAccController.text = '';
    isBankAccInvolved = false;
    amountLostController.text = '';
    dateOfCrimeController.text = '';
    dateOfReportController.text = '';
    dateOfTransactionController.text = '';
    evidenceURLs.clear();
    filesAdded.value = false;
  }

  List<PlatformFile> pickedFiles = [];
  RxBool filesAdded = false.obs;

  Future<void> pickAndUploadFiles() async {
    SharedPreferences sharedPreferences = await SharedPreferences.getInstance();
    String? userName = sharedPreferences.getString('userId');

    final result = await FilePicker.platform.pickFiles(allowMultiple: true);

    if (result == null || result.files.isEmpty) {
      return;
    }

    pickedFiles.addAll(result.files);

    for (var file in pickedFiles) {
      File files = File(file.path!);
      String fileName = file.name;
      Reference storageRef =
          FirebaseStorage.instance.ref('$userName').child(fileName);

      UploadTask uploadTask = storageRef.putFile(files);

      await uploadTask.whenComplete(() async {
        String fileUrl = await storageRef.getDownloadURL();
        evidenceURLs.add(fileUrl);
        filesAdded.value = true;
      });
    }
  }

  Future<void> controllerInitialization() async {
      List<TextEditingController> controllers = [
          fullNameController,
          dateOfBirthController,
          aadharNumberController,
          incidentDescriptionController,
          cityController,
          onlineAccountInformationController,
          categoryController,
          transactionIdController,
          suspectNumberController,
          suspectAccController,
          amountLostController,
          dateOfCrimeController,
          dateOfReportController,
          dateOfTransactionController,
          userBankNameController,
          suspectBankNameController,
          pincodeController,
        ];

        controllers.forEach((controller) {
          if (controller.text.isEmpty) {
            controller.text = "NA";
          }
        });
  }
}
