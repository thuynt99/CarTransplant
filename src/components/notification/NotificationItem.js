import React, {useState, useEffect} from 'react';
import {
  Text,
  StyleSheet,
  View,
  TouchableOpacity,
  Image,
  ScrollView,
  FlatList,
} from 'react-native';
import {Icon} from 'native-base';
import {useNavigation} from '@react-navigation/native';

function NotificationScreenDisplay(props) {
  const [expandNotification, setExpandNotification] = useState(false);
  const [isDeleted, setIsDeleted] = useState(false);
  const navigation = useNavigation();
  const {navigate} = navigation;
  const {item} = props;
  function handleExpandNotification() {
    setExpandNotification(!expandNotification);
  }
  function handleDeleteNoti() {
    setIsDeleted(!isDeleted);
  }

  function _navigateNotiDetail() {
    navigate('NotificationDetail', {
      item: item,
    });
  }

  const showExpandNotification = () => {
    if (expandNotification) {
      return (
        <View style={styles.expandNotification}>
          <Text
            style={styles.buttonViewDetailNoti}
            onPress={_navigateNotiDetail}>
            View Detail
          </Text>

          <Text style={styles.buttonDeleteNoti} onPress={handleDeleteNoti}>
            Delete
          </Text>
        </View>
      );
    }
  };

  var diffTime = Math.floor(
    (new Date() - new Date(props.item.date).getTime()) / 1000,
  );

  var time = '';
  if (diffTime / (60 * 60 * 24 * 365) > 1)
    time = Math.floor(diffTime / (60 * 60 * 24 * 365)) + ' years ago';
  else if (diffTime / (60 * 60 * 24 * 30) > 1)
    time = Math.floor(diffTime / (60 * 60 * 24 * 30)) + ' months ago';
  else if (diffTime / (60 * 60 * 24) > 1)
    time = Math.floor(diffTime / (60 * 60 * 24)) + ' days ago';
  else if (diffTime / (60 * 60) > 1)
    time = Math.floor((time = diffTime / (60 * 60))) + ' hours ago';
  else if (diffTime / 60 > 1) time = Math.floor(diffTime / 60) + ' minutes ago';
  else if (diffTime > 1) time = Math.floor(diffTime) + ' seconds ago';
  if (!isDeleted)
    return (
      <View style={styles.notification}>
        <TouchableOpacity onPress={handleExpandNotification}>
          <View style={styles.notiElements}>
            <Image
              style={styles.notiImage}
              source={{
                uri: props.item.imageUrl,
              }}
            />
            <View style={styles.notiContent}>
              <View style={styles.notiContentTitleTime}>
                <Text numberOfLines={1} style={styles.notiTitle}>
                  {props.item.title}
                </Text>
                <View style={styles.notiTime}>
                  <Icon
                    name="back-in-time"
                    style={{fontSize: 18}}
                    type="Entypo"
                  />
                  <Text style={styles.textTime}>{time}</Text>
                </View>
              </View>
              <Text numberOfLines={2}>{props.item.content}</Text>
            </View>
          </View>
        </TouchableOpacity>
        <View>{showExpandNotification()}</View>
      </View>
    );
  else return null;
}

const styles = StyleSheet.create({
  notiElements: {
    flexDirection: 'row',
    paddingHorizontal: 5,
    backgroundColor: '#e4f3f5',
    borderRadius: 20,
  },
  notiImage: {
    width: 60,
    height: 60,
    borderRadius: 50,
  },
  notiContent: {
    marginLeft: 3,
    flex: 1,
  },
  notiContentTitleTime: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  notiTitle: {
    fontWeight: 'bold',
    fontSize: 20,
    width: 170,
  },
  textTime: {
    fontStyle: 'italic',
    fontSize: 13,
    marginHorizontal: 3,
  },
  notification: {
    marginTop: 10,

    margin: 5,
  },
  notiTime: {
    flexDirection: 'row',
  },
  expandNotification: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    marginTop: 10,
    marginHorizontal: 10,
  },
  buttonViewDetailNoti: {
    backgroundColor: '#43810d',
    borderRadius: 10,
    fontSize: 17,
    width: 100,
    height: 35,
    textAlign: 'center',
    justifyContent: 'center',
    paddingTop: 5,
  },
  buttonDeleteNoti: {
    backgroundColor: 'red',
    borderRadius: 10,
    fontSize: 17,
    width: 100,
    height: 35,
    textAlign: 'center',
    justifyContent: 'center',
    paddingTop: 5,
  },
});

export default NotificationScreenDisplay;
