import {StyleSheet, View} from 'react-native';
import React, {FC, useState} from 'react';
import {useUIElements} from '@app/app/hooks/UIProvider';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {HomeStackParamList} from '@app/app/navigation/Navigator';
import {RouteProp} from '@react-navigation/native';

interface NavigationProps {
  navigation: NativeStackNavigationProp<
    HomeStackParamList,
    'CollectLocationFromMapScreen'
  >;
  route: RouteProp<HomeStackParamList, 'CollectLocationFromMapScreen'>;
}

interface Props extends NavigationProps {}

const CollectLocationFromMapScreen: FC<Props> = ({route}) => {
  const {latitude, longitude} = route.params;
  const {netConnection, showApiLoading} = useUIElements();
  const [locationArray, setLocationArray] = useState<{
    latitude: number;
    longitude: number;
  }>({latitude, longitude});
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
});
