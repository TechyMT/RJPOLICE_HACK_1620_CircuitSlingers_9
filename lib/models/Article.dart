class Article {
  final String title;
  final String description;
  final String url;

  Article({required this.title, required this.description, required this.url});

  factory Article.fromJson(Map<String, dynamic> json) {
    return Article(
      title: json['title'],
      description: json['description'],
      url: json['url'],
    );
  }
}
