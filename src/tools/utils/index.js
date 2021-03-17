import RNLocation from 'react-native-location';
import GetLocation from 'react-native-get-location';

const getCurrentPermission = () => {
  RNLocation.getCurrentPermission().then(currentPermission => {
    console.log('currentPermission', currentPermission);
    return currentPermission;
  });
};
const requestPermission = () => {
  RNLocation.requestPermission({
    ios: 'whenInUse', // or 'always'
    android: {
      detail: 'coarse', // or 'fine'
      rationale: {
        title: 'We need to access your location',
        message: 'We use your location to show where you are on the map',
        buttonPositive: 'OK',
        buttonNegative: 'Cancel',
      },
    },
  });
};
const checkPermission = () => {
  if (getCurrentPermission() !== 'authorizedCoarse') {
    console.log('requestPermission');
    requestPermission();
  }
};
const getLocation = () => {
  RNLocation.configure({
    distanceFilter: 5.0,
    androidProvider: 'auto',
    interval: 5000, // Milliseconds
    fastestInterval: 10000, // Milliseconds
    maxWaitTime: 5000, // Milliseconds
  });
  RNLocation.checkPermission({
    ios: 'whenInUse', // or 'always'
    android: {
      detail: 'fine', // or 'fine'
    },
  }).then(granted => {
    if (granted) {
      GetLocation.getCurrentPosition({
        enableHighAccuracy: true,
        timeout: 10000,
      })
        .then(location => {
          console.log('location -----', location);
        })
        .catch(error => {
          const {code, message} = error;
          console.warn(code, message);
        });
    }
  });
};
export {getCurrentPermission, requestPermission, checkPermission, getLocation};
