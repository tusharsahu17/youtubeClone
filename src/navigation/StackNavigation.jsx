import { StyleSheet, Text, View } from 'react-native';
import React, { useState } from 'react';
import Playlist from '../screens/Playlist';
import PlayVideo from '../screens/PlayVideo';
import Dashboard from '../screens/Dashboard';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ROUTES } from './routes';
import Home from '../screens/home';
import Login from '../screens/auth';

const StackNavigation = () => {
  const { isAuthenticated } = useState(false);

  const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator>
      {isAuthenticated ?
        <Stack.Group>
          <Stack.Screen
            name={ROUTES.login}
            component={Login}
            options={{ headerShown: false }}
          />
        </Stack.Group>
        : <Stack.Group>
          <Stack.Screen
            name={ROUTES.home}
            component={Home}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name={ROUTES.dashboard}
            component={Dashboard}
            options={{ headerShown: false }}
          />
          <Stack.Screen name={ROUTES.playlist} component={Playlist} />
          <Stack.Screen name={ROUTES.playVideo} component={PlayVideo} />
        </Stack.Group>
      }
    </Stack.Navigator>
  );
};

export default StackNavigation;

const styles = StyleSheet.create({});
