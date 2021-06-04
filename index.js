/**
 * @format
 */

import 'react-native-gesture-handler';
import {AppRegistry} from 'react-native';
// import Icon from 'react-native-vector-icons/dist/Ionicons';
import App from './src/App';
import {name as appName} from './app.json';
import messaging from '@react-native-firebase/messaging';

// Icon.loadFont();
messaging().setBackgroundMessageHandler(async remoteMessage => {
  console.log('Message handled in the background!', remoteMessage);
});

AppRegistry.registerComponent(appName, () => App);
