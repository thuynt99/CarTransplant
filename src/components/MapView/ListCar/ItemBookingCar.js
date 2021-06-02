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

    const selected = item?.id === itemCarSelected?.id;
    return (
      <Card style={{borderRadius: 8}}>
        <TouchableOpacity
          onPress={() => onSelectCar(item)}
          style={selected ? styles.btnSelect : styles.btn}>
          <CardItem>
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
                <Text style={styles.textPrice}>
                  <Text>{item?.model}</Text>
                  <Text> - {item?.color}</Text>
                </Text>

                <Text style={styles.textCar}>{item.licensePlate}</Text>
              </View>
            </View>
            <Right />
          </CardItem>
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
  item: {
    paddingHorizontal: '8@s',
    marginVertical: '16@vs',
    borderRadius: 8,
  },
  list: {
    paddingHorizontal: '16@s',
    marginVertical: '16@s',
  },
  view: {
    paddingLeft: '20@s',
  },
  textPrice: {
    fontSize: '14@ms',
    color: theme.grey_dark_30,
    fontWeight: 'bold',
  },
  textCar: {
    fontSize: '13@ms',
    color: theme.grey_dark,
  },
  checkboxStyle: {
    width: '24@ms',
    height: '24@ms',
    borderRadius: '24@ms',
    alignItems: 'center',
    justifyContent: 'center',
  },
  bottom: {
    flexDirection: 'row',
  },
  btnSelect: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderRadius: 8,
    paddingHorizontal: '8@s',
    borderColor: theme.primaryColor,
    borderWidth: 1,
  },
  btn: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderRadius: 8,
    paddingHorizontal: '8@s',
  },
});

export default ItemBookingCar;
