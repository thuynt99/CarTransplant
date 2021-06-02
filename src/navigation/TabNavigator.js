import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {TouchableOpacity} from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {useNavigation} from '@react-navigation/native';

import {
  HOME,
  LIST_MY_RESERVATION,
  POST,
  NOTIFICATION,
  PROFILE,
} from '../constants';
import {primaryColor} from '../theme';
import HomeScreen from '../screens/Home';
import NotificationScreen from '../screens/Notification';
import ProfileScreen from '../screens/Profile';
import ListMyReservation from '../screens/ListMyReservation';

// import {AddButton} from '../components/AddButton';

const Tab = createBottomTabNavigator();

export default function TabNavigator(props) {
  const navigation = useNavigation();
  const {navigate} = navigation;

  return (
    <Tab.Navigator
      initialRouteName={MAP}
      tabBarOptions={{
        activeTintColor: '#161F3D',
        showLabel: false,
      }}>
      <Tab.Screen
        name={HOME}
        options={{
          tabBarIcon: ({color, size}) => (
            <FontAwesome5 name={'home'} color={color} size={size} />
          ),
        }}
        children={() => <HomeScreen {...props} />}
      />
      <Tab.Screen
        name={LIST_MY_RESERVATION}
        options={{
          tabBarIcon: ({color, size}) => (
            <FontAwesome5 name={'car-alt'} color={color} size={size} />
          ),
        }}
        children={() => <ListMyReservation {...props} />}
      />

      <Tab.Screen
        name={NOTIFICATION}
        options={{
          tabBarIcon: ({color, size}) => (
            <FontAwesome5 name={'bell'} color={color} size={size} />
          ),
        }}
        children={() => <NotificationScreen {...props} />}
      />
      <Tab.Screen
        name={PROFILE}
        options={{
          tabBarIcon: ({color, size}) => (
            <FontAwesome5 name={'user'} color={color} size={size} />
          ),
        }}
        children={props => <ProfileScreen {...props} />}
      />
    </Tab.Navigator>
  );
}
