import {StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import {
  RAlert,
  RButton,
  RKeyboardAvoidingView,
  RLogo,
} from '@app/app/components';
import {FloatingLabelInput} from 'react-native-floating-label-input';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '@app/app/navigation/Navigator';
import {RouteProp} from '@react-navigation/native';
import {useUIElements} from '@app/app/hooks/UIProvider';
import {validateEmail} from '@app/app/resources/validations';
import {forgotPassword} from '@app/app/networking';
import {Colors, Fonts} from '@app/app/theme';

interface NavigationProps {
  navigation: NativeStackNavigationProp<RootStackParamList, 'ForgotPassword'>;
  route: RouteProp<RootStackParamList, 'ForgotPassword'>;
}

interface Props extends NavigationProps {}

const ForgotScreen: React.FC<Props> = ({navigation}) => {
  const {netConnection, showApiLoading} = useUIElements();
  const [isEmailFocused, setIsEmailFocused] = useState(false);
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState({title: '', message: ''});
  const [showValidationAlert, setShowValidationAlert] = useState(false);
  const [showErrorAlert, setShowErrorAlert] = useState(false);

  const forgotPasswordPressed = async () => {
    if (netConnection) {
      try {
        if (!validateEmail(email)) {
          setShowValidationAlert(true);
        } else {
          showApiLoading(true);
          const response = await forgotPassword(email);
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

  const formView = () => {
    return (
      <View>
        <Text style={styles.loginHeaderStyle}>Forgot-password</Text>
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
      </View>
    );
  };

  const formSubmitView = () => {
    return (
      <View style={styles.formSubmitContainerStyle}>
        <RButton title={'Submit'} handleClick={() => forgotPasswordPressed()} />
        <Text
          style={styles.textButtonStyle}
          onPress={() => navigation.navigate('LoginScreen')}>
          {'Back to login'}
        </Text>
      </View>
    );
  };

  return (
    <RKeyboardAvoidingView>
      <RLogo />
      <View style={styles.cardOverlay}>
        <>{formView()}</>
        <>{formSubmitView()}</>
      </View>
    </RKeyboardAvoidingView>
  );
};

export {ForgotScreen};

const styles = StyleSheet.create({
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
  formViewContainerStyle: {
    flex: 0.08,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  formSubmitContainerStyle: {
    marginTop: 40,
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
  textButtonStyle: {
    color: Colors.secondary,
    fontFamily: Fonts.RobotoBold,
    alignSelf: 'center',
  },
});
