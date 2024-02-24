import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Courses from '../../components/Courses';
import Ads from '../../components/Ads';
import {THEME} from '../../utils/colors';
import Affairs from '../Affairs';
import {getSliderImages} from '../../services/userApi';

const Home = ({navigation}) => {
  const [slider, setSlider] = useState([]);

  const fetchSlider = async () => {
    try {
      const res = await getSliderImages();
      if (res) {
        setSlider(res);
      } else {
        setSlider([]);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchSlider();
  }, []);

  return (
    <ScrollView style={styles.container}>
      {slider.length > 0 && <Ads data={slider} />}
      <>
        <Text style={styles.headingText}>Courses :</Text>
        <View style={styles.courseContainer}>
          <View style={styles.courses}>
            <Courses title={'Paid Course'} />
            <Courses title={'Paid Test'} />
            <Courses title={'E-Books'} />
          </View>
          <View style={styles.courses}>
            <Courses title={'Free Course'} />
            <Courses title={'Free Test'} />
            <Courses title={'Syllabus'} />
          </View>
        </View>
      </>
      <Text style={styles.headingText}>Current Affairs & News :</Text>
      <Affairs />
    </ScrollView>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    padding: 10,
    borderWidth: 1,
    backgroundColor: THEME.COLOR_WHITE,
  },
  courseContainer: {
    flexDirection: 'row',
  },
  headingText: {
    color: THEME.COLOR_BLACK,
    fontSize: THEME.FONT_SIZE_MEDIUM,
    fontWeight: THEME.FONT_WEIGHT_BOLD,
    alignSelf: 'flex-start',
  },
  courses: {
    flex: 1,
  },
});
