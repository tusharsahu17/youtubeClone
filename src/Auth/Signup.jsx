import React, {useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  ScrollView,
  Modal,
  TouchableHighlight,
  ToastAndroid,
  ActivityIndicator,
} from 'react-native';
import {THEME} from '../utils/colors';
import {Formik} from 'formik';
import {Image} from 'react-native';
import {LOGO} from '../utils/image';
import MyInput from './../components/MyInput';
import {Button, Input} from '@rneui/themed';
import {
  resendOTP,
  signup,
  verifyOTP,
  verifyPhoneNum,
} from '../services/userApi';
import {ROUTES} from '../navigation/routes';
import {loginValidation} from '../utils/DataKey';
const Signup = ({navigation}) => {
  const [otpVerifyModalVisible, setOtpVerifyModalVisible] = useState(false);
  const [otp, setOTP] = useState('');
  const [mobileNum, setMobileNum] = useState('');
  const [loading, setLoading] = useState(false);
  const [mobileVerified, setMobileVerified] = useState(false);
  const onVerifyMobileOTPSend = async val => {
    setLoading(true);
    const res = await verifyPhoneNum(val);
    if (res.status) {
      setMobileNum(val);

      ToastAndroid.show(res?.message, ToastAndroid.SHORT);
      setOtpVerifyModalVisible(true);
    } else {
      ToastAndroid.show('Check Mobile number', ToastAndroid.SHORT);
    }
    setLoading(false);
  };

  const handleSubmitOTP = async () => {
    let payload = {
      phone_no: mobileNum,
      otp: otp,
    };
    const res = await verifyOTP(payload);
    console.log('===============>', res);
    if (res.status) {
      ToastAndroid.show(res?.message, ToastAndroid.SHORT);
      setMobileVerified(true);
      setOtpVerifyModalVisible(false);
    } else {
      ToastAndroid.show(res?.message || 'Error:', ToastAndroid.SHORT);
    }
  };
  const handleResendOTP = async () => {
    let payload = {
      phone_no: mobileNum,
    };

    const res = await resendOTP(payload);
    if (res.status) {
      ToastAndroid.show(res?.message, ToastAndroid.SHORT);
    } else {
      ToastAndroid.show(res?.message || 'Error:', ToastAndroid.SHORT);
    }
  };
  const submit = async values => {
    setLoading(true);
    try {
      const payload = {
        email: values.email,
        first_name: values.first_name,
        mobile: values.mobile,
        blood_group: values.blood_group,
        gender: values.gender,
        referer_code: values.referral,
      };

      const res = await signup(payload);
      if (res.status) {
        ToastAndroid.show(res?.message, ToastAndroid.SHORT);
        navigation.navigate(ROUTES.login);
      } else {
        ToastAndroid.show(res?.message || 'Error:', ToastAndroid.SHORT);
      }
    } catch (error) {
      console.error('Signup error:', error);
    }
    setLoading(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      {loading && (
        <View style={styles.loader}>
          <ActivityIndicator color={THEME.THEME_COLOUR} size="large" />
        </View>
      )}
      <View style={styles.mainContainer}>
        <ScrollView>
          <Formik
            initialValues={{
              first_name: '',
              mobile: '',
              email: '',
              referral: '',
              gender: '',
              blood_group: '',
            }}
            onSubmit={values => {
              submit(values);
            }}
            validationSchema={loginValidation}>
            {props => (
              <>
                <View style={styles.topContainer}>
                  <View style={styles.imageConatiner}>
                    <Image
                      style={{width: 400, height: 200, resizeMode: 'center'}}
                      source={LOGO}
                    />
                  </View>
                </View>
                <View
                  style={{
                    flex: 1,
                    paddingHorizontal: 15,
                    paddingBottom: 20,
                    gap: 10,
                  }}>
                  <MyInput
                    label={'Name'}
                    formikProps={props}
                    name="first_name"
                  />
                  <MyInput
                    label={'Phone'}
                    formikProps={props}
                    name="mobile"
                    inputProps={{
                      placeholder: 'Enter Phone',
                      keyboardType: 'phone-pad',
                      maxLength: 10,
                    }}
                    rightIcon={
                      <Button
                        //   loading={loadingBtn}
                        //   title={mobileVerified ? 'Done' : 'verify'}
                        title={!mobileVerified ? 'verify' : 'verified'}
                        buttonStyle={{
                          borderTopLeftRadius: 0,
                          borderBottomLeftRadius: 0,
                        }}
                        onPress={() => {
                          onVerifyMobileOTPSend(props.values.mobile);
                        }}
                      />
                    }
                  />
                  <MyInput
                    label={'Email'}
                    formikProps={props}
                    name="email"
                    inputProps={{
                      keyboardType: 'email-address',
                    }}
                  />
                  <MyInput
                    label="Blood Group"
                    name={'blood_group'}
                    formikProps={props}
                    select={{
                      isSelect: true,
                    }}
                    search={false}
                    data={[
                      {label: 'A+', value: 'A+'},
                      {label: 'B+', value: 'B+'},
                      {label: 'O+', value: 'O+'},
                      {label: 'AB+', value: 'AB+'},
                      {label: 'A-', value: 'A-'},
                      {label: 'B-', value: 'B-'},
                      {label: 'O-', value: 'O-'},
                      {label: 'AB-', value: 'AB-'},
                    ]}
                  />
                  <MyInput
                    label="Gender"
                    name={'gender'}
                    formikProps={props}
                    select={{
                      isSelect: true,
                    }}
                    search={false}
                    data={[
                      {label: 'Male', value: 'Male'},
                      {label: 'Female', value: 'Female'},
                      {label: 'Others', value: 'Others'},
                    ]}
                  />
                  <MyInput
                    label={'Referral Code'}
                    formikProps={props}
                    name="referral"
                  />
                  <View>
                    <Button
                      disabled={!mobileVerified}
                      buttonStyle={{backgroundColor: THEME.COMPONENT_COLOR}}
                      title="SignUp"
                      titleStyle={styles.buttonText}
                      onPress={() => {
                        props.handleSubmit();
                      }}
                      disabledStyle={{backgroundColor: THEME.COLOR_GRAY_LIGHT}}
                      disabledTitleStyle={{color: THEME.COLOR_BLACK}}
                      containerStyle={{
                        borderWidth: 2,
                        borderColor: '#ffffff8a',
                      }}
                    />
                  </View>
                </View>
              </>
            )}
          </Formik>
        </ScrollView>
      </View>

      <Modal
        // key="otpVerify"
        animationType="slide"
        transparent={true}
        visible={otpVerifyModalVisible}>
        <View
          style={{
            flex: 1,
            paddingHorizontal: 15,
            justifyContent: 'center',
            // alignItems: "center",
            marginTop: 22,
          }}>
          <View
            style={{
              marginVertical: 20,
              backgroundColor: THEME.COLOR_WHITE,
              borderRadius: 5,
              padding: 15,
              // alignItems: "center",
              shadowColor: THEME.COLOR_BLACK,
              shadowOffset: {
                width: 0,
                height: 2,
              },
              shadowOpacity: 0.25,
              shadowRadius: 3.84,
              elevation: 5,
            }}>
            <Text style={{fontSize: 18, color: THEME.COLOR_BLACK}}>
              Enter the OTP sent to the given mobile
            </Text>

            <View style={{paddingVertical: 15}}>
              <Input
                // placeholder="OTP"
                maxLength={6}
                // ref="fieldOTP"
                inputStyle={{paddingVertical: 5}}
                shake={true}
                //   value={_.get(formValues, 'otp.value')}
                onChangeText={value => {
                  setOTP(value);
                  // this.setValues('otp', value);
                }}
                errorStyle={{color: THEME.COLOR_DANGER}}
                //   errorMessage={_.get(formValues, 'otp.errorMessage')}
                label="OTP"
              />
              <TouchableHighlight
                activeOpacity={0.6}
                underlayColor={THEME.COLOR_WHITE}
                onPress={() => {
                  handleResendOTP();
                  // this.onVerifyMobileOTPReSend()
                }}>
                <Text
                  style={{
                    textAlign: 'right',
                    paddingVertical: 15,
                    color: '#1da57a',
                  }}>
                  Resend OTP?
                </Text>
              </TouchableHighlight>
            </View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'flex-end',
              }}>
              <View style={{flex: 1}}>
                <Button
                  type="primary"
                  title="Cancel"
                  onPress={() => {
                    setOtpVerifyModalVisible(false);
                  }}
                />
              </View>
              <View style={{flex: 1}}></View>
              <View style={{flex: 1}}>
                <Button
                  type="warning"
                  onPress={() => {
                    handleSubmitOTP();
                  }}
                  title="Submit"
                />
              </View>
            </View>
          </View>
        </View>
      </Modal>
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
    flexDirection: 'column',
  },
  topContainer: {
    flex: 1,
    // backgroundColor: 'green'
  },
  imageConatiner: {
    flex: 2,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    // backgroundColor: Colors.COLOR_PRIMARY,
  },
  inputContainer: {
    flexDirection: 'row',
    flex: 1,
    marginBottom: 10,
    // backgroundColor: "red",
  },
  datepickerContainer: {
    flex: 2,
    paddingHorizontal: 8,
    // backgroundColor: 'blue'
  },
  orContainer: {
    flex: 0.5,
    // backgroundColor:'red'
  },
  ageContainer: {
    flex: 1,
    // backgroundColor:'yellow'
  },
  loader: {
    flex: 1,
    backgroundColor: THEME.COLOR_GRAY_LIGHT,
    ...THEME.LOADER,
    alignSelf: 'center',
    alignContent: 'center',
    justifyContent: 'center',
  },
});
export default Signup;
