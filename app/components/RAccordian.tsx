import {
  LayoutAnimation,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  UIManager,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {Colors} from '../theme';

const RAccordian = ({data, title}: {data: Object; title: String}) => {
  const [expanded, setExpanded] = useState(false);
  const rowValues = () => {
    return Object.entries(data).map((key, _value) => {
      return (
        <View style={styles.child}>
          <Text>{key[0]}</Text>
          <Text>{key[1]}</Text>
        </View>
      );
    });
  };
  const toggleExpand = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setExpanded(prevState => !prevState);
  };

  useEffect(() => {
    if (Platform.OS === 'android') {
      UIManager.setLayoutAnimationEnabledExperimental(true);
    }
  }, []);

  return (
    <View>
      <TouchableOpacity
        style={styles.row}
        onPress={toggleExpand}
        activeOpacity={0.7}>
        <Text style={[styles.title]}>{title}</Text>
        <Icon
          name={expanded ? 'keyboard-arrow-up' : 'keyboard-arrow-down'}
          size={30}
          color={Colors.secondary}
        />
      </TouchableOpacity>
      <View style={styles.parentHr} />
      {expanded && rowValues()}
    </View>
  );
};

export {RAccordian};

const styles = StyleSheet.create({
  title: {
    fontSize: 14,
    fontWeight: 'bold',
    color: Colors.secondary,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: 56,
    paddingLeft: 25,
    paddingRight: 18,
    alignItems: 'center',
    backgroundColor: Colors.text,
  },
  parentHr: {
    height: 1,
    color: Colors.text,
    width: '100%',
  },
  child: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: Colors.background,
    padding: 16,
  },
});
