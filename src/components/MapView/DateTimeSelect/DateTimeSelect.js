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
    const {
      dateStart,
      dateEnd,
      onChangeDate,
      onChangeTimeStart,
      onChangeTimeEnd,
    } = this.props;
    return (
      <View>
        <FlatList
          horizontal
          style={styles.container}
          data={listDate}
          renderItem={({item}) => (
            <ItemDate item={item} onChangeDate={onChangeDate} />
          )}
          keyExtractor={item => item.id}
        />
        <Text style={styles.text} numberOfLines={2}>
          Hãy chọn khoảng thời gian để tài xế có thể đón bạn dễ dàng nhất
        </Text>
        <ItemTime
          dateStart={dateStart}
          dateEnd={dateEnd}
          onChangeTimeStart={onChangeTimeStart}
          onChangeTimeEnd={onChangeTimeEnd}
        />
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
