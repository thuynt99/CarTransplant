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
} from 'native-base';
import HeaderCustom from '../components/common/HeaderCustom';
import {ScaledSheet} from 'react-native-size-matters';
import theme from '../theme';
import {ScrollView} from 'react-native-gesture-handler';
export default class ConfirmTrip extends Component {
  render() {
    return (
      <Container style={styles.container}>
        <HeaderCustom title="Xác nhận đặt chuyến" />
        <Content>
          <ScrollView style={styles.view}>
            <Text style={styles.id}>Mã đặt chuyến: #CA31176</Text>
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
              </View>
            </Item>
            <Item style={styles.item}>
              <Left>
                <Text style={styles.subTitle}>Loại dịch vụ:</Text>
              </Left>
              <Right>
                <Text style={styles.textValue}>Ghép người</Text>
              </Right>
            </Item>
            <Item style={styles.item}>
              <Left>
                <Text style={styles.subTitle}>Loại xe:</Text>
              </Left>
              <Right>
                <Text style={styles.textValue}>5 chỗ</Text>
              </Right>
            </Item>
            <Item style={styles.item}>
              <Left>
                <Text style={styles.subTitle}>Lịch trình:</Text>
              </Left>
              <Right>
                <Text style={styles.textValue}>09:30 đến 11:00 15/05/2021</Text>
              </Right>
            </Item>
            <Item style={styles.item}>
              <Left>
                <Text style={styles.subTitle}>Khoảng cách:</Text>
              </Left>
              <Right>
                <Text style={styles.textValue}>5 km</Text>
              </Right>
            </Item>
            <Item style={styles.item}>
              <Left>
                <Text style={styles.subTitle}>Thời gian dự kiến:</Text>
              </Left>
              <Right>
                <Text style={styles.textValue}>1 giờ 12 phút</Text>
              </Right>
            </Item>
            <Item style={styles.item}>
              <Left>
                <Text style={styles.subTitle}>Tiền phải trả:</Text>
              </Left>
              <Right>
                <Text style={styles.textValue}>325000đ</Text>
              </Right>
            </Item>
            <Textarea
              rowSpan={5}
              bordered
              placeholder="Ghi chú cho tài xế..."
              style={styles.input}
            />
          </ScrollView>
          <Button danger full style={styles.btnConfirm}>
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
  textLocation: {
    paddingLeft: '30@s',
    fontSize: '16@ms',
  },
});
