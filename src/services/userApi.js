import Axios from 'axios';
import {DOMAIN_URL} from '../utils/constants';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {formatErrorMessage} from '../utils/formatter';

const customApi = Axios.create({
  baseURL: `${DOMAIN_URL}/erp-api`,
});

customApi.interceptors.request.use(async config => {
  let token = await AsyncStorage.getItem('token');
  if (token) {
    config.headers['Authorization'] = `Token ${token}`;
  }
  return config;
});

export const sendOtp = async body => {
  try {
    const {data} = await customApi.post(`/patient_login/send_otp/`, body);
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
export const liveDoctors = async () => {
  try {
    const {data} = await customApi.get(`/doctorlive/sessionbased_live`);
    return data;
  } catch (error) {
    console.error('Error:', error);
    return formatErrorMessage(error);
  }
};
export const getBookedAppointment = async id => {
  try {
    const {data} = await customApi.get(`/appointment/?patient=${id}`);
    return data;
  } catch (error) {
    console.error('Error:', error);
    return formatErrorMessage(error);
  }
};
export const ourDoctors = async () => {
  try {
    const {data} = await customApi.get(`/doctor-rate-per-chat/`);
    return data;
  } catch (error) {
    return formatErrorMessage(error);
  }
};
export const dailyOffers = async () => {
  try {
    const {data} = await customApi.get(`/daily-offers/`);
    return data;
  } catch (error) {
    console.error('Error:', error);
    return formatErrorMessage(error);
  }
};
export const ourServices = async () => {
  try {
    const {data} = await customApi.get(`/service/`);
    return data.results;
  } catch (error) {
    console.error('Error:', error);
    return formatErrorMessage(error);
  }
};
export const addAppointment = async payload => {
  try {
    const {data} = await customApi.post(`/appointment/`, payload);
    return data;
  } catch (error) {
    console.error('Error:', error);
    return formatErrorMessage(error);
  }
};
export const getDoctors = async id => {
  try {
    const {data} = await customApi.get(
      `/clinics/${id}/practice_staff/?all=true`,
    );
    return data;
  } catch (error) {
    console.error('Error:', error);
    return formatErrorMessage(error);
  }
};
export const getClinic = async () => {
  try {
    const {data} = await customApi.get(`/clinics/`);
    return data;
  } catch (error) {
    console.error('Error:', error);
    return formatErrorMessage(error);
  }
};
export const getAppointmentCategory = async clinicId => {
  try {
    const {data} = await customApi.get(
      `/clinics/${clinicId}/appointment_category/`,
    );
    return data;
  } catch (error) {
    console.error('Error:', error);
    return formatErrorMessage(error);
  }
};

export const getPatientQuestion = async () => {
  try {
    const {data} = await customApi.get(`/patientquestion/`);
    return data;
  } catch (error) {
    console.error('Error:', error);
    return formatErrorMessage(error);
  }
};
export const getBlogs = async () => {
  try {
    const {data} = await customApi.get(`/post/`);
    return data;
  } catch (error) {
    console.error('Error:', error);
    return formatErrorMessage(error);
  }
};
export const blogCount = async id => {
  try {
    const {data} = await customApi.post(`/post/${id}/user_view_to_blog/`);
    return data;
  } catch (error) {
    console.error('Error:', error);
    return formatErrorMessage(error);
  }
};
export const getBlogComment = async id => {
  try {
    const {data} = await customApi.get(`/post/${id}/comments/`);
    return data;
  } catch (error) {
    console.error('Error:', error);
    return formatErrorMessage(error);
  }
};
export const addComment = async payload => {
  try {
    const {data} = await customApi.post(`/comment/`, payload);
    return data;
  } catch (error) {
    console.error('Error:', error);
    return formatErrorMessage(error);
  }
};
export const getNotification = async () => {
  try {
    const {data} = await customApi.get(`/NotificationList/`);
    return data;
  } catch (error) {
    console.error('Error:', error);
    return formatErrorMessage(error);
  }
};
export const updateNotification = async id => {
  try {
    const {data} = await customApi.put(`/NotificationList/${id}/`);
    return data;
  } catch (error) {
    console.error('Error:', error);
    return formatErrorMessage(error);
  }
};
export const getNotificationCount = async () => {
  try {
    const {data} = await customApi.get(
      `/NotificationList/get_new_notification/`,
    );
    return data;
  } catch (error) {
    console.error('Error:', error);
    return formatErrorMessage(error);
  }
};
export const getProduct = async () => {
  try {
    const {data} = await customApi.get(`/ecommers/products/`);
    return data;
  } catch (error) {
    console.error('Error:', error);
    return formatErrorMessage(error);
  }
};
export const createCart = async payload => {
  try {
    const {data} = await customApi.post(`/ecommers/carts/`, payload);
    return data;
  } catch (error) {
    console.error('Error:', error);
    return formatErrorMessage(error);
  }
};
export const addtoCart = async (id, payload) => {
  try {
    const {data} = await customApi.post(
      `/ecommers/carts/${id}/items/`,
      payload,
    );
    return data;
  } catch (error) {
    console.error('Error:', error);
    return formatErrorMessage(error);
  }
};
export const removeFromCart = async (cartId, id) => {
  try {
    const {data} = await customApi.delete(
      `/ecommers/carts/${cartId}/items/${id}/`,
    );
    return data;
  } catch (error) {
    console.error('Error:', error);
    return formatErrorMessage(error);
  }
};
export const updateProductQuantity = async (cartId, id, payload) => {
  try {
    const {data} = await customApi.patch(
      `/ecommers/carts/${cartId}/items/${id}/`,
      payload,
    );
    return data;
  } catch (error) {
    console.error('Error:', error);
    return formatErrorMessage(error);
  }
};
export const promocode = async () => {
  try {
    const {data} = await customApi.get(`/promo-codes/generate/`);
    return data;
  } catch (error) {
    console.error('Error:', error);
    return formatErrorMessage(error);
  }
};
export const getCountryList = async () => {
  try {
    const {data} = await customApi.get(`/patients/country/`);
    return data;
  } catch (error) {
    console.error('Error:', error);
    return formatErrorMessage(error);
  }
};
export const getStateList = async countryCode => {
  try {
    const {data} = await customApi.get(
      `/patients/state/?country=${countryCode}`,
    );
    return data;
  } catch (error) {
    console.error('Error:', error);
    return formatErrorMessage(error);
  }
};
export const getCityList = async stateCode => {
  try {
    const {data} = await customApi.get(`/patients/city/?state=${stateCode}`);
    return data;
  } catch (error) {
    console.error('Error:', error);
    return formatErrorMessage(error);
  }
};
export const makeOrder = async payload => {
  try {
    const {data} = await customApi.post(`/ecommers/orders/`, payload);
    return data;
  } catch (error) {
    return formatErrorMessage(error);
  }
};

export const getAllChats = async () => {
  try {
    const {data} = await customApi.get(
      `/receiver_user/all_receiver_user_list/`,
    );
    return data;
  } catch (error) {
    return formatErrorMessage(error);
  }
};
export const getFreeChats = async () => {
  try {
    const {data} = await customApi.get(
      `/receiver_user/all_receiver_user_list_for_free_chat`,
    );
    return data;
  } catch (error) {
    return formatErrorMessage(error);
  }
};
export const getSingleUserChats = async receiver_id => {
  try {
    const {data} = await customApi.get(
      `/receiver_user/listofuser/?sender_id=${receiver_id}`,
    );
    return data;
  } catch (error) {
    return formatErrorMessage(error);
  }
};
export const getSingleFreeChats = async receiver_id => {
  try {
    const {data} = await customApi.get(
      `/receiver_user/listofuser_for_free_chat/?sender_id=${receiver_id}`,
    );
    return data;
  } catch (error) {
    return formatErrorMessage(error);
  }
};
export const getWishList = async () => {
  try {
    const {data} = await customApi.get(`/ecommers/wishlist/`);
    return data;
  } catch (error) {
    return formatErrorMessage(error);
  }
};
export const removeFromWishList = async id => {
  try {
    const {data} = await customApi.delete(`/ecommers/wishlist/${id}/`);
    return data;
  } catch (error) {
    return formatErrorMessage(error);
  }
};
export const addToWishList = async payload => {
  try {
    const {data} = await customApi.post(`/ecommers/wishlist/`, payload);
    return data;
  } catch (error) {
    return formatErrorMessage(error);
  }
};
export const getProductDetails = async id => {
  try {
    const {data} = await customApi.get(`/ecommers/products/${id}/`);
    return data;
  } catch (error) {
    return formatErrorMessage(error);
  }
};
export const getMyBalance = async id => {
  try {
    const {data} = await customApi.get(`/wallets/update-balance/`);
    return data;
  } catch (error) {
    return formatErrorMessage(error);
  }
};
export const getTransactionHistory = async id => {
  try {
    const {data} = await customApi.get(`/wallets/history/`);
    return data;
  } catch (error) {
    return formatErrorMessage(error);
  }
};
export const getYoutubeVideos = async id => {
  try {
    const {data} = await customApi.get(`/app-yotube/`);
    return data;
  } catch (error) {
    return formatErrorMessage(error);
  }
};
export const getReviews = async id => {
  try {
    const {data} = await customApi.get(`/patientreview/`);
    return data;
  } catch (error) {
    return formatErrorMessage(error);
  }
};
export const postDepositAmount = async payload => {
  try {
    const {data} = await customApi.post(`/wallets/deposit/`, payload);
    return data;
  } catch (error) {
    return formatErrorMessage(error);
  }
};
export const homeSearch = async (type, name) => {
  try {
    const {data} = await customApi.get(`/doctorsearch/?${type}=${name}`);
    return data;
  } catch (error) {
    return formatErrorMessage(error);
  }
};
export const getAllopathMedList = async type => {
  try {
    const {data} = await customApi.get(
      `/conversion/medicines/?medicine_type=${type}`,
    );
    return data;
  } catch (error) {
    return formatErrorMessage(error);
  }
};
export const getDiseaseList = async type => {
  try {
    const {data} = await customApi.get(`/conversion/disease_list`);
    return data;
  } catch (error) {
    return formatErrorMessage(error);
  }
};
export const getOrderList = async () => {
  try {
    const {data} = await customApi.get(`/ecommers/orders/?action=list`);
    return data;
  } catch (error) {
    return formatErrorMessage(error);
  }
};
export const getOrderHistory = async () => {
  try {
    const {data} = await customApi.get(`/ecommers/orders`);
    return data;
  } catch (error) {
    return formatErrorMessage(error);
  }
};
export const getDiseases = async id => {
  try {
    const {data} = await customApi.get(`/conversion/?diseases=${id}`);
    return data;
  } catch (error) {
    return formatErrorMessage(error);
  }
};
export const getAllopathDetail = async id => {
  try {
    const {data} = await customApi.get(`/conversion/?allopath=${id}`);
    return data;
  } catch (error) {
    return formatErrorMessage(error);
  }
};
export const getSliderImages = async () => {
  try {
    const {data} = await customApi.get(`/app-slider/`);
    return data;
  } catch (error) {
    return formatErrorMessage(error);
  }
};
export const getTestimonialVideo = async () => {
  try {
    const {data} = await customApi.get(`/app-testimonial/`);
    return data;
  } catch (error) {
    return formatErrorMessage(error);
  }
};
export const verifyPhoneNum = async body => {
  try {
    let payload = {
      phone_no: body,
    };
    const {data} = await customApi.post(
      `/patient_login/registration_otp/`,
      payload,
    );
    return data;
  } catch (error) {
    return formatErrorMessage(error);
  }
};
export const resendOTP = async payload => {
  try {
    const {data} = await customApi.post(
      `/patient_login/resend_registration/`,
      payload,
    );
    return data;
  } catch (error) {
    return formatErrorMessage(error);
  }
};
export const verifyOTP = async payload => {
  try {
    const {data} = await customApi.post(
      `/patient_login/registration_verify/`,
      payload,
    );
    return data;
  } catch (error) {
    return formatErrorMessage(error);
  }
};
export const signup = async payload => {
  try {
    const {data} = await customApi.post(`/patient_login/register/`, payload);
    return data;
  } catch (error) {
    return formatErrorMessage(error);
  }
};
export const createMeeting = async authToken => {
  try {
    const res = await fetch(`https://api.videosdk.live/v2/rooms`, {
      method: 'POST',
      headers: {
        authorization: `${authToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({}),
    });
    const {roomId} = await res.json();
    return roomId;
  } catch (error) {
    return formatErrorMessage(error);
  }
};
export const meetingDetails = async id => {
  try {
    const {data} = await customApi.get(`/videocall/${id}`);
    return data;
  } catch (error) {
    return formatErrorMessage(error);
  }
};
export const scheduleNewMeeting = async payload => {
  try {
    const {data} = await customApi.post(`/videocall/`, payload);
    return data;
  } catch (error) {
    return formatErrorMessage(error);
  }
};
export const meetingAmount = async id => {
  try {
    const {data} = await customApi.get(`/videocall/payforcall/?id=${id}`);
    return data;
  } catch (error) {
    return formatErrorMessage(error);
  }
};
export const meetingPayment = async payload => {
  try {
    console.log('==============>pay', payload);
    const {data} = await customApi.post(`/videocall/payforcall/`, payload);
    console.log('==============>payment done', data);
    return data;
  } catch (error) {
    return formatErrorMessage(error);
  }
};
export const getMeetingList = async (id, filter) => {
  try {
    const {data} = await customApi.get(
      `/videocall/?patients_call=${id}&status=${filter}`,
    );
    return data;
  } catch (error) {
    return formatErrorMessage(error);
  }
};
export const manualReport = async payload => {
  try {
    const {data} = await customApi.post(`/patients/vital_sign/`, payload);
    return data;
  } catch (error) {
    return formatErrorMessage(error);
  }
};
export const getManualReport = async id => {
  try {
    const {data} = await customApi.get(`/patients/vital_sign/?patient=${id}`);
    return data;
  } catch (error) {
    return formatErrorMessage(error);
  }
};
export const updateManualReport = async payload => {
  try {
    const {data} = await customApi.post(`/patients/vital_sign/`, payload);
    return data;
  } catch (error) {
    return formatErrorMessage(error);
  }
};
export const printManualReport = async id => {
  try {
    const {data} = await customApi.get(`/patients/vital_sign_pdf/?id=${id}`);
    return data;
  } catch (error) {
    return formatErrorMessage(error);
  }
};
export const uploadFilesApi = async payload => {
  try {
    const {data} = await customApi.post(`/blogImage/`, payload, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return data;
  } catch (error) {
    return formatErrorMessage(error);
  }
};
export const getFileTag = async id => {
  try {
    const {data} = await customApi.get(`/clinics/${id}/filetags/`);
    return data;
  } catch (error) {
    return formatErrorMessage(error);
  }
};
export const addFiles = async payload => {
  try {
    const {data} = await customApi.post(`/patients/files/`, payload);
    return data;
  } catch (error) {
    return formatErrorMessage(error);
  }
};
export const getDocumentFile = async (practiceId, patientId, tagId) => {
  try {
    const {data} = await customApi.get(
      `/patients/files/?practice=${practiceId}&patient=${patientId}&tag=${tagId}`,
    );
    return data;
  } catch (error) {
    return formatErrorMessage(error);
  }
};
export const addClinicalNotes = async payload => {
  try {
    const {data} = await customApi.post(`/patients/clinic_notes/`, payload);
    return data;
  } catch (error) {
    return formatErrorMessage(error);
  }
};
export const getClinicalList = async () => {
  try {
    const {data} = await customApi.get(`/patients/clinic_notes/`);
    return data;
  } catch (error) {
    return formatErrorMessage(error);
  }
};
export const getDrugs = async () => {
  try {
    const {data} = await customApi.get(`/patientInventorydrug/`);
    return data;
  } catch (error) {
    return formatErrorMessage(error);
  }
};
export const getLabs = async id => {
  try {
    const {data} = await customApi.get(`/clinics/${id}/labtest/`);
    return data;
  } catch (error) {
    return formatErrorMessage(error);
  }
};
export const addPrescription = async payload => {
  try {
    const {data} = await customApi.post(`/patients/prescriptions/`, payload);
    return data;
  } catch (error) {
    return formatErrorMessage(error);
  }
};
export const getPrescription = async () => {
  try {
    const {data} = await customApi.get(`/patients/prescriptions/`);
    return data;
  } catch (error) {
    return formatErrorMessage(error);
  }
};
export const getProcedure = async id => {
  try {
    const {data} = await customApi.get(`/patients/procedure/?patient=${id}`);
    return data;
  } catch (error) {
    return formatErrorMessage(error);
  }
};
export const followDoctor = async payload => {
  try {
    const {data} = await customApi.post(
      `/patientsprofile/follow_user/`,
      payload,
    );
    return data;
  } catch (error) {
    return formatErrorMessage(error);
  }
};
export const updateProfile = async (id, payload) => {
  try {
    const {data} = await customApi.put(`/patients/${id}/`, payload);
    return data;
  } catch (error) {
    return formatErrorMessage(error);
  }
};
export const getMembershipDetail = async () => {
  try {
    const {data} = await customApi.get(`/User-Member-Ship-type/`);
    return data;
  } catch (error) {
    return formatErrorMessage(error);
  }
};
export const getMembershipPlan = async () => {
  try {
    const {data} = await customApi.get(`/User-Member-Ship/`);
    return data;
  } catch (error) {
    return formatErrorMessage(error);
  }
};
export const membership = async payload => {
  try {
    const {data} = await customApi.post(`/User-Member-Ship/`, payload, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return data;
  } catch (error) {
    return formatErrorMessage(error);
  }
};
export const downloadMembershipInvoice = async () => {
  try {
    const {data} = await customApi.get(`/User-Member-Ship/get_invoice/`);
    return data;
  } catch (error) {
    return formatErrorMessage(error);
  }
};
export const renewMembership = async (id, payload) => {
  try {
    const {data} = await customApi.put(`/User-Member-Ship/${id}/`, payload, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return data;
  } catch (error) {
    return formatErrorMessage(error);
  }
};
export const getNotificationSetting = async () => {
  try {
    const {data} = await customApi.get(
      `/NotificationList/notification_enabled_and_disabled/`,
    );
    return data;
  } catch (error) {
    return formatErrorMessage(error);
  }
};
export const updateNotificationSetting = async payload => {
  try {
    const {data} = await customApi.put(
      `/NotificationList/notification_enabled_and_disabled/`,
      payload,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      },
    );
    return data;
  } catch (error) {
    return formatErrorMessage(error);
  }
};
