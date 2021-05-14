import {Text} from 'native-base';
import React, {Component} from 'react';
import {View, Platform, BackHandler} from 'react-native';
import {ScaledSheet} from 'react-native-size-matters';
import moment from 'moment';
import theme from '../../../theme';
import {responsiveWidth} from 'react-native-responsive-dimensions';
import {TouchableOpacity} from 'react-native-gesture-handler';

class ItemBookingCar extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const {item, onChangeDate} = this.props;
    return <TouchableOpacity onPress={() => onChangeDate(item)} />;
  }
}

const styles = ScaledSheet.create({
  card: {
    backgroundColor: theme.grey_light_90,
    justifyContent: 'center',
    alignItems: 'center',
    width: responsiveWidth(15),
    height: '60@vs',
    marginHorizontal: 5,
    paddingHorizontal: 2,
    borderRadius: 8,
    fontSize: '14@ms',
  },
  cardSelect: {
    backgroundColor: theme.grey_light_90,
    justifyContent: 'center',
    alignItems: 'center',
    width: responsiveWidth(15),
    height: '60@vs',
    marginHorizontal: 5,
    paddingHorizontal: 2,
    borderRadius: 8,
    fontSize: '14@ms',
    borderColor: theme.primaryColor,
    borderWidth: 1,
  },
  text: {
    color: theme.grey_dark,
    fontSize: '12@ms',
  },
  date: {},
});

export default ItemBookingCar;
