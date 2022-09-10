import {
  AppState,
  AppStateStatus,
  Platform,
  StyleSheet,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {
  RAccordian,
  RAlert,
  RButton,
  RKeyboardAvoidingView,
} from '@app/app/components';
import {RootObject as Meta} from '@app/app/networking/types/Meta';
import {Colors} from '@app/app/theme';
import {useUIElements} from '@app/app/hooks/UIProvider';
import {collect, metaData} from '@app/app/networking';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {HomeStackParamList} from '@app/app/navigation/Navigator';
import {RouteProp} from '@react-navigation/native';
import {saveCollectedData} from '@app/app/networking/Client';
import RNFS from 'react-native-fs';

interface NavigationProps {
  navigation: NativeStackNavigationProp<HomeStackParamList, 'HomeScreen'>;
  route: RouteProp<HomeStackParamList, 'HomeScreen'>;
}

interface Props extends NavigationProps {}

const HomeScreen: React.FC<Props> = ({navigation}) => {
  const {
    netConnection,
    showApiLoading,
    collectedData,
    allCollectedData,
    collectedLocationData,
  } = useUIElements();
  const [showValidationAlert, setShowValidationAlert] = useState(false);
  const [showSyncAlert, setShowSyncAlert] = useState(false);
  const [showAllDataSynced, setShowAllDataSynced] = useState(false);
  const [showNoInternetAlert, setShowNoInternetAlert] = useState(false);

  const [metaObj, setMetaObj] = useState<Meta>();

  const handleAppStateChange = async (appState: AppStateStatus) => {
    switch (appState) {
      case Platform.select({ios: 'inactive', android: 'background'}):
        saveCollectedData(collectedData);
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    const subscription = AppState.addEventListener(
      'change',
      handleAppStateChange,
    );
    return () => {
      subscription.remove();
    };
  }, [collectedData]);

  const metaApiCall = async () => {
    if (!netConnection) {
      return;
    }
    showApiLoading(true);
    try {
      let response = await metaData();
      setMetaObj(response.data);
    } catch (error) {
      console.log('error', error);
    }
    showApiLoading(false);
  };

  const stringToBase64 = async item => {
    const returnValue: string[] = [];
    for (let j = 0; j < item[0].content.length; j++) {
      const destiny = item[0].content[j];
      const base64Value = await RNFS.readFile(destiny, 'base64');
      returnValue.push(base64Value);
    }
    return returnValue;
  };
  const uploadSession = async (session: any) => {
    //RoadMap
    //1. First collect the images in the disk and convert them into js array objects
    //2. Second upload the images with other meta objects
    const images = await stringToBase64(session);
    await collect({
      images: images,
      landCoverType: String(session[2].content),
      location: {
        latitude: String(session[1].content[0].latitude),
        longitude: String(session[1].content[0].longitude),
      },
    });
  };
  const collectApiCall = async () => {
    if (!netConnection) {
      setShowNoInternetAlert(true);
      return;
    }
    if (collectedData.length === 0) {
      setShowAllDataSynced(true);
      return;
    }
    showApiLoading(true);
    try {
      for (const session of collectedData) {
        await uploadSession(session);
      }
      setShowSyncAlert(true);
      allCollectedData([]);
    } catch (error) {
      console.log('error collect', error);
    }
    showApiLoading(false);
  };

  useEffect(() => {
    metaApiCall();
  }, []);

  return (
    <RKeyboardAvoidingView>
      <View style={styles.cardOverlay}>
        <RAlert
          title="Something's Not Right"
          message="All the data is Synced."
          showAlert={showValidationAlert}
          setShowAlert={setShowValidationAlert}
          confirmationText={'OK'}
        />
        <RAlert
          title="Successful"
          message="Data is successfully synced to data base."
          showAlert={showSyncAlert}
          setShowAlert={setShowSyncAlert}
          confirmationText={'OK'}
        />
        <RAlert
          title="Something's Not Right"
          message="Please connect to internet before trying to sync."
          showAlert={showNoInternetAlert}
          setShowAlert={setShowNoInternetAlert}
          confirmationText={'OK'}
        />
        <RAlert
          title="Something's Not Right"
          message="No data to sync."
          showAlert={showAllDataSynced}
          setShowAlert={setShowAllDataSynced}
          confirmationText={'OK'}
        />
        <View>
          <RButton
            title="Collect Data"
            handleClick={() => {
              navigation.navigate('DataCollectionNavigator');
              collectedLocationData([]);
            }}
          />
          <RButton
            title="Sync Data"
            handleClick={() => {
              collectApiCall();
              // stringToBase64();
            }}
          />
        </View>

        <View>
          <View style={{marginTop: 10}}>
            {metaObj?.waterSource && (
              <RAccordian data={metaObj?.waterSource} title={'Water Source'} />
            )}
            {metaObj?.cropType && (
              <RAccordian data={metaObj?.cropType} title={'Crop Type'} />
            )}

            {metaObj?.landCover && (
              <RAccordian data={metaObj?.landCover} title={'Land Cover'} />
            )}
          </View>

          <View style={{marginTop: 30}}>
            {metaObj?.countSyncedData && (
              <RAccordian
                data={metaObj?.countSyncedData}
                title={'Synced Status'}
              />
            )}

            <RAccordian
              data={{
                unSyncedData: collectedData.length,
              }}
              title={'Not Synced Status'}
            />
          </View>
        </View>
      </View>
    </RKeyboardAvoidingView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  cardOverlay: {
    flex: 1,
    justifyContent: 'space-evenly',
    backgroundColor: Colors.background,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingHorizontal: 32,
    paddingTop: 32,
  },
});
