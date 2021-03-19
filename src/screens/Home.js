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

// posts = [
//   {
//     id: '1',
//     name: 'Joe McKay',
//     text:
//       'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
//     timestamp: 1569109273726,
//     avatar: require('../assets/avatar/image1.png'),
//     image: require('../assets/onboarding/image1.gif'),
//   },
//   {
//     id: '2',
//     name: 'Karyn Kim',
//     text:
//       'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
//     timestamp: 1569109273726,
//     avatar: require('../assets/avatar/image1.png'),
//     image: require('../assets/onboarding/image2.gif'),
//   },
//   {
//     id: '3',
//     name: 'Emerson Parsons',
//     text:
//       'Amet mattis vulputate enim nulla aliquet porttitor lacus luctus. Vel elit scelerisque mauris pellentesque pulvinar pellentesque habitant.',
//     timestamp: 1569109273726,
//     avatar: require('../assets/avatar/image1.png'),
//     image: require('../assets/onboarding/image3.gif'),
//   },
//   {
//     id: '4',
//     name: 'Kathie Malone',
//     text:
//       'At varius vel pharetra vel turpis nunc eget lorem. Lorem mollis aliquam ut porttitor leo a diam sollicitudin tempor. Adipiscing tristique risus nec feugiat in fermentum.',
//     timestamp: 1569109273726,
//     avatar: require('../assets/avatar/image1.png'),
//     image: require('../assets/onboarding/image1.gif'),
//   },
// ];

export default function HomeScreen() {
  const [posts, setPosts] = useState([]);
  const navigation = useNavigation();
  const data = [
    {
      id: 1,
      title: 'You',
      color: '#FF4500',
      image: 'https://img.icons8.com/color/70/000000/name.png',
    },
    {
      id: 2,
      title: 'Home',
      color: '#87CEEB',
      image: 'https://img.icons8.com/office/70/000000/home-page.png',
    },
    {
      id: 3,
      title: 'Love',
      color: '#4682B4',
      image: 'https://img.icons8.com/color/70/000000/two-hearts.png',
    },
    {
      id: 4,
      title: 'Family',
      color: '#6A5ACD',
      image: 'https://img.icons8.com/color/70/000000/family.png',
    },
    {
      id: 5,
      title: 'Friends',
      color: '#FF69B4',
      image: 'https://img.icons8.com/color/70/000000/groups.png',
    },
    {
      id: 6,
      title: 'School',
      color: '#00BFFF',
      image: 'https://img.icons8.com/color/70/000000/classroom.png',
    },
  ];
  let unsubscribe = null;

  useEffect(() => {
    unsubscribe = firebase
      .firestore()
      .collection('posts')
      .orderBy('timestamp', 'asc')
      .limit(100)
      .onSnapshot(
        snapshot => {
          if (snapshot.empty) {
            console.log('No matching documents.');
            return;
          }
          var returnArray = [];
          snapshot.forEach(function(doc) {
            const {id} = doc;
            returnArray.push({
              id,
              ...doc.data(),
              avatar: require('../assets/avatar/image1.png'),
            });
          });

          setPosts(returnArray);
        },
        err => {
          console.log(`Encountered error: ${err.code}`);
        },
      );
    requestPermission();
    // getLocation();
    return () => {
      unsubscribe();
    };
  });
  renderPost = post => {
    return (
      <View key={post.id} style={styles.feedItem}>
        <Image source={post.avatar} style={styles.avatar} />
        <View style={{flex: 1}}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <View>
              <Text style={styles.name}>{post.uid}</Text>
              <Text style={styles.timestamp}>
                {moment(post.timestamp).fromNow()}
              </Text>
            </View>

            <FontAwesome5 name="ellipsis-h" size={24} color="#73788B" />
          </View>
          <Text style={styles.post}>{post.text}</Text>
          <Image
            source={{uri: post.image}}
            style={styles.postImage}
            resizeMode="cover"
          />
          <View style={{flexDirection: 'row'}}>
            <FontAwesome5
              name="heart"
              size={24}
              color="#73788B"
              style={{marginRight: 16}}
            />
            <FontAwesome5 name="comments" size={24} color="#73788B" />
          </View>
        </View>
      </View>
    );
  };
  function goToMapsView() {
    navigation.navigate(MAP_VIEW);
  }
  return (
    <ScrollView style={styles.container}>
      <Header>
        <Left />
        <Body>
          <Title>Home</Title>
        </Body>
        <Right />
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
                  this.clickEventListener(item);
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
      <FlatList
        horizontal
        style={styles.feed}
        data={posts}
        renderItem={({item}) => renderPost(item)}
        keyExtractor={item => item.id}
        showsVerticalScrollIndicator={false}
      />
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
    paddingVertical: 17,
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
    fontSize: 24,
    flex: 1,
    alignSelf: 'center',
    fontWeight: 'bold',
  },
});
