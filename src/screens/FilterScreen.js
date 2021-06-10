import {
  Body,
  Button,
  Card,
  CardItem,
  Container,
  Content,
  Icon,
  View,
} from 'native-base';
import CheckBox from '@react-native-community/checkbox';
import React, {Component} from 'react';
import {ScaledSheet} from 'react-native-size-matters';
import {
  FlatList,
  ScrollView,
  TouchableOpacity,
} from 'react-native-gesture-handler';
import ItemBookingCar from '../components/MapView/ListCar/ItemBookingCar';
import ImageIcon from '../components/common/ImageIcon';
import {
  LIST_MY_RESERVATION,
  NOTIFICATION_DETAIL,
  REGISTER_CAR,
} from '../constants';
import {Dimensions, Image, RefreshControl, Text} from 'react-native';
import theme from '../theme';
import HeaderCustom from '../components/common/HeaderCustom';
import {connect} from 'react-redux';
import carReducer from '../stores/cars/reducer';
import LoadingCustom from '../components/common/LoadingCustom';
import {DEPARTMENT} from '../constants/department';
import SearchInput from '../components/common/SearchBar';
import _ from 'lodash';
import {getListActiveZone, postListActiveZone} from '../stores/trip/actions';
import ModalDropdown from 'react-native-modal-dropdown';
import {Calendar} from 'react-native-calendars';
import moment from 'moment';
import {FORMAT} from '../constants/format';

const listCheckBox = [
  {
    id: 1,
    name: 'Đi riêng',
  },
  {
    id: 2,
    name: 'Đi ghép',
  },
  {
    id: 3,
    name: 'Chở hàng',
  },
];
class FilterScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      open: false,
      items: DEPARTMENT,
      date: {},
      seat: 0,
      _markedDates: {},
      type: [],
      from: 0,
      to: 0,
    };
    this.setValue = this.setValue.bind(this);
  }
  setOpen(open) {
    this.setState({
      open,
    });
  }

  setValue = (idx, value, key) => {
    console.log(value);
    this.setState({[key]: value});
  };
  onDaySelect = day => {
    console.log('day', day);
    this.setState({date: day});
    const _selectedDay = moment(day.dateString).format(FORMAT.YEAR_DATE);

    let marked = true;
    if (this.state._markedDates[_selectedDay]) {
      marked = !this.state._markedDates[_selectedDay].marked;
    }

    // Create a new object using object property spread since it should be immutable
    // Reading: https://davidwalsh.name/merge-objects
    const updatedMarkedDates = {
      ...{
        [_selectedDay]: {
          selected: marked,
          startingDay: true,
          color: theme.primaryColor,
          endingDay: true,
        },
      },
    };
    this.setState({_markedDates: updatedMarkedDates});
  };
  onCheckBoxPress = id => {
    let tmp = this.state.type;

    if (tmp.includes(id)) {
      tmp.splice(tmp.indexOf(id), 1);
    } else {
      tmp.push(id);
    }
    this.setState({
      type: tmp,
    });
  };
  onFilter = () => {
    const {from, to, seat, type, date} = this.state;
    const fromId = _.find(DEPARTMENT, ['name', from])?.id;
    const toId = _.find(DEPARTMENT, ['name', to])?.id;
    const str = moment(date.dateString, FORMAT.YEAR_DATE).unix();
    const body = _.pickBy(
      {
        from: fromId,
        to: toId,
        seat,
        type,
        date: str,
      },
      _.identity,
    );
    console.log('body', body);
    this.props.getListTripPending(body);
    this.props.hideFilter();
  };
  clearData = () => {
    this.setState({
      date: {},
      seat: 0,
      type: [],
      from: 0,
      to: 0,
    });
  };
  componentDidMount() {}
  render() {
    const {date, seat} = this.state;
    const {hideFilter} = this.props;
    const data = _.map(DEPARTMENT, item => item.name);
    return (
      <Container style={styles.container}>
        <Content>
          <Card>
            <CardItem style={styles.inLine}>
              <TouchableOpacity onPress={hideFilter}>
                <Icon
                  active
                  name="close"
                  type="EvilIcons"
                  style={{fontSize: 24, color: theme.black}}
                />
              </TouchableOpacity>

              <TouchableOpacity onPress={this.clearData}>
                <Text style={styles.textPrice}>Bỏ lọc</Text>
              </TouchableOpacity>
            </CardItem>
          </Card>
          <ScrollView style={styles.scroll}>
            <Card style={styles.card}>
              <Text style={styles.textTitleCar}>Tỉnh thành</Text>
              <Text>Chọn tỉnh và tỉnh đến để tìm khách theo vị trí</Text>
              <View style={styles.inLine}>
                <ModalDropdown
                  style={styles.dropdown_6}
                  options={data}
                  defaultValue="Tỉnh thành"
                  dropdownStyle={styles.dropdown_2_dropdown}
                  onSelect={(idx, value) => this.setValue(idx, value, 'from')}
                />
                <Image
                  style={styles.icon}
                  source={{
                    uri:
                      'https://img.icons8.com/plasticine/100/000000/double-right.png',
                  }}
                />
                <ModalDropdown
                  style={styles.dropdown_6}
                  options={data}
                  defaultValue="Tỉnh thành"
                  dropdownStyle={styles.dropdown_2_dropdown}
                  onSelect={(idx, value) => this.setValue(idx, value, 'to')}
                />
              </View>
            </Card>
            <Card style={styles.card}>
              <Text style={styles.textTitleCar}>Loại hình</Text>
              <CardItem style={styles.cardItem}>
                {listCheckBox.map(item => {
                  return (
                    <View style={styles.row}>
                      <CheckBox
                        value={this.state.type.includes(item.id) ? true : false}
                        onChange={() => this.onCheckBoxPress(item.id)}
                      />
                      <Text>{item?.name}</Text>
                    </View>
                  );
                })}
              </CardItem>
            </Card>
            <Card style={styles.card}>
              <CardItem style={styles.cardItem}>
                <Text style={styles.textTitleCar}>Số người</Text>
                <View style={styles.row}>
                  {seat > 0 && (
                    <TouchableOpacity
                      style={styles.btnPlus}
                      onPress={() =>
                        this.setState({
                          seat: seat - 1,
                        })
                      }>
                      <Icon
                        name="minus"
                        type="Entypo"
                        style={{color: theme.primaryColor}}
                      />
                    </TouchableOpacity>
                  )}
                  <Text style={styles.textSeat}>{seat}</Text>
                  <TouchableOpacity
                    style={styles.btnPlus}
                    onPress={() =>
                      this.setState({
                        seat: seat + 1,
                      })
                    }>
                    <Icon
                      name="plus"
                      type="Entypo"
                      style={{color: theme.primaryColor}}
                    />
                  </TouchableOpacity>
                </View>
              </CardItem>
            </Card>
            <Card style={styles.card}>
              <Calendar
                current={moment().format(FORMAT.YEAR_DATE)}
                minDate={moment().format(FORMAT.YEAR_DATE)}
                onDayPress={day => {
                  this.onDaySelect(day);
                }}
                theme={{
                  calendarBackground: theme.white,
                  textSectionTitleColor: theme.black,
                  textSectionTitleDisabledColor: 'gray',
                  dayTextColor: theme.black,
                  todayTextColor: theme.thirdColor,
                  selectedDayTextColor: theme.white,
                  monthTextColor: theme.thirdColor,
                  indicatorColor: theme.thirdColor,
                  selectedDayBackgroundColor: '#333248',
                  arrowColor: theme.thirdColor,
                  'stylesheet.calendar.header': {
                    week: {
                      marginTop: 30,
                      marginHorizontal: 12,
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                    },
                  },
                }}
                markingType={'period'}
                markedDates={this.state._markedDates}
              />
            </Card>
            <Button full danger style={styles.btn} onPress={this.onFilter}>
              <Text style={styles.text}>Áp dụng</Text>
            </Button>
          </ScrollView>
        </Content>
      </Container>
    );
  }
}

