import { Pressable, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { THEME } from '../utils/colors';
import { Tile } from '@rneui/base';

const SubmitButton = ({ title, handlePress, bgColor, fColor }) => {
  return (
    <Pressable style={[styles.buyNow, { backgroundColor: bgColor ? bgColor : THEME.COLOR_WHITE }]} onPress={handlePress}>
      <Text style={[styles.buyNowText, { color: fColor ? fColor : THEME.PRIMARY_COLOR }]}>{title}</Text>
    </Pressable>
  );
};

export default SubmitButton;

const styles = StyleSheet.create({
  buyNow: {
    width: '90%',
    borderRadius: 10,
    height: 40,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buyNowText: {
    fontSize: 15,
    fontWeight: '700',
    color: THEME.COLOR_BLUE,
  },
});
