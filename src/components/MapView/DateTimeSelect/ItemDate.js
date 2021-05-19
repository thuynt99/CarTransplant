import {Text} from 'native-base';
import React, {Component} from 'react';
import {View, Platform, BackHandler} from 'react-native';
import {ScaledSheet} from 'react-native-size-matters';
import moment from 'moment';
import theme from '../../../theme';
import {responsiveWidth} from 'react-native-responsive-dimensions';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {FORMAT} from '../../../constants/format';

class ItemDate extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const {item, onChangeDate, dateStart} = this.props;

    const selected =
      moment(item).format(FORMAT.DATE) ===
      moment(dateStart).format(FORMAT.DATE);
    return (
      <TouchableOpacity onPress={() => onChangeDate(item)}>
        <View style={selected ? styles.cardSelect : styles.card}>
          <Text style={styles.text}>{moment(item).format('ddd')}</Text>
          <Text style={styles.date}>{moment(item).format('DD')}</Text>
          <Text style={styles.text}>Tháng {moment(item).format('M')}</Text>
        </View>
      </TouchableOpacity>
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

export default ItemDate;
