import {ScrollView, StyleSheet} from 'react-native';
import React from 'react';
import {RElevationCard, RKeyboardAvoidingView} from '@app/app/components';

const HelpScreen = () => {
  return (
    <RKeyboardAvoidingView>
      <ScrollView style={{padding: 10}}>
        <RElevationCard cardText="Collect Daa on areas greater than 90 by 90 meter. If you are unable to find a pure area of 90 by 90 meters and a second crop is present, please documen it using the secondary crop field" />
        <RElevationCard cardText="Collect Daa on areas greater than 90 by 90 meter. If you are unable to find a pure area of 90 by 90 meters and a second crop is present, please documen it using the secondary crop field" />
        <RElevationCard cardText="Collect Daa on areas greater than 90 by 90 meter. If you are unable to find a pure area of 90 by 90 meters and a second crop is present, please documen it using the secondary crop field" />
        <RElevationCard cardText="Collect Daa on areas greater than 90 by 90 meter. If you are unable to find a pure area of 90 by 90 meters and a second crop is present, please documen it using the secondary crop field" />
        <RElevationCard cardText="Collect Daa on areas greater than 90 by 90 meter. If you are unable to find a pure area of 90 by 90 meters and a second crop is present, please documen it using the secondary crop field" />
        <RElevationCard cardText="Collect Daa on areas greater than 90 by 90 meter. If you are unable to find a pure area of 90 by 90 meters and a second crop is present, please documen it using the secondary crop field" />
        <RElevationCard cardText="Collect Daa on areas greater than 90 by 90 meter. If you are unable to find a pure area of 90 by 90 meters and a second crop is present, please documen it using the secondary crop field" />
      </ScrollView>
    </RKeyboardAvoidingView>
  );
};

export default HelpScreen;

const styles = StyleSheet.create({});
