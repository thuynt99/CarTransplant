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
      <Container>
        <HeaderCustom title="Tìm chuyến có sẵn" withoutBack />
        <LoadingCustom loading={loading} />
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
      </Container>
    );
  }
}

const styles = ScaledSheet.create({});

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
