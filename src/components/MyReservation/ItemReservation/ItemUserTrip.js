import React, {Component} from 'react';
import {Image, Linking} from 'react-native';
import {
  Container,
  Header,
  Content,
  Card,
  CardItem,
  Thumbnail,
  Text,
  Button,
  Icon,
  Left,
  Body,
  Right,
  View,
  Item,
  Col,
  Row,
} from 'native-base';
import {ScaledSheet} from 'react-native-size-matters';
import theme from '../../../theme';
import {useNavigation} from '@react-navigation/native';
import {TRIP_USER_DETAIL} from '../../../constants';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {PARAMS_LIST_TRIP} from '../../../constants/api';

const ItemUserTrip = props => {
  const navigation = useNavigation();
  const {navigate} = navigation;
  const callDriver = phoneNumber => {
    const url = `tel:${phoneNumber}`;
    Linking.canOpenURL(url).then(supported => {
      if (supported) {
        return Linking.openURL(url).catch(() => null);
      }
    });
  };
  const {item, state} = props;
  const goToDetail = () => {
    navigate(TRIP_USER_DETAIL, {item: item, state: state});
  };

  return (
    <Card style={styles.card}>
      <Item style={styles.center}>
        <Left style={{flexDirection: 'row'}}>
          <Thumbnail source={{uri: item?.user?.Avatar}} />
          <View style={styles.left}>
            <Text style={styles.title}>{item?.user?.FullName}</Text>
            {(!state === PARAMS_LIST_TRIP.HISTORY || item?.state === 1) && (
              <Button
                small
                danger
                style={styles.btnCall}
                onPress={() => callDriver(item?.user?.Phone)}>
                <Icon
                  name="phone"
                  type="FontAwesome"
                  style={{marginRight: 0}}
                />
                <Text>Gọi khách</Text>
              </Button>
            )}
          </View>
        </Left>
        <Body />
        <Right>
          <Text style={styles.price}>
            {item?.price.toLocaleString('it-IT', {
              style: 'currency',
              currency: 'VND',
            })}
          </Text>
          <Text style={styles.subTitle}>{item?.distance} km</Text>
        </Right>
      </Item>
      <TouchableOpacity onPress={goToDetail}>
        <View style={styles.item}>
          <Col>
            <Row>
              <Icon
                active
                name="location"
                type="EvilIcons"
                style={{fontSize: 24, color: theme.success}}
              />
              <Text style={styles.name}>Điểm đón:</Text>
            </Row>

            <Text style={styles.textLocation}>{item?.from}</Text>
          </Col>
        </View>
        <Item style={styles.item}>
          <Col>
            <Row>
              <Icon
                active
                name="location"
                type="EvilIcons"
                style={{fontSize: 24, color: theme.primaryColor}}
              />
              <Text style={styles.name}>Điểm đến:</Text>
            </Row>
            <Text style={styles.textLocation}>{item?.to}</Text>
          </Col>
        </Item>
      </TouchableOpacity>
      <Row style={styles.bottom}>
        <Left>
          <Row>
            {/* <Row>
              <Icon
                active
                name="event-seat"
                type="MaterialIcons"
                style={{fontSize: 20, color: theme.grey_dark_30}}
              />
              <Text>Xe 5 chỗ</Text>
            </Row> */}
            <Row>
              <Icon
                active
                name="person"
                type="MaterialIcons"
                style={{fontSize: 20, color: theme.grey_dark_30}}
              />
              <Text style={styles.subTitle}>{item?.seat}</Text>
            </Row>
          </Row>
        </Left>
        {state === PARAMS_LIST_TRIP.PENDING && (
          <Right>
            <Button small danger style={styles.btnCall} onPress={goToDetail}>
              <Text>Nhận chuyến</Text>
            </Button>
          </Right>
        )}
      </Row>
    </Card>
  );
};
const styles = ScaledSheet.create({
  container: {
    paddingVertical: 5,
  },
  text: {
    fontSize: '14@ms',
    textAlign: 'center',
    paddingHorizontal: 10,
  },
  card: {
    // paddingHorizontal: '16@ms',
    paddingVertical: '10@ms',
    borderRadius: 8,
    width: '95%',
    alignSelf: 'center',
  },
  subTitle: {
    fontSize: '14@ms',
    color: theme.grey_dark,
  },
  stateView: {
    paddingTop: '10@vs',
    justifyContent: 'flex-end',
  },
  state: {
    fontWeight: 'bold',
  },
  value: {
    fontSize: '16@ms',
    fontWeight: '600',
    textAlign: 'center',
  },
  viewDriver: {
    marginLeft: '8@s',
  },
  bottom: {
    paddingTop: '8@vs',
    paddingHorizontal: '16@ms',
  },
  center: {
    paddingVertical: '10@vs',
    paddingHorizontal: '16@ms',
  },
  top: {
    paddingBottom: '10@vs',
  },
  location: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  vehicleTypeView: {
    paddingVertical: '10@vs',
  },
  state: {
    fontWeight: 'bold',
  },
  name: {
    fontSize: '12@ms',
    fontWeight: 'bold',
  },
  textLocation: {
    paddingLeft: '30@s',
    fontSize: '16@ms',
  },
  vehicleInfo: {
    borderRadius: 5,
    backgroundColor: theme.grey_dark,
    paddingVertical: '3@vs',
    paddingHorizontal: '5@s',
    marginTop: '3@vs',
  },
  textVehicleInfo: {
    fontSize: '13@ms',
  },
  price: {
    color: theme.primaryColor,
    fontSize: '14@ms',
  },
  item: {
    paddingVertical: '8@vs',
    paddingHorizontal: '16@ms',
  },
  title: {
    fontSize: '14@ms',
    color: theme.black,
    fontWeight: 'bold',
  },
  left: {
    paddingLeft: '8@s',
  },
  btnCall: {
    borderRadius: 8,
  },
});
export default ItemUserTrip;
