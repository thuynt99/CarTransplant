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
import {Image} from 'react-native';
import {ScaledSheet} from 'react-native-size-matters';
import {ScrollView} from 'react-native-gesture-handler';
import HeaderCustom from '../components/common/HeaderCustom';
import theme from '../theme';
import {Rating} from 'react-native-ratings';
export default class TripDetail extends Component {
  constructor(props) {
    super(props);
  }
  onGoBack = () => {
    this.props.navigation.goBack();
  };
  render() {
    const {goToMapScreen} = this.props;
    return (
      <Container style={styles.container}>
        <HeaderCustom title="Thông tin chuyến đi" onGoBack={this.onGoBack} />
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
                    uri: 'https://reactnative.dev/img/tiny_logo.png',
                  }}
                />
                <View style={styles.viewDriver}>
                  <Text style={styles.name}>John Smith</Text>
                  <Rating
                    ratingCount={5}
                    imageSize={16}
                    style={{alignSelf: 'flex-start'}}
                  />
                  <Text style={styles.textVehicleInfo}>
                    Biển số: 14A-527.01
                  </Text>
                  <View style={styles.makeCall}>
                    <Button danger rounded style={styles.btnCall}>
                      <Icon
                        name="phone"
                        type="FontAwesome"
                        style={{marginRight: 0}}
                      />
                      <Text>Gọi tài xế</Text>
                    </Button>
                    <Button danger rounded style={styles.btnCall}>
                      <Icon
                        name="message1"
                        type="AntDesign"
                        style={{marginRight: 0}}
                      />
                      <Text>Nhắn tin</Text>
                    </Button>
                  </View>
                </View>
              </Row>
            </View>
            <Item style={styles.item}>
              <Col>
                <Text style={styles.name}>Điểm đón:</Text>
                <Text style={styles.textLocation}>
                  1096 Đường Láng, Yên Hòa, Đống Đa, Hà Nội
                </Text>
              </Col>
            </Item>
            <Item style={styles.item}>
              <Col>
                <Text style={styles.name}>Điểm đến:</Text>
                <Text style={styles.textLocation}>
                  Thái Hòa, Lập Thạch, Vĩnh Phúc
                </Text>
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
                <Text style={styles.name}>Loại xe:</Text>
              </Left>
              <Right>
                <Text style={styles.textValue}>5 chỗ</Text>
              </Right>
            </Item>
            <Item style={styles.item}>
              <Left>
                <Text style={styles.name}>Lịch trình:</Text>
              </Left>
              <Right>
                <Text style={styles.textValue}>09:30 đến 11:00 15/05/2021</Text>
              </Right>
            </Item>
            <Item style={styles.item}>
              <Left>
                <Text style={styles.name}>Khoảng cách:</Text>
              </Left>
              <Right>
                <Text style={styles.textValue}>5 km</Text>
              </Right>
            </Item>
            <Item style={styles.item}>
              <Left>
                <Text style={styles.name}>Thời gian dự kiến:</Text>
              </Left>
              <Right>
                <Text style={styles.textValue}>1 giờ 12 phút</Text>
              </Right>
            </Item>
            <Item style={styles.item}>
              <Left>
                <Text style={styles.name}>Trạng thái:</Text>
              </Left>
              <Right>
                <Text style={styles.textValue}>Chờ xe đón</Text>
              </Right>
            </Item>
            <Item style={styles.item}>
              <Left>
                <Text style={styles.name}>Mã chuyến đi:</Text>
              </Left>
              <Right>
                <Text style={styles.textValue}>#CA31777</Text>
              </Right>
            </Item>
            <Item style={styles.item}>
              <Left>
                <Text style={styles.name}>Bảo hiểm chuyến:</Text>
              </Left>
              <Right>
                <Text style={styles.textValue}>DN40124568999</Text>
              </Right>
            </Item>
            <Item style={styles.item}>
              <Left>
                <Text style={styles.name}>Tiền phải trả:</Text>
              </Left>
              <Right>
                <Text style={styles.price}>325000đ</Text>
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
          </ScrollView>
          <Button light full style={styles.btnConfirm}>
            <Text>HUỶ CHUYẾN</Text>
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
  },
  btnCall: {
    height: '30@vs',
    marginRight: '8@s',
  },
});
