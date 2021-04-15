import React, {useContext, useState, useEffect} from 'react';
import {
  Text,
  StyleSheet,
  View,
  TextInput,
  TouchableOpacity,
  Image,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {Icon} from 'native-base';

class NotificationDetailScreen extends React.Component {
  constructor(props) {
    super(props);
  }

  goBack = () => {
    this.props.navigation.goBack();
  };
  render() {
    const {item} = this.props.route.params;
    return (
      <View style={styles.container}>
        <View style={styles.headerNoti}>
          <TouchableOpacity onPress={this.goBack}>
            <Icon
              name="arrowleft"
              style={styles.iconHeaderNoti}
              type="AntDesign"
            />
          </TouchableOpacity>
          <Text style={styles.notiHeaderText}>Notification</Text>
        </View>
        <View style={styles.notiElements}>
          <View style={styles.iconTitle}>
            <Text style={styles.notiTitle}>{item.title}</Text>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  headerNoti: {
    padding: 15,
    flexDirection: 'row',
    backgroundColor: '#001c5c',
  },
  notiHeaderText: {
    fontSize: 30,
    color: 'white',
  },
  iconHeaderNoti: {
    fontSize: 30,
    color: 'red',
    paddingTop: 5,
    paddingRight: 5,
  },
  notiElements: {
    margin: 5,
  },
  iconTitle: {
    flexDirection: 'row',
  },
  notiTitle: {
    fontWeight: 'bold',
    fontSize: 20,
  },
});

export default NotificationDetailScreen;