const styles = ScaledSheet.create({
  container: {
    flex: 1,
    position: 'absolute',
    top: 60,
    right: 0,
    width: Dimensions.get('window').width * 0.9,
    backgroundColor: theme.grey_light,
  },
  scroll: {
    paddingHorizontal: '8@s',
  },
  btnAdd: {
    padding: 5,
    alignSelf: 'center',
    marginBottom: '10@vs',
  },
  item: {
    paddingHorizontal: '24@s',
    paddingVertical: '10@vs',
    borderRadius: 8,
  },
  list: {
    marginVertical: '16@s',
  },
  view: {
    paddingLeft: '20@s',
  },
  textPrice: {
    fontSize: '14@ms',
    color: theme.primaryColor,
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
  inLine: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: '16@s',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  subTitle: {
    fontSize: '14@ms',
    color: theme.grey_dark_30,
    paddingHorizontal: '5@s',
    fontWeight: 'bold',
  },
  dropdown_6: {
    width: 120,
    borderColor: 'lightgray',
    borderWidth: 1,
    borderRadius: 1,
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
    alignSelf: 'center',
    paddingVertical: '8@vs',
  },
  dropdown_2_dropdown: {
    width: 120,
    height: 500,
    borderColor: 'lightgray',
    borderWidth: 2,
    borderRadius: 3,
  },
  card: {
    borderRadius: 8,
    paddingHorizontal: '8@s',
    paddingVertical: '6@vs',
  },
  icon: {
    width: 30,
    height: 30,
  },
  btn: {
    marginTop: '10@vs',
    marginBottom: '60@vs',
  },
  cardItem: {
    justifyContent: 'space-between',
  },
  btnPlus: {
    paddingHorizontal: '2@s',
    marginHorizontal: '16@s',
  },
  textTitleCar: {
    fontSize: '14@ms',
    fontWeight: 'bold',
  },
  textSeat: {
    fontSize: '16@ms',
    fontWeight: 'bold',
  },
  text: {
    color: theme.white,
    fontSize: '14@ms',
  },
});

const mapStateToProps = state => ({
  trip: state.trip,
});

const mapDispatchToProps = dispatch => ({
  getListActiveZone: params => dispatch(getListActiveZone(params)),
  postListActiveZone: params => dispatch(postListActiveZone(params)),
});
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(FilterScreen);
