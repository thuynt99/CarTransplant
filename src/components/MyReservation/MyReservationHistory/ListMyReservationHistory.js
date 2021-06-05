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
import ItemReservation from '../ItemReservation';
import _ from 'lodash';
import ImageIcon from '../../common/ImageIcon';

class ListMyReservationHistory extends Component {
  render() {
    const {data} = this.props;
    const sum = _.sumBy(data, function(o) {
      return o.totalIncome;
    });
    return (
      <Container>
        <View style={styles.inLine}>
          <Card style={styles.card}>
            <ImageIcon uri="https://img.icons8.com/ios-glyphs/100/000000/car.png" />
            <View style={styles.right}>
              <Text style={styles.subTitle}>Tổng chuyến</Text>
              <Text style={styles.value}>{data?.length ? data.length : 0}</Text>
            </View>
          </Card>
          <Card style={[styles.card, {backgroundColor: theme.primaryColor}]}>
            <ImageIcon uri="https://img.icons8.com/ios-filled/50/000000/expensive-2.png" />
            <View style={styles.right}>
              <Text style={styles.subTitle}>Thu nhập</Text>
              <Text style={styles.value}>
                {sum.toLocaleString('it-IT', {
                  // style: 'currency',
                  currency: 'VND',
                })}
              </Text>
            </View>
          </Card>
        </View>

        <Content>
          <List
            dataArray={data}
            renderItem={({item}) => {
              return (
                <ListItem noBorder>
                  <ItemReservation isHistory item={item} />
                </ListItem>
              );
            }}
          />
        </Content>
      </Container>
    );
  }
}

const styles = ScaledSheet.create({
  container: {
    paddingVertical: 5,
  },
  inLine: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: '16@s',
  },
  text: {
    fontSize: '14@ms',
    textAlign: 'center',
    paddingHorizontal: 10,
  },
  card: {
    width: '50%',
    paddingHorizontal: '16@ms',
    paddingVertical: '10@ms',
    borderRadius: 8,
    backgroundColor: theme.warning,
    flexDirection: 'row',
  },
  subTitle: {
    fontSize: '14@ms',
    color: theme.white,
  },
  value: {
    fontSize: '14@ms',
    fontWeight: 'bold',
    color: theme.white,
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
  stateView: {
    paddingTop: '10@vs',
    justifyContent: 'flex-end',
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
  right: {
    paddingLeft: '8@s',
  },
});
export default ListMyReservationHistory;
