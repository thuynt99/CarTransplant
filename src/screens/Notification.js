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
import NotificationDetail from '../components/Notification/ItemNotification';

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
              return <NotificationDetail item={item} />;
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
