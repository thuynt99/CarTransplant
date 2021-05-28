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

class ItemReservation extends Component {
  render() {
    const {isHistory} = this.props;
    return (
      <Card style={styles.card}>
        <Item style={styles.top}>
          <Left>
            <Text>Ngày 15/05/2021</Text>
          </Left>
          <Right>
            <Text>11:40 đến 12:10</Text>
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
              <Text style={styles.textLocation}>
                1096 Đường Láng, Yên Hòa, Đống Đa, Hà Nội
              </Text>
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
              <Text style={styles.textLocation}>
                Thái Hòa, Lập Thạch, Vĩnh Phúc
              </Text>
            </View>
          </Left>
        </Item>
        {isHistory ? (
          <>
            <Item style={styles.bottom}>
              <Left>
                <Row>
                  <Image
                    style={{
                      width: 50,
                      height: 50,
                      borderRadius: 50,
                    }}
                    source={{
                      uri: 'https://reactnative.dev/img/tiny_logo.png',
                    }}
                  />
                  <View style={styles.viewDriver}>
                    <Text style={styles.name}>John Smith</Text>
                    <Rating ratingCount={5} imageSize={16} />
                    <View style={styles.vehicleInfo}>
                      <Text style={styles.textVehicleInfo}>14A-527.01</Text>
                    </View>
                  </View>
                </Row>
              </Left>
              <Right>
                <Row>
                  <View>
                    <Text style={styles.subTitle}>Thời gian</Text>
                    <Text style={styles.value}>1.3h</Text>
                  </View>
                  <View>
                    <Text style={styles.subTitle}>Giá tiền</Text>
                    <Text style={styles.value}>300.000</Text>
                  </View>
                </Row>
              </Right>
            </Item>
            <Row style={styles.stateView}>
              <Text style={styles.state}>Khách hàng đã hủy chuyến</Text>
            </Row>
          </>
        ) : (
          <>
            <Item style={styles.vehicleTypeView}>
              <Left>
                <Text style={styles.subTitle}>
                  Mã chuyến đi:
                  <Text style={styles.value}>12435</Text>
                </Text>
              </Left>
              <Right>
                <Text style={styles.subTitle}>Ghép người</Text>
              </Right>
            </Item>
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
                      uri: 'https://reactnative.dev/img/tiny_logo.png',
                    }}
                  />
                  <View style={styles.viewDriver}>
                    <Text style={styles.name}>John Smith</Text>
                    <Rating ratingCount={5} imageSize={16} />
                    <View style={styles.vehicleInfo}>
                      <Text style={styles.textVehicleInfo}>14A-527.01</Text>
                    </View>
                  </View>
                </Row>
              </Left>
              <Right>
                <Row>
                  <View>
                    <Text style={styles.subTitle}>Thời gian</Text>
                    <Text style={styles.value}>1.3h</Text>
                  </View>
                  <View>
                    <Text style={styles.subTitle}>Giá tiền</Text>
                    <Text style={styles.value}>300.000</Text>
                  </View>
                </Row>
              </Right>
            </Row>
          </>
        )}
      </Card>
    );
  }
}

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
    fontSize: '14@ms',
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
    fontSize: '14@ms',
  },
});
export default ItemReservation;
