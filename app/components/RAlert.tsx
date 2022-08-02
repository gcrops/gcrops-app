import {StyleSheet} from 'react-native';
import React from 'react';
import AwesomeAlert from 'react-native-awesome-alerts';
import {Colors} from '../theme';

const RAlert = ({
  showAlert,
  title,
  message,
  setShowAlert,
}: {
  showAlert: boolean;
  title: string;
  message: string;
  setShowAlert: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  return (
    <AwesomeAlert
      show={showAlert}
      showProgress={false}
      title={title}
      message={message}
      closeOnTouchOutside={false}
      closeOnHardwareBackPress={false}
      showConfirmButton={true}
      confirmText="Ok"
      confirmButtonColor={Colors.primary}
      onConfirmPressed={() => {
        setShowAlert(false);
      }}
    />
  );
};

export {RAlert};

const styles = StyleSheet.create({});
