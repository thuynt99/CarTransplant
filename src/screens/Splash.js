import React from 'react';
import {View, StyleSheet, Image} from 'react-native';
import theme from '../theme';

export default function SplashScreen() {
  return (
    <View style={styles.container}>
      <Image
        style={styles.image}
        source={require('../assets/splash/image2.png')}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.subPrimaryColor,
  },
  title: {
    color: theme.black,
  },
  image: {
    height: 200,
    width: 200,
  },
});
