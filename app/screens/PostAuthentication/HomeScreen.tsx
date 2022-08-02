import {StyleSheet, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {RAccordian, RButton, RKeyboardAvoidingView} from '@app/app/components';
import {RootObject as Meta} from '@app/app/networking/types/Meta';
import {Colors} from '@app/app/theme';
import {useUIElements} from '@app/app/hooks/UIProvider';
import {metaData} from '@app/app/networking';

const HomeScreen = () => {
  const {netConnection, showApiLoading} = useUIElements();
  const [metaObj, setMetaObj] = useState<Meta>();

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

  useEffect(() => {
    metaApiCall();
  }, []);

  return (
    <RKeyboardAvoidingView>
      <View style={styles.cardOverlay}>
        <View>
          <RButton title="Collect Data" handleClick={() => {}} />
          <RButton title="Sync Data" handleClick={() => {}} />
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
              title={'Sync Status'}
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
