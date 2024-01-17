import 'package:circuitslingers/models/questionnaire.dart';
import 'package:circuitslingers/views/networking/networking.dart';
import 'package:get/get.dart';

class FunctionController extends GetxController {
  final news = [].obs;
  var isReportSubmitted = false.obs;
  var questionnaireList = Rx<QuestionnaireList?>(null);
  RxBool isLoading = false.obs;
  var answerQuestions = false.obs;
  RxBool isButtonEnabled = true.obs;

  // Future<void> fetchNews() async {
  //   try {
  //     final fetchedProducts = await fetchNewsArticles();
  //     news.assignAll(fetchedProducts);
  //   } catch (e) {
  //     print("Error fetching products: $e");
  //   }
  // }

  List<Map<String, dynamic>> answersList = [];
  Future<void> submitAnswers() async {
    for (final question in questionnaireList.value!.questions) {
      final Map<String, dynamic> answerMap = {
        "question": question.question,
        "response": question.response,
      };

      answersList.add(answerMap);
    }

    print(answersList);
  }

  Future<void> clearList() async {
    answerQuestions.value = false;
    answerQuestions.value = false;
    answersList.clear();
  }
}
