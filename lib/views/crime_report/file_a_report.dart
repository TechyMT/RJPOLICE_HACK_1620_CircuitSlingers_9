import 'package:circuitslingers/views/crime_report/terms_conditions.dart';
import 'package:flutter/material.dart';
import 'package:get/get.dart';

class FileAReport extends StatelessWidget {
  final PageController pageController;
  FileAReport({super.key, required this.pageController});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Center(
          child: Column(
        children: [
          Container(
            height: MediaQuery.of(context).size.height * 0.5,
            child: Image.asset('assets/Illustration.jpg'),
          ),
          const SizedBox(
            height: 40,
          ),
          Container(
            width: MediaQuery.of(context).size.width * 0.8,
            height: MediaQuery.of(context).size.height * 0.06,
            child: ElevatedButton(
              style: ButtonStyle(
                backgroundColor: MaterialStateProperty.all(
                  const Color(0XFFFFE500),
                ),
              ),
              onPressed: () {
                pageController.nextPage(
                  duration: Duration(milliseconds: 500),
                  curve: Curves.ease,
                );
              },
              child: const Text(
                "File A Report",
                style: TextStyle(color: Colors.black, fontSize: 19),
              ),
            ),
          ),
          const SizedBox(
            height: 20,
          ),
          const Text(
            'It will take you less',
            style: TextStyle(
                decoration: TextDecoration.underline,
                decorationColor: Colors.white,
                fontSize: 17,
                fontWeight: FontWeight.bold,
                color: Colors.white),
          ),
          const Text(
            'than 2 minutes to report your crime',
            style: TextStyle(
                decoration: TextDecoration.underline,
                decorationColor: Colors.white,
                fontWeight: FontWeight.bold,
                fontSize: 17,
                color: Colors.white),
          ),
          const SizedBox(
            height: 30,
          ),
          const Text(
            "In CASE of Emergency CALL 1930",
            style: TextStyle(
                fontSize: 20, fontWeight: FontWeight.bold, color: Colors.grey),
          ),
        ],
      )),
    );
  }
}
