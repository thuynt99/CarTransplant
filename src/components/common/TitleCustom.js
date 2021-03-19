import React from 'react';
import {View, StyleSheet, Image, Text} from 'react-native';
import {
  responsiveFontSize,
  responsiveScreenHeight,
  responsiveScreenWidth,
} from 'react-native-responsive-dimensions';

export default function TitleCustom(props) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{props.title}</Text>
      {props.subTitle && <Text>{props.subTitle}</Text>}
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingVertical: responsiveScreenHeight(2),
    paddingHorizontal: responsiveScreenWidth(5),
  },
  title: {
    fontWeight: '700',
    fontSize: responsiveFontSize(2),
  },
  subTitle: {
    color: 'black',
    fontSize: responsiveFontSize(2),
    paddingTop: responsiveScreenHeight(1),
  },
});
