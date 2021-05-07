import {Text} from 'native-base';
import React, {Component} from 'react';
import {View, Platform, BackHandler} from 'react-native';
import {ScaledSheet} from 'react-native-size-matters';
import moment from 'moment';
import theme from '../../../theme';
import {responsiveWidth} from 'react-native-responsive-dimensions';

class ItemDate extends Component {
  render() {
    const {item} = this.props;
    return (
      <View style={styles.card}>
        <Text style={styles.text}>{moment(item).format('ddd')}</Text>

        <Text style={styles.date}>{moment(item).format('DD')}</Text>
        <Text style={styles.text}>Tháng {moment(item).format('M')}</Text>
      </View>
    );
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
  text: {
    color: theme.grey_dark,
    fontSize: '12@ms',
  },
  date: {},
});

export default ItemDate;
