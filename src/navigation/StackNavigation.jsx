import { useSelector } from 'react-redux';
import { StyleSheet } from 'react-native';
import React, { useEffect, useState } from 'react';
import Playlist from '../screens/Youtube/Playlist';
import PlayVideo from '../screens/Youtube/PlayVideo';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ROUTES } from './routes';
import Login from '../screens/auth';
import Splash from '../screens/auth/Splash';
import TabNavigation from './TabNavigation';
import OTP from '../Auth/OTP';
import Signup from '../Auth/Signup';
import { selectUser } from '../features/auth/authSlice';
import Affairs from '../screens/Affairs';
import News from '../screens/Affairs/News';
import { THEME } from '../utils/colors';
import Profile from '../screens/Settings/Profile';
import AboutApp from '../screens/Settings/AboutApp';
import Syllabus from '../screens/home/Syllabus';
import PaidCourses from '../screens/MyCourse/PaidCourses';
import PaidExams from '../screens/MyCourse/paidCourse/PaidExams';
import PaidDetails from '../screens/MyCourse/paidCourse/PaidDetails';
import FreeTest from '../screens/FreeTest.js';
import PaidTestSeries from '../screens/PaidTestSeries';
import TakeTest from '../screens/Downloads/TakeTest';

const Stack = createNativeStackNavigator();

const StackNavigation = () => {
  // const {isAuthenticated} = useSelector(selectUser);
  const isAuthenticated = true;
  const [timer, setTimer] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setTimer(false);
    }, 3000);
  }, []);
  const option = {
    headerShown: true,
    headerStyle: {
      backgroundColor: THEME.COLOR_BLUE,
    },
    headerTintColor: THEME.COLOR_WHITE,
  };
  return (
    <Stack.Navigator>
      {!isAuthenticated ? (
        <Stack.Group>
          <Stack.Screen
            name={ROUTES.login}
            component={Login}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen name={ROUTES.signup} component={Signup} />
          {timer && (
            <Stack.Screen
              name={ROUTES.splash}
              component={Splash}
              options={{ headerShown: false }}
            />
          )}
        </Stack.Group>
      ) : (
        <Stack.Group>
          <>
            <Stack.Screen
              name={ROUTES.tab}
              component={TabNavigation}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name={ROUTES.paidCourse}
              component={PaidCourses}
              options={option}
            />
            <Stack.Screen
              name={ROUTES.paidDetails}
              component={PaidDetails}
              options={option}
            />
            <Stack.Screen
              name={ROUTES.paidExams}
              component={PaidExams}
              options={option}
            />
            <Stack.Screen
              name={ROUTES.playlist}
              component={Playlist}
              options={option}
            />
            <Stack.Screen
              name={ROUTES.playVideo}
              component={PlayVideo}
              options={option}
            />
            <Stack.Screen
              name={ROUTES.currentAffair}
              component={Affairs}
              options={option}
            />
            <Stack.Screen
              name={ROUTES.news}
              component={News}
              options={option}
            />
            <Stack.Screen
              name={ROUTES.profile}
              component={Profile}
              options={option}
            />
            <Stack.Screen
              name={ROUTES.about}
              component={AboutApp}
              options={option}
            />
            <Stack.Screen
              name={ROUTES.syllabus}
              component={Syllabus}
              options={option}
            />
            <Stack.Screen
              name={ROUTES.freeTest}
              component={FreeTest}
              options={option}
            />
            <Stack.Screen
              name={ROUTES.paidTestSeries}
              component={PaidTestSeries}
              options={option}
            />
            <Stack.Screen
              name={ROUTES.takeTest}
              component={TakeTest}
              options={option}
            />
          </>
        </Stack.Group>
      )}
    </Stack.Navigator>
  );
};

export default StackNavigation;

const styles = StyleSheet.create({});
