import React from 'react';
import {StyleSheet, View, Dimensions} from 'react-native';
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
  Text,
  Title,
} from 'native-base';
import moment from 'moment';
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

const listVehicle = [
  {
    id: 1,
    name: 'Xe 5 chỗ',
    price: 325.0,
  },
  {
    id: 2,
    name: 'Xe 7 chỗ',
    price: 325.0,
  },
  {
    id: 3,
    name: 'Xe 5 chỗ',
    price: 325.0,
  },
];

const {width, height} = Dimensions.get('window');

const ASPECT_RATIO = width / height;
const LATITUDE = 21.032139;
const LONGITUDE = 105.782222;
const LATITUDE_DELTA = 0.04;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
const GOOGLE_MAPS_APIKEY = 'AIzaSyDyDhYNrrak9PXgIJRS6FAhLccCfJ2YgUI';

const STEP = {
  ENTER_ADDRESS: 0,
  ENTER_DATE: 1,
  DATE_TIME_SELECT: 2,
  SELECT_CAR: 3,
};

class MapViewScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      markers: [
        {
          key: 1,
          coordinate: {
            latitude: LATITUDE,
            longitude: LONGITUDE,
          },
        },
      ],
      coordinates: [
        {key: 1, latitude: LATITUDE, longitude: LONGITUDE},
        {key: 2, latitude: 20.991103600404188, longitude: 105.80253549999999},
        {key: 3, latitude: 20.990816900404184, longitude: 105.8026274},
        {key: 4, latitude: 20.990718000404183, longitude: 105.80349369999999},
        {key: 5, latitude: 20.99100100040419, longitude: 105.80390409999998},
        {key: 6, latitude: 20.9918261004042, longitude: 105.804057},
        {key: 7, longitude: 105.8038343, latitude: 20.992127900404217},
        {key: 8, longitude: 105.8029358, latitude: 20.992263100404212},
        {key: 9, longitude: 105.80290029999999, latitude: 20.992239500404217},
        {key: 10, longitude: 105.80253549999999, latitude: 20.99200010040421},
      ],
      startLocation: '',
      endLocation: '',
      step: STEP.ENTER_ADDRESS,
      chosenDate: new Date(),
      dateStart: moment(),
      dateEnd: moment().add(1, 'hours'),
      startStation: '',
      endStation: '',
    };
    this.mapView = null;
  }
  componentDidMount() {
    this.getCurrentLocation();
  }
  getCurrentLocation = () => {
    getLocation().then(res => {
      this.setState(
        {
          myLocation: {
            latitude: res.latitude,
            longitude: res.longitude,
          },
        },
        () => console.log('myLocation', this.state.myLocation),
      );
    });
  };
  onChangeText = text => {
    this.setState({startStation: text});
  };
  goBack = () => {
    this.props.navigation.goBack();
  };
  onClickBtnNext = () => {
    const {step} = this.state;
    if (step === STEP.ENTER_DATE) {
      this.setState({step: STEP.SELECT_CAR});
    } else {
      this.setState({step: STEP.ENTER_DATE});
    }
  };
  showViewSelectDate = () => {
    this.setState({step: STEP.DATE_TIME_SELECT});
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
  render() {
    const {
      markers,
      step,
      chosenDate,
      coordinates,
      dateStart,
      dateEnd,
      startStation,
      endLocation,
    } = this.state;
    return (
      <View style={styles.container}>
        <View style={styles.mapView}>
          <View style={styles.header}>
            <Button rounded style={styles.btnBack} onPress={this.goBack}>
              <Icon name="arrow-back" type="MaterialIcons" />
            </Button>
          </View>
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
            showsMyLocationButton={true}
            provider="google"
            onRegionChangeComplete={this.updateRegion}
            region={{
              latitude: LATITUDE,
              longitude: LONGITUDE,
              latitudeDelta: LATITUDE_DELTA,
              longitudeDelta: LONGITUDE_DELTA,
            }}
            moveOnMarkerPress={false}>
            <Polyline
              coordinates={[
                {latitude: LATITUDE, longitude: LONGITUDE},
                {latitude: 20.991103600404188, longitude: 105.80253549999999},
                {latitude: 20.990816900404184, longitude: 105.8026274},
                {latitude: 20.990718000404183, longitude: 105.80349369999999},
                {latitude: 20.99100100040419, longitude: 105.80390409999998},
                {latitude: 20.9918261004042, longitude: 105.804057},
                {longitude: 105.8038343, latitude: 20.992127900404217},
                {longitude: 105.8029358, latitude: 20.992263100404212},
                {longitude: 105.80290029999999, latitude: 20.992239500404217},
                {longitude: 105.80253549999999, latitude: 20.99200010040421},
              ]}
              strokeColor={theme.primaryColor} // fallback for when `strokeColors` is not supported by the map-provider
              strokeColors={[
                '#7F0000',
                '#00000000', // no color, creates a "long" gradient between the previous and next coordinate
                '#B24112',
                '#E5845C',
                '#238C23',
                '#7F0000',
              ]}
              strokeWidth={6}
            />
            {coordinates.map(marker => {
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
            })}
            {/* {this.state.coordinates.length >= 2 && (
              <MapViewDirections
                origin={this.state.coordinates[0]}
                waypoints={
                  this.state.coordinates.length > 2
                    ? this.state.coordinates.slice(1, -1)
                    : null
                }
                destination={
                  this.state.coordinates[this.state.coordinates.length - 1]
                }
                apikey={GOOGLE_MAPS_APIKEY}
                strokeWidth={3}
                strokeColor="hotpink"
                optimizeWaypoints={true}
                onStart={params => {
                  console.log(
                    `Started routing between "${params.origin}" and "${
                      params.destination
                    }"`,
                  );
                }}
                onReady={result => {
                  console.log(`Distance: ${result.distance} km`);
                  console.log(`Duration: ${result.duration} min.`);

                  this.mapView.fitToCoordinates(result.coordinates, {
                    edgePadding: {
                      right: width / 20,
                      bottom: height / 20,
                      left: width / 20,
                      top: height / 20,
                    },
                  });
                }}
                onError={errorMessage => {
                  console.log('GOT AN ERROR', errorMessage);
                }}
              />
            )} */}
          </MapView>
          <Callout style={styles.buttonMyLocation}>
            <TouchableOpacity
              style={styles.btnBack}
              onPress={this.getCurrentLocation}>
              <Icon name="my-location" type="MaterialIcons" />
            </TouchableOpacity>
          </Callout>
        </View>
        <View style={styles.viewInput}>
          {step === STEP.ENTER_ADDRESS ? (
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
                  onChangeText={this.onChangeText}
                  value={startStation}
                />
              </Item>
              <Item fixedLabel style={styles.textInput}>
                <Icon
                  active
                  name="md-add"
                  type="Ionicons"
                  style={{fontSize: 24, color: theme.primaryColor}}
                  onChangeText={this.onChangeText}
                  value={endLocation}
                />
                <Input rounded placeholder="Xin vui lòng nhập điểm đến" />
              </Item>
            </Form>
          ) : step === STEP.ENTER_DATE ? (
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
                <Text style={styles.textDate}>Chọn thời gian di chuyển</Text>
              </TouchableOpacity>
              <Text style={styles.text} numberOfLines={2}>
                Tài xế sẽ đón bạn vào khoảng thời gian từ{' '}
                {moment(dateStart).format(FORMAT.TIME)} đến{' '}
                {moment(dateEnd).format(FORMAT.TIME)} ngày{' '}
                {moment(dateStart).format(FORMAT.DATE)}
              </Text>
            </View>
          ) : step === STEP.DATE_TIME_SELECT ? (
            <ScrollView style={styles.date}>
              <View style={styles.inLine}>
                <TouchableOpacity
                  onPress={() => {
                    this.setState({step: STEP.ENTER_DATE});
                  }}>
                  <Icon
                    active
                    name="close"
                    type="EvilIcons"
                    style={{fontSize: 24, color: 'dark'}}
                  />
                </TouchableOpacity>
                <Text style={styles.textTitle}>Chọn khoảng thời gian đón</Text>
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
              <ListBookingCar listVehicle={listVehicle} />
            </ScrollView>
          )}
          {/* <CardItem>
            <Left>
              <Icon name="people" type="MaterialIcons" />
              <Text style={styles.textKM}>Số người:</Text>
            </Left>
            <Right>
              <Text>1</Text>
            </Right>
          </CardItem>
          <CardItem>
            <Left>
              <Icon name="tagso" type="AntDesign" fontSize={10} />
              <Text style={styles.textKM}>Khuyến mãi:</Text>
            </Left>
            <Right>
              <Text>HELLOBANMOI</Text>
            </Right>
          </CardItem> */}
          <Button
            block
            danger
            style={styles.btnNext}
            onPress={this.onClickBtnNext}>
            <Text>Tiếp theo</Text>
          </Button>
        </View>
      </View>
    );
  }
}

MapViewScreen.propTypes = {
  provider: ProviderPropType,
};

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
});

export default MapViewScreen;
