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
import {Image, RefreshControl} from 'react-native';
import {ScaledSheet} from 'react-native-size-matters';
import theme from '../../../theme';
import {Rating} from 'react-native-ratings';
import ItemReservation from '../ItemReservation';

class ListMyReservationUpComing extends Component {
  constructor(props) {
    super(props);
    this.state = {
      refreshing: false,
    };
  }
  render() {
    const {isPending, getListTripUser} = this.props;
    return (
      <Container>
        <Content
          refreshControl={
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={getListTripUser}
            />
          }>
          <List
            dataArray={this.props.data}
            renderItem={({item}) => {
              return (
                <ListItem noBorder>
                  <ItemReservation item={item} isPending={isPending} />
                </ListItem>
              );
            }}
          />
        </Content>
      </Container>
    );
  }
}

const styles = ScaledSheet.create({});
export default ListMyReservationUpComing;
