import 'package:circuitslingers/models/ReportStatus.dart';
import 'package:get/get.dart';

class ReportStatusController extends GetxController {
  RxList<ReportStatusDto> reportStatusList = <ReportStatusDto>[].obs;
  RxBool isEmailchecked = false.obs;
  RxBool isPhoneNumberChecked = false.obs;
  RxBool isAccountNumberChecked = false.obs;
  final RxString phishingText = ''.obs;
  final RxString phoneNumberPhishingText = ''.obs;
  final RxString accountNumberPhishingText = ''.obs;

  final RxString reportEmailText = ''.obs;
  final RxString reportPhoneNumberText = ''.obs;
  final RxString reportAccNumberText = ''.obs;

  void setPhishingText(String text) {
    phishingText.value = text;
  }

  void setPhoneNumberPhishingText(String text) {
    phoneNumberPhishingText.value = text;
  }

  void setAccountNumberPhishingText(String text) {
    accountNumberPhishingText.value = text;
  }

  void setReportStatusList(List<ReportStatusDto> newList) {
    reportStatusList.assignAll(newList);
  }
}
