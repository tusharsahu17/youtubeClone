import { Pressable, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { THEME } from '../utils/colors';
import { Tile } from '@rneui/base';

const SubmitButton = ({ title, handlePress }) => {
  return (
    <Pressable style={styles.buyNow} onPress={handlePress}>
      <Text style={styles.buyNowText}>{title}</Text>
    </Pressable>
  );
};

export default SubmitButton;

const styles = StyleSheet.create({
  buyNow: {
    flex:0.8,
    backgroundColor: THEME.COLOR_WHITE,
    borderRadius: 10,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buyNowText: {
    fontSize: 15,
    fontWeight: '700',
    color: THEME.COLOR_BLUE,
  },
});
