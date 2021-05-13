import {Card, Icon, Text} from 'native-base';
import React, {Component} from 'react';
import {View, Platform, BackHandler} from 'react-native';
import {ScaledSheet} from 'react-native-size-matters';
import moment, {now} from 'moment';
import theme from '../../../theme';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {date} from 'yup';

const TIME = {
  START: 0,
  END: 1,
};
class ItemTime extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isTimePickerVisible: false,
      type: TIME.START,
    };
  }
  showTimePicker = () => {
    this.setState({isTimePickerVisible: true});
  };
  handleConfirm = date => {
    const {type} = this.state;
    const {onChangeTimeStart, onChangeTimeEnd, dateStart, dateEnd} = this.props;
    const dateNew = moment(dateStart).set({
      hour: date.getHours(),
      minute: date.getMinutes(),
    });
    if (type === TIME.START) {
      onChangeTimeStart(dateNew);
    } else {
      onChangeTimeEnd(dateNew);
    }
    this.hideDatePicker();
  };
  hideDatePicker = () => {
    this.setState({isTimePickerVisible: false});
  };
  render() {
    const {dateStart, dateEnd} = this.props;
    const {isTimePickerVisible} = this.state;
    return (
      <View style={styles.container}>
        <TouchableOpacity
          onPress={() => {
            this.setState({type: TIME.START});
            this.showTimePicker();
          }}>
          <Card style={styles.card}>
            <Text style={styles.text}>{moment(dateStart).format('HH:mm')}</Text>
          </Card>
        </TouchableOpacity>

        <Icon
          active
          name="doubleright"
          type="AntDesign"
          style={{fontSize: 20, color: 'black', marginHorizontal: 20}}
        />
        <TouchableOpacity
          onPress={() => {
            this.setState({type: TIME.END});
            this.showTimePicker();
          }}>
          <Card style={styles.card}>
            <Text style={styles.text}>{moment(dateEnd).format('HH:mm')}</Text>
          </Card>
        </TouchableOpacity>

        <DateTimePickerModal
          isVisible={isTimePickerVisible}
          mode="time"
          onConfirm={this.handleConfirm}
          onCancel={this.hideDatePicker}
          headerTextIOS="Chọn giờ"
          is24Hour
        />
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
