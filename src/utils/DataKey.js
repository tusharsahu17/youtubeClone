import * as Yup from 'yup';
import {LOGO} from './image';

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

export const ADS = [
  {id: 1, image: 'https://reqres.in/img/faces/1-image.jpg'},
  {id: 2, image: 'https://reqres.in/img/faces/2-image.jpg'},
  {id: 3, image: 'https://reqres.in/img/faces/3-image.jpg'},
];
export const CURRENT_AFFAIRS = [
  {
    image: 'https://reqres.in/img/faces/1-image.jpg',
    title: 'New Coaching Launching',
    content: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ut lectus nulla. Nullam non urna nec ex pharetra ultricies. Sed sit amet bibendum libero. Sed mattis efficitur nisl, at luctus odio consectetur sit amet. Fusce fermentum libero quis magna feugiat, non gravida nulla dignissim. Integer vel enim sed odio fermentum laoreet. Duis ut nulla vel odio malesuada lobortis vel eu dui. Sed nec mauris sem. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ut lectus nulla. Nullam non urna nec ex pharetra ultricies. Sed sit amet bibendum libero. Sed mattis efficitur nisl, at luctus odio consectetur sit amet. Fusce fermentum libero quis magna feugiat, non gravida nulla dignissim. Integer vel enim sed odio fermentum laoreet.
    Duis ut nulla vel odio malesuada lobortis vel eu dui. Sed nec mauris sem.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ut lectus nulla. Nullam non urna nec ex pharetra ultricies. Sed sit amet bibendum libero. Sed mattis efficitur nisl, at luctus odio consectetur sit amet. Fusce fermentum libero quis magna feugiat, non gravida nulla dignissim. Integer vel enim sed odio fermentum laoreet. Duis ut nulla vel odio malesuada lobortis vel eu dui. Sed nec mauris sem.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ut lectus nulla. Nullam non urna nec ex pharetra ultricies. Sed sit amet bibendum libero. Sed mattis efficitur nisl, at luctus odio consectetur sit amet. Fusce fermentum libero quis magna feugiat, non gravida nulla dignissim. Integer vel enim sed odio fermentum laoreet. Duis ut nulla vel odio malesuada lobortis vel eu dui. Sed nec mauris sem.`,
  },
  {
    image: 'https://reqres.in/img/faces/2-image.jpg',
    title: 'To keep ReqRes free',
    content: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ut lectus nulla. Nullam non urna nec ex pharetra ultricies. Sed sit amet bibendum libero. Sed mattis efficitur nisl,Sed nec mauris sem. `,
  },
  {
    image: 'https://reqres.in/img/faces/3-image.jpg',
    title: 'contributions towards server costs are appreciated',
    content: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ut lectus nulla. Nullam non urna nec ex pharetra ultricies. Sed sit amet bibendum libero. Sed mattis efficitur nisl, at luctus odio consectetur sit amet. Fusce fermentum libero quis magna feugiat, non gravida nulla dignissim. Integer vel enim sed odio fermentum laoreet. Duis ut nulla vel odio malesuada lobortis vel eu dui. Sed nec mauris sem. `,
  },
];

export const USER_PROFILE = {
  name: 'Rajesh Kumar Sahoo',
  email: 'rajesh@gmail.com',
  mobile: '9876543210',
  gender: 'Male',
  image: 'https://reqres.in/img/faces/1-image.jpg',
};
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
