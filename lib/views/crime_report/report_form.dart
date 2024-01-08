import 'dart:ffi';

import 'package:circuitslingers/controller/detailsController.dart';
import 'package:circuitslingers/controller/functionController.dart';
import 'package:circuitslingers/views/networking/networking.dart';
import 'package:flutter/material.dart';
import 'package:get/get.dart';

class ReportForm extends StatefulWidget {
  final PageController pageController;

  ReportForm({super.key, required this.pageController});

  @override
  State<ReportForm> createState() => _ReportFormState();
}

class _ReportFormState extends State<ReportForm> {
  final FunctionController controller = Get.put(FunctionController());
  final DetailsController detailsController = Get.put(DetailsController());
  final _formKey = GlobalKey<FormState>();

  List<String> witnesses = [];

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Column(
        children: [
          const SizedBox(
            height: 15,
          ),
          const Center(
            child: Text(
              'Details',
              style: TextStyle(
                fontSize: 18,
                color: Colors.black,
              ),
            ),
          ),
          Expanded(
            child: Form(
              key: _formKey,
              child: ListView(
                padding: const EdgeInsets.all(16.0),
                children: [
                  TextFormField(
                    controller: detailsController.fullNameController,
                    style: const TextStyle(color: Colors.black),
                    decoration: InputDecoration(
                      labelText: 'Full Name',
                      labelStyle: const TextStyle(color: Colors.black),
                      focusedBorder: OutlineInputBorder(
                        borderSide: const BorderSide(color: Colors.black),
                        borderRadius: BorderRadius.circular(20.0),
                      ),
                      enabledBorder: OutlineInputBorder(
                        borderSide: const BorderSide(color: Colors.black),
                        borderRadius: BorderRadius.circular(20),
                      ),
                    ),
                    validator: (value) {
                      if (value == null || value.isEmpty) {
                        return 'Full name cannot be blank';
                      }
                      return null;
                    },
                  ),
                  const SizedBox(
                    height: 8,
                  ),
                  TextFormField(
                    controller: detailsController.dateOfBirthController,
                    style: const TextStyle(color: Colors.black),
                    decoration: InputDecoration(
                      labelText: 'Date of Birth',
                      hintText: 'dd-mm-yyyy Format',
                      hintStyle:
                          const TextStyle(color: Colors.black, fontSize: 15),
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
                    validator: (value) {
                      if (value == null || value.isEmpty) {
                        return 'Date of birth cannot be blank';
                      }
                      return null;
                    },
                    onSaved: (value) =>
                        detailsController.dateOfBirthController.text = value!,
                  ),
                  const SizedBox(
                    height: 8,
                  ),
                  TextFormField(
                    controller: detailsController.aadharNumberController,
                    style: const TextStyle(color: Colors.black),
                    decoration: InputDecoration(
                      labelText: 'Aadhar Number',
                      hintStyle:
                          const TextStyle(color: Colors.black, fontSize: 15),
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
                    validator: (value) {
                      if (value == null || value.isEmpty) {
                        return 'Aadhar number cannot be blank';
                      }
                      // else if (!RegExp(r'\d{12}').hasMatch(value)) {
                      //   return 'Invalid Aadhar number format';
                      // }
                      return null;
                    },
                    onSaved: (value) =>
                        detailsController.aadharNumberController.text = value!,
                  ),
                  const SizedBox(
                    height: 8,
                  ),
                  TextFormField(
                    controller: detailsController.incidentDescriptionController,
                    style: const TextStyle(color: Colors.black),
                    decoration: InputDecoration(
                      hintStyle:
                          const TextStyle(color: Colors.black, fontSize: 15),
                      labelText: 'Incident Description',
                      labelStyle: const TextStyle(color: Colors.black),
                      focusedBorder: OutlineInputBorder(
                        borderSide: const BorderSide(color: Colors.black),
                        borderRadius: BorderRadius.circular(20),
                      ),
                      enabledBorder: OutlineInputBorder(
                        borderSide: const BorderSide(color: Colors.black),
                        borderRadius: BorderRadius.circular(20),
                      ),
                      alignLabelWithHint: true,
                    ),
                    maxLines: 10,
                    validator: (value) {
                      if (value == null || value.isEmpty) {
                        return 'Incident description cannot be blank';
                      }
                      return null;
                    },
                    onSaved: (value) => detailsController
                        .incidentDescriptionController.text = value!,
                  ),
                  const SizedBox(
                    height: 8,
                  ),
                  TextFormField(
                    controller: detailsController.cityController,
                    style: const TextStyle(color: Colors.black),
                    decoration: InputDecoration(
                      hintStyle:
                          const TextStyle(color: Colors.black, fontSize: 15),
                      labelText: 'City',
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
                    validator: (value) {
                      if (value == null || value.isEmpty) {
                        return 'City has to be entered';
                      }
                      return null;
                    },
                    onSaved: (value) =>
                        detailsController.cityController.text = value!,
                  ),
                  SwitchListTile(
                    activeColor: Colors.black,
                    inactiveTrackColor: Colors.grey,
                    value: detailsController.isBankAccInvolved,
                    onChanged: (value) {
                      setState(() {
                        detailsController.isBankAccInvolved = value;
                      });
                    },
                    title: const Text(
                      'Is Bank Account Involved',
                      style: TextStyle(
                        color: Colors.black,
                      ),
                    ),
                  ),
                  const SizedBox(
                    height: 8,
                  ),
                  TextFormField(
                    controller:
                        detailsController.onlineAccountInformationController,
                    style: const TextStyle(color: Colors.black),
                    decoration: InputDecoration(
                      hintText: "Bank Account Number ",
                      hintStyle:
                          const TextStyle(color: Colors.black, fontSize: 15),
                      labelText: 'Online Account Information',
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
                    onSaved: (value) => detailsController
                        .onlineAccountInformationController.text = value!,
                    validator: (value) {
                      if (value == null || value.isEmpty) {
                        return 'City has to be entered';
                      }
                      return null;
                    },
                  ),
                  const SizedBox(
                    height: 8,
                  ),
                  TextFormField(
                    controller: detailsController.categoryController,
                    style: const TextStyle(color: Colors.black),
                    decoration: InputDecoration(
                      hintText: 'Category - Online or Other Fraud',
                      hintStyle:
                          const TextStyle(color: Colors.black, fontSize: 15),
                      labelText: 'Category',
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
                    onSaved: (value) =>
                        detailsController.categoryController.text = value!,
                  ),
                  const SizedBox(
                    height: 8,
                  ),
                  TextFormField(
                    controller: detailsController.transactionIdController,
                    style: const TextStyle(color: Colors.black),
                    decoration: InputDecoration(
                      hintText: 'Type NA if not Available',
                      hintStyle:
                          const TextStyle(color: Colors.black, fontSize: 15),
                      labelText: 'Transaction ID',
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
                    onSaved: (value) =>
                        detailsController.transactionIdController.text = value!,
                  ),
                  const SizedBox(
                    height: 8,
                  ),
                  TextFormField(
                    controller: detailsController.suspectNumberController,
                    style: const TextStyle(color: Colors.black),
                    decoration: InputDecoration(
                      hintText: 'Type NA if not Available',
                      hintStyle:
                          const TextStyle(color: Colors.black, fontSize: 15),
                      labelText: 'Suspect Phone Number',
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
                    onSaved: (value) =>
                        detailsController.suspectNumberController.text = value!,
                  ),
                  const SizedBox(
                    height: 8,
                  ),
                  TextFormField(
                    controller: detailsController.suspectAccController,
                    style: const TextStyle(color: Colors.black),
                    decoration: InputDecoration(
                      hintText: 'Type NA if not Available',
                      hintStyle:
                          const TextStyle(color: Colors.black, fontSize: 15),
                      labelText: 'Suspect Account Details',
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
                    onSaved: (value) =>
                        detailsController.suspectAccController.text = value!,
                  ),
                  const SizedBox(height: 16.0),
                  Obx(
                    () => ElevatedButton(
                      onPressed: () async {
                        if (_formKey.currentState!.validate()) {
                          _formKey.currentState!.save();
                          await fetchQuestions(detailsController
                              .incidentDescriptionController.text);
                        }
                        widget.pageController.nextPage(
                          duration: const Duration(milliseconds: 500),
                          curve: Curves.ease,
                        );
                      },
                      child: controller.answerQuestions.value
                          ? const Text('Answer Questions')
                          : const Text('Submit'),
                    ),
                  ),
                ],
              ),
            ),
          ),
        ],
      ),
    );
  }
}
