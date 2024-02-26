import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {ROUTES} from '../../navigation/routes';
import {THEME} from '../../utils/colors';
import {logout} from '../../features/auth/authSlice';
import {useDispatch} from 'react-redux';

const Settings = ({navigation}) => {
  const dispatch = useDispatch();

  const Item = ({title}) => {
    return (
      <View style={styles.itemContainer}>
        <View
          style={{
            width: 50,
            borderWidth: 1,
            marginRight: 20,
          }}
        />
        <Text style={styles.textStyle}>{title}</Text>
      </View>
    );
  };
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.navigate(ROUTES.profile)}>
        <Item title={'Edit Profile'} />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate(ROUTES.about)}>
        <Item title={'About App'} />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => dispatch(logout())}>
        <Item title={'Logout'} />
      </TouchableOpacity>
    </View>
  );
};

export default Settings;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 20,
  },
  itemContainer: {
    flexDirection: 'row',
    paddingVertical: 10,
  },
  textStyle: {
    fontSize: THEME.FONT_SIZE_MEDIUM,
    fontWeight: THEME.FONT_WEIGHT_MEDIUM,
  },
});
