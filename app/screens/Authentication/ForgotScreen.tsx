import {Alert, StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import {RButton, RKeyboardAvoidingView} from '@app/app/components';
import {FloatingLabelInput} from 'react-native-floating-label-input';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '@app/app/navigation/Navigator';
import {RouteProp} from '@react-navigation/native';
import {useUIElements} from '@app/app/hooks/UIProvider';
import {validateEmail} from '@app/app/resources/validations';
import {forgotPassword} from '@app/app/networking';

interface NavigationProps {
  navigation: NativeStackNavigationProp<RootStackParamList, 'ForgotPassword'>;
  route: RouteProp<RootStackParamList, 'ForgotPassword'>;
}

interface Props extends NavigationProps {}

const ForgotScreen: React.FC<Props> = ({navigation}) => {
  const {netConnection, showApiLoading} = useUIElements();
  const [isEmailFocused, setIsEmailFocused] = useState(false);
  const [email, setEmail] = useState('');

  const forgotPasswordPressed = async () => {
    if (netConnection) {
      try {
        if (!validateEmail(email)) {
          Alert.alert(
            "Something's Not Right",
            'Please enter a valid email address.',
          );
        } else {
          showApiLoading(true);
          const response = await forgotPassword(email);
          showApiLoading(false);
          console.log(response);
        }
      } catch (error) {
        console.log({error});
        showApiLoading(false);
      }
    }
  };

  const passwordDirection = () => {
    return (
      <View>
        <Text>
          A Password reset link will be sent to the emil id specified. Please
          follow the instructions to reset the password login
        </Text>
      </View>
    );
  };

  const formView = () => {
    return (
      <View style={styles.formViewContainerStyle}>
        <Text style={styles.emailHeaderStyle}>Email</Text>
        <FloatingLabelInput
          label="Email id"
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
      </View>
    );
  };

  const formSubmitView = () => {
    return (
      <View style={styles.formSubmitContainerStyle}>
        <RButton title={'Submit'} handleClick={() => forgotPasswordPressed()} />
        <RButton
          title={'Login'}
          handleClick={() => navigation.navigate('LoginScreen')}
        />
      </View>
    );
  };

  return (
    <RKeyboardAvoidingView>
      <>{passwordDirection()}</>
      <>{formView()}</>
      <>{formSubmitView()}</>
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
  emailHeaderStyle: {
    fontSize: 25,
    fontWeight: 'bold',
    marginRight: 40,
  },
  formSubmitContainerStyle: {
    justifyContent: 'center',
    marginBottom: 20,
  },
});
