import {Body, Icon, Left, Right, Text, Card, CardItem, View} from 'native-base';
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
    return (
      <View style={styles.container}>
        <FlatList
          style={styles.container}
          data={this.props.listVehicle}
          renderItem={({item}) => <ItemBookingCar />}
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
