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
  var selectedCategory = 'Online Bank Fraud';
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
                      filled: true,
                      fillColor: const Color(0xFFCBD5E1),
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
                      filled: true,
                      fillColor: const Color(0xFFCBD5E1),
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
                      controller: detailsController.emailController,
                      style: const TextStyle(color: Colors.black),
                      keyboardType: TextInputType.emailAddress,
                      decoration: InputDecoration(
                        filled: true,
                        fillColor: const Color(0xFFCBD5E1),
                        hintStyle:
                            const TextStyle(color: Colors.black, fontSize: 15),
                        labelText: 'E-Mail',
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
                          .suspectNumberController.text = value!,
                    ),
                    const SizedBox(height: 8.0),
                  TextFormField(
                    controller: detailsController.aadharNumberController,
                    style: const TextStyle(color: Colors.black),
                    decoration: InputDecoration(
                      filled: true,
                      fillColor: const Color(0xFFCBD5E1),
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
                      filled: true,
                      fillColor: const Color(0xFFCBD5E1),
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
                    controller: detailsController.dateOfTransactionController,
                    style: const TextStyle(color: Colors.black),
                    decoration: InputDecoration(
                      filled: true,
                      fillColor: const Color(0xFFCBD5E1),
                      hintText: "dd-mm-yyyy Format",
                      hintStyle:
                          const TextStyle(color: Colors.black, fontSize: 15),
                      labelText: 'Date of Crime',
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
                        .dateOfTransactionController.text = value!,
                    validator: (value) {
                      if (value == null || value.isEmpty) {
                        return 'Date of Transaction has to be entered';
                      }
                      return null;
                    },
                  ),
                  const SizedBox(
                    height: 8,
                  ),
                  TextFormField(
                    controller: detailsController.cityController,
                    style: const TextStyle(color: Colors.black),
                    decoration: InputDecoration(
                      filled: true,
                      fillColor: const Color(0xFFCBD5E1),
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
                  const SizedBox(
                    height: 8,
                  ),
                  DropdownButtonFormField<String>(
                    value: selectedCategory,
                    onChanged: (newValue) {
                      detailsController.categoryController.text = newValue!;
                      selectedCategory = newValue;
                    },
                    items: const [
                      DropdownMenuItem(
                        value: 'Online Bank Fraud',
                        child: Text('Online Bank Fraud'),
                      ),
                      DropdownMenuItem(
                        value: 'Other Fraud',
                        child: Text('Other Fraud'),
                      ),
                    ],
                    decoration: InputDecoration(
                      filled: true,
                      fillColor: const Color(0xFFCBD5E1), 
                      hintText: 'Category - Online Bank or Other Fraud',
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
                  ),
                  const SizedBox(height: 10),
                  TextFormField(
                    controller: detailsController.pincodeController,
                    style: const TextStyle(color: Colors.black),
                    decoration: InputDecoration(
                      filled: true,
                      fillColor: const Color(0xFFCBD5E1),
                      hintText: 'Type NA if not Available',
                      hintStyle:
                          const TextStyle(color: Colors.black, fontSize: 15),
                      labelText: 'Pincode',
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
                  if (detailsController.isBankAccInvolved) ...[
                    const SizedBox(
                      height: 8,
                    ),
                    TextFormField(
                      controller:
                          detailsController.onlineAccountInformationController,
                      style: const TextStyle(color: Colors.black),
                      decoration: InputDecoration(
                        filled: true,
                        fillColor: const Color(0xFFCBD5E1),
                        hintText: "Bank Account Number",
                        hintStyle:
                            const TextStyle(color: Colors.black, fontSize: 15),
                        labelText: 'Bank Account Information',
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
                          return 'Bank Account Information has to be entered';
                        }
                        return null;
                      },
                    ),
                    const SizedBox(
                      height: 8,
                    ),
                    TextFormField(
                      controller: detailsController.transactionIdController,
                      style: const TextStyle(color: Colors.black),
                      decoration: InputDecoration(
                        filled: true,
                        fillColor: const Color(0xFFCBD5E1),
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
                      onSaved: (value) => detailsController
                          .transactionIdController.text = value!,
                    ),
                    const SizedBox(
                      height: 8,
                    ),
                    TextFormField(
                      controller: detailsController.amountLostController,
                      style: const TextStyle(color: Colors.black),
                      decoration: InputDecoration(
                        filled: true,
                        fillColor: const Color(0xFFCBD5E1),
                        hintText: "Type NA if not Applicable",
                        hintStyle:
                            const TextStyle(color: Colors.black, fontSize: 15),
                        labelText: 'Amount Lost',
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
                          detailsController.amountLostController.text = value!,
                      validator: (value) {
                        if (value == null || value.isEmpty) {
                          return 'Amount Lost has to be entered';
                        }
                        return null;
                      },
                    ),
                    const SizedBox(height: 10),
                    TextFormField(
                      controller: detailsController.dateOfTransactionController,
                      style: const TextStyle(color: Colors.black),
                      decoration: InputDecoration(
                        filled: true,
                        fillColor: const Color(0xFFCBD5E1),
                        hintText: "dd-mm-yyyy Format/NA",
                        hintStyle:
                            const TextStyle(color: Colors.black, fontSize: 15),
                        labelText: 'Date of Transaction',
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
                          .dateOfTransactionController.text = value!,
                      validator: (value) {
                        if (value == null || value.isEmpty) {
                          return 'Date of Transaction has to be entered';
                        }
                        return null;
                      },
                    ),
                    const SizedBox(height: 10),
                    TextFormField(
                      controller: detailsController.userBankNameController,
                      style: const TextStyle(color: Colors.black),
                      decoration: InputDecoration(
                        filled: true,
                        fillColor: const Color(0xFFCBD5E1),
                        hintText: 'Type NA if not Available',
                        hintStyle:
                            const TextStyle(color: Colors.black, fontSize: 15),
                        labelText: 'User Bank Name',
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
                          .suspectNumberController.text = value!,
                    ),
                  ],
                  SwitchListTile(
                    activeColor: Colors.black,
                    inactiveTrackColor: Colors.grey,
                    value: detailsController.isSuspectDetailsInvolved,
                    onChanged: (value) {
                      setState(() {
                        detailsController.isSuspectDetailsInvolved = value;
                      });
                    },
                    title: const Text(
                      'Do You have Suspect Details',
                      style: TextStyle(
                        color: Colors.black,
                      ),
                    ),
                  ),
                  if (detailsController.isSuspectDetailsInvolved) ...[
                    const SizedBox(
                      height: 8,
                    ),
                    TextFormField(
                      controller: detailsController.suspectBankNameController,
                      style: const TextStyle(color: Colors.black),
                      decoration: InputDecoration(
                        filled: true,
                        fillColor: const Color(0xFFCBD5E1),
                        hintText: 'Type NA if not Available',
                        hintStyle:
                            const TextStyle(color: Colors.black, fontSize: 15),
                        labelText: 'Suspect Bank Name',
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
                          .suspectNumberController.text = value!,
                    ),
                    const SizedBox(
                      height: 8,
                    ),
                    TextFormField(
                      controller: detailsController.suspectAccController,
                      style: const TextStyle(color: Colors.black),
                      decoration: InputDecoration(
                        filled: true,
                        fillColor: const Color(0xFFCBD5E1),
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
                    const SizedBox(height: 10),
                    TextFormField(
                      controller: detailsController.suspectNumberController,
                      style: const TextStyle(color: Colors.black),
                      decoration: InputDecoration(
                        filled: true,
                        fillColor: const Color(0xFFCBD5E1),
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
                      onSaved: (value) => detailsController
                          .suspectNumberController.text = value!,
                    ),
                    const SizedBox(height: 8.0),
                  ],
                  Obx(
                    () => ListTile(
                      leading: const Icon(Icons.add),
                      title: detailsController.filesAdded.value
                          ? const Text('Files Added')
                          : const Text('Add Files'),
                      onTap: () async {
                        await detailsController.pickAndUploadFiles();
                        print(detailsController.evidenceURLs);
                      },
                    ),
                  ),
                  Obx(
                    () => ElevatedButton(
                      onPressed: () async {
                        if (_formKey.currentState!.validate()) {
                          _formKey.currentState!.save();
                          await fetchQuestions(detailsController
                              .incidentDescriptionController.text);
                        }
                        await detailsController.controllerInitialization();
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
