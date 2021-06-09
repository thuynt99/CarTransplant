import {
  Body,
  Button,
  Card,
  CardItem,
  Container,
  Icon,
  Item,
  Left,
  Right,
  Spinner,
  Tab,
  Tabs,
  View,
} from 'native-base';
import CheckBox from '@react-native-community/checkbox';
import React, {Component} from 'react';
import {ScaledSheet} from 'react-native-size-matters';
import {FlatList, TouchableOpacity} from 'react-native-gesture-handler';
import ItemBookingCar from '../components/MapView/ListCar/ItemBookingCar';
import ImageIcon from '../components/common/ImageIcon';
import {
  LIST_MY_RESERVATION,
  NOTIFICATION_DETAIL,
  REGISTER_CAR,
} from '../constants';
import {Image, RefreshControl, Text} from 'react-native';
import theme from '../theme';
import HeaderCustom from '../components/common/HeaderCustom';
import {connect} from 'react-redux';
import carReducer from '../stores/cars/reducer';
import LoadingCustom from '../components/common/LoadingCustom';
import {DEPARTMENT} from '../constants/department';
import SearchInput from '../components/common/SearchBar';
import _ from 'lodash';
import {getListActiveZone, postListActiveZone} from '../stores/trip/actions';

class ActiveRegistration extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      selectedCarId: [],
      data: DEPARTMENT,
      refreshing: false,
      currentTab: 0,
      text: '',
      listActiveZone: [],
    };
  }
  static getDerivedStateFromProps(nextProps, prevState) {
    const {trip} = nextProps;
    return {loading: trip.loading};
  }
  componentDidMount() {
    this.onGetListActiveZone();
  }
  onGetListActiveZone = async () => {
    await this.props.getListActiveZone();
    console.log(this.props.trip.listActiveZone);
  };
  onPostListActiveZone = async () => {
    const {selectedCarId} = this.state;
    await this.props
      .postListActiveZone(JSON.stringify(selectedCarId))
      .then(res => {
        console.log('res', res);
      });
  };
  onRegister = () => {
    this.props.navigation.navigate(REGISTER_CAR);
  };
  onCheckBoxPress = id => {
    let tmp = this.state.selectedCarId;

    if (tmp.includes(id)) {
      tmp.splice(tmp.indexOf(id), 1);
    } else {
      tmp.push(id);
    }
    this.setState({
      selectedCarId: tmp,
    });
  };
  onChangeTab = i => {
    this.setState({currentTab: i});
    console.log(i);
    if (i === 0) {
      this.onSearchText(this.state.text);
    } else {
      const result = _.intersectionWith(
        DEPARTMENT,
        this.state.selectedCarId,
        (a, b) => a.id === b,
      );
      this.setState({data: result});
    }
  };
  onSearchText = text => {
    this.setState({text: text});
    if (text) {
      if (text.length >= 1) {
        const result = DEPARTMENT.filter((item, i) =>
          item.name.toLowerCase().includes(text.toLowerCase()),
        );
        this.setState({data: result});
      } else {
        this.setState({data: []});
      }
    } else {
      this.setState({data: DEPARTMENT});
    }
  };
  render() {
    const {data, refreshing, loading} = this.state;
    return (
      <Container>
        <HeaderCustom
          title="Đăng kí vùng hoạt động"
          onGoBack={() => this.props.navigation.goBack()}
        />
        <LoadingCustom
          color={theme.primaryColor}
          style={{
            alignSelf: 'center',
            justifyContent: 'center',
          }}
          loading={loading}
        />
        <Tabs
          tabBarBackgroundColor="#fff"
          headerTintColor="#fff"
          tabBarUnderlineStyle={{backgroundColor: theme.primaryColor}}
          tabBarPosition="top"
          onChangeTab={({i}) => this.onChangeTab(i)}>
          <Tab
            heading="Tất cả"
            tabStyle={{
              backgroundColor: theme.white,
            }}
            activeTabStyle={{
              backgroundColor: theme.white,
            }}
            activeTextStyle={{color: theme.primaryColor, fontWeight: 'bold'}}
            textStyle={{color: theme.grey_dark}}>
            <SearchInput onSearchText={this.onSearchText} />
            <FlatList
              style={styles.list}
              data={data}
              refreshControl={
                <RefreshControl
                  refreshing={refreshing}
                  onRefresh={this.getListMyCar}
                />
              }
              keyExtractor={(item, index) => index.toString()}
              renderItem={({item, index}) => (
                <Item key={index} style={styles.item}>
                  <View styles={styles.left}>
                    <Text style={styles.textPrice}>{item.name}</Text>
                  </View>
                  <Right>
                    <CheckBox
                      style={styles.checkboxStyle}
                      value={
                        this.state.selectedCarId.includes(item.id)
                          ? true
                          : false
                      }
                      onChange={() => this.onCheckBoxPress(item.id)}
                    />
                  </Right>
                </Item>
              )}
            />
          </Tab>
          <Tab
            heading="Đã đăng kí"
            tabStyle={{
              backgroundColor: theme.white,
            }}
            activeTabStyle={{
              backgroundColor: theme.white,
            }}
            activeTextStyle={{color: theme.primaryColor, fontWeight: 'bold'}}
            textStyle={{color: theme.grey_dark}}>
            <SearchInput onSearchText={this.onSearchText} />
            <FlatList
              style={styles.list}
              data={data}
              refreshControl={
                <RefreshControl
                  refreshing={refreshing}
                  onRefresh={this.getListMyCar}
                />
              }
              keyExtractor={(item, index) => index.toString()}
              renderItem={({item, index}) => (
                <Item key={index} style={styles.item}>
                  <View styles={styles.left}>
                    <Text style={styles.textPrice}>{item.name}</Text>
                  </View>
                  <Right>
                    <CheckBox
                      style={styles.checkboxStyle}
                      value={
                        this.state.selectedCarId.includes(item.id)
                          ? true
                          : false
                      }
                      onChange={() => this.onCheckBoxPress(item.id)}
                    />
                  </Right>
                </Item>
              )}
            />
          </Tab>
        </Tabs>
      </Container>
    );
  }
}

const styles = ScaledSheet.create({
  container: {
    flex: 1,
  },
  btnAdd: {
    padding: 5,
    alignSelf: 'center',
    marginBottom: '10@vs',
  },
  item: {
    paddingHorizontal: '24@s',
    paddingVertical: '10@vs',
    borderRadius: 8,
  },
  list: {
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
});

const mapStateToProps = state => ({
  trip: state.trip,
});

const mapDispatchToProps = dispatch => ({
  getListActiveZone: params => dispatch(getListActiveZone(params)),
  postListActiveZone: params => dispatch(postListActiveZone(params)),
});
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ActiveRegistration);
