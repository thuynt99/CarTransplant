import {Body, Header, Icon, Left, Right, Title} from 'native-base';
import React from 'react';
import {View, StyleSheet, Image, Text} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Modal from 'react-native-modalbox';
import theme from '../../theme';
import ImageIcon from './ImageIcon';

export default function Dialog(props) {
  return (
    <Modal
      style={[styles.modal, styles.modal3]}
      isOpen={true}
      position={'center'}
      ref={'modal3'}
      isDisabled={this.state.isDisabled}>
      <Text style={styles.text}>Modal centered</Text>
      <Button
        title={`Disable (${this.state.isDisabled ? 'true' : 'false'})`}
        onPress={() => this.setState({isDisabled: !this.state.isDisabled})}
        style={styles.btn}
      />
    </Modal>
  );
}
const styles = StyleSheet.create({
  modal3: {
    height: 300,
    width: 300,
  },
  btn: {
    margin: 10,
    backgroundColor: '#3B5998',
    color: 'white',
    padding: 10,
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
    color: 'black',
    fontSize: 22,
  },
});
