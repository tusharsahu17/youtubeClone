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
  console.log(details);
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
          uri: `${details?.image}`,

          // uri: `${DOMAIN_URL}/media/${route.params.item.featured_image}`,
        }}
      />

      <ScrollView style={styles.cardHeader}>
        <Text style={styles.title} numberOfLines={2}>
          {route.params.item.title}
        </Text>
        <Text style={styles.description}>{route.params.item.content}</Text>
      </ScrollView>
    </ScrollView>
  );
};

export default News;

const styles = StyleSheet.create({
  card: {
    width: 320,
    marginVertical: 8,
    backgroundColor: THEME.COLOR_WHITE,
    borderRadius: 8,
    overflow: 'hidden',
    marginHorizontal: 20,
  },
  cardHeader: {
    paddingVertical: 17,
    paddingHorizontal: 16,
    backgroundColor: THEME.COLOR_WHITE,
  },
  cardFooter: {
    borderWidth: 1,
    borderBottomWidth: 1.55,
    borderColor: THEME.BACKGROUND_COLOR_GRAY,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingBottom: 10,
    paddingVertical: 10,
    marginTop: 30,
    backgroundColor: THEME.COLOR_WHITE,
  },
  cardImage: {
    height: 300,
    marginHorizontal: 10,
    resizeMode: 'stretch',
  },
  title: {
    fontSize: 18,
    color: THEME.COLOR_BLACK,
    fontWeight: THEME.FONT_WEIGHT_MEDIUM,
  },
});
