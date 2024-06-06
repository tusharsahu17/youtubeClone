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
import Feather from 'react-native-vector-icons/Feather';
import LinearGradient from 'react-native-linear-gradient';
import {getSliderImages} from '../../services/userApi';

const Home = ({navigation}) => {
  const [slider, setSlider] = useState([]);
  const fetchSlider = async () => {
    try {
      const res = await getSliderImages();
      if (res.status) {
        setSlider(res?.data);
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
              <LinearGradient
                colors={['#00B4DB', '#0083B0']}
                style={styles.linearContainer}
                start={{x: 0.0, y: 1.0}}
                end={{x: 1.0, y: 1.0}}>
                <AntDesign
                  style={{
                    color: THEME.COLOR_WHITE,
                    fontSize: 30,
                  }}
                  name={'windows'}
                />
                <Text style={styles.textStyle}>Paid Course</Text>
              </LinearGradient>
            </TouchableOpacity>
            <TouchableOpacity onPress={handlePaidTest}>
              <LinearGradient
                colors={['#DA4453', '#89216B']}
                style={styles.linearContainer}
                start={{x: 0.0, y: 1.0}}
                end={{x: 1.0, y: 1.0}}>
                <AntDesign
                  style={{
                    color: THEME.COLOR_WHITE,
                    fontSize: 30,
                  }}
                  name={'switcher'}
                />
                <Text style={styles.textStyle}>Paid Test</Text>
              </LinearGradient>
            </TouchableOpacity>
            <LinearGradient
              colors={['#38EF7D', '#11998E']}
              style={styles.linearContainer}
              start={{x: 0.0, y: 1.0}}
              end={{x: 1.0, y: 1.0}}>
              <Feather
                style={{
                  color: THEME.COLOR_WHITE,
                  fontSize: 30,
                }}
                name={'codesandbox'}
              />
              <Text style={styles.textStyle}>E-Books</Text>
            </LinearGradient>
          </View>
          <View style={styles.courses}>
            <TouchableOpacity onPress={handleFreeCourse}>
              <LinearGradient
                colors={['#FF512F', '#DD2476']}
                style={styles.linearContainer}
                start={{x: 0.0, y: 1.0}}
                end={{x: 1.0, y: 1.0}}>
                <AntDesign
                  style={{
                    color: THEME.COLOR_WHITE,
                    fontSize: 30,
                  }}
                  name={'youtube'}
                />
                <Text style={styles.textStyle}>Free Course</Text>
              </LinearGradient>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleFreeTest}>
              <LinearGradient
                colors={['#f12711', '#f5af19']}
                style={styles.linearContainer}
                start={{x: 0.0, y: 1.0}}
                end={{x: 1.0, y: 1.0}}>
                <AntDesign
                  style={{
                    color: THEME.COLOR_WHITE,
                    fontSize: 30,
                  }}
                  name={'videocamera'}
                />
                <Text style={styles.textStyle}>Free Test</Text>
              </LinearGradient>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => navigation.navigate(ROUTES.syllabus)}>
              <LinearGradient
                colors={['#a8c0ff', '#3f2b96']}
                style={styles.linearContainer}
                start={{x: 0.0, y: 1.0}}
                end={{x: 1.0, y: 1.0}}>
                <AntDesign
                  style={{
                    color: THEME.COLOR_WHITE,
                    fontSize: 30,
                  }}
                  name={'profile'}
                />
                <Text style={styles.textStyle}>Syllabus</Text>
              </LinearGradient>
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
  textStyle: {
    paddingLeft: 10,
    color: THEME.COLOR_WHITE,
    fontSize: THEME.FONT_SIZE_MEDIUM,
    fontWeight: THEME.FONT_WEIGHT_LIGHT,
  },
  linearContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: 10,
    height: 100,
    borderRadius: 10,
    margin: 5,
    marginVertical: 10,
  },
});
