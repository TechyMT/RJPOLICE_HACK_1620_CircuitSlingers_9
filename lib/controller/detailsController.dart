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
  TextEditingController categoryController = TextEditingController();
  TextEditingController transactionIdController = TextEditingController();
  TextEditingController suspectNumberController = TextEditingController();
  TextEditingController suspectAccController = TextEditingController();
  bool isBankAccInvolved = false;

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
  }
}
