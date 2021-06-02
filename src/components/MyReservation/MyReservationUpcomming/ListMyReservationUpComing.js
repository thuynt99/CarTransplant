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

const styles = ScaledSheet.create({});
export default ListMyReservationUpComing;
