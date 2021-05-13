import React from 'react';
import {StyleSheet, View, Dimensions} from 'react-native';
import {
  Body,
  Button,
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
import MapView, {Callout, Marker, ProviderPropType} from 'react-native-maps';
import {
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import theme from '../theme';
import Geocoder from 'react-native-geocoding';
import {ScrollView, TouchableOpacity} from 'react-native-gesture-handler';
import GetLocation from 'react-native-get-location';
import {getLocation} from '../tools/utils';
import DateTimeSelect from '../components/MapView/DateTimeSelect/DateTimeSelect';
import MapViewDirections from 'react-native-maps-directions';
// import PriceMarker from './PriceMarker';

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
        {
          key: 1,
          latitude: LATITUDE,
          longitude: LONGITUDE,
        },
        {
          key: 2,
          latitude: 37.771707,
          longitude: -122.4053769,
        },
      ],
      startLocation: '',
      endLocation: '',
      step: STEP.ENTER_ADDRESS,
      chosenDate: new Date(),
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
    this.setState({startLocation: text});
  };
  goBack = () => {
    this.props.navigation.goBack();
  };
  onClickBtnNext = () => {
    const {step} = this.state;
    if (step === STEP.ENTER_ADDRESS) {
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
  render() {
    const {markers, step, chosenDate, coordinates} = this.state;
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
            {this.state.coordinates.length >= 2 && (
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
            )}
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
                <Input rounded placeholder="Xin vui lòng nhập điểm đi" />
              </Item>
              <Item fixedLabel style={styles.textInput}>
                <Icon
                  active
                  name="md-add"
                  type="Ionicons"
                  style={{fontSize: 24, color: theme.primaryColor}}
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
            </View>
          ) : (
            <ScrollView style={styles.date}>
              <View style={styles.inLine}>
                <TouchableOpacity>
                  <Icon
                    active
                    name="close"
                    type="EvilIcons"
                    style={{fontSize: 24, color: 'dark'}}
                  />
                </TouchableOpacity>
                <Text style={styles.textTitle}>Chọn khoảng thời gian đón</Text>
              </View>
              <DateTimeSelect />
            </ScrollView>
          )}
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

const styles = StyleSheet.create({
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
    height: responsiveHeight(75),
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
    height: responsiveHeight(25),
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
    // justifyContent: 'space-evenly',
  },
  textDate: {
    color: theme.primaryColor,
    paddingHorizontal: 20,
    justifyContent: 'center',
    paddingTop: 5,
  },
});

export default MapViewScreen;
