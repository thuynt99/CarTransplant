import React from 'react';
import {View, StyleSheet, Image} from 'react-native';
import theme from '../theme';

export default function SplashScreen() {
  return (
    <View style={styles.container}>
      <Image
        style={styles.image}
        source={require('../assets/logo/image_white.png')}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.white,
  },
  title: {
    color: theme.black,
  },
  image: {
    height: 200,
    width: 200,
  },
});
