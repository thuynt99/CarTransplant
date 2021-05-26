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

class ReservationDetail extends Component {
  render() {
    return (
      <Container>
        <Header style={{backgroundColor: theme.primaryColor}}>
          <Left style={{flex: 1}}>
            <Icon
              name="arrow-left"
              type="MaterialIcons"
              style={{color: 'green', fontSize: 28}}
            />
          </Left>
          <Body style={{flex: 1}}>
            <Title style={{alignSelf: 'center', fontWeight: '600'}}>
              Thông tin chuyến đi
            </Title>
          </Body>
          <Right style={{flex: 1}} />
        </Header>
        <Content>
          <Card>
            <Row>
              <Left>
                <Image
                  style={{
                    width: 50,
                    height: 50,
                  }}
                  source={{
                    uri: 'https://reactnative.dev/img/tiny_logo.png',
                  }}
                />
              </Left>
              <Body>
                <Text>Phạm Văn Ánh</Text>
                <Rating ratingCount={5} imageSize={18} />
                <Text>Xe: Kia-đỏ</Text>
              </Body>
            </Row>
          </Card>
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
export default ReservationDetail;
