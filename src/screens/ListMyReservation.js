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
  Spinner,
  View,
} from 'native-base';
import ListMyReservationUpComing from '../components/MyReservation/MyReservationUpcomming/ListMyReservationUpComing';
import ListMyReservationHistory from '../components/MyReservation/MyReservationHistory/ListMyReservationHistory';
import theme from '../theme';
import {connect} from 'react-redux';
import {getListTripDriver, getListTripUser} from '../stores/trip/actions';
import {PARAMS_LIST_TRIP} from '../constants/api';
import _ from 'lodash';
import {Text} from 'react-native';
import LoadingCustom from '../components/common/LoadingCustom';

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
    return {loading: trip.loading};
  }
  async componentDidMount() {
    console.log('he lo');
    this.getListTripDriver();
    this.focusListener = this.props.navigation.addListener('focus', () => {
      // The screen is focused
      // Call any action
      this.getListTripDriver();
    });
  }
  componentWillUnmount() {
    this.focusListener();
  }

  onChangeTab = i => {
    this.setState({currentTab: i}, this.getListTripDriver);
    console.log(i);
  };
  getListTripDriver = async () => {
    console.log('listTrip', this.state.listTrip);
    const {currentTab} = this.state;
    const params =
      currentTab === 0
        ? PARAMS_LIST_TRIP.UPCOMING
        : currentTab === 1
        ? PARAMS_LIST_TRIP.PENDING
        : PARAMS_LIST_TRIP.HISTORY;
    await this.props.getListTripDriver(params);
    this.setState({listTrip: this.props.trip.listTrip});
  };
  render() {
    const {listTrip, loading} = this.state;
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
        <Tabs
          tabBarBackgroundColor="#fff"
          headerTintColor="#fff"
          tabBarUnderlineStyle={{backgroundColor: theme.primaryColor}}
          tabBarPosition="top"
          onChangeTab={({i}) => this.onChangeTab(i)}>
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
            <ListMyReservationUpComing
              data={listTrip}
              getListTripDriver={this.getListTripDriver}
            />
          </Tab>
          {/* <Tab
            heading="Đang chờ"
            tabStyle={{
              backgroundColor: theme.white,
            }}
            activeTabStyle={{
              backgroundColor: theme.white,
            }}
            activeTextStyle={{color: theme.primaryColor, fontWeight: 'bold'}}
            textStyle={{color: theme.grey_dark}}>
            <ListMyReservationUpComing
              data={listTrip}
              getListTripDriver={this.getListTripDriver}
            />
          </Tab> */}
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
        <LoadingCustom loading={loading} />
        {_.isEmpty(listTrip) && !loading && (
          <View style={{alignSelf: 'center', flex: 1, paddingHorizontal: 30}}>
            <Text
              style={{
                color: theme.grey_dark,
                fontWeight: 'bold',
                textAlign: 'center',
              }}>
              Bạn chưa có chuyến đi nào !!!
            </Text>
            <Text
              style={{
                color: theme.grey_light,
                textAlign: 'justify',
                fontSize: 12,
                paddingVertical: 5,
              }}>
              Hãy nhớ đặt xe để tiết kiệm chi phí lên tới 60% nhé. Vui lòng quay
              về trang chủ đặt xe và hưởng ưu đãi mới nhất từ Car Transplant!
            </Text>
          </View>
        )}
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  trip: state.trip,
});

const mapDispatchToProps = dispatch => ({
  getListTripDriver: params => dispatch(getListTripDriver(params)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ListMyReservation);
