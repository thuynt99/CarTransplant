import React from 'react';

import {Text, Image, ScrollView, View, Button, StyleSheet} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {Icon} from 'native-base';

class DetailNotificationScreen extends React.Component {
  goBack = () => {
    this.props.navigation.goBack();
  };

  render() {
    const {item, time} = this.props.route.params;
    return (
      <View style={styles.container}>
        <View style={styles.notificationHeader}>
          <Icon
            style={{fontSize: 30, color: 'white', paddingLeft: 20}}
            name="chevron-back-circle-sharp"
            type="Ionicons"
            onPress={this.goBack}
          />
          <Text style={{fontSize: 25, color: 'white'}}>Notification</Text>
        </View>

        <ScrollView>
          <View>
            <Text>{time}</Text>
            <Image style={styles.avatar} source={{uri: item.image}} />
            <Text>{item.title}</Text>
            <Text>{item.content}</Text>
          </View>
        </ScrollView>
      </View>
    );
  }
}

export default DetailNotificationScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // alignItems: 'center',
    // justifyContent: 'center',
    // backgroundColor: 'transparent',
    backgroundColor: '#FBFCFC',
  },

  notificationHeader: {
    flexDirection: 'row',
    backgroundColor: '#1F618D',
    paddingTop: 10,
    paddingBottom: 10,
  },

  containerNotiDetail: {
    paddingBottom: 5,
    paddingTop: 5,
  },

  notificationView: {
    paddingTop: 5,
    paddingBottom: 5,
    paddingRight: 20,
    paddingLeft: 20,
    flexDirection: 'row',
    borderRadius: 20,
    backgroundColor: '#D6EAF8',
  },
  avatar: {
    borderRadius: 20,
    height: 60,
    width: 60,
  },
});
