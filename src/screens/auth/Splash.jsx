import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {ROUTES} from '../../navigation/routes';
import {THEME} from '../../utils/colors';
import {LOGO} from '../../utils/image';

const Splash = ({navigation}) => {
  return (
    <View style={styles.mainContainer}>
      <Image style={styles.tinyLogo} source={LOGO} />
      <TouchableOpacity
        style={styles.btnStyle}
        onPress={() => navigation.navigate(ROUTES.dashboard)}>
        <Text style={styles.textStyle}>Login</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Splash;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  btnStyle: {
    marginTop: 20,
    width: 100,
    height: 40,
    justifyContent: 'center',
    alignSelf: 'center',
    textAlignVertical: 'center',
    backgroundColor: THEME.COLOR_BLUE,
  },
  textStyle: {
    alignSelf: 'center',
    color: THEME.COLOR_WHITE,
  },
  tinyLogo: {
    width: 300,
    height: 300,
    alignSelf: 'center',
  },
});
