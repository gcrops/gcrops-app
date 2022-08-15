import {Image, StyleSheet, View, ScrollView, Text, Switch} from 'react-native';
import React, {useState} from 'react';
import {launchCamera} from 'react-native-image-picker';
import {
  RAlert,
  RButton,
  RKeyboardAvoidingView,
  RSeperator,
} from '@app/app/components';
import {useUIElements} from '@app/app/hooks/UIProvider';
import {base64ToURL} from '@app/app/networking';
import Geolocation, {GeoPosition} from 'react-native-geolocation-service';
import {Colors, Fonts} from '@app/app/theme';
import {Picker} from '@react-native-picker/picker';
import Icon from 'react-native-vector-icons/FontAwesome';
import {FloatingLabelInput} from 'react-native-floating-label-input';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {HomeStackParamList} from '@app/app/navigation/Navigator';
import {RouteProp} from '@react-navigation/native';

interface NavigationProps {
  navigation: NativeStackNavigationProp<HomeStackParamList, 'DataCollection'>;
  route: RouteProp<HomeStackParamList, 'DataCollection'>;
}

interface Props extends NavigationProps {}

const DataCollection: React.FC<Props> = ({navigation}) => {
  const {netConnection, showApiLoading, allCollectedData} = useUIElements();
  const [image, setImage] = useState<
    {
      uri: string;
    }[]
  >([]);
  const [imageArray, setImageArray] = useState<string[]>([]);
  const [isEnabled, setIsEnabled] = useState(false);
  const [locationData, setLocationData] = useState<GeoPosition[]>([]);
  const [showValidationAlert, setShowValidationAlert] = useState(false);

  const [selectedCategoriesList, setSelectedCategoriesList] = useState<
    String[]
  >([]);
  const categoriesList = [
    'Select Land Type',
    'Grassland',
    'Cropland',
    'Normal',
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
  ];

  const toggleSwitch = () => {
    if (isEnabled) {
      setIsEnabled(prevState => !prevState);
      setLocationData([]);
    } else {
      location();
      setIsEnabled(prevState => !prevState);
    }
  };

  const base64ToURLApiCall = async (data: string) => {
    if (netConnection) {
      try {
        showApiLoading(true);
        let response = await base64ToURL(data);
        setImageArray([...imageArray, response.data.link]);
        showApiLoading(false);
      } catch (error) {
        console.log('error', error);
        showApiLoading(false);
      }
    }
  };

  const location = async () => {
    try {
      const result = await Geolocation.getCurrentPosition(
        position => {
          console.log('position', position);
          setLocationData([position]);
        },
        error => {
          console.log('error:', error);
        },
        {enableHighAccuracy: true, timeout: 15000},
      );
      return result;
    } catch (ex) {
      console.log('ex', ex);
    }
  };

  const selectImage = () => {
    launchCamera(
      {
        mediaType: 'photo',
        includeBase64: true,
      },
      response => {
        // Use launchImageLibrary to open image gallery
        if (response.didCancel) {
          console.log('User cancelled image picker');
        } else if (response.errorMessage) {
          console.log('ImagePicker Error: ', response.errorMessage);
        } else {
          const source = {uri: response.assets?.[0].uri};
          setImage(existingData =>
            existingData !== []
              ? [...existingData, {uri: source.uri!}]
              : [{uri: source.uri!}],
          );
          base64ToURLApiCall(response.assets?.[0].base64!);
        }
      },
    );
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
        <View>
          <Text style={{fontFamily: Fonts.RobotoBold}}>
            Lat: {locationData?.[0]?.coords.latitude} Lon:{' '}
            {locationData?.[0]?.coords.longitude}
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

  const qualityControlView = () => {
    return (
      <View>
        {qualityControlList.map((item, index) => {
          return (
            <View key={index} style={styles.textContentStyle}>
              <Text>{item.value}</Text>
              {item.content.length === 0 ? (
                <Icon name="square-o" size={20} color={Colors.secondary} />
              ) : (
                <Icon name="check-square-o" size={20} color={Colors.primary} />
              )}
            </View>
          );
        })}
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

  const handleSave = async () => {
    try {
      {
        if (qualityControlList?.[0].content.length !== 0) {
          allCollectedData(prevData => [...prevData, qualityControlList]);
          navigation.pop();
        } else {
          setShowValidationAlert(true);
        }
      }
    } catch (error) {
      console.log('error', error);
    }
  };

  return (
    <RKeyboardAvoidingView>
      <View style={styles.mainContainerStyle}>
        {imageView()}
        <View>
          <RSeperator title="Location" />
          {locationView()}
          <RSeperator title="Location Class" />
          {locationClassView()}
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
});
