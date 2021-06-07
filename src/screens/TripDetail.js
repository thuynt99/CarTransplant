import React, {Component} from 'react';
import {
  Container,
  Header,
  Content,
  List,
  Item,
  Text,
  Body,
  Left,
  Right,
  View,
  Icon,
  Textarea,
  Button,
  Row,
  Col,
} from 'native-base';
import {Image, Linking} from 'react-native';
import {ScaledSheet} from 'react-native-size-matters';
import {ScrollView, TouchableOpacity} from 'react-native-gesture-handler';
import HeaderCustom from '../components/common/HeaderCustom';
import theme from '../theme';
import {Rating} from 'react-native-ratings';
import moment from 'moment';
import {FORMAT} from '../constants/format';
import {map} from 'lodash-es';
import ItemUserTrip from '../components/MyReservation/ItemReservation/ItemUserTrip';
import _ from 'lodash';

export default class TripDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showTrip: false,
    };
  }
  onGoBack = () => {
    this.props.navigation.goBack();
  };
  callDriver = phoneNumber => {
    const url = `tel:${phoneNumber}`;
    Linking.canOpenURL(url).then(supported => {
      if (supported) {
        return Linking.openURL(url).catch(() => null);
      }
    });
  };
  render() {
    const {goToMapScreen} = this.props;
    const {item} = this.props.route.params;
    const {showTrip} = this.state;
    console.log(item);
    return (
      <Container style={styles.container}>
        <HeaderCustom title="Thông tin chuyến đi" onGoBack={this.onGoBack} />
        <Content>
          <ScrollView style={styles.view}>
            <Item style={styles.item}>
              <Col>
                <Text style={styles.name}>Điểm xuất phát:</Text>
                <Text style={styles.textLocation}>{item?.from}</Text>
              </Col>
            </Item>
            <Item style={styles.item}>
              <Col>
                <Text style={styles.name}>Điểm đến:</Text>
                <Text style={styles.textLocation}>{item?.to}</Text>
              </Col>
            </Item>
            <Item style={styles.item}>
              <Left>
                <Text style={styles.name}>Xe sử dụng:</Text>
              </Left>
              <Right>
                <Text style={styles.textValue}>
                  {item?.car.model} - {item?.car.color} -{' '}
                  {item?.car.licensePlate}
                </Text>
              </Right>
            </Item>
            <Item style={styles.item}>
              <Left>
                <Text style={styles.name}>Lịch trình:</Text>
              </Left>
              <Right>
                <Text style={styles.textValue}>
                  {moment.unix(item?.beginLeaveTime).format(FORMAT.TIME)} đến{' '}
                  {moment.unix(item?.endLeaveTime).format(FORMAT.TIME)} ngày{' '}
                  {moment.unix(item?.beginLeaveTime).format(FORMAT.DATE)}
                </Text>
              </Right>
            </Item>
            <Item style={styles.item}>
              <Left>
                <Text style={styles.name}>Khoảng cách:</Text>
              </Left>
              {item?.distance && (
                <Right>
                  <Text style={styles.textValue}>
                    {item?.distance.toLocaleString('it-IT') + ' '} km
                  </Text>
                </Right>
              )}
            </Item>

            <Item style={styles.item}>
              <Left>
                <Text style={styles.name}>Tổng tiền:</Text>
              </Left>
              <Right>
                <Text style={styles.price}>
                  {item?.totalIncome?.toLocaleString('it-IT', {
                    style: 'currency',
                    currency: 'VND',
                  })}
                </Text>
              </Right>
            </Item>
            {item.userTrips ? (
              <Item style={styles.item}>
                <Left>
                  <Text style={styles.name}>Tổng chuyến phải chạy:</Text>
                </Left>
                <Right>
                  <Text style={styles.textValue}>
                    {item?.userTrips?.length}
                  </Text>
                </Right>
              </Item>
            ) : (
              <Row style={styles.item}>
                <Body>
                  <Text style={styles.danger}>
                    Rất tiếc bạn chưa có hành khách nào đặt chuyến!
                  </Text>
                </Body>
              </Row>
            )}
            {item.userTrips && (
              <>
                <Item style={styles.item}>
                  <Left>
                    <Text style={styles.name}>Danh sách chuyến phải chạy:</Text>
                  </Left>
                  <Right>
                    <TouchableOpacity
                      style={{padding: 4}}
                      onPress={() =>
                        this.setState({showTrip: !this.state.showTrip})
                      }>
                      {showTrip ? (
                        <Icon
                          name="up"
                          type="AntDesign"
                          style={{color: theme.thirdColor}}
                        />
                      ) : (
                        <Icon
                          name="down"
                          type="AntDesign"
                          style={{color: theme.thirdColor}}
                        />
                      )}
                    </TouchableOpacity>
                  </Right>
                </Item>
                {showTrip && (
                  <View>
                    {item.userTrips.map((user, index) => {
                      return (
                        <ItemUserTrip item={user} key={index.toString()} />
                      );
                    })}
                  </View>
                )}
                <View style={styles.note}>
                  <Text style={styles.title}>Lưu ý:</Text>
                  <Text style={styles.textNote}>
                    Giá trên CHƯA BAO GỒM các chi phí phát sinh (phí cầu đường,
                    phí sân bay, phí đỗ xe,...)
                  </Text>
                  <Text style={styles.textNote}>
                    Hành khách sẽ phải THANH TOÁN THÊM các loại phí này cho tài
                    xế nếu có phát sinh trong quá trình di chuyển
                  </Text>
                </View>
              </>
            )}
          </ScrollView>
        </Content>
      </Container>
    );
  }
}
const styles = ScaledSheet.create({
  container: {
    flex: 1,
    width: '100%',
  },
  input: {
    paddingHorizontal: '15@s',
    marginHorizontal: '15@s',
    borderRadius: 8,
    marginTop: '16@vs',
  },
  viewDriver: {
    paddingLeft: '16@s',
    justifyContent: 'space-evenly',
    alignContent: 'flex-start',
  },
  bottom: {
    paddingVertical: '15@vs',
    paddingHorizontal: '15@s',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  note: {
    paddingHorizontal: '15@s',
    paddingVertical: '8@vs',
    marginHorizontal: '15@s',
    borderRadius: 8,
    marginTop: '16@vs',
    borderColor: theme.grey_light,
    borderWidth: 1,
    backgroundColor: theme.warning,
  },
  id: {
    color: theme.grey_dark,
    textAlign: 'center',
    fontSize: '14@ms',
    paddingTop: '16@vs',
  },
  view: {
    paddingHorizontal: '10@s',
  },
  icon: {
    width: 30,
    height: 30,
  },
  btnConfirm: {
    width: '90%',
    alignSelf: 'center',
    borderRadius: 8,
    marginVertical: '16@vs',
  },
  item: {
    paddingVertical: '12@vs',
    paddingHorizontal: '12@s',
  },
  description: {
    fontSize: '14@ms',
    paddingHorizontal: 10,
  },
  location: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  textValue: {
    fontSize: '14@ms',
    color: theme.grey_dark,
    paddingHorizontal: '5@s',
  },
  price: {
    fontSize: '14@ms',
    color: theme.subPrimaryColor,
    paddingHorizontal: '5@s',
    fontWeight: 'bold',
  },
  textLocation: {
    fontSize: '14@ms',
    color: theme.grey_dark,
    marginTop: '3@vs',
  },
  icon: {
    width: 30,
    height: 30,
  },
  title: {
    fontSize: '16@ms',
    fontWeight: 'bold',
    color: theme.black,
  },
  from: {
    fontSize: '14@ms',
    paddingHorizontal: '15@s',
    paddingVertical: '10@vs',
    color: theme.grey_dark_30,
    fontWeight: 'bold',
  },
  textNote: {
    paddingVertical: '8@vs',
    fontSize: '13@ms',
  },
  textVehicleInfo: {
    fontSize: '13@ms',
    color: theme.grey_dark,
  },
  name: {
    fontSize: '14@ms',
    color: theme.black,
    fontWeight: 'bold',
  },
  makeCall: {
    flexDirection: 'row',
    marginTop: '5@vs',
    justifyContent: 'space-around',
  },
  btnCall: {
    borderRadius: 8,
  },
  textBtn: {
    color: theme.white,
  },
  danger: {
    color: theme.primaryColor,
    textAlign: 'center',
    fontSize: '16@ms',
  },
});
