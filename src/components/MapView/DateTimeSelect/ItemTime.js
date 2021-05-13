import {Card, Icon, Text} from 'native-base';
import React, {Component} from 'react';
import {View, Platform, BackHandler} from 'react-native';
import {ScaledSheet} from 'react-native-size-matters';
import moment from 'moment';
import theme from '../../../theme';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

class ItemTime extends Component {
  render() {
    const {item} = this.props;
    return (
      <View style={styles.container}>
        <Card style={styles.card}>
          <Text style={styles.text}>15:11</Text>
        </Card>
        <Icon
          active
          name="doubleright"
          type="AntDesign"
          style={{fontSize: 20, color: 'black', marginHorizontal: 20}}
        />
        <Card style={styles.card}>
          <Text style={styles.text}>16:30</Text>
        </Card>
      </View>
    );
  }
}

const styles = ScaledSheet.create({
  card: {
    backgroundColor: theme.grey_light_90,
    width: '80@s',
    height: '20@vs',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
  },
  text: {
    color: 'black',
    fontSize: '14@ms',
  },
  container: {
    flexDirection: 'row',
    alignSelf: 'center',
    alignItems: 'center',
  },
});

export default ItemTime;
