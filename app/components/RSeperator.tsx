import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Colors, Fonts} from '../theme';

const RSeperator = ({title}: {title: string}) => {
  return (
    <View style={styles.mainContainerStyle}>
      <Text style={styles.titleStyle}>{title}</Text>
    </View>
  );
};

export {RSeperator};

const styles = StyleSheet.create({
  mainContainerStyle: {
    backgroundColor: Colors.secondary,
    paddingVertical: 6,
    marginVertical: 6,
    borderRadius: 6,
    paddingHorizontal: 5,
  },
  titleStyle: {color: 'white', fontFamily: Fonts.RobotoBold},
});
