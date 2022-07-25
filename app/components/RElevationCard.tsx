import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Colors} from '../theme';

interface Props {
  cardText: string;
}

const RElevationCard: React.FC<Props> = ({cardText}) => {
  return (
    <View style={[styles.card]}>
      <Text>{cardText}</Text>
    </View>
  );
};

export {RElevationCard};

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.text,
    width: '100%',
    padding: 10,
    shadowColor: 'black',
    shadowOffset: {width: 1, height: 1},
    shadowOpacity: 0.4,
    shadowRadius: 8,
    elevation: 5,
  },
});
