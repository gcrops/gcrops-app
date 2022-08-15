import {Image, StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import {FloatingLabelInput} from 'react-native-floating-label-input';
import {RAlert, RButton, RKeyboardAvoidingView} from '@app/app/components';
import {RootStackParamList} from '@app/app/navigation/Navigator';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RouteProp} from '@react-navigation/native';
import {Colors, Fonts} from '@app/app/theme';
import {useUIElements} from '@app/app/hooks/UIProvider';
import {validateEmail} from '@app/app/resources/validations';
import {createUser} from '@app/app/networking';

interface NavigationProps {
  navigation: NativeStackNavigationProp<RootStackParamList, 'SignupScreen'>;
  route: RouteProp<RootStackParamList, 'SignupScreen'>;
}

interface Props extends NavigationProps {}

const SignupScreen: React.FC<Props> = ({navigation}) => {
  const {netConnection, showApiLoading} = useUIElements();
  const [isEmailFocused, setIsEmailFocused] = useState(false);
  const [isDesignationFocused, setIsDesignationFocused] = useState(false);
  const [isInstituteFocused, setIsInstituteFocused] = useState(false);
  const [isProvinceFocused, setIsProvinceFocused] = useState(false);
  const [isCountryFocused, setIsCountryFocused] = useState(false);
  const [email, setEmail] = useState('');
  const [designation, setDesignation] = useState('');
  const [institute, setInstitute] = useState('');
  const [province, setProvince] = useState('');
  const [country, setCountry] = useState('');
  const [showValidationAlert, setShowValidationAlert] = useState(false);
  const [showErrorAlert, setShowErrorAlert] = useState(false);
  const [message, setMessage] = useState({title: '', message: ''});

  const signupPressed = async () => {
    if (netConnection) {
      try {
        if (!validateEmail(email)) {
          setShowValidationAlert(true);
        } else {
          showApiLoading(true);
          const response = await createUser(
            email,
            designation,
            institute,
            province,
            country,
          );
          setMessage({title: '', message: response.data.message});
          setShowErrorAlert(true);
          showApiLoading(false);
        }
      } catch (error: any) {
        showApiLoading(false);
        setMessage({
          title: "Something's Not Right",
          message: error.response.data.error,
        });
        setShowErrorAlert(true);
      }
    }
  };

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
      <View style={{marginBottom: 30}}>
        <View>
          <Text style={styles.loginHeaderStyle}>{'Sign-up'}</Text>
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
      <View style={styles.cardOverlay}>
        {formView()}
        <RButton title={'Create Account'} handleClick={() => signupPressed()} />
        <Text style={styles.clickTextStyle} onPress={() => navigation.pop()}>
          Already a member? Login
        </Text>
      </View>
    );
  };
  return (
    <RKeyboardAvoidingView>
      <>{iconView()}</>
      <>{formSubmitView()}</>
      <RAlert
        title="Something's Not Right"
        message="Please enter a valid email address."
        showAlert={showValidationAlert}
        setShowAlert={setShowValidationAlert}
        confirmationText={'OK'}
      />
      <RAlert
        title={message.title}
        message={message.message}
        showAlert={showErrorAlert}
        setShowAlert={setShowErrorAlert}
        confirmationText={'OK'}
        onConfirmPressed={() => navigation.pop()}
      />
    </RKeyboardAvoidingView>
  );
};

export {SignupScreen};

const styles = StyleSheet.create({
  formSubmitContainerStyle: {
    justifyContent: 'center',
    marginVertical: 20,
  },
  imageContainerStyle: {
    flex: 0.6,
    alignSelf: 'center',
    justifyContent: 'center',
  },
  cardOverlay: {
    flex: 0.4,
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingHorizontal: 32,
    paddingTop: 32,
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
    color: Colors.secondary,
    fontFamily: Fonts.RobotoBold,
  },
  logoStyle: {
    width: 90,
    height: 90,
  },
  loginHeaderStyle: {
    fontFamily: Fonts.RobotoBold,
    fontSize: 32,
    marginBottom: 16,
    color: Colors.secondary,
  },
});
