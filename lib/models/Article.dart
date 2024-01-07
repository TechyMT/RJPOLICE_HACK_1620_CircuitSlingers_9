class Article {
  final String author;
  final String title;
  final String description;
  final String url;

  Article({required this.title, required this.description, required this.url,required this.author});

  factory Article.fromJson(Map<String, dynamic> json) {
    return Article(
      author: json['author'] as String? ?? "",
      title: json['title'] as String? ?? '',
      description: json['description'] as String? ?? '',
      url: json['urltoImage'] as String? ?? '',
    );
  }
}
