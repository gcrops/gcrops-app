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

interface NavigationProps {
  navigation: NativeStackNavigationProp<HomeStackParamList, 'HomeScreen'>;
  route: RouteProp<HomeStackParamList, 'HomeScreen'>;
}

interface Props extends NavigationProps {}

const HomeScreen: React.FC<Props> = ({navigation}) => {
  const {netConnection, showApiLoading, collectedData, allCollectedData} =
    useUIElements();
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
    if (netConnection) {
      try {
        showApiLoading(true);
        let response = await metaData();
        setMetaObj(response.data);
        showApiLoading(false);
      } catch (error) {
        console.log('error', error);
        showApiLoading(false);
      }
    }
  };

  const collectApiCall = () => {
    if (netConnection) {
      if (collectedData.length !== 0) {
        try {
          collectedData.map(async item => {
            showApiLoading(true);
            await collect({
              images: item[0].content,
              landCoverType: String(item[2].content),
              location: {
                latitude: String(item[1].content[0].coords.latitude),
                longitude: String(item[1].content[0].coords.longitude),
              },
            });
            allCollectedData([]);
            setShowSyncAlert(true);
            showApiLoading(false);
          });
        } catch (error) {
          console.log('error collect', error);
          showApiLoading(false);
        }
      } else {
        setShowAllDataSynced(true);
      }
    } else {
      setShowNoInternetAlert(true);
    }
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
              navigation.navigate('DataCollection');
            }}
          />
          <RButton
            title="Sync Data"
            handleClick={() => {
              collectApiCall();
            }}
          />
        </View>

        <View>
          <View style={{marginTop: 10}}>
            <RAccordian
              data={String(metaObj?.waterSource)}
              title={'Water Source'}
            />
            <RAccordian data={String(metaObj?.cropType)} title={'Crop Type'} />
            <RAccordian
              data={String(metaObj?.landCover)}
              title={'Land Cover'}
            />
          </View>

          <View style={{marginTop: 30}}>
            <RAccordian
              data={String(metaObj?.countSyncedData)}
              title={'Synced Status'}
            />
            <RAccordian
              data={String(collectedData.length)}
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
