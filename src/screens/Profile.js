import React, {useContext, useEffect, useState, Component} from 'react';
import {
  Text,
  StyleSheet,
  View,
  TouchableOpacity,
  Image,
  FlatList,
  ScrollView,
} from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import firebase from 'firebase';
import ImagePicker from 'react-native-image-picker';
import theme from '../theme';
import {
  Container,
  Header,
  Content,
  Button,
  ListItem,
  Icon,
  Left,
  Body,
  Right,
  Switch,
} from 'native-base';
import {CTX} from '../tools/context';

// More info on all the options is below in the API Reference... just some common use cases shown here
const options = {
  title: 'Select Avatar',
  customButtons: [{name: 'fb', title: 'Choose Photo from Facebook'}],
  storageOptions: {
    skipBackup: true,
    path: 'images',
  },
};

export default function ProfileScreen() {
  const data = [
    {
      id: 1,
      title: 'Nam',
      image: 'https://reactnative.dev/img/tiny_logo.png',
    },
    {
      id: 2,
      title: 'Tuan',
      image: 'https://reactnative.dev/img/tiny_logo.png',
    },
    {
      id: 3,
      title: 'Trung',
      image: 'https://reactnative.dev/img/tiny_logo.png',
    },
    {
      id: 4,
      title: 'Thu',
      image: 'https://reactnative.dev/img/tiny_logo.png',
    },
    {
      id: 5,
      title: 'Xuan',
      image: 'https://reactnative.dev/img/tiny_logo.png',
    },
    {
      id: 6,
      title: 'Thuy',
      image: 'https://reactnative.dev/img/tiny_logo.png',
    },
    {
      id: 7,
      title: 'Linh',
      image: 'https://reactnative.dev/img/tiny_logo.png',
    },
  ];

  const [user, setUser] = useState(null);

  const authContext = useContext(CTX);
  const {_logout} = authContext;

  let unsubscribe = null;

  useEffect(() => {
    // console.log('componentDidMount');

    unsubscribe = firebase
      .firestore()
      .collection('users')
      .doc(_uid())
      .onSnapshot(
        doc => {
          // console.log(doc.data());
          setUser(doc.data());
        },
        err => {
          console.log(`Encountered error: ${err.code}`);
        },
      );

    return () => {
      // console.log('componentWillUnmount');
      unsubscribe();
    };
  }, []);

  function _onLogout() {
    // NOTE: context
    _logout();

    // NOTE: firebase
    firebase.auth().signOut();
  }

  function _uid() {
    return (firebase.auth().currentUser || {}).uid;
  }

  function _pickImage() {
    ImagePicker.launchImageLibrary(options, async response => {
      // console.log('Response = ', response);
      // Same code as in above section!
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        const source = {uri: response.uri};

        // You can also display the image using data:
        // const source = { uri: 'data:image/jpeg;base64,' + response.data };

        const remoteUri = await _uploadPhotoAsync(
          source.uri,
          `photos/${_uid()}/${Date.now()}`,
        );

        firebase
          .firestore()
          .collection('users')
          .doc(_uid())
          .update({
            avatar: remoteUri,
          })
          .catch(err => console.log(err));
      }
    });
  }

  function _uploadPhotoAsync(localUri, path) {
    return new Promise(async (res, rej) => {
      const response = await fetch(localUri);

      // File or Blob named mountains.jpg
      const file = await response.blob();

      // Create the file metadata
      var metadata = {
        contentType: null,
      };

      // Create a root reference
      var storageRef = firebase.storage().ref();

      // Upload file and metadata to the object 'images/mountains.jpg'
      var uploadTask = storageRef.child(path).put(file, metadata);

      // Listen for state changes, errors, and completion of the upload.
      uploadTask.on(
        firebase.storage.TaskEvent.STATE_CHANGED, // or 'state_changed'
        snapshot => {
          // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
          var progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log('Upload is ' + progress + '% done');
          switch (snapshot.state) {
            case firebase.storage.TaskState.PAUSED: // or 'paused'
              console.log('Upload is paused');
              break;
            case firebase.storage.TaskState.RUNNING: // or 'running'
              console.log('Upload is running');
              break;
          }
        },
        error => {
          // A full list of error codes is available at
          // https://firebase.google.com/docs/storage/web/handle-errors
          switch (error.code) {
            case 'storage/unauthorized':
              // User doesn't have permission to access the object
              break;

            case 'storage/canceled':
              // User canceled the upload
              break;

            case 'storage/unknown':
              // Unknown error occurred, inspect error.serverResponse
              break;
          }
          rej(error);
        },
        () => {
          // Upload completed successfully, now we can get the download URL
          uploadTask.snapshot.ref.getDownloadURL().then(downloadURL => {
            console.log('File available at', downloadURL);
            res(downloadURL);
          });
        },
      );
    });
  }

  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.headerView}>
          <View style={styles.avatarHeader}>
            <View>
              <TouchableOpacity
                style={styles.avatarPlaceholder}
                onPress={_pickImage}>
                <Image
                  source={
                    user && user.avatar
                      ? {uri: user.avatar}
                      : require('../assets/avatar/image1.png')
                  }
                  style={styles.avatar}
                  blurRadius={user && user.avatar && 0}
                />
                <FontAwesome5 name={'plus'} size={24} color="#fff" />
              </TouchableOpacity>
            </View>
            <View style={styles.namePosition}>
              <Text style={styles.nameAvatar}>Ha Duc Tuan</Text>
            </View>
          </View>

          <View style={styles.followInfos}>
            <Text style={styles.followMe}>FOLLOW ME</Text>
            <View style={styles.viewFollow}>
              <View>
                <Text style={styles.textFollow}>233</Text>
                <Text style={styles.textFollow}>Follows</Text>
              </View>
              <View>
                <Text style={styles.textFollow}>123</Text>
                <Text style={styles.textFollow}>Following</Text>
              </View>
            </View>
          </View>
        </View>

        <View style={styles.extraInfos}>
          <Text style={styles.textExtraInfos}>Contact me: 0123456789</Text>
          <Text style={styles.textExtraInfos}>Address: Hanoi, Vietnam</Text>
          <Text style={styles.textExtraInfos}>
            Email: hatuank97lhp@gmail.com
          </Text>
        </View>
      </View>

      <View style={styles.cart}>
        <View style={styles.cartInfos}>
          <Text style={{textAlign: 'center', fontSize: 20}}>$2004</Text>
          <Text style={{textAlign: 'center', fontSize: 20}}>Balance</Text>
        </View>

        <View style={styles.cartInfos}>
          <Text style={{textAlign: 'center', fontSize: 20}}>14</Text>
          <Text style={{textAlign: 'center', fontSize: 20}}>Order</Text>
        </View>
      </View>

      <FlatList
        style={styles.flatListStyles}
        showsHorizontalScrollIndicator={false}
        data={data}
        horizontal={true}
        renderItem={({item}) => {
          return (
            <View style={{paddingLeft: 30}}>
              <Image style={styles.imageStyle} source={{uri: item.image}} />
              <View>
                <View style={{alignItems: 'center', justifyContent: 'center'}}>
                  <Text style={styles.textExtraInfos}>{item.title}</Text>
                </View>
              </View>
            </View>
          );
        }}
      />

      <View style={styles.menu}>
        <Button transparent>
          <Icon name="heart" style={styles.iconStyles} />
          <Text style={styles.menuText}>Your Favorites</Text>
        </Button>

        <Button transparent>
          <Icon name="award" style={styles.iconStyles} type="Feather" />
          <Text style={styles.menuText}>Your Achievement</Text>
        </Button>

        <Button transparent>
          <Icon name="payment" style={styles.iconStyles} type="MaterialIcons" />
          <Text style={styles.menuText}>Payment</Text>
        </Button>

        <Button transparent>
          <Icon
            name="share-variant"
            style={styles.iconStyles}
            type="MaterialCommunityIcons"
          />
          <Text style={styles.menuText}>Referral Code</Text>
        </Button>

        <Button transparent>
          <Icon name="setting" style={styles.iconStyles} type="AntDesign" />
          <Text style={styles.menuText}>Setting</Text>
        </Button>

        <Button transparent>
          <Icon
            name="logout"
            style={styles.iconStyles}
            type="MaterialCommunityIcons"
          />
          <Text style={styles.menuText}>Logout</Text>
        </Button>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFCC',
  },
  avatarPlaceholder: {
    flex: 1,
    width: 150,
    height: 150,
    backgroundColor: '#E1E2E6',
    borderRadius: 20,
  },
  avatar: {
    position: 'absolute',
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  viewFollow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 40,
  },
  textFollow: {
    textAlign: 'center',
    justifyContent: 'space-between',
    paddingLeft: 10,
    paddingRight: 20,
    fontSize: 18,
  },
  headerView: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: 20,
    paddingRight: 20,
  },
  avatarHeader: {
    justifyContent: 'space-between',
  },
  namePosition: {
    position: 'absolute',
    paddingLeft: 25,
    paddingTop: 130,
  },
  nameAvatar: {
    backgroundColor: '#99FFFF',
    fontSize: 18,
    fontWeight: '600',
    borderRadius: 10,
  },

  followMeButton: {
    paddingTop: 20,
    paddingBottom: 20,
  },

  followMe: {
    backgroundColor: 'red',
    fontSize: 16,
    fontWeight: '600',
    borderRadius: 10,
    textAlign: 'center',
  },

  extraInfos: {
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 10,
  },

  textExtraInfos: {
    fontSize: 15,
    fontStyle: 'italic',
  },

  cart: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderWidth: 1,
  },
  cartInfos: {
    flex: 1,
    justifyContent: 'space-between',
    borderWidth: 1,
  },

  followInfos: {
    flex: 1,
    paddingTop: 20,
    paddingBottom: 20,
    paddingLeft: 20,
  },

  menuText: {
    fontSize: 17,
  },

  iconStyles: {
    fontSize: 30,
  },

  menu: {
    paddingTop: 20,

    // justifyContent: 'space-between',
    // backgroundColor: 'red',
  },

  imageStyle: {
    height: 60,
    width: 60,
    alignSelf: 'center',
    borderRadius: 20,
  },

  flatListStyles: {
    paddingTop: 20,
  },
});
