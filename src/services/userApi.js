import Axios from 'axios';
import { DOMAIN_URL } from '../utils/constants';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { formatErrorMessage } from '../utils/formatter';

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
    const { data } = await customApi.post(`/users/login`, body);
    return data;
  } catch (error) {
    return formatErrorMessage(error);
  }
};
export const verifyOtp = async body => {
  try {
    const { data } = await customApi.post(`/patient_login/verify_otp/`, body);
    return data;
  } catch (error) {
    return formatErrorMessage(error);
  }
};
export const paidCourse = async () => {
  try {
    const { data } = await customApi.get(`/paidCourse/`);
    return data;
  } catch (error) {
    return formatErrorMessage(error);
  }
};
export const getFreeTest = async pageNo => {
  try {
    const { data } = await customApi.get(`/question?page=${pageNo}&limit=1`);
    return data;
  } catch (error) {
    return formatErrorMessage(error);
  }
};
export const getCurrentAffairs = async () => {
  try {
    const { data } = await customApi.get(`/news`);
    return data;
  } catch (error) {
    return formatErrorMessage(error);
  }
};
export const getPaidTests = async () => {
  try {
    const { data } = await customApi.get(`/paid-test-series/testseries`);
    return data;
  } catch (error) {
    return formatErrorMessage(error);
  }
};
export const myTestSeries = async userId => {
  try {
    const { data } = await customApi.get(
      `/paid-test-series/testseriesById/${userId}`,
    );
    return data;
  } catch (error) {
    return formatErrorMessage(error);
  }
};
export const takeTest = async ({ testId, page }) => {
  try {
    const { data } = await customApi.get(
      `/paid-test-series/get-test-questions/${testId}?page=${page}&limit=1`,
    );
    return data;
  } catch (error) {
    return formatErrorMessage(error);
  }
};
export const getSliderImages = async () => {
  try {
    const { data } = await customApi.get(`/slider/`);
    return data;
  } catch (error) {
    return formatErrorMessage(error);
  }
};
export const addFreeQuestion = async body => {
  try {
    const { data } = await customApi.post(`/question/create`, body);
    return data;
  } catch (error) {
    return formatErrorMessage(error);
  }
};
export const getPyq = async () => {
  try {
    const { data } = await customApi.get(`/pyq/getPyq`);
    return data;
  } catch (error) {
    return formatErrorMessage(error);
  }
};
export const addNewPyq = async (formData) => {
  try {
    const { data } = await customApi.post(`/pyq/postPyq`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return data;
  } catch (error) {
    return formatErrorMessage(error);
  }
};
export const postNews = async (formData) => {
  try {
    const { data } = await customApi.post(`/news/create`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return data;
  } catch (error) {
    return formatErrorMessage(error);
  }
};
export const editNews = async ({ id, payload }) => {
  try {
    const { data } = await customApi.put(`/news/update/${id}`, payload);
    return data;
  } catch (error) {
    return { message: 'Network Error', status: false };
  }
};
export const deleteNews = async (id) => {
  try {
    const { data } = await customApi.delete(`/news/delete/${id}`);
    return data;
  } catch (error) {
    return { message: 'Network Error', status: false };
  }
};