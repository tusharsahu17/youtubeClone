import {useSelector} from 'react-redux';
import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import Playlist from '../screens/Youtube/Playlist';
import PlayVideo from '../screens/Youtube/PlayVideo';
import Dashboard from '../screens/Youtube/Dashboard';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {ROUTES} from './routes';
import Home from '../screens/home';
import Login from '../screens/auth';
import Splash from '../screens/auth/Splash';
import TabNavigation from './TabNavigation';
import OTP from '../Auth/OTP';
import Signup from '../Auth/Signup';
import {selectUser} from '../features/auth/authSlice';

const Stack = createNativeStackNavigator();

const StackNavigation = () => {
  const {isAuthenticated} = useSelector(selectUser);
  const [timer, setTimer] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setTimer(false);
    }, 3000);
  }, []);
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
          <Stack.Screen name={ROUTES.otp} component={OTP} />
          <Stack.Screen name={ROUTES.signup} component={Signup} />
          {timer && (
            <Stack.Screen
              name={ROUTES.splash}
              component={Splash}
              options={{headerShown: false}}
            />
          )}
        </Stack.Group>
      ) : (
        <Stack.Group>
          <>
            <Stack.Screen
              name={ROUTES.tab}
              component={TabNavigation}
              options={{headerShown: false}}
            />
            <Stack.Screen name={ROUTES.playlist} component={Playlist} />
            <Stack.Screen name={ROUTES.playVideo} component={PlayVideo} />
          </>
        </Stack.Group>
      )}
    </Stack.Navigator>
  );
};

export default StackNavigation;

const styles = StyleSheet.create({});
