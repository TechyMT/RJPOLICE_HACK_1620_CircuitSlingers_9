import 'package:circuitslingers/models/Article.dart';
import 'package:circuitslingers/models/ArticleUtils.dart';
import 'package:circuitslingers/models/news.dart';
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

        final newsArticle = articleFromMap(newsjson);
        return NewsCard(news: newsArticle);
      },
    );
  }
}

class NewsCard extends StatelessWidget {
  final Article news;

  const NewsCard({Key? key, required this.news}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    print(news.author);
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
                  news.url ?? '',
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
                        news.author ?? '',
                        maxLines: 1,
                        style: const TextStyle(
                          fontSize: 16,
                          fontWeight: FontWeight.bold,
                          color: Colors.black,
                        ),
                      ),
                    ),
                    Padding(
                      padding: const EdgeInsets.fromLTRB(5, 0, 0, 0),
                      child: Text(
                        news.description ??
                            '', // Replace null description with an empty string
                        maxLines: 3,
                        style: const TextStyle(
                          fontSize: 11,
                          color: Colors.black,
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
