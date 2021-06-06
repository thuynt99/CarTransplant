import {
  Body,
  Button,
  Header,
  Icon,
  Item,
  Left,
  Right,
  Row,
  Title,
} from 'native-base';
import React from 'react';
import {View, StyleSheet, Image, Text} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Modal from 'react-native-modalbox';
import {ScaledSheet} from 'react-native-size-matters';
import theme from '../../theme';
import ImageIcon from './ImageIcon';

export default function Dialog(props) {
  return (
    <Modal
      style={[styles.modal, props.modalStyle]}
      isOpen={props.isOpen}
      position={'center'}
      onClosed={props.onClosed}>
      <Item style={styles.item}>
        <Body>
          <Text style={styles.titlle}>{props.title}</Text>
        </Body>
      </Item>
      <Text style={styles.text}>{props.content}</Text>
      {props.right ? (
        <View style={styles.row}>
          <Button full style={styles.btnRight} onPress={props.onClickLeft}>
            <Text style={styles.textLeft}>{props.left}</Text>
          </Button>
          <Button
            full
            style={[styles.btnRight, {backgroundColor: theme.primaryColor}]}
            onPress={props.onClickRight}>
            <Text style={styles.textLeft}>{props.right}</Text>
          </Button>
        </View>
      ) : (
        <Button full style={styles.btnLeft} onPress={props.onClickLeft}>
          <Text style={styles.textLeft}>{props.left}</Text>
        </Button>
      )}
    </Modal>
  );
}
const styles = ScaledSheet.create({
  modal: {
    height: '280@vs',
    width: '90%',
    justifyContent: 'space-between',
  },
  btn: {
    margin: 10,
    backgroundColor: '#3B5998',
    color: 'white',
    padding: 10,
  },
  row: {
    justifyContent: 'space-evenly',
    flexDirection: 'row',
  },
  btnModal: {
    position: 'absolute',
    top: 0,
    right: 0,
    width: 50,
    height: 50,
    backgroundColor: 'transparent',
  },

  text: {
    color: theme.black,
    fontSize: '14@ms',
    textAlign: 'center',
  },
  titlle: {
    color: theme.primaryColor,
    fontSize: '16@ms',
    textAlign: 'center',
    fontWeight: 'bold',
    paddingVertical: '16@vs',
  },
  btnLeft: {
    width: '90%',
    backgroundColor: theme.primaryColor,
    alignSelf: 'center',
    borderRadius: 8,
    marginBottom: '16@vs',
  },
  textLeft: {
    color: theme.white,
    fontSize: '14@ms',
  },
  btnRight: {
    width: '40%',
    backgroundColor: theme.grey_dark,
    alignSelf: 'center',
    borderRadius: 8,
    marginBottom: '16@vs',
  },
});
