import {Platform} from 'react-native';
import {PERMISSIONS, requestMultiple, RESULTS} from 'react-native-permissions';

const RPermissions = async () => {
  try {
    const result = await requestMultiple([
      Platform?.OS === 'ios'
        ? PERMISSIONS.IOS.CAMERA
        : PERMISSIONS.ANDROID.CAMERA,
      Platform?.OS === 'ios'
        ? PERMISSIONS.IOS.LOCATION_WHEN_IN_USE
        : PERMISSIONS.ANDROID.ACCESS_COARSE_LOCATION,
      PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE,
      PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE,
    ]);

    switch (
      Platform.OS === 'ios'
        ? result['ios.permission.LOCATION_WHEN_IN_USE']
        : result['android.permission.ACCESS_COARSE_LOCATION']
    ) {
      case RESULTS.UNAVAILABLE:
        console.log(
          'This feature is not available (on this device / in this context)',
        );
        break;
      case RESULTS.DENIED:
        console.log(
          'The permission has not been requested / is denied but requestable',
        );
        break;
      case RESULTS.LIMITED:
        console.log('The permission is limited: some actions are possible');
        break;
      case RESULTS.GRANTED:
        console.log('The permission is granted');
        break;
      case RESULTS.BLOCKED:
        console.log('The permission is denied and not requestable anymore');
        break;
    }

    switch (
      Platform.OS === 'ios'
        ? result['ios.permission.LOCATION_WHEN_IN_USE']
        : result['android.permission.ACCESS_COARSE_LOCATION']
    ) {
      case RESULTS.UNAVAILABLE:
        console.log(
          'This feature is not available (on this device / in this context)',
        );
        break;
      case RESULTS.DENIED:
        console.log(
          'The permission has not been requested / is denied but requestable',
        );
        break;
      case RESULTS.LIMITED:
        console.log('The permission is limited: some actions are possible');
        break;
      case RESULTS.GRANTED:
        console.log('The permission is granted');
        break;
      case RESULTS.BLOCKED:
        console.log('The permission is denied and not requestable anymore');
        break;
    }

    switch (result['android.permission.READ_EXTERNAL_STORAGE']) {
      case RESULTS.UNAVAILABLE:
        console.log(
          'This feature is not available (on this device / in this context)',
        );
        break;
      case RESULTS.DENIED:
        console.log(
          'The permission has not been requested / is denied but requestable',
        );
        break;
      case RESULTS.LIMITED:
        console.log('The permission is limited: some actions are possible');
        break;
      case RESULTS.GRANTED:
        console.log('The permission is granted');
        break;
      case RESULTS.BLOCKED:
        console.log('The permission is denied and not requestable anymore');
        break;
    }
    switch (result['android.permission.WRITE_EXTERNAL_STORAGE']) {
      case RESULTS.UNAVAILABLE:
        console.log(
          'This feature is not available (on this device / in this context)',
        );
        break;
      case RESULTS.DENIED:
        console.log(
          'The permission has not been requested / is denied but requestable',
        );
        break;
      case RESULTS.LIMITED:
        console.log('The permission is limited: some actions are possible');
        break;
      case RESULTS.GRANTED:
        console.log('The permission is granted');
        break;
      case RESULTS.BLOCKED:
        console.log('The permission is denied and not requestable anymore');
        break;
    }
  } catch (err) {
    console.warn(err);
  }
};

export {RPermissions};
