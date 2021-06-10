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
  Spinner,
} from 'native-base';
import {ActivityIndicator, Image, Linking, Modal} from 'react-native';
import {ScaledSheet} from 'react-native-size-matters';
import {ScrollView, TouchableOpacity} from 'react-native-gesture-handler';
import HeaderCustom from '../components/common/HeaderCustom';
import LoadingCustom from '../components/common/LoadingCustom';
import theme from '../theme';
import {Rating} from 'react-native-ratings';
import moment from 'moment';
import {FORMAT} from '../constants/format';
import {PARAMS_FIND_TYPE} from '../constants/api';
import {cancelTrip} from '../stores/trip/actions';
import {connect} from 'react-redux';
import Dialog from '../components/common/Dialog';
import _ from 'lodash';
import {TYPE_DIALOG} from '../constants/data';
import {LIST_MY_RESERVATION} from '../constants';
import {formatCash} from '../tools/utils';
class TripDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      showModal: false,
      idModal: 4,
    };
  }
  static getDerivedStateFromProps(nextProps, prevState) {
    const {trip} = nextProps;
    return {loading: trip.loading};
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
  cancelTrip = async () => {
    const {item} = this.props.route.params;
    this.closeModal();
    await this.props.cancelTrip(item.id).then(res => {
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
  render() {
    const {item} = this.props.route.params;
    const {idModal, showModal} = this.state;
    return (
      <Container style={styles.container}>
        <HeaderCustom title="Thông tin chuyến đi" onGoBack={this.onGoBack} />
        <LoadingCustom loading={this.state.loading} />
        <Content>
          <ScrollView style={styles.view}>
            {item?.driver?.name && (
              <>
                <View style={styles.bottom}>
                  <Row>
                    <Image
                      style={{
                        width: 60,
                        height: 60,
                        borderRadius: 50,
                      }}
                      source={{
                        uri: item?.driver?.Avatar,
                      }}
                    />
                    <View style={styles.viewDriver}>
                      <Text style={styles.name}>{item?.driver?.FullName}</Text>
                      <Rating
                        ratingCount={5}
                        imageSize={16}
                        style={{alignSelf: 'flex-start'}}
                      />
                      <Text style={styles.textVehicleInfo}>
                        Biển số: {item?.car?.licensePlate}
                      </Text>
                    </View>
                  </Row>
                </View>

                <View style={styles.makeCall}>
                  <Button
                    small
                    danger
                    bordered
                    style={styles.btnCall}
                    onPress={() => this.callDriver(item?.driver?.Phone)}>
                    <Icon
                      name="phone"
                      type="FontAwesome"
                      style={{marginRight: 0}}
                    />
                    <Text>Gọi tài xế</Text>
                  </Button>
                  <Button small danger bordered style={styles.btnCall}>
                    <Icon
                      name="message1"
                      type="AntDesign"
                      style={{marginRight: 0}}
                    />
                    <Text>Nhắn tin</Text>
                  </Button>
                </View>
              </>
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
            {item?.type && (
              <Item style={styles.item}>
                <Left>
                  <Text style={styles.name}>Loại dịch vụ:</Text>
                </Left>
                <Right>
                  <Text style={styles.textValue}>
                    {item?.type === PARAMS_FIND_TYPE.GO_ALONE
                      ? 'Đi riêng'
                      : item?.type === PARAMS_FIND_TYPE.GO_SEND
                      ? ' Chở hàng'
                      : 'Đi ghép'}
                  </Text>
                </Right>
              </Item>
            )}
            {item?.car?.seat && (
              <Item style={styles.item}>
                <Left>
                  <Text style={styles.name}>Loại xe:</Text>
                </Left>
                <Right>
                  <Text style={styles.textValue}>xe {item?.car?.seat} chỗ</Text>
                </Right>
              </Item>
            )}

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
              <Right>
                <Text style={styles.textValue}>
                  {formatCash(item?.distance) + ' km'}
                </Text>
              </Right>
            </Item>
            <Item style={styles.item}>
              <Left>
                <Text style={styles.name}>Thời gian dự kiến:</Text>
              </Left>
              <Right>
                <Text style={styles.textValue}>
                  {moment.duration(Number(item?.duration), 'seconds').hours()}{' '}
                  giờ{' '}
                  {moment.duration(Number(item?.duration), 'seconds').minutes()}{' '}
                  phút
                </Text>
              </Right>
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
                <Text style={styles.name}>Mã chuyến đi:</Text>
              </Left>
              <Right>
                <Text style={styles.textValue}>{item.id}</Text>
              </Right>
            </Item>
            <Item style={styles.item}>
              <Left>
                <Text style={styles.name}>Tiền phải trả:</Text>
              </Left>
              <Right>
                <Text style={styles.price}>
                  {formatCash(item?.price) + ' VND'}
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
                Bạn vui lòng THANH TOÁN THÊM các loại phí này cho tài xế nếu có
                phát sinh trong quá trình di chuyển
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
          {(item.state === 1 || item.state === 2) && (
            <Button
              light
              full
              style={styles.btnConfirm}
              onPress={() => this.setState({showModal: true, idModal: 4})}>
              <Text>HUỶ CHUYẾN</Text>
            </Button>
          )}
        </Content>
        <Dialog
          isOpen={showModal}
          onClosed={this.closeModal}
          item={_.find(TYPE_DIALOG, {id: idModal})}
          onClickLeft={idModal === 5 ? this.goToListTrip : this.closeModal}
          onClickRight={this.cancelTrip}
          modalStyle={styles.modalStyle}
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
  modalStyle: {
    height: '180@vs',
  },
});

const mapStateToProps = state => ({
  trip: state.trip,
});

const mapDispatchToProps = dispatch => ({
  cancelTrip: params => dispatch(cancelTrip(params)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(TripDetail);
