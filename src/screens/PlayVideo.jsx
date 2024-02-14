import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  Image,
  FlatList,
  ScrollView,
} from 'react-native';
import React, {useCallback, useState, useEffect} from 'react';
import YouTubePlayer from 'react-native-youtube-iframe';

const PlayVideo = ({route}) => {
  const [playing, setPlaying] = useState(false);
  const {width} = Dimensions.get('window');
  const [videoId, setVideoId] = useState('eVFvbJgNtjg');
  const [detail, setDetail] = useState(false);
  const [title, setTitle] = useState(route.params.item.title);
  const [desc, setDesc] = useState(route.params.item.description);

  const onStateChange = useCallback(state => {
    if (state === 'ended' || state === 'paused') {
      setPlaying(false);
    } else if (state === 'playing') {
      setPlaying(true);
    }
  }, []);
  useEffect(() => {
    setVideoId(route.params.item.resourceId.videoId);
  }, []);
  const selectNewVideo = data => {
    setVideoId(data);
  };

  const Item = ({item}) => (
    <>
      <TouchableOpacity
        onPress={() => {
          selectNewVideo(item.snippet.resourceId.videoId),
            setTitle(item.snippet.title),
            setDesc(item.snippet.description);
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
      <View
        style={{
          height: 250,
          paddingTop: 15,
        }}>
        <YouTubePlayer
          height={300}
          width={width}
          play={true}
          videoId={`${videoId}`}
          onChangeState={onStateChange}
        />
      </View>
      <TouchableOpacity onPress={() => setDetail(!detail)}>
        <View style={styles.titleContainer}>
          <Text numberOfLines={2} style={styles.titleStyle}>
            {title}
          </Text>
        </View>
      </TouchableOpacity>
      {detail ? (
        <ScrollView style={styles.detailContainer}>
          <Text style={styles.descText}>{desc}</Text>
        </ScrollView>
      ) : null}
      <FlatList
        data={route.params.otherParam}
        renderItem={({item, index}) => <Item item={item} />}
        keyExtractor={item => item.id}
      />
    </View>
  );
};

export default PlayVideo;

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
  titleContainer: {
    paddingLeft: 15,
    borderBottomWidth: 0.51,
    paddingVertical: 10,
  },
  detailContainer: {
    padding: 10,
    height: '50%',
  },
  descText: {
    paddingBottom: 70,
  },
});
