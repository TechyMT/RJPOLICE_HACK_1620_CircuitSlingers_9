import 'package:flutter/material.dart';
import 'package:get/get.dart';

class DetailsController extends GetxController {
  TextEditingController fullNameController = TextEditingController();
  TextEditingController dateOfBirthController = TextEditingController();
  TextEditingController aadharNumberController = TextEditingController();
  TextEditingController incidentDescriptionController = TextEditingController();
  TextEditingController cityController = TextEditingController();
  TextEditingController onlineAccountInformationController =
      TextEditingController();
  bool isBankAccInvolved = false;

  Future<void> clearControllers() async {
    fullNameController.text = '';
    dateOfBirthController.text = '';
    onlineAccountInformationController.text = '';
    cityController.text = '';
    incidentDescriptionController.text = '';
    aadharNumberController.text = '';
    isBankAccInvolved = false;
  }
}
