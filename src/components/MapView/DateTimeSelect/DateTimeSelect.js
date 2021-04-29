import {Text} from 'native-base';
import React, {Component} from 'react';
import {View, Platform, BackHandler} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import ItemDate from './ItemDate';

class DateTimeSelect extends Component {
  render() {
    return (
      <View>
        <ItemDate />
      </View>
    );
  }
}

export default DateTimeSelect;
