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

function App() {
  useEffect(() => {
    Geocoder.init('AIzaSyDyDhYNrrak9PXgIJRS6FAhLccCfJ2YgUI');
  });
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
