import React from 'react';
import {StyleSheet, View, Dimensions, Alert} from 'react-native';
import {
  Body,
  Button,
  Card,
  CardItem,
  Form,
  Header,
  Icon,
  Input,
  Item,
  Left,
  Right,
  Row,
  Spinner,
  Text,
  Title,
} from 'native-base';
import moment from 'moment';
import _ from 'lodash';
import MapView, {
  Callout,
  Marker,
  Polyline,
  ProviderPropType,
} from 'react-native-maps';
import {
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import theme from '../theme';
import {ScrollView, TouchableOpacity} from 'react-native-gesture-handler';
import {getLocation} from '../tools/utils';
import DateTimeSelect from '../components/MapView/DateTimeSelect/DateTimeSelect';
import MapViewDirections from 'react-native-maps-directions';
import {ScaledSheet} from 'react-native-size-matters';
import {FORMAT} from '../constants/format';
import ListBookingCar from '../components/MapView/ListCar/ListBookingCar';
import {connect} from 'react-redux';
import {
  getPlaceByLocation,
  getRouting,
  searchAddress,
} from '../stores/map/actions';
import SearchAddress from '../components/MapView/SearchAddress/SearchAddress';
import ConfirmTrip from '../components/MapView/ConfirmTrip/ConfirmTrip';
import {STEP_MAP_VIEW} from '../constants/data';
import {findTrip, takeTrip} from '../stores/trip/actions';
import axios from 'axios';
import {LIST_MY_RESERVATION} from '../constants';

const {width, height} = Dimensions.get('window');

const ASPECT_RATIO = width / height;
const LATITUDE = 21.032139;
const LONGITUDE = 105.782222;
const LATITUDE_DELTA = 0.04;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
const GOOGLE_MAPS_APIKEY = 'AIzaSyDyDhYNrrak9PXgIJRS6FAhLccCfJ2YgUI';

class MapViewScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      coordinates: [],
      myLocation: {
        latitude: LATITUDE,
        longitude: LONGITUDE,
      },
      startStation: {},
      endStation: {},
      step: STEP_MAP_VIEW.ENTER_ADDRESS,
      chosenDate: new Date(),
      dateStart: moment(),
      dateEnd: moment().add(1, 'hours'),
      listAddress: [],
      key: 'startStation',
      listVehicle: [],
      loading: false,
      itemCarSelected: {},
      seat: 1,
    };
    this.mapView = null;
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    const {map, trip} = nextProps;
    return {loading: map.loading || trip.loading};
  }

  async componentDidMount() {
    await this.getCurrentLocation();
  }

  callApi = async (lat, long) => {
    await this.props.getPlaceByLocation({
      lat,
      long,
    });
    const {map} = this.props;
    this.setState({startStation: map.startLocation});
  };

  getCurrentLocation = async () => {
    getLocation().then(async res => {
      this.setState({
        myLocation: {
          latitude: res.latitude,
          longitude: res.longitude,
        },
      });
      this.callApi(res.latitude, res.longitude);
    });
  };

  goBack = () => {
    const {step} = this.state;
    if (step === STEP_MAP_VIEW.ENTER_ADDRESS) {
      this.props.navigation.goBack();
    } else if (step === STEP_MAP_VIEW.ENTER_DATE) {
      this.setState({step: STEP_MAP_VIEW.ENTER_ADDRESS});
    } else if (step === STEP_MAP_VIEW.SELECT_CAR) {
      this.setState({step: STEP_MAP_VIEW.ENTER_DATE});
    }
  };

  onClickBtnNext = async () => {
    const {step} = this.state;
    if (step === STEP_MAP_VIEW.ENTER_DATE) {
      await this.getTrip();
      this.setState({step: STEP_MAP_VIEW.SELECT_CAR});
    } else if (step === STEP_MAP_VIEW.SELECT_CAR) {
      this.setState({step: STEP_MAP_VIEW.CONFIRM_TRIP});
    } else {
      this.setState({step: STEP_MAP_VIEW.ENTER_DATE});
    }
  };

  showViewSelectDate = () => {
    this.setState({step: STEP_MAP_VIEW.DATE_TIME_SELECT});
  };
  getTrip = async () => {
    const {startStation, endStation, dateStart, dateEnd} = this.state;
    const body = {
      begin_leave_time: dateStart.unix(),
      end_leave_time: dateEnd.unix(),
      from: {
        latitude: startStation.latitude,
        longitude: startStation.longitude,
      },
      to: {
        latitude: endStation.latitude,
        longitude: endStation.longitude,
      },
      opt: 0,
    };
    await this.props.findTrip(JSON.stringify(body)).then(res => {
      console.log('res', res);
      if (res.status) {
        this.setState({listVehicle: res.data});
        if (_.isEmpty(res.data)) {
          Alert.alert(
            'Không tìm được xe thoả mãn',
            'Bạn có muốn lưu lại chuyến đi.\n Chúng tôi sẽ tìm tài xế cho bạn sớm nhất?',
            [
              {
                text: 'Cancel',
                onPress: () =>
                  this.setState({step: STEP_MAP_VIEW.ENTER_ADDRESS}),
                style: 'cancel',
              },
              {
                text: 'OK',
                onPress: () =>
                  this.props.navigation.navigate(LIST_MY_RESERVATION),
              },
            ],
          );
        }
      }
    });
  };
  onMapPress = e => {
    this.setState({
      coordinates: [...this.state.coordinates, e.nativeEvent.coordinate],
    });
  };

  onChangeTimeStart = date => {
    this.setState({dateStart: date});
  };

  onChangeTimeEnd = date => {
    this.setState({dateEnd: date});
  };

  onChangeDate = day => {
    const {dateStart, dateEnd} = this.state;
    const date = day.format(FORMAT.DAY);
    const month = day.format(FORMAT.MONTH) - 1;
    const year = day.format(FORMAT.YEAR);
    const dateNewStart = moment(dateStart).set({
      date,
      month,
      year,
    });
    const dateNewEnd = moment(dateEnd).set({
      date,
      month,
      year,
    });
    this.setState({dateStart: dateNewStart, dateEnd: dateNewEnd});
  };

  goToSearch = key => {
    this.setState({step: STEP_MAP_VIEW.SEARCH_ADDRESS, key: key});
  };
  goToMapScreen = (step = STEP_MAP_VIEW.ENTER_DATE) => {
    this.setState({step: step});
  };
  onSearchAddress = query => {
    this.props.searchAddress(query).then(res => {
      console.log('searchAddress', res);
      this.setState({listAddress: res.data});
    });
  };
  onSelectCar = item => {
    this.setState({itemCarSelected: item});
  };
  onPressAddress = item => {
    const {key} = this.state;
    this.setState({[key]: item});
    if (key === 'endStation') {
      const params = {
        fromLat: parseFloat(this.state.startStation.latitude),
        fromLong: parseFloat(this.state.startStation.longitude),
        toLat: parseFloat(item.latitude),
        toLong: parseFloat(item.longitude),
      };
      this.props.getRouting(params).then(res => {
        console.log('getRouting', res);
        if (res.status) {
          const dataTmp = res.data.routes[0];
          const arrayObj = dataTmp.steps.map((item, index) => {
            return {
              latitude: parseFloat(item.location.latitude),
              longitude: parseFloat(item.location.longitude),
              name: item.name,
              id: index,
            };
          });
          this.setState({coordinates: arrayObj});
        }
      });
    }
  };
  onClickConfirmTrip = async () => {
    const {startStation, endStation, dateStart, dateEnd, seat} = this.state;
    const body = {
      begin_leave_time: dateStart.unix(),
      end_leave_time: dateEnd.unix(),
      from: {
        latitude: startStation.latitude,
        longitude: startStation.longitude,
      },
      to: {
        latitude: endStation.latitude,
        longitude: endStation.longitude,
      },
      seat,
    };
    this.props.takeTrip(JSON.stringify(body)).then(res => {
      if (res.status) {
        Alert.alert('Đặt xe thành công', 'Đi đễn màn hình chuyến đi của bạn?', [
          {
            text: 'Cancel',
            onPress: () => console.log('Cancel Pressed'),
            style: 'cancel',
          },
          {
            text: 'OK',
            onPress: () => this.props.navigation.navigate(LIST_MY_RESERVATION),
          },
        ]);
      } else {
        Alert.alert('Đặt xe thất bại', 'Hãy thử đặt chuyến lại?', [
          {
            text: 'Cancel',
            onPress: () => console.log('Cancel Pressed'),
            style: 'cancel',
          },
          {
            text: 'OK',
            onPress: () => this.setState({step: STEP_MAP_VIEW.ENTER_ADDRESS}),
          },
        ]);
      }
    });
  };
  render() {
    const {
      step,
      myLocation,
      coordinates,
      dateStart,
      dateEnd,
      startStation,
      endStation,
      listAddress,
      listVehicle,
      loading,
      itemCarSelected,
      seat,
    } = this.state;
    const {map} = this.props;
    return (
      <View style={styles.container}>
        {step === STEP_MAP_VIEW.SEARCH_ADDRESS ? (
          <SearchAddress
            goToMapScreen={() =>
              this.goToMapScreen(STEP_MAP_VIEW.ENTER_ADDRESS)
            }
            listAddress={listAddress}
            onPressAddress={this.onPressAddress}
            onSearchAddress={this.onSearchAddress}
          />
        ) : step === STEP_MAP_VIEW.CONFIRM_TRIP ? (
          <ConfirmTrip
            goToMapScreen={() => this.goToMapScreen(STEP_MAP_VIEW.SELECT_CAR)}
            startStation={startStation}
            endStation={endStation}
            dateStart={dateStart}
            dateEnd={dateEnd}
            seat={seat}
            itemCarSelected={itemCarSelected}
            onClickConfirmTrip={this.onClickConfirmTrip}
          />
        ) : (
          <>
            <View style={styles.mapView}>
              <Callout style={styles.buttonBack}>
                <Button rounded style={styles.btnBack} onPress={this.goBack}>
                  <Icon
                    name="arrow-back"
                    type="MaterialIcons"
                    style={{color: theme.primaryColor}}
                  />
                </Button>
              </Callout>
              <MapView
                ref={MapView => (this.MapView = MapView)}
                provider="google"
                style={styles.map}
                showsUserLocation={true}
                followUserLocation={true}
                showsCompass={true}
                zoomEnabled={true}
                showsPointsOfInterest={false}
                paddingAdjustmentBehavior={'automatic'}
                showsIndoors={true}
                showsIndoorLevelPicker={false}
                showsTraffic={false}
                toolbarEnabled={false}
                loadingEnabled={true}
                showsMyLocationButton={false}
                provider="google"
                onRegionChangeComplete={this.updateRegion}
                region={{
                  latitude: myLocation.latitude,
                  longitude: myLocation.longitude,
                  latitudeDelta: LATITUDE_DELTA,
                  longitudeDelta: LONGITUDE_DELTA,
                }}
                moveOnMarkerPress={false}>
                <Polyline
                  coordinates={coordinates}
                  strokeColor={theme.primaryColor}
                  strokeWidth={6}
                />
                {coordinates.map(marker => {
                  if (marker.id === _.last(coordinates).id) {
                    return (
                      <Marker
                        key={marker.id}
                        coordinate={{
                          latitude: marker.latitude,
                          longitude: marker.longitude,
                        }}
                        title={marker.title}
                      />
                    );
                  }
                })}
              </MapView>
              <Callout style={styles.buttonMyLocation}>
                <TouchableOpacity
                  style={styles.backBtn}
                  onPress={this.getCurrentLocation}>
                  <Icon name="my-location" type="MaterialIcons" />
                </TouchableOpacity>
              </Callout>
              <Callout style={styles.spinner}>
                {loading && <Spinner color={theme.primaryColor} />}
              </Callout>
            </View>
            <View style={styles.viewInput}>
              {step === STEP_MAP_VIEW.ENTER_ADDRESS ? (
                <Form>
                  <Item fixedLabel style={styles.textInput}>
                    <Icon
                      active
                      name="location"
                      type="Entypo"
                      style={{fontSize: 24, color: theme.primaryColor}}
                    />
                    <Input
                      rounded
                      placeholder="Xin vui lòng nhập điểm đi"
                      defaultValue={map.startLocation?.display_name}
                      value={startStation?.display_name}
                      onFocus={() => this.goToSearch('startStation')}
                      ellipsizeMode="head"
                    />
                  </Item>
                  <Item fixedLabel style={styles.textInput}>
                    <Icon
                      active
                      name="md-add"
                      type="Ionicons"
                      style={{fontSize: 24, color: theme.primaryColor}}
                    />
                    <Input
                      rounded
                      placeholder="Xin vui lòng nhập điểm đến"
                      value={endStation?.display_name}
                      onFocus={() => this.goToSearch('endStation')}
                    />
                  </Item>
                </Form>
              ) : step === STEP_MAP_VIEW.ENTER_DATE ? (
                <View style={styles.date}>
                  <Text style={styles.textTitle}>Lịch trình chuyến đi</Text>
                  <TouchableOpacity
                    style={styles.inLine}
                    onPress={this.showViewSelectDate}>
                    <Icon
                      active
                      name="date"
                      type="Fontisto"
                      style={{fontSize: 24, color: theme.primaryColor}}
                    />
                    <Text style={styles.textDate}>
                      Chọn thời gian di chuyển
                    </Text>
                  </TouchableOpacity>
                  <Text style={styles.text} numberOfLines={2}>
                    Tài xế sẽ đón bạn vào khoảng thời gian từ{' '}
                    {moment(dateStart).format(FORMAT.TIME)} đến{' '}
                    {moment(dateEnd).format(FORMAT.TIME)} ngày{' '}
                    {moment(dateStart).format(FORMAT.DATE)}
                  </Text>
                </View>
              ) : step === STEP_MAP_VIEW.DATE_TIME_SELECT ? (
                <ScrollView style={styles.date}>
                  <View style={styles.inLine}>
                    <TouchableOpacity
                      onPress={() => {
                        this.setState({step: STEP_MAP_VIEW.ENTER_DATE});
                      }}>
                      <Icon
                        active
                        name="close"
                        type="EvilIcons"
                        style={{fontSize: 24, color: 'dark'}}
                      />
                    </TouchableOpacity>
                    <Text style={styles.textTitle}>
                      Chọn khoảng thời gian đón
                    </Text>
                  </View>
                  <DateTimeSelect
                    dateStart={dateStart}
                    dateEnd={dateEnd}
                    onChangeDate={this.onChangeDate}
                    onChangeTimeStart={this.onChangeTimeStart}
                    onChangeTimeEnd={this.onChangeTimeEnd}
                  />
                </ScrollView>
              ) : (
                <ScrollView style={styles.date}>
                  <Row>
                    <Left>
                      <Text style={styles.textTitleCar}>Số người</Text>
                    </Left>
                    <Right>
                      <View style={styles.row}>
                        {seat > 1 && (
                          <TouchableOpacity
                            style={styles.btnPlus}
                            onPress={() =>
                              this.setState({
                                seat: seat - 1,
                              })
                            }>
                            <Icon
                              name="minus"
                              type="Entypo"
                              style={{color: theme.primaryColor}}
                            />
                          </TouchableOpacity>
                        )}
                        <Text style={styles.textSeat}>{seat}</Text>
                        <TouchableOpacity
                          style={styles.btnPlus}
                          onPress={() =>
                            this.setState({
                              seat: seat + 1,
                            })
                          }>
                          <Icon
                            name="plus"
                            type="Entypo"
                            style={{color: theme.primaryColor}}
                          />
                        </TouchableOpacity>
                      </View>
                    </Right>
                  </Row>
                  {!_.isEmpty(listVehicle) && (
                    <ListBookingCar
                      listVehicle={listVehicle}
                      onSelectCar={this.onSelectCar}
                      itemCarSelected={itemCarSelected}
                    />
                  )}
                </ScrollView>
              )}
              <Button
                block
                danger
                style={styles.btnNext}
                onPress={this.onClickBtnNext}>
                <Text>
                  {step !== STEP_MAP_VIEW.SELECT_CAR ? 'Tiếp theo' : 'Xác nhận'}
                </Text>
              </Button>
            </View>
          </>
        )}
      </View>
    );
  }
}

