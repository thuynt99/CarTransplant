import {
  Body,
  Button,
  Card,
  CardItem,
  Container,
  Icon,
  Left,
  Right,
  Spinner,
  View,
} from 'native-base';
import CheckBox from '@react-native-community/checkbox';
import React, {Component} from 'react';
import {ScaledSheet} from 'react-native-size-matters';
import {FlatList, TouchableOpacity} from 'react-native-gesture-handler';
import ItemBookingCar from '../components/MapView/ListCar/ItemBookingCar';
import ImageIcon from '../components/common/ImageIcon';
import {
  LIST_MY_RESERVATION,
  NOTIFICATION_DETAIL,
  REGISTER_CAR,
} from '../constants';
import {Image, RefreshControl, Text} from 'react-native';
import theme from '../theme';
import HeaderCustom from '../components/common/HeaderCustom';
import {connect} from 'react-redux';
import {deteleListCar, getListMyCar} from '../stores/cars/actions';
import carReducer from '../stores/cars/reducer';
import LoadingCustom from '../components/common/LoadingCustom';

class CarManagement extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedCarId: [],
      listMyCar: [],
      refreshing: false,
      loading: false,
    };
  }
  static getDerivedStateFromProps(nextProps, prevState) {
    const {car} = nextProps;
    return {loading: car.loading, listMyCar: car.listMyCar};
  }
  componentDidMount() {
    this.getListMyCar();
  }
  onRegister = () => {
    this.props.navigation.navigate(REGISTER_CAR);
  };
  onCheckBoxPress = id => {
    let tmp = this.state.selectedCarId;

    if (tmp.includes(id)) {
      tmp.splice(tmp.indexOf(id), 1);
    } else {
      tmp.push(id);
    }
    this.setState({
      selectedCarId: tmp,
    });
  };
  removeCar = async () => {
    const {selectedCarId} = this.state;
    await this.props.deteleListCar(selectedCarId);
    this.getListMyCar();
  };
  getListMyCar = async () => {
    await this.props
      .getListMyCar({
        limit: 20,
      })
      .then(res => {
        console.log(this.props.car.listMyCar);
      });
  };
  render() {
    const {listMyCar, refreshing, loading} = this.state;
    return (
      <Container>
        <HeaderCustom
          title="Quản lý xe"
          iconRight
          onClickBtnRight={this.removeCar}
          onGoBack={() => this.props.navigation.goBack()}
        />
        <LoadingCustom
          color={theme.primaryColor}
          style={{
            alignSelf: 'center',
            justifyContent: 'center',
          }}
          loading={loading}
        />
        <FlatList
          style={styles.list}
          data={listMyCar}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={this.getListMyCar}
            />
          }
          keyExtractor={(item, index) => item.id.toString()}
          renderItem={({item, index}) => (
            <Card key={item.id} style={styles.item}>
              <CardItem>
                <Image
                  style={{
                    width: 50,
                    height: 50,
                  }}
                  source={{
                    uri: 'https://img.icons8.com/dusk/64/000000/car--v1.png',
                  }}
                />
                <View styles={styles.left}>
                  <View style={styles.view}>
                    <Text style={styles.textPrice}>
                      <Text>{item?.model}</Text>
                      <Text> - {item?.color}</Text>
                    </Text>

                    <Text style={styles.textCar}>{item.licensePlate}</Text>
                  </View>
                </View>
                <Right>
                  <CheckBox
                    style={styles.checkboxStyle}
                    value={
                      this.state.selectedCarId.includes(item.id) ? true : false
                    }
                    onChange={() => this.onCheckBoxPress(item.id)}
                  />
                </Right>
              </CardItem>
            </Card>
          )}
        />
        <TouchableOpacity onPress={this.onRegister} style={styles.btnAdd}>
          <ImageIcon uri="https://img.icons8.com/plasticine/100/000000/plus.png" />
        </TouchableOpacity>
      </Container>
    );
  }
}

const styles = ScaledSheet.create({
  container: {
    flex: 1,
  },
  btnAdd: {
    padding: 5,
    alignSelf: 'center',
    marginBottom: '10@vs',
  },
  item: {
    paddingHorizontal: '8@s',
    marginVertical: '16@vs',
    borderRadius: 8,
  },
  list: {
    paddingHorizontal: '16@s',
    marginVertical: '16@s',
  },
  view: {
    paddingLeft: '20@s',
  },
  textPrice: {
    fontSize: '14@ms',
    color: theme.grey_dark_30,
    fontWeight: 'bold',
  },
  textCar: {
    fontSize: '13@ms',
    color: theme.grey_dark,
  },
  checkboxStyle: {
    width: '24@ms',
    height: '24@ms',
    borderRadius: '24@ms',
    alignItems: 'center',
    justifyContent: 'center',
  },
  bottom: {
    flexDirection: 'row',
  },
});

const mapStateToProps = state => ({
  car: state.car,
});

const mapDispatchToProps = dispatch => ({
  getListMyCar: params => dispatch(getListMyCar(params)),
  deteleListCar: params => dispatch(deteleListCar(params)),
});
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CarManagement);
