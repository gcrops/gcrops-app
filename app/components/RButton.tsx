import {
  GestureResponderEvent,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';
import React from 'react';

interface Props {
  title: String;
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
    height: 30,
    backgroundColor: '#D6D8D7',
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  titleTextStyles: {fontWeight: 'bold', color: 'black'},
});
