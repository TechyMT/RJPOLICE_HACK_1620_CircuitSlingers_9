class Question {
  String type;
  String question;
  String userAnswer = '';

  Question({
    required this.type,
    required this.question,

  });

  factory Question.fromJson(Map<String, dynamic> json) {
    return Question(
      type: json['type'],
      question: json['question'],
    );
  }
}

class QuestionAnswer {
  String type;
  String question;
  String userAnswer;
  QuestionAnswer({
    required this.type,
    required this.question,
    required this.userAnswer,
  });
}
