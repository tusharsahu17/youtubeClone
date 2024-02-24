import React from 'react';
import {SafeAreaView, StyleSheet, Text, Image} from 'react-native';
import {THEME} from '../utils/theme';
import {NODATA} from '../utils/images';
const NoData = ({msg = 'No Data Found'}) => {
  return (
    <SafeAreaView style={styles.container}>
      <Image source={NODATA} style={{marginBottom: 20}} />
      <Text style={{color: THEME.COLOR_BLACK, fontSize: 24}}>{msg}</Text>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    // flex: 1,
    backgroundColor: THEME.COLOR_WHITE,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
export default NoData;
