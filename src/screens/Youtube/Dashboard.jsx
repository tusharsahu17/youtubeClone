import axios from 'axios';
import React, {useEffect, useState} from 'react';
import {
  Dimensions,
  FlatList,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
} from 'react-native';
import {LOGO} from '../../utils/image';

const Dashboard = ({navigation}) => {
  const [playing, setPlaying] = useState(false);
  const {width} = Dimensions.get('window');

  const [videos, setVideos] = useState([]);
  // const API_URL = `https://www.googleapis.com/youtube/v3/`;
  const channelId = `UCMkyN5u59UrY8DK1ZdCXYEw`;
  const key = `AIzaSyCcFzlhJ5Lr3d_RakHMVdzGIiuylwG4Ymg`;
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `https://www.googleapis.com/youtube/v3/playlists?key=${key}&channelId=${channelId}&part=snippet,id&maxResults=100`,
      );
      setVideos(response.data.items);
    } catch (error) {
      console.error('Error fetching YouTube data', error);
    }
  };

  const Item = ({item}) => (
    <>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('Playlist', {
            item: item.id,
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
            <Text numberOfLines={2}>{item.snippet.channelTitle}</Text>
          </View>
        </View>
      </TouchableOpacity>
    </>
  );

  return (
    <View style={{flex: 1}}>
      <View style={{backgroundColor: '#E0F4FF'}}>
        <Image
          style={{
            width: 70,
            height: 70,
            borderRadius: 50,
            alignSelf: 'center',
            marginTop: 20,
          }}
          source={LOGO}
        />

        <Text style={styles.headingText}>COMPETITIVE EDUCATION CENTER</Text>
      </View>
      <Text style={{paddingLeft: 20, paddingVertical: 10}}>All Videos:</Text>
      <FlatList
        data={videos}
        renderItem={({item, index}) => <Item item={item} />}
        keyExtractor={item => item.etag}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  headingText: {
    color: 'black',
    fontSize: 25,
    fontWeight: '700',
    justifyContent: 'center',
    alignSelf: 'center',
    textAlign: 'center',
    marginVertical: 20,
  },
  container: {
    flexDirection: 'row',
    margin: 10,
    paddingHorizontal: 5,
    marginLeft: 10,
  },
  titleStyle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
  },
  detailBox: {
    width: 230,
    marginLeft: 15,
  },
});

export default Dashboard;
