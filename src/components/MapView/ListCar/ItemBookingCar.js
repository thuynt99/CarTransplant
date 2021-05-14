import {Body, Icon, Left, Right, Text, Card, CardItem} from 'native-base';
import React, {Component} from 'react';
import {View, Platform, BackHandler} from 'react-native';
import {ScaledSheet} from 'react-native-size-matters';
import moment from 'moment';
import theme from '../../../theme';

class ItemBookingCar extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <Card>
        <CardItem>
          <Left>
            <Icon
              name="car"
              type="Fontisto"
              style={{color: theme.primaryColor}}
            />
            <View style={styles.view}>
              <Text style={styles.textPrice}>Đi ghép</Text>
              <Text style={styles.textCar}>Xe 5 chỗ</Text>
            </View>
          </Left>
          <Body />
          <Right>
            <Text style={styles.textPrice}>352,000</Text>
            <Text style={styles.textPriceNormal}>780,000</Text>
          </Right>
        </CardItem>
      </Card>
    );
  }
}

const styles = ScaledSheet.create({
  text: {
    color: theme.grey_dark,
    fontSize: '12@ms',
  },
  view: {
    paddingLeft: '20@s',
  },
  textPrice: {
    fontSize: '14@ms',
    color: 'black',
    fontWeight: '600',
  },
  textPriceNormal: {
    fontSize: '13@ms',
    color: 'black',
    textDecorationLine: 'line-through',
    fontStyle: 'italic',
  },
  textCar: {
    fontSize: '13@ms',
    color: 'black',
    fontStyle: 'italic',
  },
});

export default ItemBookingCar;
