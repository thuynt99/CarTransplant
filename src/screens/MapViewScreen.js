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
import MapView, {Marker, ProviderPropType} from 'react-native-maps';
import {
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import theme from '../theme';
import Geocoder from 'react-native-geocoding';
// import PriceMarker from './PriceMarker';

const {width, height} = Dimensions.get('window');

const ASPECT_RATIO = width / height;
const LATITUDE = 21.032139;
const LONGITUDE = 105.782222;
const LATITUDE_DELTA = 0.04;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
const SPACE = 0.01;

function log(eventName, e) {
  console.log(eventName, e.nativeEvent);
}

class MapViewScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      myLocation: {
        latitude: LATITUDE,
        longitude: LONGITUDE,
      },
      b: {
        latitude: LATITUDE - SPACE,
        longitude: LONGITUDE - SPACE,
      },
      startLocation: '',
      endLocation: '',
    };
  }
  componentDidMount() {
    Geocoder.from(LATITUDE, LONGITUDE)
      .then(json => {
        var addressComponent = json.results[0].address_components[0];
        console.log('addressComponent', addressComponent);
      })
      .catch(error => console.warn(error));
  }
  onChangeText = text => {
    this.setState({startLocation: text});
  };

  render() {
    const {startLocation} = this.state;
    return (
      <View style={styles.container}>
        <View style={styles.mapView}>
          <MapView
            provider={this.props.provider}
            style={styles.map}
            initialRegion={{
              latitude: LATITUDE,
              longitude: LONGITUDE,
              latitudeDelta: LATITUDE_DELTA,
              longitudeDelta: LONGITUDE_DELTA,
            }}>
            <Marker
              coordinate={this.state.myLocation}
              onSelect={e => log('onSelect', e)}
              onDrag={e => log('onDrag', e)}
              onDragStart={e => log('onDragStart', e)}
              onDragEnd={e => log('onDragEnd', e)}
              onPress={e => log('onPress', e)}
              draggable
              title="Your location">
              {/* <PriceMarker amount={99} /> */}
            </Marker>
            {/* <Marker
            coordinate={this.state.b}
            onSelect={e => log('onSelect', e)}
            onDrag={e => log('onDrag', e)}
            onDragStart={e => log('onDragStart', e)}
            onDragEnd={e => log('onDragEnd', e)}
            onPress={e => log('onPress', e)}
            draggable
          /> */}
          </MapView>
        </View>
        <View style={styles.viewInput}>
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
          <Button block danger style={styles.btnNext}>
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
    borderRadius: 5,
  },
});

export default MapViewScreen;
