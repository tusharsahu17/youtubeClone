import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import {ROUTES} from '../../navigation/routes';
import {THEME} from '../../utils/colors';
import {logout, selectUser} from '../../features/auth/authSlice';
import {useDispatch, useSelector} from 'react-redux';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
const Settings = ({navigation}) => {
  const dispatch = useDispatch();
  const {isAuthenticated} = useSelector(selectUser);
  const logouts = () => {
    dispatch(logout());
  };
  return (
    <View style={styles.maincontainer}>
      <View style={styles.container}>
        <Text style={styles.titleStyle}>Your account</Text>
        <TouchableOpacity
          onPress={() => navigation.navigate(ROUTES.profile)}
          style={styles.styling}>
          <View style={styles.itemContainer}>
            <FontAwesome
              style={{
                color: THEME.COLOR_BLACK,
                fontSize: 25,
              }}
              name="user-circle-o"
            />
            <Text style={styles.textStyle}>Edit Profile</Text>
          </View>
          <AntDesign
            style={{
              fontSize: 20,
            }}
            name="right"
          />
        </TouchableOpacity>
      </View>
      <View style={styles.container}>
        <Text style={styles.titleStyle}>More info and support</Text>
        <TouchableOpacity
          style={styles.styling}
          onPress={() => navigation.navigate(ROUTES.about)}>
          <View style={styles.itemContainer}>
            <AntDesign
              style={{
                color: THEME.COLOR_BLACK,
                fontSize: 25,
              }}
              name="appstore-o"
            />
            <Text style={styles.textStyle}>About App</Text>
          </View>
          <AntDesign
            style={{
              fontSize: 20,
            }}
            name="right"
          />
        </TouchableOpacity>
      </View>
      <View style={styles.container}>
        <Text style={styles.titleStyle}>Login</Text>
        <TouchableOpacity style={styles.styling} onPress={logouts}>
          <View style={styles.itemContainer}>
            <MaterialCommunityIcons
              style={{
                color: THEME.COLOR_DANGER,
                fontSize: 25,
              }}
              name="logout"
            />
            <Text style={[styles.textStyle, {color: THEME.COLOR_DANGER}]}>
              Logout
            </Text>
          </View>
          <AntDesign
            style={{
              fontSize: 20,
            }}
            name="right"
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Settings;

const styles = StyleSheet.create({
  maincontainer: {
    flex: 1,
    marginHorizontal: 20,
  },
  container: {
    marginVertical: 20,
  },

  itemContainer: {
    flexDirection: 'row',
    paddingVertical: 10,
  },
  titleStyle: {
    fontWeight: '500',
    fontSize: 16,
  },
  textStyle: {
    marginLeft: 20,
    marginTop: 5,
    color: THEME.COLOR_BLACK,
  },
  styling: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});
