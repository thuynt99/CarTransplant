import {
  Body,
  Button,
  Card,
  CardItem,
  Container,
  Icon,
  Item,
  Label,
  Left,
  Right,
  Row,
  Spinner,
  Tab,
  Tabs,
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

class FilterScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      open: false,
      value: null,
      items: DEPARTMENT,
    };
    this.setValue = this.setValue.bind(this);
  }
  setOpen(open) {
    this.setState({
      open,
    });
  }

  setValue = (idx, value) => {
    console.log(value);
    this.setState({value: value});
  };

  componentDidMount() {}
  render() {
    const data = _.map(DEPARTMENT, item => item.name);
    return (
      <Container style={styles.container}>
        <Card style={styles.inLine}>
          <Icon
            active
            name="close"
            type="EvilIcons"
            style={{fontSize: 24, color: theme.black}}
          />
          <TouchableOpacity>
            <Text>Bỏ lọc</Text>
          </TouchableOpacity>
        </Card>
        <Card style={styles.card}>
          <Text>Tỉnh thành</Text>
          <Text>Chọn tỉnh thành theo vị trí</Text>
          <View style={styles.inLine}>
            <ModalDropdown
              style={styles.dropdown_6}
              options={data}
              defaultValue="Tỉnh thành"
              dropdownStyle={styles.dropdown_2_dropdown}
              onSelect={(idx, value) => this.setValue(idx, value)}
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
              onSelect={(idx, value) => this.setValue(idx, value)}
            />
          </View>
          <Calendar
            current={'2012-03-01'}
            minDate={'2012-05-10'}
            maxDate={'2012-05-30'}
            onDayPress={day => {
              console.log('selected day', day);
            }}
            onDayLongPress={day => {
              console.log('selected day', day);
            }}
            monthFormat={'yyyy MM'}
            onMonthChange={month => {
              console.log('month changed', month);
            }}
            hideArrows={true}
            hideExtraDays={true}
            disableMonthChange={true}
            firstDay={1}
            hideDayNames={true}
            showWeekNumbers={true}
            onPressArrowLeft={subtractMonth => subtractMonth()}
            onPressArrowRight={addMonth => addMonth()}
            disableArrowLeft={true}
            disableArrowRight={true}
            disableAllTouchEventsForDisabledDays={true}
            renderHeader={date => {
              /*Return JSX*/
            }}
            enableSwipeMonths={true}
          />
        </Card>
      </Container>
    );
  }
}

const styles = ScaledSheet.create({
  container: {
    flex: 1,
    position: 'absolute',
    top: 0,
    right: 0,
    width: Dimensions.get('window').width * 0.9,
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
  inLine: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: '16@s',
  },
  row: {
    flexDirection: 'row',
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
    paddingVertical: '16@vs',
  },
  icon: {
    width: 30,
    height: 30,
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
