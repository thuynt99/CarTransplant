import React, {useContext, useEffect, useState} from 'react';
import {Text, StyleSheet, View, TouchableOpacity, Image} from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import firebase from 'firebase';
import ImagePicker from 'react-native-image-picker';

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
      <View style={{marginTop: 64, alignItems: 'center'}}>
        <View
          style={{
            // position: 'absolute',
            // top: 64,
            alignItems: 'center',
            width: '100%',
          }}>
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

        <Text style={styles.name}>{user && user.fullName}</Text>
      </View>

      <View style={styles.statsContainer}>
        <View style={styles.stat}>
          <Text style={styles.statAmount}>21</Text>
          <Text style={styles.statTitle}>Posts</Text>
        </View>
        <View style={styles.stat}>
          <Text style={styles.statAmount}>9999</Text>
          <Text style={styles.statTitle}>Followers</Text>
        </View>
        <View style={styles.stat}>
          <Text style={styles.statAmount}>9999</Text>
          <Text style={styles.statTitle}>Following</Text>
        </View>
      </View>

      <TouchableOpacity onPress={_onLogout}>
        <Text>Log out</Text>
      </TouchableOpacity>
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
    height: 200,
    backgroundColor: '#e4f3f5',
  },
  avatarImage: {
    borderRadius: 50,
    width: 90,
    height: 90,
  },
  avatarContext: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  navigationIcon: {
    flexDirection: 'row',
  },
});
