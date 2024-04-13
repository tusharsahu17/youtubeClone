import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {paidCourse} from '../../services/userApi';
import {THEME} from '../../utils/colors';
import PaidExams from './paidCourse/PaidExams';
import {ROUTES} from '../../navigation/routes';

const PaidCourses = ({navigation}) => {
  const [courseData, setCourseData] = useState([]);

  const getAllcourse = async () => {
    const res = await paidCourse();
    if (res) {
      setCourseData(res.data);
    }
  };

  useEffect(() => {
    getAllcourse();
  }, []);
  const handlePress = item => {
    navigation.navigate(ROUTES.PaidExams);
  };

  const Item = ({item}) => (
    <View style={styles.item}>
      <TouchableOpacity onPress={() => handlePress(item)}>
        <Text style={styles.title}>{item.courseName}</Text>
      </TouchableOpacity>
    </View>
  );
  return (
    <View>
      <FlatList
        data={courseData}
        renderItem={({item}) => <Item item={item} />}
        keyExtractor={item => item.id}
      />
    </View>
  );
};

export default PaidCourses;

const styles = StyleSheet.create({
  item: {
    backgroundColor: THEME.COLOR_BLUE,
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    color: THEME.COLOR_WHITE,
    fontWeight: '500',
  },
});
