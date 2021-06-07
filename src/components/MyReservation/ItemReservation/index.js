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
import {Image} from 'react-native';
import {ScaledSheet} from 'react-native-size-matters';
import theme from '../../../theme';
import {Rating} from 'react-native-ratings';
import {TRIP_DETAIL} from '../../../constants';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {useNavigation} from '@react-navigation/native';
import moment from 'moment';
import {FORMAT} from '../../../constants/format';
import {PARAMS_FIND_TYPE} from '../../../constants/api';
export const ItemReservation = props => {
  const navigation = useNavigation();
  const {navigate} = navigation;
  const {isHistory, item, isPending} = props;
  function onClick() {
    navigate(TRIP_DETAIL, {item: item});
  }

  return (
    <Card style={styles.card}>
      <TouchableOpacity onPress={onClick}>
        <Item style={styles.top}>
          <Left>
            <Text>
              Ngày {moment.unix(item?.beginLeaveTime).format(FORMAT.DATE)}
            </Text>
          </Left>
          <Right>
            <Text>
              {moment.unix(item?.beginLeaveTime).format(FORMAT.TIME)} đến{' '}
              {moment.unix(item?.endLeaveTime).format(FORMAT.TIME)}{' '}
            </Text>
          </Right>
        </Item>
        <Item style={styles.center}>
          <Left>
            <View>
              <View style={styles.location}>
                <Icon
                  name="person-pin-circle"
                  type="MaterialIcons"
                  style={{color: 'green', fontSize: 28}}
                />
                <Text style={styles.subTitle}>Điểm đón:</Text>
              </View>
              <Text style={styles.textLocation}>{item?.from}</Text>
            </View>
            <View>
              <View style={styles.location}>
                <Icon
                  name="location-on"
                  type="MaterialIcons"
                  style={{color: theme.primaryColor}}
                />
                <Text style={styles.subTitle}>Điểm đến:</Text>
              </View>
              <Text style={styles.textLocation}>{item?.to}</Text>
            </View>
          </Left>
        </Item>
        {isHistory ? (
          <>
            <Row style={styles.stateView}>
              <Text style={styles.state}>
                {item?.state === 3
                  ? 'Chuyến đã hoàn thành'
                  : 'Khách hàng đã hủy chuyến'}
              </Text>
            </Row>
          </>
        ) : (
          <TouchableOpacity>
            <Item style={styles.vehicleTypeView}>
              <Left>
                <Text style={styles.subTitle}>
                  Mã chuyến đi:
                  <Text style={styles.value}> {item?.id}</Text>
                </Text>
              </Left>
              {item?.type && (
                <Right>
                  <Text style={styles.subTitle}>
                    {item?.type === PARAMS_FIND_TYPE.GO_ALONE
                      ? 'Đi riêng'
                      : item?.type === PARAMS_FIND_TYPE.GO_SEND
                      ? ' Chở hàng'
                      : 'Đi ghép'}
                  </Text>
                </Right>
              )}
            </Item>
            {!isPending && !isHistory && (
              <Row style={styles.bottom}>
                <Left>
                  <Row>
                    <Image
                      style={{
                        width: 50,
                        height: 50,
                        borderRadius: 50,
                      }}
                      source={{
                        uri: item?.driver?.Avatar,
                      }}
                    />
                    <View style={styles.viewDriver}>
                      <Text style={styles.name}>{item?.driver?.FullName}</Text>
                      <Rating ratingCount={5} imageSize={16} />
                      <View style={styles.vehicleInfo}>
                        <Text style={styles.textVehicleInfo}>
                          {item?.car?.licensePlate}
                        </Text>
                      </View>
                    </View>
                  </Row>
                </Left>
                <Right>
                  <Row>
                    {/* <View>
                      <Text style={styles.subTitle}>Thời gian</Text>
                      <Text style={styles.value}>
                        {moment
                          .duration(Number(item?.duration), 'seconds')
                          .hours()}{' '}
                        giờ{' '}
                        {moment
                          .duration(Number(item?.duration), 'seconds')
                          .minutes()}{' '}
                        phút
                      </Text>
                    </View> */}
                    <View>
                      <Text style={styles.subTitle}>Giá tiền</Text>
                      <Text style={styles.value}>
                        {item?.price?.toLocaleString('it-IT', {
                          style: 'currency',
                          currency: 'VND',
                        })}
                      </Text>
                    </View>
                  </Row>
                </Right>
              </Row>
            )}
          </TouchableOpacity>
        )}
      </TouchableOpacity>
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
    width: '100%',
    paddingHorizontal: '16@ms',
    paddingVertical: '10@ms',
    borderRadius: 8,
  },
  subTitle: {
    fontSize: '14@ms',
    color: theme.grey_dark,
    paddingHorizontal: '5@s',
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
    paddingVertical: '10@vs',
  },
  center: {
    paddingVertical: '10@vs',
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
});
export default ItemReservation;
