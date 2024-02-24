import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {THEME} from '../utils/colors';

const Courses = ({title}) => {
  return (
    <View style={styles.mainContainer}>
      <Text style={styles.textStyle}>{title}</Text>
    </View>
  );
};

export default Courses;

const styles = StyleSheet.create({
  mainContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 100,
    borderRadius: 10,
    margin: 5,
    backgroundColor: THEME.THEME_COLOR,
  },
  textStyle: {
    color: THEME.COLOR_BLACK,
    fontSize: THEME.FONT_SIZE_MEDIUM,
    fontWeight: THEME.FONT_WEIGHT_LIGHT,
  },
});
