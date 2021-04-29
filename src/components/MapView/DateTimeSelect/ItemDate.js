import {Text} from 'native-base';
import React, {Component} from 'react';
import {View, Platform, BackHandler} from 'react-native';
import moment from 'moment';

class ItemDate extends Component {
  render() {
    // const {item} = this.props;
    const item = moment();
    console.log('item', item.month());
    return (
      <View>
        <Text>{item.locale('en').format('dddd')}</Text>
        <Text>{item.format('DD')}</Text>
        <Text>{item.format('MM')}</Text>
      </View>
    );
  }
}

export default ItemDate;
