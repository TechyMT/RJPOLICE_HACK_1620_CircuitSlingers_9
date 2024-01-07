import 'package:circuitslingers/models/Article.dart';
import 'package:flutter/material.dart';

class NewsList extends StatelessWidget {
  final dynamic item;

  const NewsList({super.key, required this.item});
  @override
  Widget build(BuildContext context) {
    return ListView.builder(
      scrollDirection: Axis.horizontal,
      itemCount: item.length,
      itemBuilder: (context, index) {
        final news = item[index];
        return NewsCard(news: news);
      },
    );
  }
}

class NewsCard extends StatelessWidget {
  final Article news;

  const NewsCard({Key? key, required this.news}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      onTap: () {},
      child: Card(
        margin: const EdgeInsets.all(10),
        child: ClipRRect(
          borderRadius: BorderRadius.circular(25),
          child: SizedBox(
            width: MediaQuery.of(context).size.width * 0.45,
            child: Column(
              children: [
                Image.network(
                  news.url,
                  width: 200,
                  height: 100,
                  fit: BoxFit.fill,
                ),
                Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Padding(
                      padding: const EdgeInsets.all(4.0),
                      child: Text(
                        news.author,
                        maxLines: 1,
                        style: const TextStyle(
                          fontSize: 16,
                          fontWeight: FontWeight.bold,
                        ),
                      ),
                    ),
                    Padding(
                      padding: const EdgeInsets.fromLTRB(5, 0, 0, 0),
                      child: Text(
                        news.description,
                        maxLines: 3,
                        style: const TextStyle(
                          fontSize: 11,
                          overflow: TextOverflow.ellipsis,
                        ),
                      ),
                    ),
                  ],
                ),
              ],
            ),
          ),
        ),
      ),
    );
  }
}
