import {View} from 'native-base';
import React, {Component} from 'react';
import {ScaledSheet} from 'react-native-size-matters';
import theme from '../../../theme';
import {FlatList} from 'react-native-gesture-handler';
import ItemBookingCar from './ItemBookingCar';

class ListBookingCar extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const {onSelectCar, listVehicle} = this.props;
    return (
      <View style={styles.container}>
        <FlatList
          style={styles.container}
          data={listVehicle}
          renderItem={({item, index}) => (
            <ItemBookingCar
              onSelectCar={onSelectCar}
              index={index}
              item={item}
            />
          )}
          keyExtractor={item => item.id}
        />
      </View>
    );
  }
}

const styles = ScaledSheet.create({
  container: {
    // flex: 1,
  },
});

export default ListBookingCar;
