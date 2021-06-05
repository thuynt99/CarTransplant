import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
// import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';

import {
  DASHBOARD_TAB,
  MAP_VIEW,
  TRIP_DETAIL,
  NOTIFICATION_DETAIL,
  REGISTER_CAR,
  TRIP_USER_DETAIL,
} from '../constants';
import TabNavigator from './TabNavigator';
import MapViewScreen from '../screens/MapViewScreen';
import TripDetail from '../screens/TripDetail';
import NotificationDetailScreen from '../screens/NotificationDetail';
import RegisterCar from '../screens/RegisterCar';
import TripUserDetail from '../screens/TripUserDetail';

const Stack = createStackNavigator();

export default function DashboardStackNavigator() {
  return (
    <Stack.Navigator mode="modal" initialRouteName={DASHBOARD_TAB}>
      <Stack.Screen
        options={{
          headerShown: false,
        }}
        name={DASHBOARD_TAB}
        // options={{
        //   title: 'Chnirt',
        //   headerTitleAlign: 'left',
        //   headerStyle: {backgroundColor: '#fff'},
        //   headerLeft: () => (
        //     <FontAwesome5Icon
        //       style={{paddingLeft: 20}}
        //       name={'bars'}
        //       size={24}
        //       onPress={toggleDrawer}
        //     />
        //   ),
        //   headerRight: () => (
        //     <FontAwesome5Icon
        //       style={{paddingRight: 20}}
        //       name={'bell'}
        //       size={24}
        //       onPress={props => {
        //         console.log(props);
        //       }}
        //     />
        //   ),
        // }}
        component={TabNavigator}
      />
      <Stack.Screen
        name={MAP_VIEW}
        options={{
          headerShown: false,
          title: '',
        }}
        component={MapViewScreen}
      />
      <Stack.Screen
        name={TRIP_DETAIL}
        options={{
          headerShown: false,
          title: '',
        }}
        component={TripDetail}
      />
      <Stack.Screen
        name={NOTIFICATION_DETAIL}
        options={{
          headerShown: false,
          title: '',
        }}
        component={NotificationDetailScreen}
      />
      <Stack.Screen
        name={REGISTER_CAR}
        options={{
          headerShown: false,
          title: '',
        }}
        component={RegisterCar}
      />
      <Stack.Screen
        name={TRIP_USER_DETAIL}
        options={{
          headerShown: false,
          title: '',
        }}
        component={TripUserDetail}
      />
    </Stack.Navigator>
  );
}
