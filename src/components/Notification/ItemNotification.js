import React, {useState, useEffect} from 'react';
import {
  Text,
  StyleSheet,
  View,
  Image,
  ScrollView,
  FlatList,
  TouchableHighlight,
} from 'react-native';

import {Icon} from 'native-base';
import {useNavigation} from '@react-navigation/native';

function NotificationDetail(props) {
  const {item} = props;
  const [isShowFullInformation, setIsShowFullInformation] = useState(false);
  const [onTime, setOnTime] = useState();
  const [isDeleted, setIsDeleted] = useState(false);
  const navigation = useNavigation();

  useEffect(() => {
    var seconds = Math.floor((new Date() - new Date(item.date)) / 1000);
    var interval = seconds / 31536000;
    var time;
    if (interval > 1) {
      time = Math.floor(interval) + ' years';
    } else {
      interval = seconds / 2592000;
      if (interval > 1) {
        time = Math.floor(interval) + ' months';
      } else {
        interval = seconds / 86400;
        if (interval > 1) {
          time = Math.floor(interval) + ' days';
        } else {
          interval = seconds / 3600;
          if (interval > 1) {
            time = Math.floor(interval) + ' hours';
          } else {
            interval = seconds / 60;
            if (interval > 1) {
              time = Math.floor(interval) + ' minutes';
            } else time = Math.floor(seconds) + ' seconds';
          }
        }
      }
    }
    time = 'about ' + time + ' ago';

    setOnTime(time);
  }, []);

  const menu = () => setIsShowFullInformation(!isShowFullInformation);

  const deleted = () => setIsDeleted(true);

  const showDetail = () => {
    navigation.navigate('DetailNotification', {
      item: item,
      time: onTime,
    });
  };

  const showFullInformation = () => {
    if (isShowFullInformation) {
      return (
        <View style={styles.extraInformation}>
          <Text style={styles.buttonExtraInfor} onPress={showDetail}>
            Show Detail
          </Text>
          <Text style={styles.buttonExtraInfor} onPress={deleted}>
            Delete
          </Text>
        </View>
      );
    } else {
      return null;
    }
  };

  if (!isDeleted) {
    return (
      <View style={styles.containerNotiDetail}>
        <TouchableHighlight underlayColor={'COLOR'} onPress={menu}>
          <View style={styles.notificationView}>
            <Image style={styles.avatar} source={{uri: item.image}} />
            <View style={styles.notiContent}>
              <View style={styles.titleStyles}>
                <Text numberOfLines={1} style={styles.title}>
                  {item.title}
                </Text>
                <View style={{flexDirection: 'row'}}>
                  <Icon
                    style={{fontSize: 14}}
                    name="back-in-time"
                    type="Entypo"
                  />
                  <Text style={styles.dateStyles}> {onTime}</Text>
                </View>
              </View>
              <Text numberOfLines={2} style={styles.content}>
                {item.content}
              </Text>
            </View>
          </View>
        </TouchableHighlight>
        <View>{showFullInformation()}</View>
      </View>
    );
  } else {
    return null;
  }
}

export default NotificationDetail;

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

  notiContent: {
    flex: 1,
    paddingLeft: 20,
  },

  titleStyles: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  title: {
    fontSize: 20,
    fontWeight: 'bold',
    width: 150,
  },

  dateStyles: {
    fontSize: 12,
    fontStyle: 'italic',
  },

  content: {
    fontSize: 15,
    width: 260,
    fontStyle: 'italic',
  },

  extraInformation: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: 40,
    paddingRight: 40,
    paddingTop: 10,
    paddingBottom: 20,
  },

  buttonExtraInfor: {
    borderRadius: 10,
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 10,
    paddingBottom: 10,
    borderColor: '#AED6F1',
    backgroundColor: '#AED6F1',
    textAlign: 'center',
    fontSize: 15,
  },
});
