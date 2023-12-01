import axios from 'axios';
import React, { useCallback, useEffect, useState } from 'react';
import {
  Dimensions,
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  View, TextInput, Image, TouchableOpacity, Modal, Alert, Pressable
} from 'react-native';
import YouTubePlayer from 'react-native-youtube-iframe';

const App = () => {
  const [playing, setPlaying] = useState(false)
  const { width } = Dimensions.get('window');
  const [data, setData] = useState([])
  const [number, onChangeNumber] = React.useState('');
  const [modalVisible, setModalVisible] = useState(false);


  const handlePress = (item: any) => {
    setModalVisible(true)
  }
  const [videos, setVideos] = useState([]);
  const API_URL = `https://www.googleapis.com/youtube/v3/`;
  const playlistId = `PLk5e2eVq6bx6lAiJnls8-boHQYBISEQ4V`;
  // ===>https://youtube.com/playlist?list=PLk5e2eVq6bx6lAiJnls8-boHQYBISEQ4V&si=D_S8O3OTFMJRkgXf
  const channelId = `UCMkyN5u59UrY8DK1ZdCXYEw`
  useEffect(() => {

    fetchData();
  }, []);
  const key = `AIzaSyCcFzlhJ5Lr3d_RakHMVdzGIiuylwG4Ymg`;

  const fetchData = async () => {
    try {
      const response = await axios.get(
        // `https://www.googleapis.com/youtube/v3/search?key=${key}&channelId=${channelId}&part=snippet,id&order=date&maxResults=500`
        //  `https://www.googleapis.com/youtube/v3/playlistItems?key=${key}&playlistId=${playlistId}&part=snippet,id&order=date&maxResults=500`
         `https://www.googleapis.com/youtube/v3/playlists?key=${key}&channelId=${channelId}&part=snippet,id&maxResults=100`
        // `https://www.googleapis.com/youtube/v3/playlistItems?key=${key}&playlistId=${playlistId}&part=snippet,id&order=date&maxResults=500`
      );

      setVideos(response.data.items);
    } catch (error) {
      console.error('Error fetching YouTube data=======>', error);
    }
  };

  // useEffect(() => {
  //   fetch(`${API_URL}playlistItems?part=snippet&playlistId=${playlistId}&si=cdx-oQ5MjLVNg1A8&maxResults=500&key=${key}`)
  //     .then((response) => response.json())
  //     .then((data) => {
  //       setVideos(data.items);
  //     })
  //     .catch((error) => console.error('Error fetching playlist:', error));
  // }, []);
  const onStateChange = useCallback((state: string) => {
    if (state === 'ended' || state === 'paused') {
      setPlaying(false);
    } else if (state === 'playing') {
      setPlaying(true);
    }
  }, [])

  const Item = ({ item }) => (
    <>
      <TouchableOpacity onPress={() => { handlePress(item), setData(item?.snippet?.resourceId) }}>
        <View style={styles.container}>
          <Image
            style={{ width: item.snippet.thumbnails.default.width, height: item.snippet.thumbnails.default.height, }}
            source={{
              uri: `${item.snippet.thumbnails.default.url}`,
            }}
          />
          <View style={styles.detailBox}>
            <Text numberOfLines={2} style={styles.titleStyle}>{item.snippet.title}</Text>
            <Text numberOfLines={2}>{item.snippet.description}</Text>
          </View>
        </View>
      </TouchableOpacity>
    </>
  );

  return (
    <View style={{ flex: 1, backgroundColor: playing ? 'black' : 'white' }}>
      <Text style={styles.headingText}>Youtube Playlist</Text>
      <View style={{ alignContent: 'center', marginTop: 20 }}>
      </View>

      <TextInput
        style={styles.input}
        onChangeText={onChangeNumber}
        value={number}
        placeholder="useless placeholder"
        keyboardType="numeric"
      />
      {/* */}

      <FlatList
        data={videos}
        renderItem={({ item, index }) => <Item item={item} />}
        keyExtractor={item => item.etag}
      />
      <View style={styles.centeredView}>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            Alert.alert('Video has been closed.');
            setModalVisible(!modalVisible);
          }}>
          <View style={styles.centeredView}>
            <View style={[{ flex: 1, backgroundColor: playing ? 'black' : 'white' }, styles.modalView]}>
              <Pressable
                style={[styles.button, { shadowColor: !playing ? 'black' : 'white' }]}
                onPress={() => { setModalVisible(!modalVisible), setPlaying(false) }}>
                <Text style={[styles.textStyle, { color: !playing ? 'black' : 'white' }]}>Go Back</Text>
              </Pressable>
              {/* <YouTubePlayer
                height={300}
                width={width}
                play={true}
                videoId={`${data?.videoId}`}
                onChangeState={onStateChange}
              /> */}
            </View>
          </View>
        </Modal>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    flex: 1,
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'center', marginTop: 32,
  },
  tinyLogo: {
    width: 50,
    height: 50,
  },
  headingText: {
    color: 'black',
    fontSize: 30,
    fontWeight: '700',
    justifyContent: 'center',
    alignSelf: 'center',
    textAlign: 'center',
    marginTop: 20
  },
  container: {
    flexDirection: 'row',
    margin: 10,
    padding: 5,
    marginLeft: 10
  },
  titleStyle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
  },
  detailBox: {
    width: 230,
    marginLeft: 15
  },
  centeredView: {
    flex: 1,
    paddingBottom: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    flex: 1,
    margin: 20,
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',

  },
  button: {
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    elevation: 2,
    marginBottom: 20,
    marginLeft: 10,
    alignSelf: 'flex-start'
  },
  textStyle: {
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },

});

export default App;
