import {Body, Header, Icon, Left, Right, Title} from 'native-base';
import React from 'react';
import {View, StyleSheet, Image, Text} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import theme from '../../theme';

export default function HeaderCustom(props) {
  return (
    <Header style={{backgroundColor: theme.primaryColor}}>
      <Left style={{flex: 1}}>
        <TouchableOpacity onPress={props.onGoBack}>
          <Image
            style={[styles.icon, styles.inputIcon]}
            source={{
              uri:
                'https://img.icons8.com/plasticine/100/000000/circled-left-2.png',
            }}
          />
        </TouchableOpacity>
      </Left>
      <Body style={{flex: 2}}>
        <Title style={{alignSelf: 'center', fontWeight: '600'}}>
          {props.title}
        </Title>
      </Body>
      <Right style={{flex: 1}} />
    </Header>
  );
}
const styles = StyleSheet.create({
  icon: {
    width: 50,
    height: 50,
  },
});
