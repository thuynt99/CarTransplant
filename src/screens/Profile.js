import React, {useContext, useEffect, useState} from 'react';
import {Text, StyleSheet, View, TouchableOpacity, Image} from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import firebase from 'firebase';
import ImagePicker from 'react-native-image-picker';

import {CTX} from '../tools/context';
import {Body, Header, Left, Right, Subtitle, Title, Icon} from 'native-base';
// import {Icon} from 'react-native-elements';

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
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.navigationIcon}>
          <Icon name="arrowleft" type="AntDesign" />
          <Icon name="refresh" type="Foundation" />
        </View>
        <View style={styles.avatarFollows}>
          <View style={styles.avatarContext}>
            <Image
              style={styles.avatarImage}
              source={{
                uri:
                  'data:image/png;base64,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',
              }}
            />
            <View style={styles.textAvatar}>
              <Text style={styles.textName}>My Avatar</Text>
            </View>
          </View>

          <View style={styles.dashboardFollow}>
            <View>
              <Text style={styles.textFollow}>Follow Me!</Text>
            </View>

            <View style={styles.textDashboard}>
              <View>
                <Text style={styles.textInfo}>104</Text>
                <Text style={styles.textExplain}>Designed posted</Text>
              </View>
              <View>
                <Text style={styles.textInfo}>12</Text>
                <Text style={styles.textExplain}>Board Created</Text>
              </View>
            </View>
          </View>
        </View>
        <View style={styles.contact}>
          <View style={styles.phoneNumber}>
            <Icon name="phone" style={styles.iconMenu} type="FontAwesome" />
            <Text>+84 853398261</Text>
          </View>
          <View style={styles.address}>
            <Icon name="home" style={styles.iconMenu} type="FontAwesome" />
            <Text>Nam Tu Liem, Ha Noi, Viet Nam</Text>
          </View>
          <View style={styles.email}>
            <Icon name="email" style={styles.iconMenu} type="Fontisto" />
            <Text>trungnv280201@gmail.com</Text>
          </View>
        </View>
      </View>
      <View style={styles.cartInfo}>
        <View style={styles.cartInfoText}>
          <Text style={styles.textInfo}>$2084</Text>
          <Text style={styles.textExplain}>Balance</Text>
        </View>
        <View style={styles.cartInfoText}>
          <Text style={styles.textInfo}>14</Text>
          <Text style={styles.textExplain}>Order</Text>
        </View>
      </View>
      <View style={styles.subMenu}>
        <View style={styles.textMenu}>
          <Icon name="heart" style={styles.iconMenu} type="FontAwesome" />
          <Text>Your Favorites</Text>
        </View>
        <View style={styles.textMenu}>
          <Icon name="credit-card" style={styles.iconMenu} type="FontAwesome" />
          <Text>Payment</Text>
        </View>
        <View style={styles.textMenu}>
          <Icon name="share-alt" style={styles.iconMenu} type="FontAwesome5" />
          <Text>Referral Code</Text>
        </View>
        <View style={styles.textMenu}>
          <Icon
            name="shopping-basket"
            style={styles.iconMenu}
            type="FontAwesome"
          />
          <Text>Promotions</Text>
        </View>
        <View style={styles.textMenu}>
          <Icon name="setting" style={styles.iconMenu} type="AntDesign" />
          <Text>Settings</Text>
        </View>
      </View>

      <View style={styles.logout}>
        <Icon name="logout" style={styles.iconMenu} type="SimpleLineIcons" />
        <Text>Logout</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  header: {
    width: window.width,
    height: 290,
    backgroundColor: '#e4f3f5',
  },
  avatarImage: {
    borderRadius: 13,
    width: 100,
    height: 120,
  },
  avatarContext: {
    flexDirection: 'column',
  },
  avatarFollows: {
    flexDirection: 'row',
    padding: 10,
  },
  navigationIcon: {
    marginTop: 20,
    marginLeft: 10,
    marginRight: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  textAvatar: {
    position: 'absolute',
    paddingTop: 110,
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingLeft: 17,
  },

  textName: {
    backgroundColor: '#a7eec9',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  textDashboard: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingLeft: 10,
  },
  textFollow: {
    textAlign: 'center',
    borderRadius: 50,
    padding: 10,
    backgroundColor: '#ffd39b',
    //position: 'absolute',
  },
  dashboardFollow: {
    width: 310,
    paddingLeft: 10,
    paddingRight: 20,
    paddingTop: 20,
  },
  phoneNumber: {
    flexDirection: 'row',
    padding: 10,
  },
  address: {
    flexDirection: 'row',
    paddingLeft: 10,
  },
  email: {
    flexDirection: 'row',
    paddingLeft: 10,
    paddingTop: 10,
  },
  cartInfo: {
    flexDirection: 'row',
    paddingTop: 20,
  },
  cartInfoText: {
    flex: 1,
    borderColor: 'black',
    borderBottomWidth: 1,
    borderTopWidth: 1.5,
    borderRightWidth: 1,
    borderLeftWidth: 1,
    paddingHorizontal: 10,
    paddingTop: 10,
    paddingBottom: 20,
  },
  subMenu: {
    padding: 10,
    borderColor: 'black',
    borderBottomWidth: 0.7,
  },
  textMenu: {
    padding: 10,
    flexDirection: 'row',
  },
  logout: {
    flexDirection: 'row',
    padding: 20,
  },
  iconMenu: {
    fontSize: 20,
    paddingRight: 7,
  },
  contact: {
    opacity: 0.5,
  },
  textExplain: {
    opacity: 0.5,
    fontSize: 12,
    textAlign: 'center',
  },
  textInfo: {
    textAlign: 'center',
    paddingTop: 8,
    fontSize: 20,
  },
});
