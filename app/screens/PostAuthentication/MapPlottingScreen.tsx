import {StyleSheet, Text, View} from 'react-native';
import MapView, {PROVIDER_GOOGLE, Marker, LatLng} from 'react-native-maps';
import React, {useEffect, useState} from 'react';
import {useUIElements} from '@app/app/hooks/UIProvider';
import {mapData} from '@app/app/networking';

const MapPlottingScreen = () => {
  const {netConnection, showApiLoading} = useUIElements();
  const [locationArray, setLocationArray] = useState<LatLng[]>([]);
  const getLocationCoordinatesApi = async () => {
    if (!netConnection) {
      return;
    }
    showApiLoading(true);
    try {
      const result = await mapData();
      setLocationArray(result.data.data);
    } catch (error: any) {
      console.log({error});
    }
    showApiLoading(false);
  };

  useEffect(() => {
    getLocationCoordinatesApi();
  }, []);
  return (
    <View style={styles.container}>
      {locationArray[0] !== undefined ? (
        <MapView
          provider={PROVIDER_GOOGLE}
          style={styles.map}
          initialRegion={{
            latitude: locationArray[0].latitude,
            longitude: locationArray[0].longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}>
          {locationArray.map((item, index) => (
            <Marker
              key={index}
              coordinate={{
                latitude: item.latitude,
                longitude: item.longitude,
              }}
            />
          ))}
        </MapView>
      ) : (
        <View style={{justifyContent: 'center', alignSelf: 'center', flex: 1}}>
          <Text>Not even single location data is colledted.</Text>
        </View>
      )}
    </View>
  );
};

export default MapPlottingScreen;

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
