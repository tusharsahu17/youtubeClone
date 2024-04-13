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
import Entypo from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const Tab = createBottomTabNavigator();

const TabNavigation = () => {
  return (
    <Tab.Navigator initialRouteName={ROUTES.home}>
      <Tab.Group>
        <Tab.Screen
          name={ROUTES.myCourse}
          component={MyCourse}
          options={{
            headerShown: true,
            headerTintColor: THEME.COLOR_WHITE,
            tabBarBadge: 'New',
            tabBarBadgeStyle: {backgroundColor: 'red'},
            headerStyle: {backgroundColor: THEME.COLOR_BLUE},
            tabBarIcon: ({focused}) => {
              return (
                <View style={{alignItems: 'center'}}>
                  <MaterialCommunityIcons
                    style={{
                      color: focused ? THEME.PRIMARY_COLOR : THEME.COLOR_BLACK,
                      fontSize: 25,
                    }}
                    name="bookshelf"
                  />
                  {/* <Text style={styles.textStyle}>Documents</Text> */}
                </View>
              );
            },
            // tabBarIcon: ({color, size}) => <Text>Book</Text>,
          }}
        />
        <Tab.Screen
          name={ROUTES.downloads}
          component={Downloads}
          options={{
            headerShown: true,
            headerTintColor: THEME.COLOR_WHITE,
            headerStyle: {backgroundColor: THEME.COLOR_BLUE},
            tabBarIcon: ({focused}) => {
              return (
                <View style={{alignItems: 'center'}}>
                  <Entypo
                    style={{
                      color: focused ? THEME.PRIMARY_COLOR : THEME.COLOR_BLACK,
                      fontSize: 25,
                    }}
                    name="cloud"
                  />
                  {/* <Text style={styles.textStyle}>Documents</Text> */}
                </View>
              );
            },
          }}
        />
        <Tab.Screen
          name={ROUTES.home}
          component={Home}
          options={{
            headerShown: true,
            headerTintColor: THEME.COLOR_WHITE,
            headerStyle: {backgroundColor: THEME.COLOR_BLUE},
            tabBarIcon: ({focused}) => {
              return (
                <View style={styles.homeIcon}>
                  <Entypo
                    style={{
                      color: focused ? THEME.PRIMARY_COLOR : THEME.COLOR_BLACK,
                      fontSize: 35,
                    }}
                    name="home"
                  />
                </View>
              );
            },
          }}
        />
        <Tab.Screen
          name={ROUTES.youtube}
          component={Youtube}
          options={{
            headerShown: true,
            headerTintColor: THEME.COLOR_WHITE,
            headerStyle: {backgroundColor: THEME.COLOR_BLUE},
            tabBarIcon: ({focused}) => {
              return (
                <View style={{alignItems: 'center'}}>
                  <AntDesign
                    style={{
                      color: focused
                        ? THEME.COLOR_DANGER_DARK
                        : THEME.COLOR_BLACK,
                      fontSize: 25,
                    }}
                    name="youtube"
                  />
                  {/* <Text style={styles.textStyle}>Documents</Text> */}
                </View>
              );
            },
          }}
        />
        <Tab.Screen
          name={ROUTES.settings}
          component={Settings}
          options={{
            headerShown: true,
            headerTintColor: THEME.COLOR_WHITE,
            headerStyle: {backgroundColor: THEME.COLOR_BLUE},
            tabBarIcon: ({focused}) => {
              return (
                <View style={{alignItems: 'center'}}>
                  <Ionicons
                    style={{
                      color: focused ? THEME.PRIMARY_COLOR : THEME.COLOR_BLACK,
                      fontSize: 25,
                    }}
                    name="settings-sharp"
                  />
                  {/* <Text style={styles.textStyle}>Documents</Text> */}
                </View>
              );
            },
          }}
        />
      </Tab.Group>
    </Tab.Navigator>
  );
};

export default TabNavigation;

const styles = StyleSheet.create({
  homeIcon: {
    alignItems: 'center',
    bottom: 15,
    width: 60,
    height: 60,
    borderRadius: 40,
    elevation: 5,
    justifyContent: 'center',
    backgroundColor: THEME.COLOR_WHITE,
  },
});
