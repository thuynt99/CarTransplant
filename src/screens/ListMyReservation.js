import React, {Component} from 'react';
import {
  Container,
  Header,
  Tab,
  Tabs,
  ScrollableTab,
  Left,
  Body,
  Right,
  Title,
} from 'native-base';
import ListMyReservationUpComing from '../components/MyReservation/MyReservationUpcomming/ListMyReservationUpComing';
import ListMyReservationHistory from '../components/MyReservation/MyReservationHistory/ListMyReservationHistory';
import theme from '../theme';

export default class ListMyReservation extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <Container>
        <Header style={{backgroundColor: theme.primaryColor}}>
          <Left style={{flex: 1}} />
          <Body style={{flex: 1}}>
            <Title style={{alignSelf: 'center', fontWeight: '600'}}>
              Hoạt động
            </Title>
          </Body>
          <Right style={{flex: 1}} />
        </Header>
        <Tabs
          tabBarBackgroundColor="#fff"
          headerTintColor="#fff"
          tabBarUnderlineStyle={{backgroundColor: theme.primaryColor}}
          tabBarPosition="top">
          <Tab
            heading="Sắp tới"
            tabStyle={{
              backgroundColor: theme.white,
            }}
            activeTabStyle={{
              backgroundColor: theme.white,
            }}
            activeTextStyle={{color: theme.primaryColor, fontWeight: 'bold'}}
            textStyle={{color: theme.grey_dark}}>
            <ListMyReservationUpComing />
          </Tab>
          <Tab
            heading="Lịch sử"
            tabStyle={{
              backgroundColor: theme.white,
            }}
            activeTabStyle={{
              backgroundColor: theme.white,
            }}
            activeTextStyle={{color: theme.primaryColor, fontWeight: 'bold'}}
            textStyle={{color: theme.grey_dark}}>
            <ListMyReservationHistory {...this.props} />
          </Tab>
        </Tabs>
      </Container>
    );
  }
}
