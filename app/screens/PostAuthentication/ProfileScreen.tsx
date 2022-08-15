import {StyleSheet, View} from 'react-native';
import React from 'react';
import {RButton, RKeyboardAvoidingView} from '@app/app/components';
import {useUIElements} from '@app/app/hooks/UIProvider';
import {removeAuthorization} from '@app/app/networking';

const ProfileScreen = () => {
  const {netConnection, showApiLoading, authDispatch} = useUIElements();
  const logoutPressed = async () => {
    if (netConnection) {
      try {
        showApiLoading(true);
        await removeAuthorization();
        authDispatch.signOut();
        showApiLoading(false);
      } catch (error: any) {
        console.log({error});
        showApiLoading(false);
      }
    }
  };

  return (
    <RKeyboardAvoidingView>
      <View style={{padding: 40}}>
        <RButton title="Logout" handleClick={() => logoutPressed()} />
      </View>
    </RKeyboardAvoidingView>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({});
