import 'package:firebase_messaging/firebase_messaging.dart';
import 'package:shared_preferences/shared_preferences.dart';

class FirebaseMessagingService {
  FirebaseMessaging _firebaseMessaging = FirebaseMessaging.instance;

  Future<void> getFirebaseToken() async {
    try {
      NotificationSettings settings =
          await _firebaseMessaging.requestPermission(
        alert: true,
        badge: true,
        provisional: false,
        sound: true,
      );
      String? token = await _firebaseMessaging.getToken();
      if (token != null) {
        SharedPreferences sharedPreferences =
            await SharedPreferences.getInstance();
        sharedPreferences.setString('recipientToken', token);
        print('Firebase Token: $token');
      } else {
        print('Unable to retrieve Firebase Token');
      }
    } catch (e) {
      print('Error getting Firebase Token: $e');
    }
  }
}