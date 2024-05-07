import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useLayoutEffect, useState} from 'react';
import {THEME} from '../../utils/colors';
import {DOMAIN_URL} from '../../utils/constants';
import {ROUTES} from '../../navigation/routes';

const News = ({navigation, route}) => {
  const details = route?.params?.item;
  useLayoutEffect(() => {
    navigation.setOptions({
      title: details?.title,
    });
  }, [navigation]);

  return (
    <ScrollView
      style={{
        flex: 1,
        paddingTop: 10,
        backgroundColor: THEME.COLOR_WHITE,
      }}>
      <Image
        style={styles.cardImage}
        source={{
          // uri: `${details?.image}`,
          uri: `${DOMAIN_URL}${details?.image}`,
        }}
      />

      <ScrollView style={styles.cardHeader}>
        <Text style={styles.title} numberOfLines={2}>
          {details?.title}
        </Text>
        <Text style={styles.description}>{details?.description}</Text>
      </ScrollView>
    </ScrollView>
  );
};

export default News;

const styles = StyleSheet.create({
  cardHeader: {
    paddingVertical: 17,
    paddingHorizontal: 16,
    backgroundColor: THEME.COLOR_WHITE,
  },
  cardImage: {
    height: 300,
    marginHorizontal: 10,
  },
  title: {
    fontSize: 18,
    color: THEME.COLOR_BLACK,
    fontWeight: THEME.FONT_WEIGHT_MEDIUM,
  },
});
