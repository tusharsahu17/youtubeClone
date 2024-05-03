import React from 'react';
import {View, Image, Text, StyleSheet, Dimensions} from 'react-native';
import Carousel from 'react-native-snap-carousel';
import {DOMAIN_URL} from '../utils/constants';

const Ads = ({data}) => {
  const renderItem = ({item}) => (
    <Image
      source={{uri: `${DOMAIN_URL}${item.image}`}}
      style={[styles.image, {width: '100%'}]}
    />
  );

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignSelf: 'center',
      }}>
      <Carousel
        data={data}
        renderItem={renderItem}
        sliderWidth={400}
        itemWidth={300}
        layout={'default'}
        loop
        autoplay
        autoplayInterval={5000}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  carouselItem: {
    justifyContent: 'center',
  },
  image: {
    height: 200,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 10,
  },
  subtitle: {
    fontSize: 14,
    color: '#555',
    marginTop: 5,
  },
});

export default Ads;
