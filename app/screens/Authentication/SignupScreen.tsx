import {StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import {FloatingLabelInput} from 'react-native-floating-label-input';
import {RButton, RKeyboardAvoidingView} from '@app/app/components';
import {RootStackParamList} from '@app/app/navigation/Navigator';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RouteProp} from '@react-navigation/native';

interface NavigationProps {
  navigation: NativeStackNavigationProp<RootStackParamList, 'SignupScreen'>;
  route: RouteProp<RootStackParamList, 'SignupScreen'>;
}

interface Props extends NavigationProps {}

const SignupScreen: React.FC<Props> = ({navigation}) => {
  const [isEmailFocused, setIsEmailFocused] = useState(false);
  const [isPasswordFocused, setIsPasswordFocused] = useState(false);
  const [isDesignationFocused, setIsDesignationFocused] = useState(false);
  const [isInstituteFocused, setIsInstituteFocused] = useState(false);
  const [isProvinceFocused, setIsProvinceFocused] = useState(false);
  const [isCountryFocused, setIsCountryFocused] = useState(false);
  const [email, setEmail] = useState('');
  const [designation, setDesignation] = useState('');
  const [password, setPassword] = useState('');
  const [institute, setInstitute] = useState('');
  const [province, setProvince] = useState('');
  const [country, setCountry] = useState('');

  const formView = () => {
    return (
      <View>
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
        />
        <FloatingLabelInput
          label="Designation"
          containerStyles={
            isDesignationFocused ? styles.focusedtTextStyle : styles.textStyle
          }
          value={designation}
          isFocused={isDesignationFocused}
          onFocus={() => {
            setIsDesignationFocused(true);
          }}
          onBlur={() => {
            setIsDesignationFocused(false);
          }}
          onChangeText={text => setDesignation(text)}
          customLabelStyles={{
            colorFocused: 'red',
          }}
        />
        <FloatingLabelInput
          label="Institute"
          containerStyles={
            isInstituteFocused ? styles.focusedtTextStyle : styles.textStyle
          }
          value={institute}
          isFocused={isInstituteFocused}
          onFocus={() => {
            setIsInstituteFocused(true);
          }}
          onBlur={() => {
            setIsInstituteFocused(false);
          }}
          onChangeText={text => setInstitute(text)}
          customLabelStyles={{
            colorFocused: 'red',
          }}
        />
        <FloatingLabelInput
          label="Province"
          containerStyles={
            isProvinceFocused ? styles.focusedtTextStyle : styles.textStyle
          }
          value={province}
          isFocused={isProvinceFocused}
          onFocus={() => {
            setIsProvinceFocused(true);
          }}
          onBlur={() => {
            setIsProvinceFocused(false);
          }}
          onChangeText={text => setProvince(text)}
          customLabelStyles={{
            colorFocused: 'red',
          }}
        />
        <FloatingLabelInput
          label="Country"
          containerStyles={
            isCountryFocused ? styles.focusedtTextStyle : styles.textStyle
          }
          value={country}
          isFocused={isCountryFocused}
          onFocus={() => {
            setIsCountryFocused(true);
          }}
          onBlur={() => {
            setIsCountryFocused(false);
          }}
          onChangeText={text => setCountry(text)}
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
          title={'Create Account'}
          handleClick={() => navigation.navigate('TabHome')}
        />
        <Text style={styles.clickTextStyle} onPress={() => navigation.pop()}>
          ALready a member? Login
        </Text>
      </View>
    );
  };
  return (
    <RKeyboardAvoidingView>
      <>{formView()}</>
      <>{formSubmitView()}</>
    </RKeyboardAvoidingView>
  );
};

export {SignupScreen};

const styles = StyleSheet.create({
  formSubmitContainerStyle: {
    justifyContent: 'center',
    marginVertical: 20,
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
