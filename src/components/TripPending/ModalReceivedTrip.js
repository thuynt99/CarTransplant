import React from 'react';
import Modal from 'react-native-modalbox';

import {
  Text,
  StyleSheet,
  ScrollView,
  View,
  Dimensions,
  TextInput,
} from 'react-native';
import {
  Form,
  Icon,
  Input,
  Item,
  Label,
  Left,
  Right,
  Row,
  Button,
} from 'native-base';
import {TouchableOpacity} from 'react-native-gesture-handler';
import theme from '../../theme';
import ListBookingCar from '../MapView/ListCar/ListBookingCar';
import {ScaledSheet} from 'react-native-size-matters';
import _ from 'lodash';

var screen = Dimensions.get('window');

export default class ModalReceivedTrip extends React.Component {
  constructor() {
    super();
    this.state = {
      fee_each_km: 0,
      max_distance: 0,
      seat: 0,
      itemCarSelected: {},
      key: '',
      userTripPrice: '',
    };
  }

  onOpen() {
    console.log('Modal just opened');
  }

  onClosingState(state) {
    console.log('the open/close of the swipeToClose just changed');
  }
  onSelectCar = item => {
    console.log(item);
    this.setState({itemCarSelected: item});
  };
  onChangeText = (text, key) => {
    this.setState({[key]: text});
  };
  render() {
    const {
      fee_each_km,
      max_distance,
      seat,
      itemCarSelected,
      userTripPrice,
    } = this.state;
    const {
      listVehicle,
      price,
      showConfirm,
      hideModalConfirm,
      takeTripUser,
    } = this.props;
    const value = price ? price : userTripPrice;
    return (
      <Modal
        position="bottom"
        style={styles.modal3}
        isOpen={showConfirm}
        ref={'modal1'}
        swipeToClose={false}
        onClosed={showConfirm}
        backButtonClose={false}
        backdropPressToClose={false}>
        <ScrollView style={styles.container}>
          <Text style={styles.title}>Điền đầy đủ thông tin để nhận chuyến</Text>
          <Form>
            <Item fixedLabel style={styles.titleItem}>
              <Label>Chọn xe sử dụng</Label>
              <Text style={styles.value}>
                {itemCarSelected?.model} - {itemCarSelected?.color}
              </Text>
            </Item>
            <View style={styles.viewListCar}>
              <ScrollView>
                <ListBookingCar
                  listVehicle={listVehicle}
                  onSelectCar={this.onSelectCar}
                  itemCarSelected={itemCarSelected}
                />
              </ScrollView>
            </View>
            <Item fixedLabel style={styles.titleItem}>
              <Label>Số chỗ còn trống</Label>
              <Right>
                <View style={styles.row}>
                  {seat > 0 && (
                    <TouchableOpacity
                      style={styles.btnPlus}
                      onPress={() =>
                        this.setState({
                          seat: seat - 1,
                        })
                      }>
                      <Icon
                        name="minus"
                        type="Entypo"
                        style={{color: theme.primaryColor}}
                      />
                    </TouchableOpacity>
                  )}
                  <Text style={styles.textSeat}>{seat}</Text>
                  <TouchableOpacity
                    style={styles.btnPlus}
                    onPress={() =>
                      this.setState({
                        seat: seat + 1,
                      })
                    }>
                    <Icon
                      name="plus"
                      type="Entypo"
                      style={{color: theme.primaryColor}}
                    />
                  </TouchableOpacity>
                </View>
              </Right>
            </Item>
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

            <Item
              fixedLabel
              style={price ? styles.titleItem : styles.textInput}>
              <Label>Giá nhận chuyến</Label>
              {price ? (
                <Text style={styles.price}>
                  {price?.toLocaleString('it-IT', {
                    style: 'currency',
                    currency: 'VND',
                  })}
                </Text>
              ) : (
                <Input
                  rounded
                  placeholder="VND"
                  value={userTripPrice}
                  onChangeText={text =>
                    this.onChangeText(text, 'userTripPrice')
                  }
                  keyboardType="numeric"
                />
              )}
            </Item>
          </Form>
          <Row style={{justifyContent: 'space-between'}}>
            <Button full style={styles.btnRight} onPress={hideModalConfirm}>
              <Text style={styles.textLeft}>Huỷ</Text>
            </Button>
            <Button
              full
              style={[styles.btnRight, {backgroundColor: theme.primaryColor}]}
              onPress={() =>
                takeTripUser(
                  itemCarSelected.id,
                  seat,
                  fee_each_km,
                  value,
                  max_distance,
                )
              }>
              <Text style={styles.textLeft}>Xác nhận</Text>
            </Button>
          </Row>
        </ScrollView>
      </Modal>
    );
  }
}

const styles = ScaledSheet.create({
  container: {
    // flex: 1,
  },

  modal: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  modal3: {
    height: '92%',
    width: '100%',
  },

  text: {
    color: 'black',
    fontSize: 22,
  },
  textTitleCar: {
    fontSize: '14@ms',
    fontWeight: 'bold',
    paddingLeft: '16@s',
  },
  textSeat: {
    fontSize: '16@ms',
    fontWeight: 'bold',
    marginHorizontal: '16@s',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnPlus: {
    paddingHorizontal: '2@s',
  },
  viewListCar: {
    maxHeight: '280@vs',
    paddingHorizontal: '16@s',
  },
  titleItem: {
    paddingVertical: '10@vs',
    paddingRight: '16@s',
  },
  textLeft: {
    color: theme.white,
    fontSize: '14@ms',
  },
  btnRight: {
    width: '40%',
    backgroundColor: theme.grey_dark,
    // alignSelf: 'center',
    borderRadius: 8,
    marginHorizontal: '16@s',
    marginTop: '16@vs',
  },
  price: {
    fontSize: '14@ms',
    color: theme.primaryColor,
    paddingHorizontal: '5@s',
    fontWeight: 'bold',
  },
  title: {
    fontSize: '16@ms',
    color: theme.black,
    fontWeight: 'bold',
    textAlign: 'center',
    paddingVertical: '10@vs',
  },
  value: {
    color: theme.grey_dark_30,
    fontSize: '14@ms',
  },
});
