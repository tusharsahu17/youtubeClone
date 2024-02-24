import * as Yup from 'yup';

export const SCHEDULE_STATUS = 'Scheduled';
export const WAITING_STATUS = 'Waiting';
export const ENGAGED_STATUS = 'Engaged';
export const CHECKOUT_STATUS = 'CheckOut';
export const CANCELLED_STATUS = 'Cancelled';

export const APPOINTMENT_TIME_SLOT = '10';

/*** Patient Timeline ***/

export const APPOINTMENT_TIMELINE = 'Appointments';
export const CLINICAL_TIMELINE = 'Clinical Notes';
export const FILE_TIMELINE = 'Files';
export const INVOICE_TIMELINE = 'Invoices';
export const VITAL_SIGNS_TIMELINE = 'Vital Signs';
export const PRESCRIPTION_TIMELINE = 'Prescriptions';
export const PAYMENT_TIMELINE = 'Payments';
export const PROCEDURE_TIMELINE = 'Procedures';
export const TREATMENT_TIMELINE = 'Treatment Plans';
export const TIME_TIMELINE = 'Time';

export const LIST_LIMIT = 3;
export const CUSTOM_STRING_SEPARATOR = '$_$';

export const TEMPERATURETYPE = [
  {label: ' Celsius (°C)', value: 'C'},
  {label: 'Fahrenheit (°F)', value: 'F'},
  {label: 'Kelvin (K)', value: 'K'},
];
export const GENDER = [
  {label: 'MALE', value: 'Male'},
  {label: 'FEMALE', value: 'Female'},
  {label: 'OTHER', value: 'Other'},
];

export const MEMBERSHIP_TYPE = [
  {label: 'ARMY', value: 'army'},
  {label: 'STUDENT', value: 'student'},
  {label: 'OTHER', value: ''},
];
// task Status

export const OPEN = 'Open';
export const START = 'Open';
export const STOP = 'Paused';
export const IN_PROGRESS = 'In Progress';
export const CLOSE = 'Completed';

export const appointmentValidation = Yup.object().shape({
  first_name: Yup.string().required('First name is required'),
  mobile: Yup.string().required('Mobile number is required').min(10).max(10),
  email: Yup.string()
    .email('Invalid email address')
    .required('Email is required'),
});

export const orderValidationSchema = Yup.object().shape({
  full_name: Yup.string().required('Full name is required'),
  email: Yup.string().email('Invalid email').required('email is required'),
  mobile: Yup.string().required('Mobile number is required').min(10).max(10),
  pincode: Yup.string().required('Pincode is required').min(6).max(6),
});
export const loginValidation = Yup.object().shape({
  first_name: Yup.string().required('Name is required'),
  email: Yup.string().email('Invalid email').required('email is required'),
});
