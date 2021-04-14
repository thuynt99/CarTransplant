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

const NotificationDetail = props => {
  const [isShowFullInformation, setIsShowFullInformation] = useState(true);
  const [currentDate, setCurrentDate] = useState();
  const [isDeleted, setIsDeleted] = useState(false);

  useEffect(() => {
    var seconds = Math.floor((new Date() - new Date(props.date)) / 1000);
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

    setCurrentDate(time);
  }, []);

  const menu = () => setIsShowFullInformation(!isShowFullInformation);

  const deleted = () => setIsDeleted(true);

  const showFullInformation = () => {
    if (isShowFullInformation) {
      return (
        <View style={styles.extraInformation}>
          <Text style={styles.buttonExtraInfor}>Show Detail</Text>
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
            <Image style={styles.avatar} source={{uri: props.image}} />
            <View style={styles.notiContent}>
              <View style={styles.titleStyles}>
                <Text numberOfLines={1} style={styles.title}>
                  {props.title}
                </Text>
                <View style={{flexDirection: 'row'}}>
                  <Icon
                    style={{fontSize: 14}}
                    name="back-in-time"
                    type="Entypo"
                  />
                  <Text style={styles.dateStyles}> {currentDate}</Text>
                </View>
              </View>
              <Text numberOfLines={2} style={styles.content}>
                {props.content}
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
};

export default function NotificationScreen() {
  const data = [
    {
      title: 'ABCAAAAAAAAAAAAAAAASDASDADADASDASDADADasd',
      content:
        'ABC da binh luan ve bai vie cua ban ajhsdkjahsdkja hdkjahdkjhadkjhadkjhkajshdkajhdkjashd',
      date: '2020-10-10T10:10:10',
      image: 'https://reactnative.dev/img/tiny_logo.png',
    },
    {
      title: 'ABC',
      content: 'ABC da binh luan ve bai vie cua ban',
      date: '2020-10-10T10:10:10',
      image: 'https://reactnative.dev/img/tiny_logo.png',
    },
    {
      title: 'ABC',
      content: 'ABC da binh luan ve bai vie cua ban',
      date: '2020-10-10T10:10:10',
      image: 'https://reactnative.dev/img/tiny_logo.png',
    },
    {
      title: 'ABC',
      content: 'ABC da binh luan ve bai vie cua ban',
      date: '2020-10-10T10:10:10',
      image: 'https://reactnative.dev/img/tiny_logo.png',
    },
    {
      title: 'ABC',
      content: 'ABC da binh luan ve bai vie cua ban',
      date: '2020-10-10T10:10:10',
      image: 'https://reactnative.dev/img/tiny_logo.png',
    },
    {
      title: 'ABC',
      content: 'ABC da binh luan ve bai vie cua ban',
      date: '2020-10-10T10:10:10',
      image: 'https://reactnative.dev/img/tiny_logo.png',
    },
    {
      title: 'ABC',
      content: 'ABC da binh luan ve bai vie cua ban',
      date: '2020-10-10T10:10:10',
      image: 'https://reactnative.dev/img/tiny_logo.png',
    },
    {
      title: 'ABC',
      content: 'ABC da binh luan ve bai vie cua ban',
      date: '2020-10-10T10:10:10',
      image: 'https://reactnative.dev/img/tiny_logo.png',
    },
    {
      title: 'ABC',
      content: 'ABC da binh luan ve bai vie cua ban',
      date: '2020-10-10T10:10:10',
      image: 'https://reactnative.dev/img/tiny_logo.png',
    },
    {
      title: 'ABC',
      content: 'ABC da binh luan ve bai vie cua ban',
      date: '2020-10-10T10:10:10',
      image: 'https://reactnative.dev/img/tiny_logo.png',
    },
    {
      title: 'ABC',
      content: 'ABC da binh luan ve bai vie cua ban',
      date: '2020-10-10T10:10:10',
      image: 'https://reactnative.dev/img/tiny_logo.png',
    },
    {
      title: 'ABC',
      content: 'ABC da binh luan ve bai vie cua ban',
      date: '2020-10-10T10:10:10',
      image: 'https://reactnative.dev/img/tiny_logo.png',
    },
    {
      title: 'ABC',
      content: 'ABC da binh luan ve bai vie cua ban',
      date: '2020-10-10T10:10:10',
      image: 'https://reactnative.dev/img/tiny_logo.png',
    },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.notificationHeader}>
        <Icon
          style={{fontSize: 30, color: 'white', paddingLeft: 20}}
          name="notifications"
          type="Ionicons"
        />
        <Text style={{fontSize: 25, color: 'white'}}> Notification </Text>
      </View>

      <ScrollView>
        <View>
          <FlatList
            data={data}
            horizontal={false}
            renderItem={({item}) => {
              return (
                <NotificationDetail
                  title={item.title}
                  content={item.content}
                  date={item.date}
                  image={item.image}
                />
              );
            }}
          />
        </View>
      </ScrollView>
    </View>
  );
}

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
