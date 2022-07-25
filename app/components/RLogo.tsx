import React from 'react';
import {Image, StyleSheet, View} from 'react-native';

interface Props {}

const RLogo: React.FC<Props> = () => {
  return (
    <View style={styles.imageContainerStyle}>
      <Image
        source={require('../resources/images/logo.png')}
        style={styles.logoStyle}
      />
    </View>
  );
};

export {RLogo};

const styles = StyleSheet.create({
  logoStyle: {
    width: 90,
    height: 90,
  },
  imageContainerStyle: {
    flex: 0.5,
    alignSelf: 'center',
    justifyContent: 'center',
  },
});