const styles = ScaledSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'flex-end',
    alignItems: 'center',
    flex: 1,
  },

  mapView: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'flex-end',
    alignItems: 'center',
    flex: 1,
    height: responsiveHeight(70),
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
  },
  viewInput: {
    width: '100%',
    height: responsiveHeight(30),
    backgroundColor: 'white',
    borderRadius: 20,
    paddingHorizontal: responsiveWidth(2),
    justifyContent: 'space-evenly',
  },
  btnNext: {
    borderRadius: 8,
  },
  btnBack: {
    backgroundColor: theme.white,
    borderRadius: 8,
    marginTop: '20@vs',
  },
  backBtn: {
    backgroundColor: 'transparent',
  },
  buttonCallout: {
    position: 'absolute',
    top: 10,
    left: 10,
    height: responsiveHeight(25),
    zIndex: 2,
  },
  buttonMyLocation: {
    position: 'absolute',
    bottom: 0,
    right: 10,
    height: responsiveHeight(25),
    zIndex: 2,
  },
  touchable: {
    backgroundColor: 'lightblue',
    padding: 10,
    margin: 10,
  },
  textTitle: {
    fontWeight: 'bold',
    textAlign: 'center',
    paddingBottom: 10,
    paddingHorizontal: 20,
  },
  inLine: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  date: {
    paddingTop: 8,
    paddingBottom: 20,
    // justifyContent: 'space-evenly',
  },
  textDate: {
    color: theme.primaryColor,
    paddingHorizontal: 20,
    justifyContent: 'center',
    paddingTop: 5,
  },
  text: {
    fontSize: '14@ms',
    textAlign: 'center',
    paddingHorizontal: 10,
    marginTop: 16,
  },
  textKM: {
    paddingLeft: '16@s',
    fontSize: '14@ms',
  },
  buttonBack: {
    position: 'absolute',
    top: 10,
    left: 10,
    height: responsiveHeight(25),
    zIndex: 2,
  },
  spinner: {
    bottom: responsiveHeight(28),
  },
  btnPlus: {
    paddingHorizontal: '2@s',
    marginHorizontal: '16@s',
  },
  textTitleCar: {
    fontSize: '14@ms',
    fontWeight: 'bold',
    paddingLeft: '16@s',
  },
  textSeat: {
    fontSize: '16@ms',
    fontWeight: 'bold',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
const mapStateToProps = state => ({
  map: state.map,
  trip: state.trip,
});

const mapDispatchToProps = dispatch => ({
  getPlaceByLocation: params => dispatch(getPlaceByLocation(params)),
  searchAddress: query => dispatch(searchAddress(query)),
  getRouting: params => dispatch(getRouting(params)),
  findTrip: params => dispatch(findTrip(params)),
  takeTrip: params => dispatch(takeTrip(params)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(MapViewScreen);
