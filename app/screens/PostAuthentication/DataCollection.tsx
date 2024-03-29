import {
  Image,
  StyleSheet,
  View,
  ScrollView,
  Text,
  Switch,
  Alert,
  TextInput,
} from 'react-native';
import React, {useState} from 'react';

import {launchCamera} from 'react-native-image-picker';
import {
  RAlert,
  RButton,
  RKeyboardAvoidingView,
  RSeperator,
} from '@app/app/components';
import {useUIElements} from '@app/app/hooks/UIProvider';
// import Geolocation from 'react-native-geolocation-service';
import {Colors, Fonts} from '@app/app/theme';
import {Picker} from '@react-native-picker/picker';
import Icon from 'react-native-vector-icons/FontAwesome';
import {FloatingLabelInput} from 'react-native-floating-label-input';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {HomeStackParamList} from '@app/app/navigation/Navigator';
import {RouteProp} from '@react-navigation/native';
import Slider from '@react-native-community/slider';
import Geolocation from '@react-native-community/geolocation';

interface NavigationProps {
  navigation: NativeStackNavigationProp<HomeStackParamList, 'DataCollection'>;
  route: RouteProp<HomeStackParamList, 'DataCollection'>;
}

interface Props extends NavigationProps {}

const DataCollection: React.FC<Props> = ({navigation}) => {
  const {
    allCollectedData,
    collectedLocationData,
    locationData,
    showApiLoading,
  } = useUIElements();
  const [image, setImage] = useState<
    {
      uri: string;
    }[]
  >([]);
  const [imageArray, setImageArray] = useState<string[]>([]);
  const [isEnabled, setIsEnabled] = useState(false);
  const [isMapEnabled, setIsMapEnabled] = useState(false);
  const [isCropCuttingEnabled, setIsCropCuttingEnabled] = useState(false);
  const [showValidationAlert, setShowValidationAlert] = useState(false);
  const [locationOffsetValue, setLocationOffsetValue] = useState(0);

  const [selectedCategoriesList, setSelectedCategoriesList] = useState('');

  const [selectedWaterSource, setSelectedWaterSource] = useState('Unknown');
  const [selectedCropIntensity, setSelectedCropIntensity] = useState('Unknown');
  const [selectedPrimaryCrop, setSelectedPrimaryCrop] = useState('Unknown');
  const [selectedSecondaryCrop, setSelectedSecondaryCrop] = useState('Unknown');
  const [selectedLiveStock, setSelectedLiveStock] = useState('Unknown');

  const [sampleSize, setSampleSize] = useState('');
  const [grainweight, setGrainweight] = useState('');
  const [bioMassweight, setBioMassweight] = useState('');
  const [cultivar, setCultivar] = useState('');
  const [sowingDate, setSowingDate] = useState('');
  const [harvestDate, setHarvestDate] = useState('');
  const [descriptionValue, setDescriptionValue] = useState('');

  const categoriesList = [
    'Select Land Type',
    'Cropland',
    'Forest',
    'Grassland',
    'Barren',
    'Builtup',
    'Shrub',
  ];
  const croplandTypes = [
    {keyName: 'Water Source', values: ['Unknown', 'Rainfed', 'Irrigated']},
    {
      keyName: 'Crop Intensity',
      values: ['Unknown', 'Single', 'Double', 'Triple', 'Continuous'],
    },
    {
      keyName: 'Primary Crop',
      values: [
        'Unknown',
        'Pigeonpea',
        'Chickpea',
        'Wheat',
        'Maize(Corn)',
        'Rice',
        'Barley',
        'SoyaBean',
        'Pulses',
        'Cotton',
        'Potatoe',
        'Alfalfa',
        'Sorghum',
        'Millet',
        'Sunflower',
        'Rye',
        'Rapeseed or Canola',
        'Sugarcane',
        'Groundnut or Peanut',
        'Cassava',
        'Sugarbeet',
        'Palm',
        'Plantation',
        'Fallow',
        'Tef',
        'Others',
      ],
    },
    {
      keyName: 'Secondary Crop',
      values: [
        'Unknown',
        'Pigeonpea',
        'Chickpea',
        'Wheat',
        'Maize(Corn)',
        'Rice',
        'Barley',
        'SoyaBean',
        'Pulses',
        'Cotton',
        'Potatoe',
        'Alfalfa',
        'Sorghum',
        'Millet',
        'Sunflower',
        'Rye',
        'Rapeseed or Canola',
        'Sugarcane',
        'Groundnut or Peanut',
        'Cassava',
        'Sugarbeet',
        'Palm',
        'Plantation',
        'Fallow',
        'Tef',
        'Others',
      ],
    },
    {
      keyName: 'Live Stock',
      values: ['Unknown', 'Cows', 'Buffaloes', 'Goats', 'Sheep'],
    },
  ];
  const [isAadhaarFocused, setIsAadhaarFocused] = useState(false);
  const [aadhaar, setAadhaar] = useState('');

  const qualityControlList = [
    {
      type: 'picture',
      value: 'Capture a photo of the area.',
      content: imageArray,
    },
    {
      type: 'gpsPoints',
      value: 'Collect sufficient GPS points.',
      content: locationData,
    },
    {
      type: 'landClass',
      value: 'Set land cover class.',
      content: selectedCategoriesList,
    },
    {
      type: 'crop',
      value: 'crop data if landCoverType is crop',
      content: {
        waterSource: selectedWaterSource,
        cropIntensity: selectedCropIntensity,
        primaryCrop: selectedPrimaryCrop,
        secondaryCrop: selectedSecondaryCrop,
        liveStock: selectedLiveStock,
      },
    },
    {
      type: 'cropcutting',
      value: 'crop cutting data if landCoverType is crop',
      content: {
        samplesize: sampleSize,
        grainweight: grainweight,
        biomassweight: bioMassweight,
        cultivar,
        sowingdate: sowingDate,
        harvestdate: harvestDate,
      },
    },
    {type: 'description', value: 'description', content: descriptionValue},
    {
      type: 'locationOffset',
      value: 'Capture bearing to center of area',
      content: locationOffsetValue,
    },
    // {type: 'aadharNumber', value: 'aadharNumber', content: aadhaar},
  ];

  const toggleSwitch = () => {
    if (isEnabled) {
      setIsEnabled(prevState => !prevState);
      collectedLocationData([]);
    } else {
      location();
    }
  };

  const toggleMapSwitch = () => {
    if (isMapEnabled) {
      setIsMapEnabled(prevState => !prevState);
    } else {
      mapLocation();
    }
  };

  const toggleCropCuttingEnabledSwitch = () => {
    setIsCropCuttingEnabled(prevState => !prevState);
  };

  interface LocationInterface {
    latitude: number;
    longitude: number;
  }

  const locationCoordinates = (): Promise<LocationInterface> => {
    return new Promise((resolve, reject) => {
      const geolocation = Geolocation;
      geolocation.setRNConfiguration({
        skipPermissionRequests: false,
        authorizationLevel: 'always',
        locationProvider: 'android',
      });
      geolocation.getCurrentPosition(
        position => {
          resolve({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
        },
        error => {
          <RAlert
            title="Location Error"
            message={JSON.stringify(error.message)}
            showAlert={true}
            setShowAlert={setShowValidationAlert}
            confirmationText={'OK'}
          />;
          reject(error);
        },
        {
          interval: 0,
          enableHighAccuracy: true,
          timeout: 15000,
          distanceFilter: 0,
        },
      );
    });
  };

  const mapLocation = async () => {
    showApiLoading(true);
    try {
      const locationCor = await locationCoordinates();
      navigation.navigate('CollectLocationFromMapScreen', {
        latitude: locationCor.latitude,
        longitude: locationCor.longitude,
      });
    } catch (error) {
      console.log(error);
    }
    showApiLoading(false);
  };

  const location = async () => {
    showApiLoading(true);
    try {
      const locationCor = await locationCoordinates();
      collectedLocationData([
        {
          latitude: locationCor.latitude,
          longitude: locationCor.longitude,
        },
      ]);
      setIsEnabled(prevState => !prevState);
    } catch (error) {
      console.log(error);
    }
    showApiLoading(false);
  };

  const locationOffset = () => {
    return (
      <View>
        <Text style={styles.textHeaderStyle}>
          Bearing to Center: {locationOffsetValue} Meters
        </Text>
        <Slider
          style={styles.sliderStyle}
          minimumValue={0}
          maximumValue={150}
          onValueChange={value => setLocationOffsetValue(Math.round(value))}
          minimumTrackTintColor={Colors.secondary}
          maximumTrackTintColor={Colors.primary}
        />
      </View>
    );
  };

  const selectImage = async () => {
    try {
      const response = await launchCamera({
        mediaType: 'photo',
        includeBase64: false,
        saveToPhotos: true,
      });
      if (response.didCancel) {
        console.log('User cancelled image picker');
        return;
      }
      if (response.errorMessage) {
        console.log('ImagePicker Error: ', response.errorMessage);
        return;
      }
      if (
        !response.assets ||
        response.assets.length === 0 ||
        !response.assets[0].uri
      ) {
        console.log('response assests issue');
        return;
      }
      const uri = response.assets[0].uri;
      const source = {uri: uri};
      setImage(existingData =>
        existingData !== []
          ? [...existingData, {uri: source.uri!}]
          : [{uri: source.uri!}],
      );
      setImageArray([...imageArray, uri]);
    } catch (err) {
      Alert.alert(err.message);
      console.log(err);
    }
  };

  const imageView = () => {
    return (
      <View>
        <ScrollView horizontal style={{flex: 0.5, marginBottom: 16}}>
          {image?.map((item, index) => {
            if (index < 3) {
              return (
                <Image
                  source={{uri: item.uri}}
                  style={styles.imageBox}
                  resizeMode="contain"
                  key={index}
                />
              );
            }
          })}
        </ScrollView>
        {image.length < 3 ? (
          <View style={{paddingHorizontal: 16}}>
            <RButton title="Take Photo" handleClick={selectImage} />
          </View>
        ) : null}
      </View>
    );
  };

  const locationView = () => {
    return (
      <View>
        <View style={styles.textContentStyle}>
          <Text style={styles.textHeaderStyle}>Capture Location</Text>
          <Switch
            trackColor={{false: '#767577', true: Colors.secondary}}
            thumbColor={isEnabled ? '#f5dd4b' : '#f4f3f4'}
            ios_backgroundColor="#3e3e3e"
            value={isEnabled}
            onChange={toggleSwitch}
          />
        </View>
        <View style={styles.textContentStyle}>
          <Text style={styles.textHeaderStyle}>
            Pic Location from Satilite map
          </Text>
          <Switch
            trackColor={{false: '#767577', true: Colors.secondary}}
            thumbColor={isMapEnabled ? '#f5dd4b' : '#f4f3f4'}
            ios_backgroundColor="#3e3e3e"
            value={isMapEnabled}
            onChange={toggleMapSwitch}
          />
        </View>
        <View>
          <Text style={{fontFamily: Fonts.RobotoBold}}>
            Lat: {locationData?.[0]?.latitude} Lon:{' '}
            {locationData?.[0]?.longitude}
          </Text>
        </View>
      </View>
    );
  };

  const locationClassView = () => {
    return (
      <View>
        <Text style={styles.textHeaderStyle}>Land Cover Type:</Text>
        <Picker
          selectedValue={selectedCategoriesList}
          onValueChange={itemValue => {
            if (itemValue === 'Select Land Type') {
              return;
            }
            setSelectedCategoriesList(itemValue);
          }}>
          {categoriesList.map((item, index) => {
            return <Picker.Item label={item} value={item} key={index} />;
          })}
        </Picker>
      </View>
    );
  };
  const cropInformationView = () => {
    return (
      <View>
        {croplandTypes.map((item, index) => {
          return (
            <>
              <Text style={styles.textHeaderStyle}>{item.keyName}</Text>
              <Picker
                key={index}
                selectedValue={
                  item.keyName === 'Water Source'
                    ? selectedWaterSource
                    : item.keyName === 'Crop Intensity'
                    ? selectedCropIntensity
                    : item.keyName === 'Primary Crop'
                    ? selectedPrimaryCrop
                    : item.keyName === 'Secondary Crop'
                    ? selectedSecondaryCrop
                    : selectedLiveStock
                }
                onValueChange={itemValue => {
                  if (itemValue === 'Unknown') {
                    return;
                  }
                  item.keyName === 'Water Source'
                    ? setSelectedWaterSource(itemValue)
                    : item.keyName === 'Crop Intensity'
                    ? setSelectedCropIntensity(itemValue)
                    : item.keyName === 'Primary Crop'
                    ? setSelectedPrimaryCrop(itemValue)
                    : item.keyName === 'Secondary Crop'
                    ? setSelectedSecondaryCrop(itemValue)
                    : setSelectedLiveStock(itemValue);
                }}>
                {item.values.map((value, valueindex) => {
                  return (
                    <Picker.Item label={value} value={value} key={valueindex} />
                  );
                })}
              </Picker>
            </>
          );
        })}
      </View>
    );
  };

  const cropCuttingEstimates = () => {
    return (
      <View>
        <View style={styles.textContentStyle}>
          <Text style={styles.textHeaderStyle}>
            Collect Crop Cutting Estimates
          </Text>
          <Switch
            trackColor={{false: '#767577', true: Colors.secondary}}
            thumbColor={isMapEnabled ? '#f5dd4b' : '#f4f3f4'}
            ios_backgroundColor="#3e3e3e"
            value={isCropCuttingEnabled}
            onChange={toggleCropCuttingEnabledSwitch}
          />
        </View>
        {isCropCuttingEnabled ? (
          <View>
            <Text style={styles.textHeaderStyle}>Sample Size</Text>
            <TextInput
              underlineColorAndroid={Colors.secondary}
              onChangeText={value => setSampleSize(value)}
              keyboardType={'numeric'}
            />
            <Text style={styles.textHeaderStyle}>Grain weight</Text>
            <TextInput
              underlineColorAndroid={Colors.secondary}
              onChangeText={value => setGrainweight(value)}
              keyboardType={'numeric'}
            />
            <Text style={styles.textHeaderStyle}>Bio-Mass weight</Text>
            <TextInput
              underlineColorAndroid={Colors.secondary}
              onChangeText={value => setBioMassweight(value)}
              keyboardType={'numeric'}
            />
            <Text style={styles.textHeaderStyle}>Cultivar</Text>
            <TextInput
              underlineColorAndroid={Colors.secondary}
              onChangeText={value => setCultivar(value)}
            />
            <Text style={styles.textHeaderStyle}>Sowing date</Text>
            <TextInput
              underlineColorAndroid={Colors.secondary}
              onChangeText={value => setSowingDate(value)}
            />
            <Text style={styles.textHeaderStyle}>Harvest date</Text>
            <TextInput
              underlineColorAndroid={Colors.secondary}
              onChangeText={value => setHarvestDate(value)}
            />
          </View>
        ) : null}
      </View>
    );
  };

  const qualityControlView = () => {
    return (
      <View>
        {qualityControlList.map((item, index) => {
          return (
            <>
              {item.type !== 'crop' &&
                item.type !== 'cropcutting' &&
                item.type !== 'locationOffset' &&
                item.type !== 'description' && (
                  <View key={index} style={styles.textContentStyle}>
                    <Text>{item.value}</Text>
                    {item.content.length === 0 ? (
                      <Icon
                        name="square-o"
                        size={20}
                        color={Colors.secondary}
                      />
                    ) : (
                      <Icon
                        name="check-square-o"
                        size={20}
                        color={Colors.primary}
                      />
                    )}
                  </View>
                )}
            </>
          );
        })}
        <TextInput
          style={styles.descriptionStyle}
          multiline={true}
          numberOfLines={5}
          onChangeText={value => setDescriptionValue(value)}
        />
      </View>
    );
  };

  const aadhaarNumberView = () => {
    return (
      <View>
        <FloatingLabelInput
          label="Aadhaar Card No"
          containerStyles={
            isAadhaarFocused ? styles.focusedtTextStyle : styles.textStyle
          }
          value={aadhaar}
          onChangeText={text => setAadhaar(text)}
          customLabelStyles={{
            colorFocused: 'red',
          }}
          isFocused={isAadhaarFocused}
          onFocus={() => {
            setIsAadhaarFocused(true);
          }}
          onBlur={() => {
            setIsAadhaarFocused(false);
          }}
        />
      </View>
    );
  };

  const handleSave = () => {
    if (
      qualityControlList[0].content.length !== 0 &&
      qualityControlList[1].content.length !== 0 &&
      qualityControlList[2].content.length !== 0
    ) {
      allCollectedData(prevData => [...prevData, qualityControlList]);
      navigation.pop();
    } else {
      setShowValidationAlert(true);
    }

    // (allCollectedData(prevData => [...prevData, qualityControlList]),
    //   navigation.pop())
  };

  return (
    <RKeyboardAvoidingView>
      <View style={styles.mainContainerStyle}>
        {imageView()}
        <View>
          <RSeperator title="Location" />
          {locationView()}
          <RSeperator title="Location Offset" />
          {locationOffset()}
          <RSeperator title="Location Class" />
          {locationClassView()}
          {selectedCategoriesList === 'Cropland' && (
            <RSeperator title="Crop Information" />
          )}
          {selectedCategoriesList === 'Cropland' && cropInformationView()}
          {<RSeperator title="Crop Cutting Estimates" />}
          {cropCuttingEstimates()}
          <RSeperator title="Quality Control" />
          {qualityControlView()}
          <RSeperator title="Aadhaar number" />
          {aadhaarNumberView()}
          <View style={{marginTop: 20}}>
            <RButton title="Save" handleClick={() => handleSave()} />
            <RButton title="Cancel" handleClick={() => navigation.pop()} />
            <RAlert
              title="Something's Not Right"
              message="Please collect data."
              showAlert={showValidationAlert}
              setShowAlert={setShowValidationAlert}
              confirmationText={'OK'}
            />
          </View>
        </View>
      </View>
    </RKeyboardAvoidingView>
  );
};

export default DataCollection;

const styles = StyleSheet.create({
  mainContainerStyle: {
    flex: 1,
    padding: 16,
  },
  imageBox: {
    width: 120,
    height: 150,
  },
  textHeaderStyle: {fontFamily: Fonts.RobotoBold, fontSize: 18},
  sliderStyle: {width: '100%', height: 40},
  textContentStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
  },
  focusedtTextStyle: {
    height: 40,
    borderBottomWidth: 1,
    marginBottom: 10,
    borderBottomColor: 'red',
  },
  textStyle: {
    height: 40,
    borderBottomWidth: 1,
    marginBottom: 10,
  },
  descriptionStyle: {
    borderWidth: 0.5,
    borderColor: Colors.secondary,
    borderRadius: 12,
    textAlignVertical: 'top',
  },
});
