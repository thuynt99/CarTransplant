import {Body, Header, Icon, Left, Right, Title} from 'native-base';
import React from 'react';
import {View, StyleSheet, Image, Text} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import theme from '../../theme';

export default function ImageIcon(props) {
  return (
    <View>
      <Image
        style={[styles.icon]}
        source={{
          uri: props.uri,
        }}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  icon: {
    width: 50,
    height: 50,
  },
});
