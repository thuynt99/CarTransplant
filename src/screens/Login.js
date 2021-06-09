import React, {useContext, useState, useEffect} from 'react';
import {
  Text,
  StyleSheet,
  View,
  TextInput,
  TouchableOpacity,
  Image,
  // KeyboardAvoidingView,
  // Platform,
} from 'react-native';
import {Formik} from 'formik';
import SafeAreaView from 'react-native-safe-area-view';
import firebase from 'firebase';
import {useNavigation} from '@react-navigation/native';
import messaging from '@react-native-firebase/messaging';

// import {CTX} from '../tools/context';
import LoginSchema from '../validation/Login';
import {primaryColor} from '../theme';
import store from '../stores/configureStore';
import {registerTokenPush} from '../stores/notify/actions';

export default function LoginScreen() {
  const navigation = useNavigation();
  const {navigate} = navigation;

  // const authContext = useContext(CTX);
  // const {_authenticate} = authContext;

  const [errorMessage, setErrorMessage] = useState('');

  function _onLogin(values) {
    const {email, password} = values;
    // const accessToken = email + password;

    // console.log(email, password);

    // NOTE: firebase
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(async () => {
        await checkToken();
      })
      .catch(error => setErrorMessage(error.message));

    // NOTE: context
    // if (email === 'trinhchinchin@gmail.com' && password === '123') {
    //   _authenticate(accessToken);
    //   navigate('Dashboard');
    // } else {
    //   setErrorMessage('Email or Password is not correct.');
    // }
  }
  const checkToken = async () => {
    const fcmToken = await messaging().getToken();
    if (fcmToken) {
      console.log('fcmToken', fcmToken);
      store.dispatch(registerTokenPush(fcmToken));
    }
  };
  function _navigateForgot() {
    navigate('Forgot');
  }

  function _navigateRegister() {
    navigate('Register');
  }

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Image
          style={{
            width: 420,
            height: 300,
            position: 'absolute',
            top: 0,
            right: 0,
          }}
          source={require('../assets/loginBG.jpg')}
        />
        <View
          style={{
            elevation: 4,
            shadowOffset: {width: 5, height: 5},
            shadowColor: 'grey',
            shadowOpacity: 0.5,
            shadowRadius: 10,
          }}>
          <Image
            source={require('../assets/logo/image_white.png')}
            style={{
              width: 80,
              height: 80,
              marginTop: 100,
              alignSelf: 'center',
              borderRadius: 10,
            }}
          />
        </View>
        <Text style={styles.greeting}>{'Welcome back.'}</Text>
        <View style={styles.errorMessage}>
          <Text style={styles.error}>{errorMessage}</Text>
        </View>
        <Formik
          initialValues={{
            email: '',
            password: '',
          }}
          validationSchema={LoginSchema}
          onSubmit={values => {
            _onLogin(values);
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
                  <Text style={styles.inputTitle}>Địa chỉ email</Text>
                  <TextInput
                    style={styles.input}
                    onChangeText={handleChange('email')}
                    onBlur={handleBlur('email')}
                    value={values.email}
                  />
                  {errors.email && touched.email ? (
                    <Text style={styles.error}>{errors.email}</Text>
                  ) : null}
                </View>
                <View style={{marginTop: 32}}>
                  <Text style={styles.inputTitle}>Mật khẩu</Text>
                  <TextInput
                    style={styles.input}
                    onChangeText={handleChange('password')}
                    onBlur={handleBlur('password')}
                    value={values.password}
                    secureTextEntry
                  />
                  {errors.password && touched.password ? (
                    <Text style={styles.error}>{errors.password}</Text>
                  ) : null}
                </View>
              </View>
              <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                <Text style={styles.buttonText}>Đăng nhập</Text>
              </TouchableOpacity>
            </View>
          )}
        </Formik>
        <View
          style={{
            flexDirection: 'row',
            alignSelf: 'center',
            marginTop: 32,
          }}>
          <Text style={{color: '#414959'}}>Bạn chưa có tài khoản? </Text>
          <TouchableOpacity onPress={_navigateRegister}>
            <Text style={styles.signUpText}>Đăng kí</Text>
          </TouchableOpacity>
        </View>
        <View
          style={{
            flexDirection: 'row',
            alignSelf: 'center',
            marginTop: 32,
          }}>
          <TouchableOpacity onPress={_navigateForgot}>
            <Text style={styles.signUpText}>Quên mật khẩu?</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F7F7',
  },
  greeting: {
    marginTop: 32,
    fontSize: 18,
    fontWeight: '400',
    textAlign: 'center',
  },
  errorMessage: {
    height: 72,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 30,
  },
  form: {
    marginBottom: 48,
    marginHorizontal: 30,
  },
  inputTitle: {
    color: '#8A8F9E',
    fontSize: 10,
    textTransform: 'uppercase',
  },
  input: {
    borderBottomColor: '#8A8F9E',
    borderBottomWidth: StyleSheet.hairlineWidth,
    height: 40,
    fontSize: 15,
    color: '#161F3D',
  },
  error: {
    color: primaryColor,
    fontSize: 13,
    fontWeight: '600',
    textAlign: 'center',
  },
  button: {
    marginHorizontal: 30,
    backgroundColor: primaryColor,
    borderRadius: 4,
    height: 52,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: '500',
  },
  signUpText: {
    color: primaryColor,
    fontSize: 13,
    fontWeight: '500',
  },
});
