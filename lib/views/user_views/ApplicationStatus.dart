import 'package:circuitslingers/controller/ReportStatusController.dart';
import 'package:circuitslingers/controller/functionController.dart';
import 'package:circuitslingers/models/constants.dart';
import 'package:circuitslingers/models/question.dart';
import 'package:circuitslingers/models/showDetailsBox.dart';
import 'package:circuitslingers/views/networking/networking.dart';
import 'package:circuitslingers/views/register_login/landingpage.dart';
import 'package:firebase_auth/firebase_auth.dart';
import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:shared_preferences/shared_preferences.dart';

class ApplicationStatus extends StatelessWidget {
  final FunctionController functionController = Get.put(FunctionController());
  final ReportStatusController reportStatusController =
      Get.put(ReportStatusController());
  ApplicationStatus({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        flexibleSpace: Container(
          decoration: const BoxDecoration(
            gradient: AppGradients.linearGradient,
          ),
        ),
        leading: Builder(builder: (BuildContext context) {
          return IconButton(
            iconSize: 30,
            onPressed: () {
              Scaffold.of(context).openDrawer();
            },
            icon: const Icon(
              Icons.menu,
              color: Colors.white,
            ),
          );
        }),
        title: Row(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            Image.asset("assets/cyber.png", height: 60, width: 50),
            const SizedBox(
              width: 20,
            ),
            const Text(
              "Dial 1930",
              style: TextStyle(fontSize: 25, color: Colors.white),
            ),
          ],
        ),
        actions: [
          IconButton(
            iconSize: 40,
            color: Colors.white,
            onPressed: () async {
              await FirebaseAuth.instance.signOut();
              SharedPreferences sharedPreferences =
                  await SharedPreferences.getInstance();
              sharedPreferences.clear();
              Get.offAll(() => const LandingPage());
            },
            icon: const Icon(Icons.account_circle),
          ),
        ],
      ),
      body: Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            FutureBuilder(
              future: fetchReportStatusList(),
              builder: (context, snapshot) {
                if (snapshot.connectionState == ConnectionState.waiting) {
                  return CircularProgressIndicator();
                } else if (snapshot.hasError) {
                  return Text('Error: ${snapshot.error}');
                } else {
                  return Expanded(
                    child: ListView.builder(
                      itemCount: reportStatusController.reportStatusList.length,
                      itemBuilder: (context, index) {
                        final reportStatus =
                            reportStatusController.reportStatusList[index];
                        return ListTile(
                          leading: IconButton(
                            icon: Icon(Icons.arrow_right),
                            onPressed: ()async {
                              await showReportDetailsDialog(
                                  context, reportStatus.trackId);
                            },
                          ),
                          title: Text('Track ID: ${reportStatus.trackId}'),
                          subtitle: Text(
                              'Status: ${reportStatus.currentStatus ?? 'N/A'}'),
                          onTap: () {},
                        );
                      },
                    ),
                  );
                }
              },
            ),
          ],
        ),
      ),
    );
  }
}

// class DetailsScreen extends StatelessWidget {
//   @override
//   Widget build(BuildContext context) {
//     return Scaffold(
//       appBar: AppBar(
//         title: Text('Details Screen'),
//       ),
//       body: Center(
//         child: Column(
//           mainAxisAlignment: MainAxisAlignment.center,
//           children: [
//             Obx(
//               () => Text(
//                 'Selected Track ID: ${detailsController.selectedReportStatus.value.trackId}',
//                 style: TextStyle(fontSize: 20),
//               ),
//             ),
//             Obx(
//               () => Text(
//                 'Selected Status: ${detailsController.selectedReportStatus.value.currentStatus}',
//                 style: TextStyle(fontSize: 20),
//               ),
//             ),
//           ],
//         ),
//       ),
//     );
//   }
// }
