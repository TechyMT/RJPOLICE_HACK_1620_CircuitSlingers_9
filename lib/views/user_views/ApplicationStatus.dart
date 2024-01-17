import 'package:circuitslingers/controller/ReportStatusController.dart';
import 'package:circuitslingers/controller/functionController.dart';
import 'package:circuitslingers/models/ReportStatus.dart';
import 'package:circuitslingers/models/constants.dart';
import 'package:circuitslingers/models/question.dart';
import 'package:circuitslingers/models/showDetailsBox.dart';
import 'package:circuitslingers/views/networking/networking.dart';
import 'package:circuitslingers/views/register_login/landingpage.dart';
import 'package:circuitslingers/views/user_views/onboarding.dart';
import 'package:firebase_auth/firebase_auth.dart';
import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'package:url_launcher/url_launcher.dart';

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
            color: Color(0xFF070288),
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
              Get.offAll(() => OnBoarding());
            },
            icon: const Icon(Icons.logout),
          ),
        ],
      ),
      body: Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            FutureBuilder<List<ReportStatusDto>>(
              future: fetchReportStatusList(),
              builder: (context, snapshot) {
                if (snapshot.connectionState == ConnectionState.waiting) {
                  return const CircularProgressIndicator();
                } else if (snapshot.hasError) {
                  return Text('Error: ${snapshot.error}');
                } else {
                  reportStatusController.setReportStatusList(snapshot.data!);
                  return Expanded(
                    child: ListView.builder(
                      itemCount: reportStatusController.reportStatusList.length,
                      itemBuilder: (context, index) {
                        final reportStatus =
                            reportStatusController.reportStatusList[index];
                        return ListTile(
                          title: Text(
                              '     Track ID: ${reportStatus.trackId ?? 'N/A'}'),
                          subtitle: Text(
                              '      Status: ${reportStatus.currentStatus ?? 'N/A'}'),
                          trailing: PopupMenuButton<String>(
                            onSelected: (String choice) async {
                              if (choice == 'download') {
                                Uri uri = Uri.parse(reportStatusController
                                    .reportStatusList[index].reportUrl);
                                if (!await launchUrl(uri)) {
                                  throw Exception('Could not launch $uri');
                                }
                              } else if (choice == 'showSuggestions') {
                                showModalBottomSheet(
                                  context: context,
                                  builder: (BuildContext context) {
                                    return Container(
                                      padding: const EdgeInsets.all(16.0),
                                      child: SingleChildScrollView(
                                        child: Column(
                                          children: [
                                            const Text(
                                              "Additional Information and Next Steps:",
                                              style: TextStyle(
                                                  fontSize: 18,
                                                  fontWeight: FontWeight.bold),
                                            ),
                                            const SizedBox(
                                              height: 20,
                                            ),
                                            Text(
                                              reportStatus.suggestions ??
                                                  'No suggestions available',
                                              style:
                                                  const TextStyle(fontSize: 16),
                                            ),
                                          ],
                                        ),
                                      ),
                                    );
                                  },
                                );
                              }
                            },
                            itemBuilder: (BuildContext context) =>
                                <PopupMenuEntry<String>>[
                              const PopupMenuItem<String>(
                                value: 'download',
                                child: ListTile(
                                  leading: Icon(Icons.download),
                                  title: Text('Download'),
                                ),
                              ),
                              const PopupMenuItem<String>(
                                value: 'showSuggestions',
                                child: ListTile(
                                  leading: Icon(Icons.info),
                                  title: Text('Show Suggestions'),
                                ),
                              ),
                            ],
                          ),
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
