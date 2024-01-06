// ignore_for_file: library_private_types_in_public_api

import 'package:circuitslingers/models/Article.dart';
import 'package:circuitslingers/models/CustomListTile.dart';
import 'package:circuitslingers/views/networking/networking.dart';
import 'package:flutter/material.dart';

class NewsPage extends StatelessWidget {
  const NewsPage({super.key});

  @override
  Widget build(BuildContext context) {
    return DefaultTabController(
      length: 1,
      child: Scaffold(
        appBar: AppBar(
          centerTitle: true,
          title: const Text("What's buzzing around?"),
          bottom: const TabBar(
            tabs: [
              Tab(text: 'Technology News'),
            ],
          ),
        ),
        body: const TabBarView(
          children: [
            NewsTab(),
          ],
        ),
      ),
    );
  }
}

class NewsTab extends StatefulWidget {
  const NewsTab({super.key});

  @override
  _NewsTabState createState() => _NewsTabState();
}

class _NewsTabState extends State<NewsTab> {
  late Future<List<Article>> newsFuture;
  late Future<List<Article>> news;

  @override
  Widget build(BuildContext context) {
    return FutureBuilder<List<Article>>(
      future: fetchNewsArticles(),
      builder: (context, snapshot) {
        if (snapshot.connectionState == ConnectionState.waiting) {
          return const Center(child: CircularProgressIndicator());
        } else if (snapshot.hasError) {
          return Center(
              child: Text(
            'Error: ${snapshot.error}',
            style: TextStyle(color: Colors.black),
          ));
        } else if (snapshot.hasData) {
          final articles = snapshot.data!;

          return ListView.builder(
            itemCount: articles.length,
            itemBuilder: (context, index) {
              final article = articles[index];
              return Column(
                children: <Widget>[
                  CustomListTile(
                    title: article.title ?? 'No Title',
                    description: article.description ?? 'No Description',
                  ),
                  const Divider(
                    color: Colors.black,
                    thickness: 1.0,
                  ),
                ],
              );
            },
          );
        } else {
          return const Center(child: Text('No data available.'));
        }
      },
    );
  }
}
  
