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
    const {onSelectCar, listVehicle, itemCarSelected} = this.props;
    return (
      <View style={styles.container}>
        <FlatList
          style={styles.container}
          data={listVehicle}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({item, index}) => (
            <ItemBookingCar
              onSelectCar={onSelectCar}
              key={index}
              item={item}
              itemCarSelected={itemCarSelected}
            />
          )}
        />
      </View>
    );
  }
}

const styles = ScaledSheet.create({
  container: {
    // flex: 1,
    paddingTop: '5@vs',
    paddingBottom: '10@vs',
  },
});

export default ListBookingCar;
