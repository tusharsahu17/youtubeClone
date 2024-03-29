import React, {useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  ActivityIndicator,
  Image,
  Alert,
  ToastAndroid,
} from 'react-native';
import {Button, Input} from '@rneui/themed';
import {ROUTES} from '../../navigation/routes';
import {login, sendOtp} from '../../services/userApi';
import {LOGO} from '../../utils/image';
import {THEME} from '../../utils/colors';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useDispatch} from 'react-redux';
import {signIn} from '../../features/auth/authSlice';

const Login = ({navigation}) => {
  const [loader, setLoader] = useState(false);
  const [email, setEmail] = useState('ankit@gmail.com');
  const [password, setPassword] = useState('Ankit@123');

  const [errorMessage, setErrorMessage] = useState('');
  const dispatch = useDispatch();

  const handleLogin = async () => {
    setLoader(true);
    const body = {
      email: email,
      pass: password,
    };
    const res = await login(body);
    await AsyncStorage.setItem('token', res.token);
    dispatch(signIn(res));
    ToastAndroid.show(res?.msg, ToastAndroid.SHORT);
    setLoader(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.mainContainer}>
        <View style={styles.imageConatiner}>
          <Image
            style={{width: 400, height: 200, resizeMode: 'contain'}}
            source={LOGO}
          />
        </View>

        <View style={styles.headingTextContainer}>
          <Text style={styles.headingTextStyle}>
            Please enter your phone number to login
          </Text>
          {errorMessage && (
            <Text style={[styles.headingTextStyle, styles.error]}>
              {errorMessage}
            </Text>
          )}
        </View>
        <View style={{marginTop: 50}}>
          <Input
            keyboardType="email-address"
            placeholder=""
            value={email}
            label="Email"
            inputStyle={styles.mobileInput}
            // leftIcon={<Text style={styles.icon91}>+91</Text>}
            onChangeText={val => {
              setEmail(val);
            }}
            // onSubmitEditing={handleLogin}
          />
          <Input
            placeholder=""
            value={password}
            label="Password"
            inputStyle={styles.mobileInput}
            onChangeText={val => {
              setPassword(val);
            }}
            // onSubmitEditing={handleLogin}
          />
        </View>
        <View style={styles.buttonContainer}>
          <Button
            //color= "red"
            buttonStyle={styles.button}
            title="Login"
            titleStyle={styles.buttonText}
            onPress={handleLogin}
          />

          <Button
            buttonStyle={{backgroundColor: THEME.COLOR_BLUE, margin: 10}}
            title="SignUp"
            titleStyle={styles.buttonText}
            onPress={() => navigation.navigate(ROUTES.signup)}
          />
        </View>
      </View>

      {loader && (
        <View style={styles.loader}>
          <ActivityIndicator color={THEME.THEME_COLOUR} size="large" />
        </View>
      )}
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: THEME.BACKGROUND_COLOR_LIGHT,
  },
  mainContainer: {
    flex: 1,
    justifyContent: 'center',
    margin: 10,
  },
  error: {
    color: THEME.COLOR_DANGER_DARK,
  },
  imageConatiner: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    // backgroundColor: Colors.COLOR_PRIMARY,
  },
  headingTextContainer: {
    // flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headingTextStyle: {
    marginLeft: 10,
    fontSize: THEME.FONT_SIZE_MEDIUM,
    fontWeight: THEME.FONT_WEIGHT_MEDIUM,
    color: THEME.COLOR_GRAY,
  },

  mobileInput: {
    fontWeight: THEME.FONT_WEIGHT_MEDIUM,
    fontSize: THEME.FONT_SIZE_LARGE,
  },
  icon91: {
    fontWeight: THEME.FONT_WEIGHT_BOLD,
    fontSize: THEME.FONT_SIZE_LARGE,
    marginRight: 10,
    color: THEME.COLOR_GRAY,
  },

  buttonContainer: {
    justifyContent: 'flex-start',
  },
  loader: {
    ...THEME.LOADER,
  },
  buttonText: {
    //color: themeStyles.COLOR_WARNING,
    fontSize: THEME.FONT_SIZE_LARGE,
    fontWeight: THEME.FONT_WEIGHT_BOLD,
  },
  button: {
    margin: 10,
    backgroundColor: THEME.COLOR_BLUE,
    height: 50,
  },
});
export default Login;
