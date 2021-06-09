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
import ImageIcon from '../components/common/ImageIcon';
import {Image, RefreshControl, Text} from 'react-native';
import theme from '../theme';
import HeaderCustom from '../components/common/HeaderCustom';
import {connect} from 'react-redux';
import {getListTripPending} from '../stores/trip/actions';
import LoadingCustom from '../components/common/LoadingCustom';
import ItemUserTrip from '../components/MyReservation/ItemReservation/ItemUserTrip';
import {PARAMS_LIST_TRIP} from '../constants/api';
import {ACTIVE_REGISTRATION} from '../constants';

class ListTripPending extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      listTripPending: [],
      refreshing: false,
      loading: false,
    };
  }
  static getDerivedStateFromProps(nextProps, prevState) {
    const {trip} = nextProps;
    return {loading: trip.loading, listTripPending: trip.listTripPending};
  }
  componentDidMount() {
    this.getListTripPending();
  }
  getListTripPending = async () => {
    await this.props
      .getListTripPending({
        seat: 5,
      })
      .then(res => {
        console.log(this.props.trip.listTripPending);
      });
  };

  render() {
    const {listTripPending, refreshing, loading} = this.state;
    return (
      <View style={styles.container}>
        <HeaderCustom title="Tìm chuyến có sẵn" withoutBack />
        <LoadingCustom loading={loading} />
        {listTripPending.length > 0 && (
          <Card style={styles.card}>
            <Icon
              name="local-car-wash"
              type="MaterialIcons"
              style={{color: theme.primaryColor, alignSelf: 'center'}}
            />
            <Text style={styles.textReq}>
              Bạn có {listTripPending.length} yêu cầu mới.
            </Text>
          </Card>
        )}

        <FlatList
          style={styles.list}
          data={listTripPending}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={this.getListTripPending}
            />
          }
          keyExtractor={index => index.toString()}
          renderItem={({item}) => (
            <ItemUserTrip item={item} state={PARAMS_LIST_TRIP.PENDING} />
          )}
        />
        <View style={{flex: 1, position: 'absolute', right: 0, bottom: 0}}>
          <TouchableOpacity
            style={styles.btnAdd}
            onPress={() => this.props.navigation.navigate(ACTIVE_REGISTRATION)}>
            <Icon
              name="notifications"
              type="MaterialIcons"
              style={{color: theme.white, alignSelf: 'center'}}
            />
          </TouchableOpacity>
          <TouchableOpacity style={styles.btnFilter}>
            <Icon
              name="filter-list"
              type="MaterialIcons"
              style={{color: theme.white, alignSelf: 'center'}}
            />
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = ScaledSheet.create({
  container: {
    flex: 1,
  },
  floatingBtn: {
    position: 'absolute',
    bottom: 10,
    right: 10,
  },
  btnAdd: {
    marginBottom: '16@vs',
    width: '50@ms',
    height: '50@ms',
    backgroundColor: theme.blue_medium,
    alignSelf: 'flex-end',
    borderRadius: '40@ms',
    justifyContent: 'center',
    marginRight: '16@s',
  },
  btnFilter: {
    marginBottom: '16@vs',
    width: '50@ms',
    height: '50@ms',
    backgroundColor: theme.subPrimaryColor,
    alignSelf: 'flex-end',
    borderRadius: '40@ms',
    justifyContent: 'center',
    marginRight: '16@s',
  },
  card: {
    paddingVertical: '8@vs',
    paddingHorizontal: '16@s',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textReq: {
    fontWeight: 'bold',
    color: theme.primaryColor,
    fontSize: '16@ms',
    paddingLeft: '16@s',
  },
});

const mapStateToProps = state => ({
  trip: state.trip,
});

const mapDispatchToProps = dispatch => ({
  getListTripPending: params => dispatch(getListTripPending(params)),
});
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ListTripPending);
