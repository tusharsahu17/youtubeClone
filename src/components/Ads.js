import React from 'react';
import {View, Image, Text, StyleSheet, Dimensions} from 'react-native';
import Carousel from 'react-native-snap-carousel';

const Ads = ({data}) => {
  const {width} = Dimensions.get('window');

  const renderItem = ({item}) => (
    <Image source={{uri: item.image}} style={[styles.image, {width: width}]} />
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
        sliderWidth={300}
        itemWidth={300}
        layout={'default'}
        loop
        autoplay
        autoplayInterval={8000}
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
