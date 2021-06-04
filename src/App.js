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

function App() {
  useEffect(() => {
    const setUp = async () => {
      Geocoder.init('AIzaSyDyDhYNrrak9PXgIJRS6FAhLccCfJ2YgUI');

      requestUserPermission();
      console.log('xin chao 1');
      await checkToken();
      console.log('xin chao 2');
      const unsubscribe = messaging().onMessage(async remoteMessage => {
        Alert.alert(
          'A new FCM message arrived!',
          JSON.stringify(remoteMessage),
        );
      });
      // return unsubscribe;
    };

    setUp();
    // return unsubcribe;
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
