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
import {getSliderImages} from '../../services/userApi';
const Home = ({navigation}) => {
  const [slider, setSlider] = useState([]);
  useEffect(() => {
    setSlider(ADS);
  }, []);
  const fetchSlider = async () => {
    try {
      const res = await getSliderImages();
      if (res.status) {
        setSlider(res.data);
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
  const handlePaidCourse = async () => {
    navigation.navigate(ROUTES.paidCourse);
  };
  const handlePaidTest = async () => {
    navigation.navigate(ROUTES.paidTestSeries);
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
                bgColor1={'#BCE7FC'}
                bgColor2={'#5CA9E9'}
                icon={'windows'}
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={handlePaidTest}>
              <Courses
                title={'Paid Test'}
                bgColor1={'#F7DBA7'}
                bgColor2={'#F0AB86'}
                icon={'switcher'}
              />
            </TouchableOpacity>
            <Courses
              title={'E-Books'}
              bgColor1={'#4CCD99'}
              bgColor2={'#007F73'}
              icon={'CodeSandbox'}
            />
          </View>
          <View style={styles.courses}>
            <TouchableOpacity onPress={handleFreeCourse}>
              <Courses
                title={'Free Course'}
                bgColor2={'#ed4264'}
                bgColor1={'#ff7e5f'}
                icon={'youtube'}
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={handleFreeTest}>
              <Courses
                title={'Free Test'}
                bgColor1={'#DA3068'}
                bgColor2={'#14469F'}
                icon={'videocamera'}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => navigation.navigate(ROUTES.syllabus)}>
              <Courses
                title={'Syllabus'}
                bgColor1={'#31B7C2'}
                bgColor2={'#7BC393'}
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
