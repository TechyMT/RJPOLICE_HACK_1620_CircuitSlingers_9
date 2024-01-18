import 'dart:ffi';

import 'package:circuitslingers/controller/detailsController.dart';
import 'package:circuitslingers/controller/functionController.dart';
import 'package:circuitslingers/views/networking/networking.dart';
import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:flutter_tts/flutter_tts.dart';

class ReportForm extends StatefulWidget {
  final PageController pageController;

  ReportForm({super.key, required this.pageController});

  @override
  State<ReportForm> createState() => _ReportFormState();
}

class _ReportFormState extends State<ReportForm> {
  var selectedCategory = 'Financial Fraud';
  final FunctionController controller = Get.put(FunctionController());
  final DetailsController detailsController = Get.put(DetailsController());
  final _formKey = GlobalKey<FormState>();
  FlutterTts flutterTts = FlutterTts();
  List<String> witnesses = [];

  Future _speak(String text) async {
    await flutterTts.setLanguage("en-US");
    await flutterTts.setPitch(1.0);
    await flutterTts.setSpeechRate(0.5);

    await flutterTts.speak(text);
  }

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
                      fillColor: const Color(0xFFFFFFFF),
                      labelText: 'Full Name/पूरा नाम',
                      labelStyle: const TextStyle(color: Colors.black),
                      focusedBorder: OutlineInputBorder(
                        borderSide: const BorderSide(color: Color(0xFF5B57DC)),
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
                    onSaved: (value) =>
                        detailsController.fullNameController.text = value!,
                  ),
                  const SizedBox(
                    height: 14,
                  ),
                  TextFormField(
                    controller: detailsController.phoneNumberController,
                    style: const TextStyle(color: Colors.black),
                    decoration: InputDecoration(
                      filled: true,
                      fillColor: const Color(0xFFFFFFFF),
                      labelText: 'Phone Number/फ़ोन नंबर',
                      labelStyle: const TextStyle(color: Colors.black),
                      focusedBorder: OutlineInputBorder(
                        borderSide: const BorderSide(color: Color(0xFF5B57DC)),
                        borderRadius: BorderRadius.circular(20.0),
                      ),
                      enabledBorder: OutlineInputBorder(
                        borderSide: const BorderSide(color: Colors.black),
                        borderRadius: BorderRadius.circular(20),
                      ),
                    ),
                    validator: (value) {
                      if (value == null || value.isEmpty) {
                        return 'Number cannot be blank';
                      }
                      return null;
                    },
                    onSaved: (value) =>
                        detailsController.phoneNumberController.text = value!,
                  ),
                  const SizedBox(
                    height: 14,
                  ),
                  TextFormField(
                    controller: detailsController.dateOfBirthController,
                    style: const TextStyle(color: Colors.black),
                    decoration: InputDecoration(
                      filled: true,
                      fillColor: const Color(0xFFFFFFFF),
                      labelText: 'Date of Birth/जन्म की तारीख',
                      hintText: 'dd-mm-yyyy Format',
                      hintStyle:
                          const TextStyle(color: Colors.black, fontSize: 15),
                      labelStyle: const TextStyle(color: Colors.black),
                      focusedBorder: OutlineInputBorder(
                        borderSide: const BorderSide(color: Color(0xFF5B57DC)),
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
                    onTap: () async {
                      DateTime? pickedDate = await showDatePicker(
                        context: context,
                        initialDate: DateTime.now(),
                        firstDate: DateTime(1900),
                        lastDate: DateTime.now(),
                      );
                      if (pickedDate != null) {
                        detailsController.dateOfBirthController.text =
                            "${pickedDate.day}-${pickedDate.month}-${pickedDate.year}";
                      }
                    },
                    onSaved: (value) =>
                        detailsController.dateOfBirthController.text = value!,
                  ),
                  const SizedBox(
                    height: 14,
                  ),
                  TextFormField(
                    controller: detailsController.emailController,
                    style: const TextStyle(color: Colors.black),
                    keyboardType: TextInputType.emailAddress,
                    decoration: InputDecoration(
                      filled: true,
                      fillColor: const Color(0xFFFFFFFF),
                      hintStyle:
                          const TextStyle(color: Colors.black, fontSize: 15),
                      labelText: 'E-Mail/ईमेल',
                      labelStyle: const TextStyle(color: Colors.black),
                      focusedBorder: OutlineInputBorder(
                        borderSide: const BorderSide(color: Color(0xFF5B57DC)),
                        borderRadius: BorderRadius.circular(20),
                      ),
                      enabledBorder: OutlineInputBorder(
                        borderSide: const BorderSide(color: Colors.black),
                        borderRadius: BorderRadius.circular(20),
                      ),
                    ),
                    onSaved: (value) =>
                        detailsController.emailController.text = value!,
                  ),
                  const SizedBox(height: 14.0),
                  TextFormField(
                    controller: detailsController.aadharNumberController,
                    style: const TextStyle(color: Colors.black),
                    decoration: InputDecoration(
                      filled: true,
                      fillColor: const Color(0xFFFFFFFF),
                      labelText: 'Aadhar Number/आधार नंबर',
                      hintStyle:
                          const TextStyle(color: Colors.black, fontSize: 15),
                      labelStyle: const TextStyle(color: Colors.black),
                      focusedBorder: OutlineInputBorder(
                        borderSide: const BorderSide(color: Color(0xFF5B57DC)),
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
                    height: 14,
                  ),
                  TextFormField(
                    controller: detailsController.incidentDescriptionController,
                    style: const TextStyle(color: Colors.black),
                    decoration: InputDecoration(
                      filled: true,
                      fillColor: const Color(0xFFFFFFFF),
                      hintStyle:
                          const TextStyle(color: Colors.black, fontSize: 15),
                      labelText: 'Incident Description/घटना का विवरण',
                      labelStyle: const TextStyle(color: Colors.black),
                      focusedBorder: OutlineInputBorder(
                        borderSide: const BorderSide(color: Color(0xFF5B57DC)),
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
                    height: 14,
                  ),
                  TextFormField(
                    controller: detailsController.dateOfCrimeController,
                    style: const TextStyle(color: Colors.black),
                    decoration: InputDecoration(
                      filled: true,
                      fillColor: const Color(0xFFFFFFFF),
                      hintText: "dd-mm-yyyy Format",
                      hintStyle:
                          const TextStyle(color: Colors.black, fontSize: 15),
                      labelText: 'Date of Crime/अपराध की तारीख',
                      labelStyle: const TextStyle(color: Colors.black),
                      focusedBorder: OutlineInputBorder(
                        borderSide: const BorderSide(color: Color(0xFF5B57DC)),
                        borderRadius: BorderRadius.circular(20),
                      ),
                      enabledBorder: OutlineInputBorder(
                        borderSide: const BorderSide(color: Colors.black),
                        borderRadius: BorderRadius.circular(20),
                      ),
                    ),
                    onTap: () async {
                      DateTime? pickedDate = await showDatePicker(
                        context: context,
                        initialDate: DateTime.now(),
                        firstDate: DateTime(1900),
                        lastDate: DateTime.now(),
                      );
                      if (pickedDate != null) {
                        detailsController.dateOfCrimeController.text =
                            "${pickedDate.day}-${pickedDate.month}-${pickedDate.year}";
                      }
                    },
                    onSaved: (value) =>
                        detailsController.dateOfCrimeController.text = value!,
                    validator: (value) {
                      if (value == null || value.isEmpty) {
                        return 'Date of Crime has to be entered';
                      }
                      return null;
                    },
                  ),
                  const SizedBox(
                    height: 14,
                  ),
                  TextFormField(
                    controller: detailsController.cityController,
                    style: const TextStyle(color: Colors.black),
                    decoration: InputDecoration(
                      filled: true,
                      fillColor: const Color(0xFFFFFFFF),
                      hintStyle:
                          const TextStyle(color: Colors.black, fontSize: 15),
                      labelText: 'City/शहर',
                      labelStyle: const TextStyle(color: Colors.black),
                      focusedBorder: OutlineInputBorder(
                        borderSide: const BorderSide(color: Color(0xFF5B57DC)),
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
                  const SizedBox(height: 10),
                  TextFormField(
                    controller: detailsController.messageorEmailController,
                    style: const TextStyle(color: Colors.black),
                    decoration: InputDecoration(
                      filled: true,
                      fillColor: const Color(0xFFFFFFFF),
                      hintText: 'Type NA if not Available',
                      hintStyle:
                          const TextStyle(color: Colors.black, fontSize: 15),
                      labelText:
                          'Email Text or Message Text/ईमेल टेक्स्ट या संदेश टेक्स्ट',
                      helperText:
                          'Enter message or email received to identify phishing',
                      labelStyle: const TextStyle(color: Colors.black),
                      focusedBorder: OutlineInputBorder(
                        borderSide: const BorderSide(color: Color(0xFF5B57DC)),
                        borderRadius: BorderRadius.circular(20),
                      ),
                      enabledBorder: OutlineInputBorder(
                        borderSide: const BorderSide(color: Colors.black),
                        borderRadius: BorderRadius.circular(20),
                      ),
                    ),
                    onSaved: (value) => detailsController
                        .messageorEmailController.text = value!,
                  ),
                  const SizedBox(height: 10),
                  DropdownButtonFormField<String>(
                    value: selectedCategory,
                    onChanged: (String? newValue) {
                      if (newValue != null) {
                        setState(() {
                          selectedCategory = newValue;
                          detailsController.categoryController.text = newValue;
                        });
                      }
                    },
                    items: <String>[
                      'Financial Fraud',
                      'Identity Theft',
                      'Phishing Scam',
                      'Online Shopping Fraud',
                      'Ransomware Attacks',
                      ' Social Engineering'
                    ].map<DropdownMenuItem<String>>((String value) {
                      return DropdownMenuItem<String>(
                        value: value,
                        child: Text(value),
                      );
                    }).toList(),
                    decoration: InputDecoration(
                      filled: true,
                      fillColor: const Color(0xFFFFFFFF),
                      labelText: 'Category/श्रेणी',
                      labelStyle: const TextStyle(color: Colors.black),
                      focusedBorder: OutlineInputBorder(
                        borderSide: const BorderSide(color: Color(0xFF5B57DC)),
                        borderRadius: BorderRadius.circular(20),
                      ),
                      enabledBorder: OutlineInputBorder(
                        borderSide: const BorderSide(color: Colors.black),
                        borderRadius: BorderRadius.circular(20),
                      ),
                    ),
                  ),
                  const SizedBox(
                    height: 14,
                  ),
                  TextFormField(
                    controller: detailsController.pincodeController,
                    style: const TextStyle(color: Colors.black),
                    decoration: InputDecoration(
                      filled: true,
                      fillColor: const Color(0xFFFFFFFF),
                      hintText: 'Type NA if not Available',
                      hintStyle:
                          const TextStyle(color: Colors.black, fontSize: 15),
                      labelText: 'Pincode/पिनकोड',
                      labelStyle: const TextStyle(color: Colors.black),
                      focusedBorder: OutlineInputBorder(
                        borderSide: const BorderSide(color: Color(0xFF5B57DC)),
                        borderRadius: BorderRadius.circular(20),
                      ),
                      enabledBorder: OutlineInputBorder(
                        borderSide: const BorderSide(color: Colors.black),
                        borderRadius: BorderRadius.circular(20),
                      ),
                    ),
                    onSaved: (value) =>
                        detailsController.pincodeController.text = value!,
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
                      'Is Bank Account Involved/क्या बैंक शामिल है',
                      style: TextStyle(
                        color: Colors.black,
                      ),
                    ),
                  ),
                  if (detailsController.isBankAccInvolved) ...[
                    const SizedBox(
                      height: 14,
                    ),
                    TextFormField(
                      controller:
                          detailsController.onlineAccountInformationController,
                      style: const TextStyle(color: Colors.black),
                      decoration: InputDecoration(
                        filled: true,
                        fillColor: const Color(0xFFFFFFFF),
                        hintText: "Bank Account Number",
                        hintStyle:
                            const TextStyle(color: Colors.black, fontSize: 15),
                        labelText: 'Bank Account Information/बैंक खाता संख्या',
                        labelStyle: const TextStyle(color: Colors.black),
                        focusedBorder: OutlineInputBorder(
                          borderSide:
                              const BorderSide(color: Color(0xFF5B57DC)),
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
                      height: 14,
                    ),
                    TextFormField(
                      controller: detailsController.transactionIdController,
                      style: const TextStyle(color: Colors.black),
                      decoration: InputDecoration(
                        filled: true,
                        fillColor: const Color(0xFFFFFFFF),
                        hintText: 'Type NA if not Available',
                        hintStyle:
                            const TextStyle(color: Colors.black, fontSize: 15),
                        labelText: 'Transaction ID/c',
                        labelStyle: const TextStyle(color: Colors.black),
                        focusedBorder: OutlineInputBorder(
                          borderSide:
                              const BorderSide(color: Color(0xFF5B57DC)),
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
                      height: 14,
                    ),
                    TextFormField(
                      controller: detailsController.amountLostController,
                      style: const TextStyle(color: Colors.black),
                      decoration: InputDecoration(
                        filled: true,
                        fillColor: const Color(0xFFFFFFFF),
                        hintText: "Type NA if not Applicable",
                        hintStyle:
                            const TextStyle(color: Colors.black, fontSize: 15),
                        labelText: 'Amount Lost/गुम हुआ राशि',
                        labelStyle: const TextStyle(color: Colors.black),
                        focusedBorder: OutlineInputBorder(
                          borderSide:
                              const BorderSide(color: Color(0xFF5B57DC)),
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
                        fillColor: const Color(0xFFFFFFFF),
                        hintText: "dd-mm-yyyy Format/NA",
                        hintStyle:
                            const TextStyle(color: Colors.black, fontSize: 15),
                        labelText: 'Date of Transaction/लेन-देन की तारीख',
                        labelStyle: const TextStyle(color: Colors.black),
                        focusedBorder: OutlineInputBorder(
                          borderSide:
                              const BorderSide(color: Color(0xFF5B57DC)),
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
                      onTap: () async {
                        DateTime? pickedDate = await showDatePicker(
                          context: context,
                          initialDate: DateTime.now(),
                          firstDate: DateTime(1900),
                          lastDate: DateTime.now(),
                        );
                        if (pickedDate != null) {
                          detailsController.dateOfTransactionController.text =
                              "${pickedDate.day}-${pickedDate.month}-${pickedDate.year}";
                        }
                      },
                    ),
                    const SizedBox(height: 10),
                    TextFormField(
                      controller: detailsController.userBankNameController,
                      style: const TextStyle(color: Colors.black),
                      decoration: InputDecoration(
                        filled: true,
                        fillColor: const Color(0xFFFFFFFF),
                        hintText: 'Type NA if not Available',
                        hintStyle:
                            const TextStyle(color: Colors.black, fontSize: 15),
                        labelText: 'User Bank Name/उपभोक्ता बैंक का नाम',
                        labelStyle: const TextStyle(color: Colors.black),
                        focusedBorder: OutlineInputBorder(
                          borderSide:
                              const BorderSide(color: Color(0xFF5B57DC)),
                          borderRadius: BorderRadius.circular(20),
                        ),
                        enabledBorder: OutlineInputBorder(
                          borderSide: const BorderSide(color: Colors.black),
                          borderRadius: BorderRadius.circular(20),
                        ),
                      ),
                      onSaved: (value) => detailsController
                          .userBankNameController.text = value!,
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
                      'Do You have Suspect Details/क्या आपके पास संदेहजनक विवरण हैं',
                      style: TextStyle(
                        color: Colors.black,
                      ),
                    ),
                  ),
                  if (detailsController.isSuspectDetailsInvolved) ...[
                    const SizedBox(
                      height: 14,
                    ),
                    TextFormField(
                      controller: detailsController.suspectBankNameController,
                      style: const TextStyle(color: Colors.black),
                      decoration: InputDecoration(
                        filled: true,
                        fillColor: const Color(0xFFFFFFFF),
                        hintText: 'Type NA if not Available',
                        hintStyle:
                            const TextStyle(color: Colors.black, fontSize: 15),
                        labelText: 'Bank Name/शंका जनक बैंक का नाम',
                        labelStyle: const TextStyle(color: Colors.black),
                        focusedBorder: OutlineInputBorder(
                          borderSide:
                              const BorderSide(color: Color(0xFF5B57DC)),
                          borderRadius: BorderRadius.circular(20),
                        ),
                        enabledBorder: OutlineInputBorder(
                          borderSide: const BorderSide(color: Colors.black),
                          borderRadius: BorderRadius.circular(20),
                        ),
                      ),
                      onSaved: (value) => detailsController
                          .suspectBankNameController.text = value!,
                    ),
                    const SizedBox(
                      height: 14,
                    ),
                    TextFormField(
                      controller: detailsController.suspectAccController,
                      style: const TextStyle(color: Colors.black),
                      decoration: InputDecoration(
                        filled: true,
                        fillColor: const Color(0xFFFFFFFF),
                        hintText: 'Type NA if not Available',
                        hintStyle:
                            const TextStyle(color: Colors.black, fontSize: 15),
                        labelText: 'Account Details/शंका जनक खाता संख्या',
                        labelStyle: const TextStyle(color: Colors.black),
                        focusedBorder: OutlineInputBorder(
                          borderSide:
                              const BorderSide(color: Color(0xFF5B57DC)),
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
                        fillColor: const Color(0xFFFFFFFF),
                        hintText: 'Type NA if not Available',
                        hintStyle:
                            const TextStyle(color: Colors.black, fontSize: 15),
                        labelText: 'Phone Number/शंका जनक फ़ोन नंबर',
                        labelStyle: const TextStyle(color: Colors.black),
                        focusedBorder: OutlineInputBorder(
                          borderSide:
                              const BorderSide(color: Color(0xFF5B57DC)),
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
                      leading: detailsController.filesAdded.value
                          ? Icon(Icons.done)
                          : detailsController.addingFiles.value
                              ? CircularProgressIndicator()
                              : Icon(Icons.add),
                      title: detailsController.filesAdded.value
                          ? const Text('Files Added')
                          : detailsController.addingFiles.value
                              ? const Text('Adding Files')
                              : const Text('Add Evidences/सबूत जोड़ें'),
                      onTap: () async {
                        await detailsController.pickAndUploadFiles();
                        print(detailsController.evidenceURLs);
                      },
                    ),
                  ),
                  Obx(
                    () => ElevatedButton(
                        onPressed: controller.isButtonEnabled.value
                            ? () async {
                                if (_formKey.currentState!.validate()) {
                                  _formKey.currentState!.save();
                                  print("Hello");
                                  await fetchQuestions(
                                    detailsController
                                        .incidentDescriptionController.text,
                                  );
                                }
                                await detailsController
                                    .controllerInitialization();
                                widget.pageController.nextPage(
                                  duration: const Duration(milliseconds: 500),
                                  curve: Curves.ease,
                                );
                              }
                            : null,
                        child: controller.isLoading.value
                            ? const CircularProgressIndicator()
                            : const Text('Submit')),
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
