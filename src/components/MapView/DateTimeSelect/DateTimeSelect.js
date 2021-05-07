import {Text} from 'native-base';
import React, {Component} from 'react';
import {View, Platform, BackHandler, StyleSheet} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import ItemDate from './ItemDate';
import moment from 'moment';
import {ScaledSheet} from 'react-native-size-matters';
import ItemTime from './ItemTime';

class DateTimeSelect extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listDate: [],
    };
  }
  componentDidMount() {
    const start = moment();
    for (var i = 0; i < 30; i++) {
      this.state.listDate.push(moment().add(i, 'days'));
    }
    this.setState({listDate: this.state.listDate});
  }
  render() {
    const {listDate} = this.state;
    return (
      <View>
        <FlatList
          horizontal
          style={styles.container}
          data={listDate}
          renderItem={({item}) => <ItemDate item={item} />}
          keyExtractor={item => item.id}
        />
        <Text style={styles.text} numberOfLines={2}>
          Hãy chọn khoảng thời gian để tài xế có thể đón bạn dễ dàng nhất
        </Text>
        <ItemTime />
        <Text style={styles.text} numberOfLines={2}>
          Tài xế sẽ đón bạn vào khoảng thời gian từ 15:11 đến 15:43 ngày
          07/05/2021
        </Text>
      </View>
    );
  }
}
const styles = ScaledSheet.create({
  container: {
    paddingVertical: 5,
  },
  text: {
    fontSize: '14@ms',
    textAlign: 'center',
    paddingHorizontal: 10,
  },
});
export default DateTimeSelect;
