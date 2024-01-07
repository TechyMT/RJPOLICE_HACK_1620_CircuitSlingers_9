import 'package:circuitslingers/views/networking/networking.dart';
import 'package:get/get.dart';

class FunctionController extends GetxController {
  final news = [].obs;

  Future<void> fetchNews() async {
    try {
      final fetchedProducts = await fetchNewsArticles();
      news.assignAll(fetchedProducts);
    } catch (e) {
      print("Error fetching products: $e");
    }
  }
}
