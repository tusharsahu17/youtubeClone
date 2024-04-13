import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {paidCourse} from '../../services/userApi';
import {THEME} from '../../utils/colors';
import PaidExams from './paidCourse/PaidExams';
import {ROUTES} from '../../navigation/routes';
import {PAID_COURSE} from '../../utils/DataKey';

const PaidCourses = ({navigation}) => {
  // const [courseData, setCourseData] = useState([]);
  const courseData = PAID_COURSE;
  // const getAllcourse = async () => {
  //   const res = await paidCourse();
  //   if (res) {
  //     setCourseData(res.data);
  //   }
  // };

  // useEffect(() => {
  //   getAllcourse();
  // }, []);
  const handlePress = item => {
    navigation.navigate(ROUTES.paidDetails, {item});
  };

  const Item = ({item}) => (
    <View style={styles.item}>
      <TouchableOpacity
        onPress={() => handlePress(item)}
        style={styles.itemContainer}>
        <Image style={styles.cardImage} source={{uri: `${item.image}`}} />
        <View style={styles.detail}>
          <Text style={styles.title}>{item?.title}</Text>
          <View style={[styles.itemContainer, {marginTop: 5}]}>
            <Text style={styles.title}>₹{item?.price}</Text>
            <Text style={[styles.title, styles.oldPrice]}>
              ₹{item?.oldPrice}
            </Text>
            <Text style={[styles.title, {color: 'red'}]}>{item?.discount}</Text>
          </View>
        </View>
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
    // backgroundColor: THEME.COLOR_BLUE,
    padding: 10,
    marginVertical: 5,
    marginHorizontal: 10,
    borderRadius: 3,
    borderWidth: 0.1,
  },
  title: {
    marginHorizontal: 5,
    fontWeight: '500',
    color: THEME.COLOR_BLACK,
  },
  itemContainer: {
    flex: 1,
    flexDirection: 'row',
  },
  cardImage: {
    flex: 0.3,
    height: 80,
    width: 80,
    resizeMode: 'cover',
  },
  detail: {
    flex: 0.7,
    marginLeft: 10,
  },
  oldPrice: {
    textDecorationLine: 'line-through',
  },
});
