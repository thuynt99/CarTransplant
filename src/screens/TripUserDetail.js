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
import moment from 'moment';
import {Rating} from 'react-native-ratings';
import {FORMAT} from '../constants/format';
import {maskDoneTrip, takeTripUser} from '../stores/trip/actions';
import LoadingCustom from '../components/common/LoadingCustom';
import Dialog from '../components/common/Dialog';
import {connect} from 'react-redux';
import _ from 'lodash';
import {TYPE_DIALOG} from '../constants/data';
import {LIST_MY_RESERVATION} from '../constants';
import {PARAMS_LIST_TRIP} from '../constants/api';
import ModalReceivedTrip from '../components/TripPending/ModalReceivedTrip';
import {getListMyCar} from '../stores/cars/actions';
import {formatCash} from '../tools/utils';

class TripUserDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      showModal: false,
      idModal: 4,
      listVehicle: [],
      showConfirm: false,
    };
  }
  componentDidMount() {
    this.getListMyCar();
  }
  onGoBack = () => {
    this.props.navigation.goBack();
  };
  callDriver = phoneNumber => {
    const url = `tel:${phoneNumber}`;
    Linking.canOpenURL(url).then(async supported => {
      if (supported) {
        return Linking.openURL(url).catch(() => null);
      }
    });
  };
  openMessage = phoneNumber => {
    Linking.openURL(`sms:${phoneNumber}`);
  };
  maskDoneTrip = () => {
    const {item} = this.props.route.params;
    this.props.maskDoneTrip(item.id).then(res => {
      if (res.status) {
        this.setState({showModal: true, idModal: 5});
      } else {
        this.setState({showModal: true, idModal: 6});
      }
    });
  };
  closeModal = () => {
    this.setState({showModal: false});
  };
  goToListTrip = () => {
    this.props.navigation.goBack();
  };
  goToListMyTrip = () => {
    this.props.navigation.navigate(LIST_MY_RESERVATION);
  };
  getListMyCar = async () => {
    await this.props
      .getListMyCar({
        limit: 20,
      })
      .then(res => {
        this.setState({listVehicle: this.props.car.listMyCar});
      });
  };
  showModalConfirm = () => {
    this.setState({showConfirm: true});
  };
  hideModalConfirm = () => {
    this.setState({showConfirm: false});
  };
  takeTripUser = (
    carID,
    remainingSeat,
    priceEachKm,
    userTripPrice,
    maxDistance,
  ) => {
    this.hideModalConfirm();
    const {item, state} = this.props.route.params;
    const body = {
      carID,
      remainingSeat,
      priceEachKm: parseFloat(priceEachKm),
      userTripID: item?.id,
      userTripPrice: parseInt(userTripPrice),
      maxDistance: parseFloat(maxDistance),
    };
    console.log(body);
    this.props.takeTripUser(JSON.stringify(body)).then(res => {
      console.log('res', res);
      const id = res.status ? 7 : 8;
      this.setState({showModal: true, idModal: id});
    });
  };
  render() {
    const {item, state} = this.props.route.params;
    const {idModal, showModal, listVehicle, showConfirm} = this.state;

    return (
      <Container style={styles.container}>
        <HeaderCustom title="Thông tin chở khách" onGoBack={this.onGoBack} />
        <Content>
          <ScrollView style={styles.view}>
            <View style={styles.bottom}>
              <Row>
                <Image
                  style={{
                    width: 60,
                    height: 60,
                    borderRadius: 50,
                  }}
                  source={{
                    uri: item?.user?.Avatar,
                  }}
                />
                <View style={styles.viewDriver}>
                  <Text style={styles.title}>{item?.user?.FullName}</Text>
                  <Text style={styles.name}>{item?.user?.Email}</Text>
                </View>
              </Row>
            </View>
            {state !== PARAMS_LIST_TRIP.HISTORY && (
              <View style={styles.makeCall}>
                <Button
                  small
                  danger
                  bordered
                  style={styles.btnCall}
                  onPress={() => this.callDriver(item?.user?.Phone)}>
                  <Icon
                    name="phone"
                    type="FontAwesome"
                    style={{marginRight: 0}}
                  />
                  <Text>Gọi khách</Text>
                </Button>
                <Button
                  small
                  danger
                  bordered
                  style={styles.btnCall}
                  onPress={() => this.openMessage(item?.user?.Phone)}>
                  <Icon
                    name="message1"
                    type="AntDesign"
                    style={{marginRight: 0}}
                  />
                  <Text>Nhắn tin</Text>
                </Button>
              </View>
            )}
            <Item style={styles.item}>
              <Col>
                <Text style={styles.name}>Điểm đón:</Text>
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
                <Text style={styles.name}>Loại dịch vụ:</Text>
              </Left>
              <Right>
                <Text style={styles.textValue}>Ghép người</Text>
              </Right>
            </Item>
            <Item style={styles.item}>
              <Left>
                <Text style={styles.name}>Số người:</Text>
              </Left>
              <Right>
                <Text style={styles.textValue}>{item.seat}</Text>
              </Right>
            </Item>
            <Item style={styles.item}>
              <Left>
                <Text style={styles.name}>Lịch trình:</Text>
              </Left>
              <Right>
                <Text style={styles.textValue}>
                  {' '}
                  {moment
                    .unix(item?.beginLeaveTime)
                    .format(FORMAT.TIME)} đến{' '}
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
                    {formatCash(item?.distance)} km
                  </Text>
                </Right>
              )}
            </Item>
            <Item style={styles.item}>
              <Left>
                <Text style={styles.name}>Trạng thái:</Text>
              </Left>
              <Right>
                <Text style={styles.textValue}>
                  {item?.state === 1
                    ? 'Chờ tài xế xác nhận'
                    : item?.state === 2
                    ? 'Chờ xe đón'
                    : item?.state === 3
                    ? 'Chuyến đã hoàn thành'
                    : 'Khách hàng đã hủy chuyến'}
                </Text>
              </Right>
            </Item>
            <Item style={styles.item}>
              <Left>
                <Text style={styles.name}>Tiền thu của khách:</Text>
              </Left>

              <Right>
                <Text style={styles.price}>
                  {item?.price
                    ? formatCash(item?.price) + ' VND'
                    : 'Thương lượng'}
                </Text>
              </Right>
            </Item>
            <View style={styles.note}>
              <Text style={styles.title}>Lưu ý:</Text>
              <Text style={styles.textNote}>
                Giá trên CHƯA BAO GỒM các chi phí phát sinh (phí cầu đường, phí
                sân bay, phí đỗ xe,...)
              </Text>
              <Text style={styles.textNote}>
                Hành khách sẽ phải THANH TOÁN THÊM các loại phí này cho tài xế
                nếu có phát sinh trong quá trình di chuyển
              </Text>
            </View>
            <Textarea
              rowSpan={5}
              bordered
              placeholder="Ghi chú cho tài xế..."
              style={styles.input}
              value={item?.note}
              disabled={true}
            />
          </ScrollView>
          {(state === PARAMS_LIST_TRIP.UPCOMING ||
            state === PARAMS_LIST_TRIP.PENDING) && (
            <Button
              full
              style={styles.btnConfirm}
              onPress={
                state === PARAMS_LIST_TRIP.UPCOMING
                  ? this.maskDoneTrip
                  : this.showModalConfirm
              }>
              <Text>
                {state === PARAMS_LIST_TRIP.UPCOMING
                  ? 'Xác Nhận Hoàn Thành'
                  : 'Nhận chuyến'}
              </Text>
            </Button>
          )}
        </Content>
        <LoadingCustom loading={this.state.loading} />
        <Dialog
          isOpen={showModal}
          onClosed={this.closeModal}
          item={_.find(TYPE_DIALOG, {id: idModal})}
          onClickLeft={
            idModal === 5
              ? this.goToListTrip
              : idModal === 7
              ? this.goToListMyTrip
              : this.closeModal
          }
          onClickRight={this.cancelTrip}
          modalStyle={styles.modalStyle}
        />

        <ModalReceivedTrip
          listVehicle={listVehicle}
          price={item?.price}
          hideModalConfirm={this.hideModalConfirm}
          showConfirm={showConfirm}
          takeTripUser={this.takeTripUser}
        />
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
    marginVertical: '15@vs',
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
    marginBottom: '10@vs',
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
    backgroundColor: theme.primaryColor,
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
});
const mapStateToProps = state => ({
  trip: state.trip,
  car: state.car,
});

const mapDispatchToProps = dispatch => ({
  maskDoneTrip: params => dispatch(maskDoneTrip(params)),
  getListMyCar: params => dispatch(getListMyCar(params)),
  takeTripUser: params => dispatch(takeTripUser(params)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(TripUserDetail);
