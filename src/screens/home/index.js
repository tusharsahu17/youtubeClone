import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Courses from '../../components/Courses';
import Ads from '../../components/Ads';
import {THEME} from '../../utils/colors';
import Affairs from '../Affairs';
import {ROUTES} from '../../navigation/routes';
import {ADS} from '../../utils/DataKey';
import AntDesign from 'react-native-vector-icons/AntDesign';
const Home = ({navigation}) => {
  const [slider, setSlider] = useState([]);
  useEffect(() => {
    setSlider(ADS);
  }, []);
  const fetchSlider = async () => {
    // try {
    //   const res = await getSliderImages();
    //   if (res) {
    //     setSlider(res);
    //   } else {
    //     setSlider([]);
    //   }
    // } catch (error) {
    //   console.error('Error fetching data:', error);
    // }
  };

  useEffect(() => {
    fetchSlider();
  }, []);
  const handlePaidCourse = async () => {
    navigation.navigate(ROUTES.paidCourse);
  };
  const handleFreeCourse = async () => {
    navigation.navigate(ROUTES.youtube);
  };
  const handleFreeTest = async () => {
    navigation.navigate(ROUTES.freeTest);
  };
  return (
    <ScrollView style={styles.container}>
      <Ads data={slider} />
      <View style={styles.styling}>
        <Text style={styles.headingText}>Courses :</Text>
        <View style={styles.courseContainer}>
          <View style={styles.courses}>
            <TouchableOpacity onPress={handlePaidCourse}>
              <Courses
                title={'Paid Course'}
                bgColor={'#007F73'}
                icon={'windows'}
              />
            </TouchableOpacity>
            <Courses
              title={'Paid Test'}
              bgColor={'#86B6F6'}
              icon={'switcher'}
            />
            <Courses
              title={'E-Books'}
              bgColor={'#4CCD99'}
              icon={'CodeSandbox'}
            />
          </View>
          <View style={styles.courses}>
            <TouchableOpacity onPress={handleFreeCourse}>
              <Courses title={'Free Course'} bgColor={'red'} icon={'youtube'} />
            </TouchableOpacity>
            <TouchableOpacity onPress={handleFreeTest}>
              <Courses
                title={'Free Test'}
                bgColor={THEME.COLOR_BLUE}
                icon={'videocamera'}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => navigation.navigate(ROUTES.syllabus)}>
              <Courses
                title={'Syllabus'}
                bgColor={'#BAD1C2'}
                icon={'profile'}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <Text style={styles.headingText}>Current Affairs & News :</Text>
      <Affairs />
    </ScrollView>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: THEME.COLOR_WHITE,
  },
  courseContainer: {
    flexDirection: 'row',
    marginVertical: 20,
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
  styling: {
    marginVertical: 20,
  },
});
