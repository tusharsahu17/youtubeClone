import {
  FlatList,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Image} from 'react-native';
import {THEME} from '../../utils/colors';
import {LOGO} from '../../utils/image';

const Syllabus = () => {
  const [item, setItem] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [services, setServices] = useState([]);
  const fetchServices = async () => {
    try {
      const res = await 'fsdfs';
      if (res) {
        setServices(res);
      } else {
        setServices([]);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  useEffect(() => {
    fetchServices();
  }, []);
  const handleModal = item => {
    setModalVisible(true);
    setItem(item);
  };
  const renderItem = ({item, index}) => {
    return (
      <View style={styles.offerContainer}>
        <TouchableOpacity onPress={() => handleModal(item)}>
          <Text style={[styles.offerHeadingTextStyle]}>
            {index + 1}. {item.title}{' '}
          </Text>
        </TouchableOpacity>
      </View>
    );
  };
  return (
    <View>
      <FlatList
        data={services}
        numColumns={1}
        keyExtractor={item => item.id}
        renderItem={renderItem}
      />
      <Modal
        animationType="slide"
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.centeredView}>
          <ScrollView style={styles.modalView}>
            <Image style={styles.modalImgStyle} source={LOGO} />
            <Text style={styles.modalHeading}>{item.title}</Text>
            <Text style={[styles.offerHeadingTextStyle]}>
              {item.description}
              {item.description}
            </Text>
          </ScrollView>
        </View>
      </Modal>
    </View>
  );
};

export default Syllabus;

const styles = StyleSheet.create({
  headingStyle: {
    marginLeft: 10,
    color: THEME.COLOR_BLACK,
    fontSize: THEME.FONT_SIZE_LARGE,
    fontWeight: THEME.FONT_WEIGHT_MEDIUM,
  },
  mainContainer: {
    margin: 10,
  },
  imgStyle: {
    width: 90,
    height: 90,
    resizeMode: 'center',
    backgroundColor: '#1451b5',
    borderRadius: 80,
    alignSelf: 'center',
  },
  modalImgStyle: {
    width: 120,
    height: 120,
    marginBottom: 10,
    resizeMode: 'stretch',
    backgroundColor: '#1451b5',
    borderRadius: 100,
    alignSelf: 'center',
  },
  offerContainer: {
    textAlign: 'center',
    borderRadius: 10,
    height: 200,
    margin: 10,
    paddingTop: 10,
  },
  couponTextArea: {
    alignSelf: 'flex-start',
    marginTop: 20,
    marginLeft: 10,
  },
  offerHeadingTextStyle: {
    color: THEME.COLOR_BLACK,
    fontSize: THEME.FONT_SIZE_MEDIUM,
    fontWeight: THEME.FONT_WEIGHT_MEDIUM,
  },
  offerTextDesc: {
    width: 260,
    marginTop: 5,
    color: THEME.COLOR_GRAY_LIGHT,
    fontSize: THEME.FONT_SIZE_MEDIUM,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    borderRadius: 20,
    padding: 35,
    backgroundColor: THEME.THEME_COLOR,
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  modalHeading: {
    textAlign: 'center',
    color: THEME.COLOR_BLUE,
    fontSize: THEME.FONT_SIZE_LARGE,
    fontWeight: THEME.FONT_WEIGHT_BOLD,
  },
});
