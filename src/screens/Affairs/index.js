import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {THEME} from '../../utils/colors';

const Affairs = () => {
  return (
    <View style={styles.container}>
      <Text>Affairs</Text>
    </View>
  );
};

export default Affairs;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 5,
    borderRadius: 10,
    width: '100%',
    marginBottom: 20,
    height: 300,
    backgroundColor: THEME.THEME_COLOR,
  },
});
