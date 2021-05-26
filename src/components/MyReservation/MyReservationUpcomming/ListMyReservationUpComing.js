import React, {Component} from 'react';
import {
  Container,
  Header,
  Content,
  List,
  ListItem,
  Text,
  Left,
  Right,
  Icon,
  Body,
  Row,
  Col,
  Item,
  Card,
  View,
} from 'native-base';
import {Image} from 'react-native';
import {ScaledSheet} from 'react-native-size-matters';
import theme from '../../../theme';
import {Rating} from 'react-native-ratings';
import ItemReservation from '../ItemReservation';

class ListMyReservationUpComing extends Component {
  render() {
    return (
      <Container>
        <Content>
          <List>
            <ListItem noBorder>
              <ItemReservation />
            </ListItem>
          </List>
        </Content>
      </Container>
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
  card: {
    width: '100%',
    paddingHorizontal: '16@ms',
    paddingVertical: '10@ms',
    borderRadius: 8,
  },
  subTitle: {
    fontSize: '14@ms',
    color: theme.grey_dark,
    paddingHorizontal: '5@s',
  },
  value: {
    fontSize: '16@ms',
    fontWeight: '600',
    textAlign: 'center',
  },
  viewDriver: {
    marginLeft: '8@s',
  },
  bottom: {
    paddingVertical: '10@vs',
  },
  center: {
    paddingVertical: '10@vs',
  },
  top: {
    paddingBottom: '10@vs',
  },
  location: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  vehicleTypeView: {
    paddingVertical: '10@vs',
  },
  state: {
    fontWeight: 'bold',
  },
  name: {
    fontSize: '14@ms',
    fontWeight: 'bold',
  },
  textLocation: {
    paddingLeft: '30@s',
    fontSize: '16@ms',
  },
  vehicleInfo: {
    borderRadius: 5,
    backgroundColor: theme.grey_dark,
    paddingVertical: '3@vs',
    paddingHorizontal: '5@s',
    marginTop: '3@vs',
  },
  textVehicleInfo: {
    fontSize: '14@ms',
  },
});
export default ListMyReservationUpComing;
