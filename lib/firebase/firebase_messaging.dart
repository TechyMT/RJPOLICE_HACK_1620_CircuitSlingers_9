import 'package:firebase_messaging/firebase_messaging.dart';

class FirebaseMessagingService {
  FirebaseMessaging _firebaseMessaging = FirebaseMessaging.instance;

  Future<void> getFirebaseToken() async {
    try {
      // Request permission for notification on iOS devices
      NotificationSettings settings = await _firebaseMessaging.requestPermission(
        alert: true,
        badge: true,
        provisional: false,
        sound: true,
      );

      print('User granted permission: ${settings.authorizationStatus}');

      // Get the registration token
      String? token = await _firebaseMessaging.getToken();

      if (token != null) {
        print('Firebase Token: $token');
      } else {
        print('Unable to retrieve Firebase Token');
      }
    } catch (e) {
      print('Error getting Firebase Token: $e');
    }
  }
}
