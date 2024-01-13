class Question {
  String question;
  String response = '';

  Question({
    required this.question,
  });

  factory Question.fromJson(Map<String, dynamic> json) {
    return Question(
      question: json['question'],
    );
  }
}

class QuestionAnswer {
  String question;
  String response;
  QuestionAnswer({
    required this.question,
    required this.response,
  });
}
