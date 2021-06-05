/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {useEffect} from 'react';
import {NavigationNativeContainer} from '@react-navigation/native';
import {ApolloProvider} from '@apollo/react-hooks';
import Geocoder from 'react-native-geocoding';

import AppNavigator from './navigation/AppNavigator';
import ContextProvider from './tools/context';
import client from './tools/apollo';
import './tools/firebase';
import {Provider} from 'react-redux';
import store from './stores/configureStore';
import messaging from '@react-native-firebase/messaging';
import PushNotification, {Importance} from 'react-native-push-notification';

function App() {
  useEffect(() => {
    Geocoder.init('AIzaSyDyDhYNrrak9PXgIJRS6FAhLccCfJ2YgUI');

    requestUserPermission();
    checkToken();
    messaging()
      .getInitialNotification()
      .then(remoteMessage => {
        console.log(
          'Notification caused app to open from quit state:',
          remoteMessage,
        );
      });
    messaging().onNotificationOpenedApp(remoteMessage => {
      console.log(
        'Notification caused app to open from background state:',
        remoteMessage,
      );
    });
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      console.log('remoteMessage', remoteMessage);
      // Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
      PushNotification.localNotification({
        channelId: 'FCM_FIREBASE_NOTIFICATION_DEFAULT_CHANNEL', // (required) channelId, if the channel doesn't exist, notification will not trigger.
        ignoreInForeground: false,
        title: remoteMessage.notification.title, // (optional)
        message: remoteMessage.notification.body, // (required)
        priority: 'high',
        userInfo: {},
        largeIcon: 'ic_stat_ic_notification', // (optional) default: "ic_launcher"
        smallIcon: 'ic_stat_ic_notification',
      });
    });

    return unsubscribe;
  }, []);

  const requestUserPermission = async () => {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
      console.log('Authorization status:', authStatus);
    }
  };
  const checkToken = async () => {
    console.log('tao buon qua ma');
    const fcmToken = await messaging().getToken();

    if (fcmToken) {
      console.log('fcmToken', fcmToken);
    }
  };

  return (
    <Provider store={store}>
      <ApolloProvider client={client}>
        <ContextProvider>
          <NavigationNativeContainer>
            <AppNavigator />
          </NavigationNativeContainer>
        </ContextProvider>
      </ApolloProvider>
    </Provider>
  );
}

export default App;
