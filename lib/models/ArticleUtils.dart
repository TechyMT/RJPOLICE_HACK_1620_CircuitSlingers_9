import 'package:circuitslingers/models/Article.dart';

Article articleFromMap(Map<String, dynamic> map) {
  return Article(
    author: map['author'] as String? ?? "",
    title: map['title'] as String? ?? '',
    description: map['description'] as String? ?? '',
    url: map['urlToImage'] as String? ?? '',
  );
}