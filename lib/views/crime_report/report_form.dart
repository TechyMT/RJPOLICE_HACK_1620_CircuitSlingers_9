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
          SizedBox(
            height: 15,
          ),
          const Center(
            child: Text(
              'Details',
              style: TextStyle(
                fontSize: 18,
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
                    style: const TextStyle(color: Colors.white),
                    decoration: const InputDecoration(
                      labelText: 'Full Name',
                      labelStyle: TextStyle(color: Colors.white),
                    ),
                    validator: (value) {
                      if (value == null || value.isEmpty) {
                        return 'Full name cannot be blank';
                      }
                      return null;
                    },
                  ),
                  TextFormField(
                    controller: detailsController.dateOfBirthController,
                    style: const TextStyle(color: Colors.white),
                    decoration: const InputDecoration(
                      labelText: 'Date of Birth',
                      hintText: 'dd-mm-yyyy Format',
                      hintStyle: TextStyle(color: Colors.white, fontSize: 15),
                      labelStyle: TextStyle(color: Colors.white),
                    ),
                    validator: (value) {
                      if (value == null || value.isEmpty) {
                        return 'Date of birth cannot be blank';
                      }
                      return null;
                    },
                    onSaved: (value) => detailsController.dateOfBirthController.text = value!,
                  ),
                  TextFormField(
                    controller: detailsController.aadharNumberController,
                    style: const TextStyle(color: Colors.white),
                    decoration: const InputDecoration(
                      labelText: 'Aadhar Number',
                      hintStyle: TextStyle(color: Colors.white, fontSize: 15),
                      labelStyle: TextStyle(color: Colors.white),
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
                         onSaved: (value) => detailsController.aadharNumberController.text = value!,
                  ),
                  TextFormField(
                    controller: detailsController.incidentDescriptionController,
                    style: const TextStyle(color: Colors.white),
                    decoration: const InputDecoration(
                      hintStyle: TextStyle(color: Colors.white, fontSize: 15),
                      labelText: 'Incident Description',
                      labelStyle: TextStyle(color: Colors.white),
                      alignLabelWithHint: true,
                    ),
                    maxLines: 10,
                    validator: (value) {
                      if (value == null || value.isEmpty) {
                        return 'Incident description cannot be blank';
                      }
                      return null;
                    },
                                onSaved: (value) => detailsController.incidentDescriptionController.text = value!,
                  ),
                  TextFormField(
                    controller: detailsController.cityController,
                    style: const TextStyle(color: Colors.white),
                    decoration: const InputDecoration(
                      hintStyle: TextStyle(color: Colors.white, fontSize: 15),
                      labelText: 'City',
                      labelStyle: TextStyle(color: Colors.white),
                    ),
                    validator: (value) {
                      if (value == null || value.isEmpty) {
                        return 'City has to be entered';
                      }
                      return null;
                    },
                    onSaved: (value) => detailsController.cityController.text = value!,
                  ),
                  const SizedBox(
                    height: 8,
                  ),
                  SwitchListTile(
                    activeColor: Colors.white,
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
                        color: Colors.white,
                      ),
                    ),
                  ),
                  const Divider(
                    height: 5,
                  ),
                  TextFormField(
                    controller: detailsController.onlineAccountInformationController,
                    style: const TextStyle(color: Colors.white),
                    decoration: const InputDecoration(
                      hintText: "Bank Account Number ",
                      hintStyle: TextStyle(color: Colors.white, fontSize: 15),
                      labelText: 'Online Account Information',
                      labelStyle: TextStyle(color: Colors.white),
                    ),
                              onSaved: (value) => detailsController.onlineAccountInformationController.text = value!,
                  ),
                  // TextFormField(
                  //   style: const TextStyle(color: Colors.white),
                  //   decoration: const InputDecoration(
                  //       labelText: 'Witnesses (comma-separated)',
                  //       hintText: 'Name-Number Format',
                  //       hintStyle: TextStyle(color: Colors.white, fontSize: 15),
                  //       labelStyle: TextStyle(color: Colors.white)),
                  //   onSaved: (value) => witnesses =
                  //       value!.split(',').map((w) => w.trim()).toList(),
                  // ),
                  const SizedBox(height: 16.0),
                  Obx(
                    () => ElevatedButton(
                      onPressed: () async {
                        if (_formKey.currentState!.validate()) {
                          _formKey.currentState!.save();
                          await fetchQuestions(
                              detailsController.incidentDescriptionController.text);
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
