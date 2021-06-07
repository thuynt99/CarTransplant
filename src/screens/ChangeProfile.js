import React, {useContext, useEffect, useState} from 'react';
import {
  Text,
  StyleSheet,
  View,
  TouchableOpacity,
  Image,
  Share,
  Linking,
  TextInput,
  SafeAreaView,
} from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import * as firebase from 'firebase';
import 'firebase/firestore';
import ImagePicker from 'react-native-image-picker';
import ChangeProfileSchema from '../validation/ChangeProfileSchema';
import {CTX} from '../tools/context';
import {Button} from 'native-base';
import theme from '../theme';
import {ScaledSheet} from 'react-native-size-matters';
import HeaderCustom from '../components/common/HeaderCustom';
import Dialog from '../components/common/Dialog';
import {Formik} from 'formik';
import {useNavigation} from '@react-navigation/native';
import {PROFILE} from '../constants';
import {TYPE_DIALOG} from '../constants/data';

// More info on all the options is below in the API Reference... just some common use cases shown here
const options = {
  title: 'Select Avatar',
  customButtons: [{name: 'fb', title: 'Choose Photo from Facebook'}],
  storageOptions: {
    skipBackup: true,
    path: 'images',
  },
};

export default function ChangeProfile() {
  const [user, setUser] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const navigation = useNavigation();

  let unsubscribe = null;

  useEffect(() => {
    unsubscribe = firebase
      .firestore()
      .collection('users')
      .doc(_uid())
      .onSnapshot(
        doc => {
          console.log(doc.data());
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

  function _uid() {
    return (firebase.auth().currentUser || {}).uid;
  }

  function _onSubmit(values) {
    console.log('values', values);
    firebase
      .firestore()
      .collection('users')
      .doc(_uid())
      .update({
        fullName: values.fullName,
        phone: values.phone,
        address: values.address,
      })
      .then(() => {
        console.log('Document successfully written!');
        setIsOpen(true);
      })
      .catch(err => console.log(err));
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
  const onGoBack = () => {
    navigation.goBack();
  };
  const _onCloseModal = () => {
    setIsOpen(false);
    navigation.navigate(PROFILE);
  };
  return (
    <View style={styles.container}>
      <HeaderCustom title="Thông tin tài khoản" onGoBack={onGoBack} />
      <View style={styles.header}>
        <View
          style={{
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
          </TouchableOpacity>
        </View>
        <View>
          <Text style={styles.name}>{user && user.fullName}</Text>
          <Text style={styles.name}>{user && user.phone}</Text>
        </View>
      </View>
      <SafeAreaView style={styles.container}>
        <Formik
          initialValues={{
            fullName: '',
            phone: '',
            address: '',
          }}
          validationSchema={ChangeProfileSchema}
          onSubmit={values => {
            _onSubmit(values);
          }}>
          {({
            handleChange,
            handleBlur,
            handleSubmit,
            values,
            errors,
            touched,
          }) => (
            <View>
              <View style={styles.form}>
                <View>
                  <Text style={styles.inputTitle}>Họ tên</Text>
                  <TextInput
                    style={styles.input}
                    onChangeText={handleChange('fullName')}
                    onBlur={handleBlur('fullName')}
                    value={values.fullName}
                  />
                  {errors.fullName && touched.fullName ? (
                    <Text style={styles.error}>{errors.fullName}</Text>
                  ) : null}
                </View>
                <View style={{marginTop: 32}}>
                  <Text style={styles.inputTitle}>Số điện thoại</Text>
                  <TextInput
                    style={styles.input}
                    onChangeText={handleChange('phone')}
                    onBlur={handleBlur('phone')}
                    value={values.phone}
                    keyboardType="phone-pad"
                  />
                  {errors.phone && touched.phone ? (
                    <Text style={styles.error}>{errors.phone}</Text>
                  ) : null}
                </View>

                <View style={{marginTop: 32}}>
                  <Text style={styles.inputTitle}>Địa chỉ</Text>
                  <TextInput
                    style={styles.input}
                    onChangeText={handleChange('address')}
                    onBlur={handleBlur('address')}
                    value={values.address}
                  />
                </View>
              </View>
              <Button
                full
                onPress={handleSubmit}
                danger
                style={styles.btnLogout}>
                <Text style={styles.textLogout}>Xác nhận</Text>
              </Button>
            </View>
          )}
        </Formik>
      </SafeAreaView>
      <Dialog
        isOpen={isOpen}
        onClosed={() => setIsOpen(false)}
        item={_.find(TYPE_DIALOG, {id: 3})}
        onClickLeft={_onCloseModal}
        modalStyle={styles.modalStyle}
      />
    </View>
  );
}

const styles = ScaledSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    alignItems: 'center',
    backgroundColor: theme.primaryColor,
    paddingVertical: '10@vs',
    borderBottomLeftRadius: '16@ms',
    borderBottomRightRadius: '16@ms',
    marginBottom: '10@vs',
  },
  view: {
    flex: 1,
    paddingHorizontal: '16@s',
  },
  avatarContainer: {
    shadowColor: '#151734',
    shadowRadius: 30,
    shadowOpacity: 0.4,
  },
  avatarPlaceholder: {
    width: 100,
    height: 100,
    backgroundColor: '#E1E2E6',
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatar: {
    position: 'absolute',
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  name: {
    fontSize: 16,
    color: theme.white,
    fontWeight: 'bold',
    alignSelf: 'center',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: 32,
  },
  stat: {
    alignItems: 'center',
    flex: 1,
  },
  statAmount: {
    color: '#4F566D',
    fontSize: 18,
    fontWeight: '300',
  },
  statTitle: {
    color: '#C3C5CD',
    fontSize: 12,
    fontWeight: '500',
    marginTop: 4,
  },
  card: {
    paddingHorizontal: '10@s',
    borderRadius: '16@ms',
  },
  textLogout: {
    color: theme.white,
    fontSize: '14@ms',
    fontWeight: 'bold',
  },
  btnLogout: {
    marginVertical: '20@vs',
    borderRadius: 8,
    marginHorizontal: '20@s',
  },
  textShare: {
    color: theme.white,
    fontSize: '14@ms',
    fontWeight: 'bold',
  },
  textCode: {
    color: theme.grey_dark_30,
    fontSize: '14@ms',
    fontWeight: 'bold',
    paddingVertical: '10@vs',
    paddingHorizontal: '16@s',
  },
  text: {
    color: theme.grey_dark,
    fontSize: '14@ms',
    paddingHorizontal: '16@s',
  },
  promotion: {
    height: '70@vs',
    width: '100%',
  },
  errorMessage: {
    height: 72,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 30,
  },
  error: {
    color: theme.primaryColor,
    fontSize: 13,
    fontWeight: '600',
    textAlign: 'center',
  },
  form: {
    paddingVertical: 48,
    marginHorizontal: 30,
  },
  inputTitle: {
    color: '#8A8F9E',
    fontSize: '14@ms',
  },
  input: {
    borderBottomColor: '#8A8F9E',
    borderBottomWidth: 1,
    height: 40,
    fontSize: 15,
    color: '#161F3D',
  },
  modalStyle: {
    height: '180@vs',
  },
});
