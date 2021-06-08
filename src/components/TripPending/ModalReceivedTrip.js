import React from 'react';
import Modal from 'react-native-modalbox';

import {
  Text,
  Button,
  StyleSheet,
  ScrollView,
  View,
  Dimensions,
  TextInput,
} from 'react-native';
import {Form, Input, Item, Label} from 'native-base';

var screen = Dimensions.get('window');

export default class ModalReceivedTrip extends React.Component {
  constructor() {
    super();
    this.state = {
      isOpen: false,
      fee_each_km: 0,
      max_distance: 0,
    };
  }

  onClose() {
    console.log('Modal just closed');
  }

  onOpen() {
    console.log('Modal just opened');
  }

  onClosingState(state) {
    console.log('the open/close of the swipeToClose just changed');
  }

  render() {
    var BContent = (
      <View style={[styles.btn, styles.btnModal]}>
        <Button
          title="X"
          color="white"
          onPress={() => this.setState({isOpen: false})}
        />
      </View>
    );
    const {fee_each_km, max_distance} = this.state;
    return (
      <Modal
        style={[styles.modal, styles.modal3]}
        isOpen={true}
        ref={'modal1'}
        swipeToClose={this.state.swipeToClose}
        onClosed={this.onClose}
        onOpened={this.onOpen}
        onClosingState={this.onClosingState}>
        <Text>VU HA THANH</Text>
        <Form>
          <Item fixedLabel style={styles.textInput}>
            <Label>Giá tiền theo km</Label>
            <Input
              rounded
              placeholder="VND/km"
              value={fee_each_km}
              ellipsizeMode="head"
              onChangeText={text => this.onChangeText(text, 'fee_each_km')}
              keyboardType="numeric"
            />
          </Item>
          <Item fixedLabel style={styles.textInput}>
            <Label>Khoảng cách đón tối đa</Label>
            <Input
              rounded
              placeholder="km"
              value={max_distance}
              onChangeText={text => this.onChangeText(text, 'max_distance')}
              keyboardType="numeric"
            />
          </Item>
        </Form>
      </Modal>
    );
  }
}

const styles = StyleSheet.create({
  wrapper: {
    paddingTop: 50,
    flex: 1,
  },

  modal: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  modal3: {
    height: 400,
    width: '90%',
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
