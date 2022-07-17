import React from 'react';
import {DefaultTheme, NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
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
    primary: '#08607E',
    background: '#FAFAFA',
    card: '#4AC247',
    border: '#08607E',
    text: '#ffffff',
  },
};

const TabNavigator = () => {
  return (
    <Tab.Navigator
      initialRouteName="HomeStack"
      screenOptions={{
        tabBarIconStyle: {marginTop: 6},
        headerShown: false,
      }}>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Map Plotting" component={MapPlottingScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
      <Tab.Screen name="Help" component={HelpScreen} />
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
      <AuthStack.Screen name="SignupScreen" component={SignupScreen} />
      <AuthStack.Screen name="ForgotPassword" component={ForgotScreen} />
    </AuthStack.Navigator>
  );
};

const Navigator: React.FC = () => {
  return (
    <NavigationContainer theme={MyTheme}>
      <AuthStackNavigator />
    </NavigationContainer>
  );
};

export default Navigator;
