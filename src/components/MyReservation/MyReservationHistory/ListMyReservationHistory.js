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

class ListMyReservationHistory extends Component {
  render() {
    return (
      <Container>
        <Content>
          <List>
            <ListItem noBorder>
              <Card style={styles.card}>
                <Item style={styles.top}>
                  <Text>Lịch trình: 11:40 --> 12:10 - 15/05/2021</Text>
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
                      <Text style={{paddingLeft: 30}}>
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
                      <Text style={{paddingLeft: 30}}>
                        Thái Hòa, Lập Thạch, Vĩnh Phúc
                      </Text>
                    </View>
                  </Left>
                  <Right>
                    <Text>Đã hủy</Text>
                  </Right>
                </Item>
                <Row style={styles.bottom}>
                  <Left>
                    <Row>
                      <Image
                        style={{
                          width: 50,
                          height: 50,
                        }}
                        source={{
                          uri: 'https://reactnative.dev/img/tiny_logo.png',
                        }}
                      />
                      <View style={styles.viewDriver}>
                        <Text>John Smith</Text>
                        <Rating ratingCount={5} imageSize={18} />
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
              </Card>
            </ListItem>
          </List>
        </Content>
      </Container>
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
    paddingVertical: '8@ms',
    borderRadius: 8,
  },
  subTitle: {
    fontSize: '14@ms',
    color: theme.grey_dark,
    paddingHorizontal: '5@s',
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
    paddingTop: '10@vs',
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
});
export default ListMyReservationHistory;
