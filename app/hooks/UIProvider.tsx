import React, {createContext, useContext, useEffect, useState} from 'react';
import NetInfo from '@react-native-community/netinfo';
import {ActivityIndicator, StyleSheet, View} from 'react-native';
import {getAuthorization} from '../networking/Client';

const UIContext = createContext({
  showApiLoading: (_value: boolean) => {
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
});

type UIProviderProps = {
  children: React.ReactNode;
};

export const UIProvider = (props: UIProviderProps) => {
  const [apiLoading, setApiLoading] = useState<boolean>(false);
  const [isConnected, setIsConnected] = useState<boolean>(true);
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

  useEffect(() => {
    const networkStatus = NetInfo.addEventListener(netState => {
      setIsConnected(netState.isConnected || false);
    });

    return () => {
      networkStatus();
    };
  }, []);

  useEffect(() => {
    checkAccessToken();
  }, []);

  const authContext = React.useMemo(
    () => ({
      signIn: async data => {
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
        netConnection: isConnected,
        authState: state,
        authDispatch: authContext,
      }}>
      {apiLoading ? renderApiLoader() : null}
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
