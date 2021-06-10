import React, {Component, useEffect, useState, useContext} from 'react';
import {Text, StyleSheet, View, FlatList, Image} from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import moment from 'moment';
import firebase from 'firebase';
import {ScrollView, TouchableOpacity} from 'react-native-gesture-handler';
import {MAP_VIEW} from '../constants';
import {useNavigation} from '@react-navigation/native';
import {Body, Header, Icon, Left, Right, Subtitle, Title} from 'native-base';
import {
  getCurrentPermission,
  requestPermission,
  checkPermission,
  getLocation,
} from '../tools/utils';
import TitleCustom from '../components/common/TitleCustom';
import theme from '../theme';
import {
  responsiveFontSize,
  responsiveScreenHeight,
  responsiveScreenWidth,
} from 'react-native-responsive-dimensions';
import MyCarousel from '../components/ListPromo/MyCarousel';

export default function HomeScreen() {
  const [posts, setPosts] = useState([]);
  const navigation = useNavigation();
  const data = [
    {
      id: 1,
      title: 'Đi riêng',
      color: theme.underlayColor,
      image: 'https://img.icons8.com/bubbles/100/000000/car.png',
    },
    {
      id: 2,
      title: 'Đi ghép',
      color: theme.blue_medium,
      image: 'https://img.icons8.com/clouds/100/000000/car.png',
    },
    {
      id: 3,
      title: 'Chở hàng',
      color: theme.blue_dark,
      image: 'https://img.icons8.com/plasticine/100/000000/car-theft.png',
    },
    // {
    //   id: 4,
    //   title: 'Ưu đãi',
    //   color: theme.pinky_light,
    //   image: 'https://img.icons8.com/bubbles/100/000000/discount.png',
    // },
  ];
  let unsubscribe = null;

  useEffect(() => {
    requestPermission();
    // getLocation();
  });
  clickEventListener = item => {
    navigation.navigate(MAP_VIEW, {type: item.id});
  };
  return (
    <ScrollView style={styles.container}>
      <Header
        androidStatusBarColor={theme.primaryColor}
        style={{backgroundColor: theme.primaryColor}}>
        <Left />
        <Body />
        <Right>
          <Title style={styles.appName}>Car Transplant</Title>
        </Right>
      </Header>
      <FlatList
        style={styles.list}
        contentContainerStyle={styles.listContainer}
        data={data}
        horizontal={false}
        numColumns={2}
        keyExtractor={item => {
          return item.id;
        }}
        renderItem={({item}) => {
          return (
            <View>
              <TouchableOpacity
                style={[styles.card, {backgroundColor: item.color}]}
                onPress={() => {
                  clickEventListener(item);
                }}>
                <Image style={styles.cardImage} source={{uri: item.image}} />
              </TouchableOpacity>

              <View style={styles.cardHeader}>
                <View style={{alignItems: 'center', justifyContent: 'center'}}>
                  <Text style={[styles.title, {color: item.color}]}>
                    {item.title}
                  </Text>
                </View>
              </View>
            </View>
          );
        }}
      />
      <TitleCustom
        title="Ưu đãi nổi bật từ Car Transplant"
        subTitle="Nội dung mới nhất"
      />
      <MyCarousel />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    paddingTop: 64,
    paddingBottom: 16,
    backgroundColor: '#FFF',
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#EBECF4',
    shadowColor: '#454D65',
    shadowOffset: {height: 5},
    shadowRadius: 15,
    shadowOpacity: 0.2,
    zIndex: 10,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '500',
  },
  feed: {
    marginHorizontal: 16,
  },
  feedItem: {
    backgroundColor: '#FFF',
    borderRadius: 5,
    padding: 8,
    flexDirection: 'row',
    marginVertical: 8,
  },
  avatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    marginRight: 16,
  },
  name: {
    fontSize: 15,
    fontWeight: '500',
    color: '#454D65',
  },
  timestamp: {
    fontSize: 11,
    color: '#C4C6CE',
    marginTop: 4,
  },
  post: {
    marginTop: 16,
    fontSize: 14,
    color: '#838899',
  },
  postImage: {
    width: undefined,
    height: 150,
    borderRadius: 5,
    marginVertical: 16,
  },
  list: {
    paddingHorizontal: 5,
    backgroundColor: '#fff',
  },
  listContainer: {
    alignItems: 'center',
  },
  /******** card **************/
  card: {
    shadowColor: '#474747',
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.37,
    shadowRadius: 7.49,

    elevation: 12,
    marginVertical: 20,
    marginHorizontal: 40,
    backgroundColor: '#e2e2e2',
    //flexBasis: '42%',
    width: 80,
    height: 80,
    borderRadius: 60,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardHeader: {
    // paddingVertical: responsiveScreenHeight(2),
    paddingHorizontal: 16,
    borderTopLeftRadius: 1,
    borderTopRightRadius: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardContent: {
    paddingVertical: 12.5,
    paddingHorizontal: 16,
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 12.5,
    paddingBottom: 25,
    paddingHorizontal: 16,
    borderBottomLeftRadius: 1,
    borderBottomRightRadius: 1,
  },
  cardImage: {
    height: 50,
    width: 50,
    alignSelf: 'center',
  },
  title: {
    fontSize: responsiveFontSize(2),
    flex: 1,
    alignSelf: 'center',
    fontWeight: 'bold',
  },

  appName: {
    fontStyle: 'italic',
  },
});
