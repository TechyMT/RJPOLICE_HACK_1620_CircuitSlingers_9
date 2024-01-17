class Article {
  final String? author;
  final String? title;
  final String? description;
  final String? url;

  Article({
    required this.title,
    required this.description,
    required this.url,
    required this.author,
  });

  Article articleFromMap(Map<String, dynamic> map) {
  return Article(
    author: map['author'],
    title: map['title'],
    description: map['description'],
    url: map['urlToImage'],
  );
}
}
