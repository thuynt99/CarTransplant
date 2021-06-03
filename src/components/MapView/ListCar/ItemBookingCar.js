import {Body, Icon, Left, Right, Text, Card, CardItem} from 'native-base';
import React, {Component} from 'react';
import {View, Platform, BackHandler, Touchable, Image} from 'react-native';
import {ScaledSheet} from 'react-native-size-matters';
import moment from 'moment';
import theme from '../../../theme';
import {TouchableOpacity} from 'react-native-gesture-handler';

class ItemBookingCar extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const {onSelectCar, item, itemCarSelected} = this.props;
    const price = item?.price?.toLocaleString('it-IT', {
      style: 'currency',
      currency: 'VND',
    });
    const selected = item?.car?.id === itemCarSelected?.car?.id;
    return (
      <Card style={{borderRadius: 8}}>
        <TouchableOpacity
          onPress={() => onSelectCar(item)}
          style={selected ? styles.btnSelect : styles.btn}>
          <Image
            style={{
              width: 50,
              height: 50,
            }}
            source={{
              uri: 'https://img.icons8.com/dusk/64/000000/car--v1.png',
            }}
          />
          <View styles={styles.left}>
            <View style={styles.view}>
              <Text>
                <Text style={styles.textPrice}>{item?.car?.model}</Text>
                <Text> - {item?.car?.color}</Text>
              </Text>

              <Text style={styles.textCar}>Xe 5 chỗ</Text>
            </View>
          </View>
          <View>
            <Text style={styles.textPrice}>{price}</Text>
            <Text style={styles.textPriceNormal}>
              {(2 * item?.price).toLocaleString('it-IT', {
                style: 'currency',
                currency: 'VND',
              })}
            </Text>
          </View>
        </TouchableOpacity>
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
    // paddingLeft: '20@s',
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
  left: {
    flexDirection: 'row',
  },
  item: {
    flexDirection: 'row',
  },
  btn: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderRadius: 8,
    paddingHorizontal: '16@s',
    paddingVertical: '8@vs',
  },
  btnSelect: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderRadius: 8,
    paddingHorizontal: '16@s',
    paddingVertical: '8@vs',
    borderColor: theme.primaryColor,
    borderWidth: 1,
  },
});

export default ItemBookingCar;
