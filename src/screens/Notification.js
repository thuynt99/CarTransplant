import {Button, Container, Spinner} from 'native-base';
import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  FlatList,
} from 'react-native';
import HeaderCustom from '../components/common/HeaderCustom';
import {connect} from 'react-redux';
import {getListNoti} from '../stores/notify/actions';
import theme from '../theme';
import moment from 'moment';
import {FORMAT} from '../constants/format';
import {Freshchat, FreshchatUser} from 'react-native-freshchat-sdk';
class Notifications extends Component {
  constructor(props) {
    super(props);
    this.state = {
      refreshing: false,
      data: [],
      loading: false,
    };
  }
  componentDidMount() {
    this.getListNoti();
  }
  getListNoti = async () => {
    // await this.props.getListNoti();
    this.setState({data: this.props.notify.listNoti});
  };
  // static getDerivedStateFromProps(nextProps, prevState) {
  //   const {notify} = nextProps;
  //   return {loading: notify.loading, data: notify.listNoti};
  // }
  onPress = () => {
    var freshchatUser = new FreshchatUser();
    freshchatUser.firstName = 'Thuy';
    freshchatUser.lastName = 'Tomoe';
    freshchatUser.email = 'johndoe@dead.man';
    freshchatUser.phoneCountryCode = '+91';
    freshchatUser.phone = '1234234123';
    Freshchat.setUser(freshchatUser, error => {
      console.log(error);
    });
  };
  render() {
    return (
      <Container>
        <HeaderCustom title="Thông báo" withoutBack />
        <Button onPress={this.onPress}>
          <Text>Fresh channel</Text>
        </Button>

        <Button
          onPress={() => {
            // Freshchat.showConversations();
            Freshchat.showFAQs();
          }}>
          <Text>Show chat</Text>
        </Button>
        {this.state.loading && (
          <Spinner
            color={theme.primaryColor}
            style={{
              alignSelf: 'center',
              justifyContent: 'center',
              flex: 1,
            }}
          />
        )}
        <FlatList
          style={styles.root}
          data={this.state.data}
          extraData={this.state}
          onRefresh={() => this.getListNoti()}
          refreshing={this.state.refreshing}
          ItemSeparatorComponent={() => {
            return <View style={styles.separator} />;
          }}
          keyExtractor={item => {
            return item.id;
          }}
          renderItem={item => {
            const Notification = item.item;
            let attachment = <View />;

            let mainContentStyle;
            if (Notification.image) {
              mainContentStyle = styles.mainContent;
              attachment = (
                <Image
                  style={styles.attachment}
                  source={{uri: Notification.image}}
                />
              );
            }
            return (
              <TouchableOpacity
                onPress={() =>
                  this.props.navigation.navigate('NotificationDetailScreen', {
                    item: Notification,
                  })
                }>
                <View style={styles.container}>
                  <Image
                    source={require('../assets/logo/image.png')}
                    style={styles.avatar}
                  />
                  <View style={styles.content}>
                    <View style={mainContentStyle}>
                      <View style={styles.text}>
                        <Text
                          style={styles.name}
                          numberOfLines={2}
                          ellipsizeMode={'tail'}>
                          {Notification.title}
                        </Text>
                        <Text numberOfLines={5} style={styles.message}>
                          {Notification.message}
                        </Text>
                      </View>
                      <Text style={styles.timeAgo}>
                        {moment(Notification.createdDate).format(
                          FORMAT.TIME_DATE,
                        )}
                      </Text>
                    </View>
                    {attachment}
                  </View>
                </View>
              </TouchableOpacity>
            );
          }}
        />
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  root: {
    backgroundColor: '#FFFFFF',
  },
  container: {
    padding: 16,
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: '#FFFFFF',
    alignItems: 'flex-start',
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  text: {
    marginBottom: 5,
    flexWrap: 'wrap',
  },
  content: {
    flex: 1,
    marginLeft: 16,
    marginRight: 0,
  },
  mainContent: {
    marginRight: 60,
  },
  img: {
    height: 50,
    width: 50,
    margin: 0,
  },
  attachment: {
    position: 'absolute',
    right: 0,
    height: 50,
    width: 50,
  },
  separator: {
    height: 1,
    backgroundColor: '#CCCCCC',
  },
  timeAgo: {
    fontSize: 12,
    color: '#696969',
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
    color: theme.primaryColor,
    width: '80%',
  },
  message: {
    flexWrap: 'wrap',
    width: '90%',
  },
});
const mapStateToProps = state => ({
  notify: state.notify,
});

const mapDispatchToProps = dispatch => ({
  getListNoti: params => dispatch(getListNoti(params)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Notifications);
