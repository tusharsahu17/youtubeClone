import Axios from 'axios';
import {DOMAIN_URL} from '../utils/constants';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {formatErrorMessage} from '../utils/formatter';

const customApi = Axios.create({
  baseURL: `${DOMAIN_URL}`,
});

customApi.interceptors.request.use(async config => {
  let token = await AsyncStorage.getItem('token');
  if (token) {
    config.headers['Authorization'] = `Token ${token}`;
  }
  return config;
});

export const login = async body => {
  try {
    const {data} = await customApi.post(`/users/login`, body);
    return data;
  } catch (error) {
    return formatErrorMessage(error);
  }
};
export const verifyOtp = async body => {
  try {
    const {data} = await customApi.post(`/patient_login/verify_otp/`, body);
    return data;
  } catch (error) {
    return formatErrorMessage(error);
  }
};
export const paidCourse = async () => {
  try {
    const {data} = await customApi.get(`/paidCourse/`);
    return data;
  } catch (error) {
    return formatErrorMessage(error);
  }
};
export const getCurrentAffairs = async () => {
  try {
    const {data} = await customApi.get(`/news`);
    console.log(data);
    return data;
  } catch (error) {
    return formatErrorMessage(error);
  }
};
