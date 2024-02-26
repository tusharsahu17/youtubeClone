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
import {getBlogs} from '../../services/userApi';
import {ROUTES} from '../../navigation/routes';

const Affairs = () => {
  const {width} = useWindowDimensions();
  const [blogs, setBlogs] = useState([]);
  const isFocused = useIsFocused();
  const navigation = useNavigation();

  useEffect(() => {
    fetchBlogs();
  }, [isFocused]);
  const fetchBlogs = async () => {
    const res = await getBlogs();
    if (res) {
      setBlogs(res.results);
    } else {
      console.log('err', res?.message);
    }
  };
  const renderItem = ({item}) => {
    return (
      <TouchableOpacity
        style={[
          styles.card,
          {
            maxWidth: width - 20,
          },
        ]}
        onPress={() => navigation.navigate(ROUTES.news, {item})}>
        <Image
          style={styles.cardImage}
          source={{uri: `${DOMAIN_URL}/media/${item.featured_image}`}}
        />
        <View style={styles.cardHeader}>
          <View>
            <Text style={styles.title} numberOfLines={2}>
              {item.title}
            </Text>
            <Text style={styles.description} numberOfLines={4}>
              {item.content}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };
  return (
    <FlatList
      horizontal={true}
      data={blogs}
      renderItem={renderItem}
      keyExtractor={(item, index) => index.toString()}
    />
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
    paddingVertical: 17,
    paddingHorizontal: 16,
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
    height: 150,
    resizeMode: 'stretch',
  },
  title: {
    color: THEME.COLOR_BLACK,
    fontSize: THEME.FONT_SIZE_LARGE,
    fontWeight: THEME.FONT_WEIGHT_MEDIUM,
  },
});
