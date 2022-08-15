import React, {useEffect} from 'react';
import {View, Image, StyleSheet} from 'react-native';
import {useUIElements} from '../hooks/UIProvider';

const LandingScreen = () => {
  const {showLandingScreen} = useUIElements();

  const animationTiming = () =>
    setTimeout(() => {
      showLandingScreen(false);
    }, 1200);

  useEffect(() => {
    animationTiming();
  }, []);
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
  absoluteContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 5000,
    elevation: 5000,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
  },
  imageContainer: {width: 90, height: 90},
});
