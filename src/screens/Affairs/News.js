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
      {console.log(`${DOMAIN_URL}/media${route.params.item.image}`)}
      <Image
        style={styles.cardImage}
        source={{uri: `${DOMAIN_URL}${route.params.item.image}`}}
        // source={{
        //   uri: `${details?.image}`,
        //   // uri: `${DOMAIN_URL}/media/${route.params.item.featured_image}`,
        // }}
      />

      <ScrollView style={styles.cardHeader}>
        <Text style={styles.title} numberOfLines={2}>
          {route?.params?.item?.title}
        </Text>
        <Text style={styles.description}>
          {route?.params?.item?.description}
        </Text>
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
    resizeMode: 'contain',
  },
  title: {
    fontSize: 18,
    color: THEME.COLOR_BLACK,
    fontWeight: THEME.FONT_WEIGHT_MEDIUM,
  },
});
