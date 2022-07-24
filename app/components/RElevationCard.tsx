import {StyleSheet, Text, View} from 'react-native';
import React from 'react';

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
    backgroundColor: '#fff',
    width: '100%',
    padding: 10,
    shadowColor: '#000',
    shadowOffset: {width: 1, height: 1},
    shadowOpacity: 0.4,
    shadowRadius: 8,
    elevation: 5,
  },
});
