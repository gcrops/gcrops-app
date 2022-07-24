import React, {createContext, useContext, useEffect, useState} from 'react';
import NetInfo from '@react-native-community/netinfo';
import {ActivityIndicator, StyleSheet, View} from 'react-native';

const UIContext = createContext({
  showApiLoading: (_value: boolean) => {
    return;
  },
  netConnection: false,
});

type UIProviderProps = {
  children: React.ReactNode;
};

export const UIProvider = (props: UIProviderProps) => {
  const [apiLoading, setApiLoading] = useState<boolean>(false);
  const [isConnected, setIsConnected] = useState<boolean>(true);

  useEffect(() => {
    const networkStatus = NetInfo.addEventListener(state => {
      setIsConnected(state.isConnected || false);
    });
    return () => {
      networkStatus();
    };
  }, []);

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
