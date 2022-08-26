import {ScrollView, StyleSheet} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Item as Help} from '@app/app/networking/types/Help';
import {RElevationCard, RKeyboardAvoidingView} from '@app/app/components';
import {helpData} from '@app/app/networking';
import {useUIElements} from '@app/app/hooks/UIProvider';

const HelpScreen = () => {
  const {netConnection, showApiLoading} = useUIElements();
  const [helpObj, setHelpObj] = useState<Help[]>();

  const helpApiCall = async () => {
    if (!netConnection) {
      return;
    }
    showApiLoading(true);
    try {
      let response = await helpData();
      setHelpObj(response.data.items);
    } catch (error) {
      console.log('error', error);
    }
    showApiLoading(false);
  };

  useEffect(() => {
    helpApiCall();
  }, []);

  return (
    <RKeyboardAvoidingView>
      <ScrollView style={styles.mainContainerStyle}>
        {helpObj?.map((item, index) => (
          <RElevationCard cardText={item.content} key={index} />
        ))}
      </ScrollView>
    </RKeyboardAvoidingView>
  );
};

export default HelpScreen;

const styles = StyleSheet.create({mainContainerStyle: {paddingHorizontal: 16}});
