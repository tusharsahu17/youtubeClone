import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  FlatList,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import axios from 'axios';

const Playlist = ({navigation, route}) => {
  const key = `AIzaSyCcFzlhJ5Lr3d_RakHMVdzGIiuylwG4Ymg`;
  const playlistId = route.params.item;
  const [playlist, seyPlaylist] = useState([]);
  useEffect(() => {
    fetchPlaylist();
  }, []);
  const fetchPlaylist = async () => {
    try {
      const response = await axios.get(
        `https://www.googleapis.com/youtube/v3/playlistItems?key=${key}&playlistId=${playlistId}&part=snippet,id&order=date&maxResults=500`,
      );

      seyPlaylist(response.data.items);
    } catch (error) {
      console.error('Error fetching YouTube data ', error);
    }
  };
  const Item = ({item}) => (
    <>
      <TouchableOpacity
        onPress={() => {
          // handlePress(item),
          // setData(item?.snippet?.resourceId),
          navigation.navigate('PlayVideo', {
            item: item.snippet,
            otherParam: playlist,
          });
        }}>
        <View style={styles.container}>
          <Image
            style={{
              width: item.snippet.thumbnails.default.width,
              height: item.snippet.thumbnails.default.height,
            }}
            source={{
              uri: `${item.snippet.thumbnails.default.url}`,
            }}
          />
          <View style={styles.detailBox}>
            <Text numberOfLines={2} style={styles.titleStyle}>
              {item.snippet.title}
            </Text>
            <Text numberOfLines={2}>{item.snippet.description}</Text>
          </View>
        </View>
      </TouchableOpacity>
    </>
  );

  return (
    <View>
      <FlatList
        data={playlist}
        renderItem={({item, index}) => <Item item={item} />}
        keyExtractor={item => item.etag}
      />
    </View>
  );
};

export default Playlist;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    margin: 10,
    padding: 5,
    marginLeft: 10,
  },
  detailBox: {
    width: 230,
    marginLeft: 15,
  },
  titleStyle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
  },
});
