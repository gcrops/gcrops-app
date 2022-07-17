import {Image, StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import {FloatingLabelInput} from 'react-native-floating-label-input';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '@app/app/navigation/Navigator';
import {RouteProp} from '@react-navigation/native';
import {RButton, RKeyboardAvoidingView} from '@app/app/components';

interface NavigationProps {
  navigation: NativeStackNavigationProp<RootStackParamList, 'LoginScreen'>;
  route: RouteProp<RootStackParamList, 'LoginScreen'>;
}

interface Props extends NavigationProps {}

const LoginScreen: React.FC<Props> = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isEmailFocused, setIsEmailFocused] = useState(false);
  const [isPasswordFocused, setIsPasswordFocused] = useState(false);

  const iconView = () => {
    return (
      <View style={styles.imageContainerStyle}>
        <Image
          source={require('../../resources/images/logo.png')}
          style={styles.logoStyle}
        />
      </View>
    );
  };

  const formView = () => {
    return (
      <View>
        <FloatingLabelInput
          label="Email/User id"
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
        />
      </View>
    );
  };

  const formSubmitView = () => {
    return (
      <View style={styles.formSubmitContainerStyle}>
        <RButton
          title={'Login'}
          handleClick={() => navigation.navigate('TabHome')}
        />
        <RButton
          title={'Forgot Password'}
          handleClick={() => navigation.navigate('ForgotPassword')}
        />
        <Text
          style={styles.clickTextStyle}
          onPress={() => navigation.navigate('SignupScreen')}>
          No account yet? Create one
        </Text>
      </View>
    );
  };

  return (
    <RKeyboardAvoidingView>
      <>
        <>{iconView()}</>
        <>{formView()}</>
        <>{formSubmitView()}</>
      </>
    </RKeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  imageContainerStyle: {
    flex: 0.5,
    alignSelf: 'center',
    justifyContent: 'center',
  },
  formSubmitContainerStyle: {
    flex: 0.9,
    justifyContent: 'center',
    marginBottom: 20,
  },
  logoStyle: {
    width: 70,
    height: 70,
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
  clickTextStyle: {
    textAlign: 'center',
  },
});

export {LoginScreen};
