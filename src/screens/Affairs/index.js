import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {THEME} from '../../utils/colors';
import {DOMAIN_URL} from '../../utils/constants';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import {ROUTES} from '../../navigation/routes';
import {CURRENT_AFFAIRS} from '../../utils/DataKey';

const Affairs = () => {
  const {width} = useWindowDimensions();
  const [currentAffairs, setCurrentAffairs] = useState([]);
  const isFocused = useIsFocused();
  const navigation = useNavigation();
  const data = CURRENT_AFFAIRS;
  useEffect(() => {
    fetchCurrentAffairs();
    setCurrentAffairs(CURRENT_AFFAIRS);
  }, [isFocused]);
  const fetchCurrentAffairs = async () => {
    // const res = await getBlogs();
    // if (res) {
    //   setCurrentAffairs(res.results);
    // } else {
    //   console.log('err', res?.message);
    // }
  };
  const renderItem = ({item}) => {
    return (
      <TouchableOpacity
        style={[
          styles.card,
          {
            maxWidth: width - 50,
          },
        ]}
        onPress={() => navigation.navigate(ROUTES.news, {item})}>
        <Image style={styles.cardImage} source={{uri: `${item.image}`}} />
        <View style={styles.cardHeader}>
          <View>
            <Text style={styles.title} numberOfLines={2}>
              {item.title}
            </Text>
            <Text style={styles.description} numberOfLines={7}>
              {item.content}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };
  return (
    <View style={styles.container}>
      <FlatList
        horizontal={true}
        data={currentAffairs}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
};

export default Affairs;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 5,
    marginBottom: 20,
  },
  card: {
    marginVertical: 8,
    backgroundColor: THEME.COLOR_WHITE,
    borderRadius: 10,
    marginRight: 20,
    elevation: 5,
  },
  cardHeader: {
    height: 200,
    paddingVertical: 20,
    paddingHorizontal: 20,
    borderTopLeftRadius: 1,
    borderTopRightRadius: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  cardContent: {
    paddingVertical: 12.5,
    paddingHorizontal: 16,
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingBottom: 10,
  },
  cardImage: {
    height: 200,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    resizeMode: 'cover',
  },
  title: {
    color: THEME.COLOR_BLACK,
    fontSize: THEME.FONT_SIZE_LARGE,
    fontWeight: THEME.FONT_WEIGHT_MEDIUM,
  },
});
