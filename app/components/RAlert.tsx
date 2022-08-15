import {StyleSheet} from 'react-native';
import React from 'react';
import AwesomeAlert from 'react-native-awesome-alerts';
import {Colors} from '../theme';

const RAlert = ({
  showAlert,
  title,
  message,
  setShowAlert,
  confirmationText,
  onConfirmPressed,
}: {
  showAlert: boolean;
  title: string;
  message: string;
  setShowAlert: React.Dispatch<React.SetStateAction<boolean>>;
  confirmationText: string;
  onConfirmPressed?: () => void;
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
      confirmText={confirmationText}
      confirmButtonColor={Colors.primary}
      onConfirmPressed={() => {
        if (onConfirmPressed !== undefined) {
          onConfirmPressed();
          setShowAlert(false);
        } else {
          setShowAlert(false);
        }
      }}
    />
  );
};

export {RAlert};

const styles = StyleSheet.create({});
