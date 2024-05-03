import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {THEME} from '../utils/colors';
import AntDesign from 'react-native-vector-icons/AntDesign';
import LinearGradient from 'react-native-linear-gradient';
const Courses = ({title, bgColor1, bgColor2, icon}) => {
  return (
    <LinearGradient
      colors={[`${bgColor1}`, `${bgColor2}`]}
      start={{x: 0, y: 0}}
      end={{x: 1, y: 0}}
      style={styles.mainContainer}>
      <AntDesign
        style={{
          color: THEME.COLOR_WHITE,
          fontSize: 30,
        }}
        name={icon}
      />
      <Text style={styles.textStyle}>{title}</Text>
    </LinearGradient>
  );
};

export default Courses;

const styles = StyleSheet.create({
  mainContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: 10,
    height: 100,
    borderRadius: 10,
    margin: 5,
    marginVertical: 10,
  },
  textStyle: {
    paddingLeft: 10,
    color: THEME.COLOR_WHITE,
    fontSize: THEME.FONT_SIZE_MEDIUM,
    fontWeight: THEME.FONT_WEIGHT_LIGHT,
  },
});
