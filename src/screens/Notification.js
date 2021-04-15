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
import NotificationScreenDisplay from '../components/notification/NotificationItem';
export default function NotificationScreen() {
  const data = [
    {
      title: 'Tuan 1',
      imageUrl: 'https://ctt-sis.hust.edu.vn/Content/Anh/anh_20190071.jpg',
      content: 'Nguyen van trung',
      date: '2021-04-13T10:10:11',
    },
    {
      title: 'adasdjaskdjlas jlaskdjaslkdjaksj daskjd askljd aksljd aklsjd l',
      imageUrl:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTUQ9EVGEu1IgbsSxx1EJBjJ51Z_j7VGOVoHw&usqp=CAU',
      content:
        'Nguyen van trung Nguyen van trung Nguyen van trungNguyen van trungNguyen van trungNguyen van trungNguyen van trungNguyen van trungNguyen van trung',
      date: '2021-04-14T00:10:11',
    },
    {
      title: 'Tuan 1',
      imageUrl:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTUQ9EVGEu1IgbsSxx1EJBjJ51Z_j7VGOVoHw&usqp=CAU',
      content: 'Nguyen van trung',
      date: '2021-04-14T07:10:11',
    },
    {
      title: 'Tuan 1',
      imageUrl:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTUQ9EVGEu1IgbsSxx1EJBjJ51Z_j7VGOVoHw&usqp=CAU',
      content: 'Nguyen van trung',
      date: '2021-04-14T10:36:11',
    },
    {
      title: 'Tuan 1',
      imageUrl:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTUQ9EVGEu1IgbsSxx1EJBjJ51Z_j7VGOVoHw&usqp=CAU',
      content: 'Nguyen van trung',
      date: '2021-04-12T10:10:11',
    },
    {
      title: 'Tuan 1',
      imageUrl:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTUQ9EVGEu1IgbsSxx1EJBjJ51Z_j7VGOVoHw&usqp=CAU',
      content: 'Nguyen van trung',
      date: '2021-04-12T10:10:11',
    },
    {
      title: 'Tuan 1',
      imageUrl:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTUQ9EVGEu1IgbsSxx1EJBjJ51Z_j7VGOVoHw&usqp=CAU',
      content: 'Nguyen van trung',
      date: '2021-04-12T10:10:11',
    },
    {
      title: 'Tuan 1',
      imageUrl:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTUQ9EVGEu1IgbsSxx1EJBjJ51Z_j7VGOVoHw&usqp=CAU',
      content: 'Nguyen van trung',
      date: '2021-04-12T10:10:11',
    },
    {
      title: 'Tuan 1',
      imageUrl:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTUQ9EVGEu1IgbsSxx1EJBjJ51Z_j7VGOVoHw&usqp=CAU',
      content: 'Nguyen van trung',
      date: '2021-04-12T10:10:11',
    },
    {
      title: 'Tuan 1',
      imageUrl:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTUQ9EVGEu1IgbsSxx1EJBjJ51Z_j7VGOVoHw&usqp=CAU',
      content: 'Nguyen van trung',
      date: '2021-04-12T10:10:11',
    },
    {
      title: 'Tuan 1',
      imageUrl:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTUQ9EVGEu1IgbsSxx1EJBjJ51Z_j7VGOVoHw&usqp=CAU',
      content: 'Nguyen van trung',
      date: '2021-04-12T10:10:11',
    },
    {
      title: 'Tuan 1',
      imageUrl:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTUQ9EVGEu1IgbsSxx1EJBjJ51Z_j7VGOVoHw&usqp=CAU',
      content: 'Nguyen van trung',
      date: '2021-04-12T10:10:11',
    },
    {
      title: 'Tuan 1',
      imageUrl:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTUQ9EVGEu1IgbsSxx1EJBjJ51Z_j7VGOVoHw&usqp=CAU',
      content: 'Nguyen van trung',
      date: '2021-04-12T10:10:11',
    },
    {
      title: 'Tuan 1',
      imageUrl:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTUQ9EVGEu1IgbsSxx1EJBjJ51Z_j7VGOVoHw&usqp=CAU',
      content: 'Nguyen van trung',
      date: '2021-04-12T10:10:11',
    },
  ];
  return (
    <View style={styles.container}>
      <View style={styles.headerNoti}>
        <Icon
          name="notification"
          style={styles.iconHeaderNoti}
          type="AntDesign"
        />
        <Text style={styles.notiHeaderText}>Notification</Text>
      </View>
      <ScrollView>
        <FlatList
          data={data}
          horizontal={false}
          renderItem={({item}) => {
            return <NotificationScreenDisplay item={item} />;
          }}
        />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //alignItems: 'center',
    //justifyContent: 'center',
    //backgroundColor: 'transparent',
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
    paddingTop: 5,
    paddingRight: 3,
    fontSize: 30,
    color: 'red',
  },
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
