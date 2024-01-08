import 'package:circuitslingers/models/question.dart';

class QuestionnaireList {
  List<Question> questions;

  QuestionnaireList({required this.questions});

  factory QuestionnaireList.fromJson(Map<String, dynamic> json) {
    List<dynamic> questionsList = json['questions'];
    List<Question> parsedQuestions = List<Question>.from(
      questionsList.map((question) => Question.fromJson(question)),
    );

    return QuestionnaireList(questions: parsedQuestions);
  }
}