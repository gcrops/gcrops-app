import {StyleSheet, View} from 'react-native';
import React from 'react';
import {RButton, RKeyboardAvoidingView} from '@app/app/components';
import {useUIElements} from '@app/app/hooks/UIProvider';
import {removeAuthorization} from '@app/app/networking';

const ProfileScreen = () => {
  const {netConnection, showApiLoading, authDispatch} = useUIElements();
  const logoutPressed = async () => {
    if (!netConnection) {
      return;
    }
    showApiLoading(true);
    try {
      await removeAuthorization();
      authDispatch.signOut();
    } catch (error: any) {
      console.log({error});
    }
    showApiLoading(false);
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
