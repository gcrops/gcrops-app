import {Alert, StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import {FloatingLabelInput} from 'react-native-floating-label-input';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '@app/app/navigation/Navigator';
import {RouteProp} from '@react-navigation/native';
import {RButton, RKeyboardAvoidingView, RLogo} from '@app/app/components';
import {useUIElements} from '@app/app/hooks/UIProvider';
import {validateEmail} from '@app/app/resources/validations';
import {loginUser} from '@app/app/networking';
import {saveAuthorization} from '@app/app/networking/Client';
import {Colors, Fonts} from '@app/app/theme';

interface NavigationProps {
  navigation: NativeStackNavigationProp<RootStackParamList, 'LoginScreen'>;
  route: RouteProp<RootStackParamList, 'LoginScreen'>;
}

interface Props extends NavigationProps {}

const LoginScreen: React.FC<Props> = ({navigation}) => {
  const {netConnection, showApiLoading, authDispatch, authState} =
    useUIElements();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isEmailFocused, setIsEmailFocused] = useState(false);
  const [isPasswordFocused, setIsPasswordFocused] = useState(false);

  const loginPressed = async () => {
    if (netConnection) {
      try {
        if (!validateEmail(email)) {
          Alert.alert(
            "Something's Not Right",
            'Please enter a valid email address.',
          );
        } else {
          showApiLoading(true);
          const response = await loginUser(email, password);
          saveAuthorization(response.data.access_token);
          authDispatch.signIn(response.data.access_token);
          showApiLoading(false);
        }
      } catch (error: any) {
        console.log({error});
        Alert.alert(error.response.data.error);
        showApiLoading(false);
      }
    }
  };

  const formView = () => {
    return (
      <View>
        <View>
          <Text style={styles.loginHeaderStyle}>{'Log-in'}</Text>
        </View>
        <FloatingLabelInput
          label="Email"
          containerStyles={
            isEmailFocused ? styles.focusedtTextStyle : styles.textStyle
          }
          value={email}
          onChangeText={text => setEmail(text)}
          textContentType={'emailAddress'}
          customLabelStyles={{
            colorFocused: 'red',
          }}
          isFocused={isEmailFocused}
          onFocus={() => {
            setIsEmailFocused(true);
          }}
          onBlur={() => {
            setIsEmailFocused(false);
          }}
        />
        <FloatingLabelInput
          label="Password"
          containerStyles={
            isPasswordFocused ? styles.focusedtTextStyle : styles.textStyle
          }
          value={password}
          isFocused={isPasswordFocused}
          onFocus={() => {
            setIsPasswordFocused(true);
          }}
          onBlur={() => {
            setIsPasswordFocused(false);
          }}
          onChangeText={text => setPassword(text)}
          textContentType={'password'}
          isPassword={true}
          customLabelStyles={{
            colorFocused: 'red',
          }}
          showPasswordImageStyles={{tintColor: Colors.secondary}}
        />
        <TouchableOpacity style={styles.textButtonContainerStyle}>
          <Text
            style={styles.textButtonStyle}
            onPress={() => navigation.navigate('ForgotPassword')}>
            {'Forgot Password ?'}
          </Text>
        </TouchableOpacity>
      </View>
    );
  };

  const formSubmitView = () => {
    return (
      <View style={styles.formSubmitContainerStyle}>
        <RButton title={'Login'} handleClick={() => loginPressed()} />
        <Text
          style={styles.textButtonStyle}
          onPress={() => navigation.navigate('SignupScreen')}>
          No account yet? Create one
        </Text>
      </View>
    );
  };

  return (
    <RKeyboardAvoidingView>
      {authState.userToken}
      <>
        <RLogo />
        <View style={styles.cardOverlay}>
          <>{formView()}</>
          <>{formSubmitView()}</>
        </View>
      </>
    </RKeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  formSubmitContainerStyle: {
    flex: 0.6,
    justifyContent: 'center',
  },
  textStyle: {
    height: 40,
    borderBottomWidth: 1,
    marginBottom: 10,
  },
  focusedtTextStyle: {
    height: 40,
    borderBottomWidth: 1,
    marginBottom: 10,
    borderBottomColor: 'red',
  },
  cardOverlay: {
    flex: 0.5,
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingHorizontal: 32,
    paddingTop: 32,
  },
  loginHeaderStyle: {
    fontFamily: Fonts.RobotoBold,
    fontSize: 32,
    marginBottom: 16,
    color: Colors.secondary,
  },
  textButtonContainerStyle: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  textButtonStyle: {
    color: Colors.secondary,
    fontFamily: Fonts.RobotoBold,
    alignSelf: 'center',
  },
});

export {LoginScreen};
