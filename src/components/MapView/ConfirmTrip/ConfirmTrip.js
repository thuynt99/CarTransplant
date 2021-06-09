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
} from 'native-base';
import moment from 'moment';
import {Image} from 'react-native';
import HeaderCustom from '../../common/HeaderCustom';
import {ScaledSheet} from 'react-native-size-matters';
import theme from '../../../theme';
import {ScrollView} from 'react-native-gesture-handler';
import _ from 'lodash';
import {FORMAT} from '../../../constants/format';
import {PARAMS_FIND_TYPE} from '../../../constants/api';
export default class ConfirmTrip extends Component {
  render() {
    const {
      goToMapScreen,
      startStation,
      endStation,
      dateStart,
      dateEnd,
      seat,
      onClickConfirmTrip,
      itemCarSelected,
      distance,
      duration,
      price,
      type,
      note,
      onChangeNote,
    } = this.props;
    const [start] = _.split(startStation?.display_name, ',').slice(-3);
    const [end] = _.split(endStation?.display_name, ',').slice(-3);
    const typeName =
      type === PARAMS_FIND_TYPE.GO_ALONE
        ? 'Đi riêng'
        : type === PARAMS_FIND_TYPE.GO_SEND
        ? ' Chở hàng'
        : 'Đi ghép';
    return (
      <Container style={styles.container}>
        <HeaderCustom title="Xác nhận đặt chuyến" onGoBack={goToMapScreen} />
        <Content>
          <ScrollView style={styles.view}>
            {/* <Text style={styles.id}>Mã đặt chuyến: #CA31176</Text> */}
            <Row>
              <Left>
                <Text style={styles.from}>{start}</Text>
              </Left>
              <Body>
                <Image
                  style={styles.icon}
                  source={{
                    uri:
                      'https://img.icons8.com/plasticine/100/000000/double-right.png',
                  }}
                />
              </Body>
              <Right>
                <Text style={styles.from}>{end}</Text>
              </Right>
            </Row>
            <Item style={styles.item}>
              <View>
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
                    {startStation?.display_name}
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
                    {endStation?.display_name}
                  </Text>
                </View>
              </View>
            </Item>
            <Item style={styles.item}>
              <Left>
                <Text style={styles.subTitle}>Loại dịch vụ:</Text>
              </Left>
              <Right>
                <Text style={styles.textValue}>{typeName}</Text>
              </Right>
            </Item>
            {type === PARAMS_FIND_TYPE.GO_TOGETHER && (
              <Item style={styles.item}>
                <Left>
                  <Text style={styles.subTitle}>Số người:</Text>
                </Left>
                <Right>
                  <Text style={styles.textValue}>{seat}</Text>
                </Right>
              </Item>
            )}

            {/* <Item style={styles.item}>
              <Left>
                <Text style={styles.subTitle}>Loại xe:</Text>
              </Left>
              <Right>
                <Text style={styles.textValue}>5 chỗ</Text>
              </Right>
            </Item> */}

            <Item style={styles.item}>
              <Left>
                <Text style={styles.subTitle}>Lịch trình:</Text>
              </Left>
              <Right>
                <Text style={styles.textValue}>
                  từ {moment(dateStart).format(FORMAT.TIME)} đến{' '}
                  {moment(dateEnd).format(FORMAT.TIME)} ngày{' '}
                  {moment(dateStart).format(FORMAT.DATE)}
                </Text>
              </Right>
            </Item>
            <Item style={styles.item}>
              <Left>
                <Text style={styles.subTitle}>Khoảng cách:</Text>
              </Left>
              <Right>
                <Text style={styles.textValue}>
                  {distance.toLocaleString('it-IT') + ' '}
                  km
                </Text>
              </Right>
            </Item>
            <Item style={styles.item}>
              <Left>
                <Text style={styles.subTitle}>Thời gian dự kiến:</Text>
              </Left>
              <Right>
                <Text style={styles.textValue}>
                  {moment.duration(Number(duration), 'seconds').hours()} giờ{' '}
                  {moment.duration(Number(duration), 'seconds').minutes()} phút
                </Text>
              </Right>
            </Item>
            <Item style={styles.item}>
              <Left>
                <Text style={styles.subTitle}>Tiền phải trả:</Text>
              </Left>
              <Right>
                <Text style={styles.price}>
                  {itemCarSelected?.price
                    ? itemCarSelected?.price?.toLocaleString('it-IT', {
                        style: 'currency',
                        currency: 'VND',
                      })
                    : price?.toLocaleString('it-IT', {
                        style: 'currency',
                        currency: 'VND',
                      })}
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
              value={note}
              onChangeText={text => onChangeNote(text)}
            />
          </ScrollView>
          <Button
            danger
            full
            style={styles.btnConfirm}
            onPress={onClickConfirmTrip}>
            <Text>Xác nhận đặt xe</Text>
          </Button>
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
  subTitle: {
    fontSize: '14@ms',
    color: theme.grey_dark_30,
    paddingHorizontal: '5@s',
    fontWeight: 'bold',
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
    paddingLeft: '30@s',
    fontSize: '16@ms',
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
    textAlign: 'center',
  },
  textNote: {
    paddingVertical: '8@vs',
    fontSize: '13@ms',
  },
});
