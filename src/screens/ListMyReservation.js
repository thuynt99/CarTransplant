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
import {connect} from 'react-redux';
import {getListTripUser} from '../stores/trip/actions';
import {PARAMS_LIST_TRIP} from '../constants/api';

class ListMyReservation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentTab: 0,
      loading: false,
      listTrip: [],
      refreshing: false,
    };
  }
  static getDerivedStateFromProps(nextProps, prevState) {
    const {trip} = nextProps;
    return {loading: trip.loading, listTrip: trip.listTrip};
  }

  onChangeTab = () => {
    this.setState({currentTab: i});
    console.log(i);
  };
  getListTripUser = async () => {
    const {currentTab} = this.state;
    const params =
      currentTab === 0
        ? PARAMS_LIST_TRIP.ACCEPTED
        : currentTab === 1
        ? PARAMS_LIST_TRIP.PENDING
        : PARAMS_LIST_TRIP.HISTORY;
    await this.props.getListTripUser(params);
  };
  render() {
    const {listTrip, loading} = this.state;
    console.log(listTrip);
    return (
      <Container>
        <Header
          style={{backgroundColor: theme.primaryColor}}
          androidStatusBarColor={theme.primaryColor}>
          <Left style={{flex: 1}} />
          <Body style={{flex: 1}}>
            <Title style={{alignSelf: 'center', fontWeight: '600'}}>
              Hoạt động
            </Title>
          </Body>
          <Right style={{flex: 1}} />
        </Header>
        {loading && (
          <Spinner
            color={theme.primaryColor}
            style={{
              alignSelf: 'center',
              justifyContent: 'center',
            }}
          />
        )}
        <Tabs
          tabBarBackgroundColor="#fff"
          headerTintColor="#fff"
          tabBarUnderlineStyle={{backgroundColor: theme.primaryColor}}
          tabBarPosition="top"
          onChangeTab={({i}) => this.onChangeTab}>
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
            <ListMyReservationUpComing data={listTrip} />
          </Tab>
          <Tab
            heading="Đang chờ"
            tabStyle={{
              backgroundColor: theme.white,
            }}
            activeTabStyle={{
              backgroundColor: theme.white,
            }}
            activeTextStyle={{color: theme.primaryColor, fontWeight: 'bold'}}
            textStyle={{color: theme.grey_dark}}>
            <ListMyReservationUpComing data={listTrip} />
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
            <ListMyReservationHistory data={listTrip} />
          </Tab>
        </Tabs>
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  trip: state.trip,
});

const mapDispatchToProps = dispatch => ({
  getListTripUser: params => dispatch(getListTripUser(params)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ListMyReservation);
