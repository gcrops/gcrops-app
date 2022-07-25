import {
  GestureResponderEvent,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import {Colors, Fonts} from '@app/app/theme';

interface Props {
  title: string;
  handleClick: (event: GestureResponderEvent) => void;
}

const RButton: React.FC<Props> = ({title, handleClick}) => {
  return (
    <TouchableOpacity style={styles.buttonStyle} onPress={handleClick}>
      <Text style={styles.titleTextStyles}>{title}</Text>
    </TouchableOpacity>
  );
};

export {RButton};

const styles = StyleSheet.create({
  buttonStyle: {
    height: 45,
    backgroundColor: Colors.primary,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  titleTextStyles: {
    color: 'white',
    fontFamily: Fonts.RobotoBold,
    fontSize: 20,
    letterSpacing: 1,
  },
});
