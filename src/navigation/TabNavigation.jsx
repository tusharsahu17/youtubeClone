import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {ROUTES} from './routes';
import Home from '../screens/home';
import MyCourse from '../screens/MyCourse';
import Downloads from '../screens/Downloads';
import Settings from '../screens/Settings';
import Youtube from '../screens/Youtube/Dashboard';
import {THEME} from '../utils/colors';
const Tab = createBottomTabNavigator();

const TabNavigation = () => {
  return (
    <Tab.Navigator>
      <Tab.Group>
        <Tab.Screen
          name={ROUTES.home}
          component={Home}
          options={{
            headerShown: true,
            tabBarIcon: ({color, size}) => <Text>Home</Text>,
            // headerStyle: {
            //   backgroundColor: THEME.THEME_COLOR,
            // },
            // headerTintColor: THEME.COLOR_BLACK,
            // headerTitleStyle: {
            //   fontWeight: 'bold',
            // },
          }}
        />
        <Tab.Screen
          name={ROUTES.myCourse}
          component={MyCourse}
          options={{
            headerShown: false,
            tabBarIcon: ({color, size}) => <Text>Book</Text>,
          }}
        />
        <Tab.Screen
          name={ROUTES.downloads}
          component={Downloads}
          options={{
            headerShown: false,
            tabBarIcon: ({color, size}) => <Text>Download</Text>,
          }}
        />
        <Tab.Screen
          name={ROUTES.youtube}
          component={Youtube}
          options={{
            headerShown: false,
            tabBarIcon: ({color, size}) => <Text>YouTube</Text>,
          }}
        />
        <Tab.Screen
          name={ROUTES.settings}
          component={Settings}
          options={{
            headerShown: false,
            tabBarIcon: ({color, size}) => <Text>Settings</Text>,
          }}
        />
      </Tab.Group>
    </Tab.Navigator>
  );
};

export default TabNavigation;

const styles = StyleSheet.create({});
