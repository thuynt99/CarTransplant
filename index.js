/**
 * @format
 */

import 'react-native-gesture-handler';
import {AppRegistry} from 'react-native';
// import Icon from 'react-native-vector-icons/dist/Ionicons';
import App from './src/App';
import {name as appName} from './app.json';
import messaging from '@react-native-firebase/messaging';
import PushNotification, {Importance} from 'react-native-push-notification';

// Icon.loadFont();
messaging().setBackgroundMessageHandler(async remoteMessage => {
  console.log('Message handled in the background!', remoteMessage);
  // Later we call this:
});

PushNotification.configure({
  // (optional) Called when Token is generated (iOS and Android)
  onRegister: function(token) {
    console.log('TOKEN:', token);
  },

  // (required) Called when a remote is received or opened, or local notification is opened
  onNotification: function(notification) {
    console.log('NOTIFICATION:', notification);

    // process the notification

    // (required) Called when a remote is received or opened, or local notification is opened
    // notification.finish(PushNotificationIOS.FetchResult.NoData);
  },

  // (optional) Called when Registered Action is pressed and invokeApp is false, if true onNotification will be called (Android)
  onAction: function(notification) {
    console.log('ACTION:', notification.action);
    console.log('NOTIFICATION:', notification);
    PushNotification.localNotification({
      channelId: 'FCM_FIREBASE_NOTIFICATION_DEFAULT_CHANNEL', // (required) channelId, if the channel doesn't exist, notification will not trigger.
      ignoreInForeground: false,
      title: 'test', // (optional)
      message: 'test', // (required)
      priority: 'high',
      userInfo: {},
    });

    // process the action
  },

  // (optional) Called when the user fails to register for remote notifications. Typically occurs when APNS is having issues, or the device is a simulator. (iOS)
  onRegistrationError: function(err) {
    console.error(err.message, err);
  },

  // IOS ONLY (optional): default: all - Permissions to register.
  permissions: {
    alert: true,
    badge: true,
    sound: true,
  },

  // Should the initial notification be popped automatically
  // default: true
  popInitialNotification: true,

  /**
   * (optional) default: true
   * - Specified if permissions (ios) and token (android and ios) will requested or not,
   * - if not, you must call PushNotificationsHandler.requestPermissions() later
   * - if you are not using remote notification or do not have Firebase installed, use this:
   *     requestPermissions: Platform.OS === 'ios'
   */
  requestPermissions: true,
  senderID: '454714905801',
});

PushNotification.createChannel(
  {
    channelId: 'FCM_FIREBASE_NOTIFICATION_DEFAULT_CHANNEL', // (required)
    channelName: 'CAR-TRANSPLANT-CHANNEL', // (required)
    channelDescription: 'CAR-TRANSPLANT-CHANNEL-DESCRIPTION', // (optional) default: undefined.
    playSound: false, // (optional) default: true
    soundName: 'default', // (optional) See `soundName` parameter of `localNotification` function
    importance: Importance.HIGH, // (optional) default: Importance.HIGH. Int value of the Android notification importance
    vibrate: true, // (optional) default: true. Creates the default vibration patten if true.
  },
  created => console.log(`createChannel returned '${created}'`), // (optional) callback returns whether the channel was created, false means it already existed.
);

AppRegistry.registerComponent(appName, () => App);
