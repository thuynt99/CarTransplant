import React, {useContext} from 'react';
import Animated from 'react-native-reanimated';
import {Text, Image, TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';
// import SafeAreaView from 'react-native-safe-area-view';
import * as firebase from 'firebase';

import {CTX} from '../tools/context';
import {View} from 'native-base';

export default function CustomDrawerContent({progress, ...rest}) {
  const navigation = useNavigation();
  const {closeDrawer} = rest;
  const {navigate} = navigation;

  const authContext = useContext(CTX);
  const {_logout} = authContext;

  // const {loading, error, data} = useQuery(GET_GREETING);
  function _onClose() {
    closeDrawer();
  }

  function _onLogout() {
    firebase.auth().signOut();
    _logout();
    closeDrawer();
    // navigate('Login');
  }

  const translateX = Animated.interpolate(progress, {
    inputRange: [0, 1],
    outputRange: [-100, 0],
  });

  return (
    <Animated.View
      style={{
        flex: 1,
        alignItems: 'center',
        // justifyContent: 'center',
        transform: [{translateX}],
      }}>
      {/* <SafeAreaView style={{flex: 1}}> */}
      <View>
        <Text>Hello, Thuy</Text>
        <Text>035653308</Text>
      </View>

      <TouchableOpacity onPress={_onLogout}>
        <Text style={{color: 'black'}}>Log out</Text>
      </TouchableOpacity>
      {/* </SafeAreaView> */}
    </Animated.View>
  );
}
