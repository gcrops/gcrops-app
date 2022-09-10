import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {FC, useEffect, useState} from 'react';
import {useUIElements} from '@app/app/hooks/UIProvider';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {HomeStackParamList} from '@app/app/navigation/Navigator';
import {RouteProp} from '@react-navigation/native';
import {Colors, Fonts} from '@app/app/theme';

interface NavigationProps {
  navigation: NativeStackNavigationProp<
    HomeStackParamList,
    'CollectLocationFromMapScreen'
  >;
  route: RouteProp<HomeStackParamList, 'CollectLocationFromMapScreen'>;
}

interface Props extends NavigationProps {}

const CollectLocationFromMapScreen: FC<Props> = ({route, navigation}) => {
  const {latitude, longitude} = route.params;
  const {collectedLocationData} = useUIElements();
  const [locationArray, setLocationArray] = useState<{
    latitude: number;
    longitude: number;
  }>({latitude, longitude});

  const [confirm, setConfirm] = useState(false);

  useEffect(() => {
    navigation.getParent()?.setOptions({
      tabBarStyle: {
        display: 'none',
      },
    });
    return () =>
      navigation.getParent()?.setOptions({
        tabBarStyle: undefined,
      });
  }, [navigation]);

  return (
    <View style={styles.container}>
      <MapView
        provider={PROVIDER_GOOGLE}
        mapType={'satellite'}
        style={styles.map}
        onRegionChange={region => {
          setLocationArray({
            latitude: region.latitude,
            longitude: region.longitude,
          });
        }}
        initialRegion={{
          latitude: locationArray.latitude,
          longitude: locationArray.longitude,
          latitudeDelta: 0.0005,
          longitudeDelta: 0.0005,
        }}>
        <Marker
          coordinate={{
            latitude: locationArray.latitude,
            longitude: locationArray.longitude,
          }}
        />
      </MapView>

      <TouchableOpacity
        style={styles.confirmButtonStyle}
        onPress={() => {
          collectedLocationData([locationArray]);
          navigation.pop();
        }}>
        <Text style={styles.confirmButtonTitleStyle}>{'Confirm Location'}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default CollectLocationFromMapScreen;

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    height: '100%',
    width: '100%',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  confirmButtonStyle: {
    justifyContent: 'flex-end',
    alignContent: 'flex-start',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 12,
    backgroundColor: Colors.primary,
    marginBottom: 10,
  },
  confirmButtonTitleStyle: {
    fontFamily: Fonts.RobotoBold,
    color: Colors.secondary,
  },
});
