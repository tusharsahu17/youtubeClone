import React, {useState, useEffect} from 'react';
import {Image} from 'react-native';

const ImageCarousel = ({data}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex(prevIndex => (prevIndex + 1) % data.length);
    }, 5000);
  
    return () => clearInterval(interval);
  }, [data.length]);
  

  return (
    <Image
    source={{
      uri: data.length > 0 ? data[currentIndex]?.image : 'https://www.generationsforpeace.org/wp-content/uploads/2018/03/empty.jpg',
    }}
    style={{width: '100%', height: '100%'}}
  />
  );
};

export default ImageCarousel;
