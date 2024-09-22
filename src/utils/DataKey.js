import * as Yup from 'yup';
import { LOGO } from './image';

//HOME SCREEN
export const INTERNET_CHARGE = 20
export const ADS = [
  { id: 1, image: 'https://reqres.in/img/faces/1-image.jpg' },
  { id: 2, image: 'https://reqres.in/img/faces/2-image.jpg' },
  { id: 3, image: 'https://reqres.in/img/faces/3-image.jpg' },
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

// PAID COURSE
export const PAID_COURSE = [
  {
    id: 1,
    title: 'Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops',
    price: 109.0,
    oldPrice: 150.0,
    description: `
    Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday`,
    image: 'https://fakestoreapi.com/img/71li-ujtlUL._AC_UX679_.jpg',
    discount: '10%',
  },
  {
    id: 2,
    title: 'Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops',
    price: 199.0,
    oldPrice: 150.0,
    description: `From our Legends Collection, the Naga was inspired by the mythical water dragon that protects the ocean's pearl. Wear facing inward to be bestowed with love and abundance, or outward for protection.`,
    image: 'https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg',
  },
  {
    id: 3,
    title: ' Foldsack No. 1 Backpack, Fits 15 Laptops',
    price: 99.0,
    oldPrice: 150.0,
    description:
      'Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday',
    image: 'https://fakestoreapi.com/img/71pWzhdJNwL._AC_UL640_QL65_ML3_.jpg',
    discount: '10%',
  },
  {
    id: 4,
    title: 'Backpack, Fits 15 Laptops',
    price: 19.0,
    oldPrice: 100.0,
    description:
      'Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday',
    image: 'https://fakestoreapi.com/img/71YXzeOuslL._AC_UY879_.jpg',
  },
];

//SETTING SCREEN
export const USER_PROFILE = {
  name: 'Rajesh Kumar Sahoo',
  email: 'rajesh@gmail.com',
  mobile: '9876543210',
  gender: 'Male',
  image: 'https://reqres.in/img/faces/1-image.jpg',
};

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

export const TEST = {
  test_name: 'Mock Test 1',
  date: '2024-04-20',
  duration: '2 hours',
  questions: [
    {
      question_id: 1,
      question_text: 'What is the capital of France?',
      options: ['London', 'Paris', 'Berlin', 'Madrid'],
      correct_answer: 'Paris',
    },
    {
      question_id: 2,
      question_text: 'What is the chemical symbol for water?',
      options: ['H2O', 'CO2', 'O2', 'H2SO4'],
      correct_answer: 'H2O',
    },
    {
      question_id: 3,
      question_text: 'Who wrote To Kill a Mockingbird?',
      options: ['Harper Lee', 'Mark Twain', ' J.K. Rowling', 'Stephen King'],
      correct_answer: 'Harper Lee',
    },
    {
      question_id: 4,
      question_text: 'What is the square root of 144?',
      options: ['11', '12', '13', '14'],
      correct_answer: '12',
    },
  ],
};
export const Level = [{
  value: 1,
  label: 'Easy'
},
{
  value: 2,
  label: 'Medium'
},
{
  value: 3,
  label: 'Hard'
},
]
export const Answer = [{
  value: 1,
  label: 'A'
},
{
  value: 2,
  label: 'B'
},
{
  value: 3,
  label: 'C'
},
{
  value: 4,
  label: 'D'
},
]