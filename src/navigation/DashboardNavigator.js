import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
// import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';

import {DASHBOARD_TAB, MAP_VIEW} from '../constants';
import TabNavigator from './TabNavigator';
import MapViewScreen from '../screens/MapViewScreen';
import TripDetail from '../screens/TripDetail';

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
    </Stack.Navigator>
  );
}
