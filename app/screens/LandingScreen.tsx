import React from 'react';
import {View, Image, StyleSheet} from 'react-native';

const LandingScreen = () => {
  return (
    <View style={styles.absoluteContainer}>
      <Image
        style={styles.imageContainer}
        source={require('../resources/images/logo.png')}
      />
    </View>
  );
};

export {LandingScreen};
const styles = StyleSheet.create({
  absoluteContainer: {},
  imageContainer: {width: 90, height: 90},
});
