import 'package:circuitslingers/views/networking/networking.dart';
import 'package:flutter/material.dart';

Future<void> showReportDetailsDialog(BuildContext context, int trackId) async {
  try {
    final reportData = await getReportData(trackId);

    // ignore: use_build_context_synchronously
    showDialog(
      context: context,
      builder: (BuildContext context) {
        return AlertDialog(
          title: const Text('Report Details'),
          content: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Text('Full Name: ${reportData.fullName}'),
              Text('Date of Birth: ${reportData.dateOfBirth}'),
              Text('Aadhar Number: ${reportData.aadharNumber}'),
              Text('Incident Description: ${reportData.incidentDescription}'),
              Text('City: ${reportData.city}'),
              Text('Category: ${reportData.category}'),
              Text('Transaction: ${reportData.transaction}'),
              Text('Suspect Phone Number: ${reportData.suspectPhoneNumber}'),
              Text('Suspect Account Details: ${reportData.suspectAccDetails}'),
              Text(
                  'Online Account Information: ${reportData.onlineAccountInformation}'),
              if (reportData.questionnaire != null)
                ...reportData.questionnaire.map((question) => Text(
                    'Question: ${question.question}, Answer: ${question.answer}')),
              Text('Track ID: ${reportData.trackId}'),
              Text(
                  'Is Bank Account Involved: ${reportData.isBankAccInvolved ? 'Yes' : 'No'}'),
            ],
          ),
          actions: [
            TextButton(
              onPressed: () {
                Navigator.of(context).pop();
              },
              child: const Text('Close'),
            ),
          ],
        );
      },
    );
  } catch (error) {
    print('Error fetching report details: $error');
  }
}
