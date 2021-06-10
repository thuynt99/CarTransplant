import RNLocation from 'react-native-location';
import GetLocation from 'react-native-get-location';

const getCurrentPermission = () => {
  RNLocation.getCurrentPermission().then(currentPermission => {
    console.log('currentPermission', currentPermission);
    return currentPermission;
  });
};
const requestPermission = () => {
  RNLocation.checkPermission({
    ios: 'whenInUse', // or 'always'
    android: {
      detail: 'fine', // or 'fine'
    },
  }).then(granted => {
    if (!granted) {
      RNLocation.requestPermission({
        ios: 'whenInUse', // or 'always'
        android: {
          detail: 'fine', // or 'fine'
          rationale: {
            title: 'We need to access your location',
            message: 'We use your location to show where you are on the map',
            buttonPositive: 'OK',
            buttonNegative: 'Cancel',
          },
        },
      });
    }
  });
};
const checkPermission = () => {
  if (getCurrentPermission() !== 'authorizedCoarse') {
    console.log('requestPermission');
    requestPermission();
  }
};
const getLocation = () => {
  return new Promise(async function(resolve, reject) {
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
        detail: 'coarse', // or 'fine'
      },
    }).then(granted => {
      if (granted) {
        GetLocation.getCurrentPosition({
          enableHighAccuracy: true,
          timeout: 60000,
        })
          .then(location => {
            console.log('location', location);
            resolve(location);
          })
          .catch(error => {
            const {code, message} = error;
            console.warn(code, message);
            reject(error);
          });
      }
    });
  });
};
function formatCash(num) {
  const str = num + '';

  const arr = str.split('.');
  const str1 = arr[0];
  const str2 = arr[1];
  if (str2) {
    return (
      str1
        .split('')
        .reverse()
        .reduce((prev, next, index) => {
          return (index % 3 ? next : next + '.') + prev;
        }) +
      ',' +
      str2
    );
  } else {
    return str1
      .split('')
      .reverse()
      .reduce((prev, next, index) => {
        return (index % 3 ? next : next + '.') + prev;
      });
  }
}
export {
  getCurrentPermission,
  requestPermission,
  checkPermission,
  getLocation,
  formatCash,
};
