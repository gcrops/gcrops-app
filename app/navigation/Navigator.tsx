import React from 'react';
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
  DataCollection,
  HelpScreen,
  HomeScreen,
  MapPlottingScreen,
  ProfileScreen,
  CollectLocationFromMapScreen,
} from '../screens/PostAuthentication';
import {Colors} from '../theme';
import {LandingScreen} from '../screens/LandingScreen';
import {useUIElements} from '../hooks/UIProvider';

export type RootStackParamList = {
  LoginScreen: undefined;
  ForgotPassword: undefined;
  SignupScreen: undefined;
  TabHome: undefined;
};

export type HomeStackParamList = {
  HomeScreen: undefined;
  DataCollection: undefined;
  DataCollectionNavigator: undefined;
  HelpScreen: undefined;
  MapPlottingScreen: undefined;
  ProfileScreen: undefined;
  CollectLocationFromMapScreen: {latitude: number; longitude: number};
};

const Tab = createBottomTabNavigator();
const AuthStack = createNativeStackNavigator();
const HomeStack = createNativeStackNavigator();
const DataCollectionStack = createNativeStackNavigator();

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
      }}>
      <Tab.Screen
        name="Home"
        component={HomeStackNavigator}
        options={{
          tabBarLabel: '',
          headerShown: false,
          tabBarIcon: ({color, size}) => (
            <Icon name="home" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Map Plotting"
        component={MapPlottingScreen}
        listeners={({navigation}) => ({
          blur: () => navigation.setParams({screen: undefined}),
        })}
        options={{
          headerTitle: 'Past Pointers',
          tabBarLabel: '',
          unmountOnBlur: true,
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
          headerTitle: 'Help',
          tabBarLabel: '',
          tabBarIcon: ({color, size}) => (
            <Icon name="info" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const DataCollectionNavigator = () => {
  return (
    <DataCollectionStack.Navigator
      initialRouteName="DataCollection"
      screenOptions={{
        animation: 'slide_from_right',
        headerShown: false,
      }}>
      <DataCollectionStack.Screen
        name="DataCollection"
        component={DataCollection}
      />
    </DataCollectionStack.Navigator>
  );
};

const HomeStackNavigator = () => {
  return (
    <HomeStack.Navigator
      initialRouteName="HomeScreen"
      screenOptions={{animation: 'slide_from_right'}}>
      <HomeStack.Screen name="ICRISAT - iCrops" component={HomeScreen} />
      <HomeStack.Screen
        name="DataCollectionNavigator"
        component={DataCollectionNavigator}
      />
      <DataCollectionStack.Screen
        options={{headerShown: false}}
        name="CollectLocationFromMapScreen"
        component={CollectLocationFromMapScreen}
      />
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
