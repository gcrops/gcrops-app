import React, {useEffect, useState} from 'react';
import {DefaultTheme, NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Icon from 'react-native-vector-icons/FontAwesome';
import {
  ForgotScreen,
  LoginScreen,
  SignupScreen,
} from '../screens/Authentication';
import {
  HelpScreen,
  HomeScreen,
  MapPlottingScreen,
  ProfileScreen,
} from '../screens/PostAuthentication';
import {Colors} from '../theme';
import {getAuthorization} from '../networking/Client';
import {LandingScreen} from '../screens/LandingScreen';
import {useUIElements} from '../hooks/UIProvider';

export type RootStackParamList = {
  LoginScreen: undefined;
  ForgotPassword: undefined;
  SignupScreen: undefined;
  TabHome: undefined;
};

const Tab = createBottomTabNavigator();
const AuthStack = createNativeStackNavigator();
const HomeStack = createNativeStackNavigator();

const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: Colors.secondary,
    background: Colors.background,
    card: Colors.primary,
    border: Colors.secondary,
    text: Colors.text,
  },
};

const TabNavigator = () => {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        tabBarIconStyle: {marginTop: 6},
        headerShown: false,
      }}>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          headerTitle: 'Home',
          tabBarLabel: '',
          tabBarIcon: ({color, size}) => (
            <Icon name="home" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Map Plotting"
        component={MapPlottingScreen}
        options={{
          headerTitle: 'map-marker',
          tabBarLabel: '',
          tabBarIcon: ({color, size}) => (
            <Icon name="map-marker" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          headerTitle: 'My Profile',
          tabBarLabel: '',
          tabBarIcon: ({color, size}) => (
            <Icon name="user" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Help"
        component={HelpScreen}
        options={{
          headerTitle: 'My Profile',
          tabBarLabel: '',
          tabBarIcon: ({color, size}) => (
            <Icon name="user" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const HomeStackNavigator = () => {
  return (
    <HomeStack.Navigator
      initialRouteName="HomeScreen"
      screenOptions={{headerShown: false}}>
      <HomeStack.Screen name="HomeScreen" component={HomeScreen} />
    </HomeStack.Navigator>
  );
};
const AuthStackNavigator = () => {
  return (
    <AuthStack.Navigator initialRouteName="Login">
      <AuthStack.Screen
        name="LoginScreen"
        component={LoginScreen}
        options={{headerShown: false}}
      />
      <AuthStack.Screen
        name="SignupScreen"
        component={SignupScreen}
        options={{title: 'Create account'}}
      />
      <AuthStack.Screen
        name="ForgotPassword"
        component={ForgotScreen}
        options={{title: 'Forgot password'}}
      />
    </AuthStack.Navigator>
  );
};
const LandingScreenNavigator = () => {
  return (
    <AuthStack.Navigator initialRouteName="LandingScreen">
      <AuthStack.Screen name="LandingScreen" component={LandingScreen} />
    </AuthStack.Navigator>
  );
};

const Navigator: React.FC = () => {
  const {authState} = useUIElements();

  return (
    <NavigationContainer theme={MyTheme}>
      {authState.userToken ? <TabNavigator /> : <AuthStackNavigator />}
    </NavigationContainer>
  );
};

export default Navigator;
