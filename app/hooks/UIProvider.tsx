import React, {createContext, useContext, useEffect, useState} from 'react';
import NetInfo from '@react-native-community/netinfo';
import {ActivityIndicator, StyleSheet, View} from 'react-native';
import {getAuthorization, setAuthorization} from '../networking';
import {RPermissions} from '../components';
import Geolocation from 'react-native-geolocation-service';
import {LandingScreen} from '../screens/LandingScreen';
import {getCollectedData} from '../networking/Client';
import {LatLng} from 'react-native-maps';

const UIContext = createContext({
  showApiLoading: (_value: boolean) => {
    return;
  },
  showLandingScreen: (_value: boolean) => {
    return;
  },
  locationData: {} as LatLng[] | undefined,
  collectedLocationData: (_value: any) => {
    return;
  },
  netConnection: false,
  authState: {} as {
    isLoading: boolean;
    isSignout: boolean;
    userToken: string | undefined;
  },
  authDispatch: {} as {
    signIn: (data: any) => Promise<void>;
    signOut: () => void;
  },
  collectedData: [] as (
    | {
        type: string;
        value: string;
        content: Geolocation.GeoPosition[];
      }
    | {
        type: string;
        value: string;
        content: string[];
      }
  )[][],
  allCollectedData: (_value: any) => {
    return;
  },
});

type UIProviderProps = {
  children: React.ReactNode;
};

export const UIProvider = (props: UIProviderProps) => {
  const [apiLoading, setApiLoading] = useState<boolean>(false);
  const [loadingLandingScreen, setLoadingLandingScreen] =
    useState<boolean>(true);
  const [isConnected, setIsConnected] = useState<boolean>(true);
  const [collectedDataObjs, setCollectedDataObjs] = useState([]);
  const [collectedLocationObjs, setCollectedLocationObjs] = useState<LatLng[]>(
    [],
  );

  const getPastSyncData = async () => {
    try {
      const result = await getCollectedData();
      setCollectedDataObjs(result.data);
    } catch (error) {
      setCollectedDataObjs([]);
      console.log('error', error);
    }
  };

  useEffect(() => {
    getPastSyncData();
  }, []);

  const [state, dispatch] = React.useReducer(
    (prevState: any, action: {type: any; token: any}) => {
      switch (action.type) {
        case 'RESTORE_TOKEN':
          return {
            ...prevState,
            userToken: action.token,
            isLoading: false,
          };
        case 'SIGN_IN':
          return {
            ...prevState,
            isSignout: false,
            userToken: action.token,
          };
        case 'SIGN_OUT':
          return {
            ...prevState,
            isSignout: true,
            userToken: null,
          };
      }
    },
    {
      isLoading: true,
      isSignout: false,
      userToken: null,
    },
  );

  const renderLoader = () => {
    return <LandingScreen />;
  };

  const authorization = async () => {
    const response = await getAuthorization();
    if (response?.accessToken) {
      setAuthorization(response.accessToken);
    }
  };

  useEffect(() => {
    const networkStatus = NetInfo.addEventListener(netState => {
      setIsConnected(netState.isConnected || false);
    });
    RPermissions();
    authorization();
    return () => {
      networkStatus();
    };
  }, []);

  useEffect(() => {
    checkAccessToken();
  }, []);

  const authContext = React.useMemo(
    () => ({
      signIn: async (data: string) => {
        dispatch({type: 'SIGN_IN', token: data});
      },
      signOut: () => dispatch({type: 'SIGN_OUT', token: ''}),
      // signUp: async data => {

      //   dispatch({type: 'SIGN_IN', token: 'dummy-auth-token'});
      // },
    }),
    [],
  );

  const checkAccessToken = async () => {
    let response;
    try {
      response = await getAuthorization();
    } catch (error) {
      console.log(error);
    }
    dispatch({type: 'RESTORE_TOKEN', token: response?.accessToken});
  };

  const renderApiLoader = () => {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" style={{opacity: 1}} color="#00808F" />
      </View>
    );
  };

  return (
    <UIContext.Provider
      value={{
        showApiLoading: setApiLoading,
        showLandingScreen: setLoadingLandingScreen,
        netConnection: isConnected,
        authState: state,
        authDispatch: authContext,
        allCollectedData: setCollectedDataObjs,
        collectedData: collectedDataObjs,
        collectedLocationData: setCollectedLocationObjs,
        locationData: collectedLocationObjs,
      }}>
      {apiLoading ? renderApiLoader() : null}
      {loadingLandingScreen ? renderLoader() : null}
      {props.children}
    </UIContext.Provider>
  );
};

export const useUIElements = () => useContext(UIContext);

const styles = StyleSheet.create({
  loaderContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 5000,
    elevation: 5000,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
