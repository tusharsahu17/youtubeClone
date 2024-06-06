import {
  Image,
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useLayoutEffect, useState} from 'react';
import {DOMAIN_URL} from '../../utils/constants';
import {ROUTES} from '../../navigation/routes';
import {THEME} from '../../../utils/colors';

const PaidDetails = ({navigation, route}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [coupons, onChangeCoupons] = useState('');
  const details = route?.params?.item;
  useLayoutEffect(() => {
    navigation.setOptions({
      title: details?.title,
    });
  }, [navigation]);
  const handleCoupons = () => {
    console.log('Apply Coupons', coupons);
  };
  const PriceModal = ({name, price}) => {
    return (
      <View style={[styles.itemContainer, styles.priceModalContainer]}>
        <Text style={{flex: 0.5}}>{name}</Text>
        <Text style={{flex: 0.5}}>₹{price}</Text>
      </View>
    );
  };
  return (
    <View style={[styles.container]}>
      <ScrollView>
        <Image
          style={styles.cardImage}
          source={{
            uri: `${details?.image}`,
            // uri: `${DOMAIN_URL}/media/${route.params.item.featured_image}`,
          }}
        />
        <View style={styles.lines} />
        <ScrollView style={styles.cardHeader}>
          <Text style={styles.title}>{details?.title}</Text>
          <Text style={[styles.title, styles.margins]}>
            About this course :
          </Text>
          <Text style={styles.description}>
            {route?.params?.item?.description}
          </Text>
        </ScrollView>
      </ScrollView>
      <View style={[styles.priceContainer, styles.itemContainer]}>
        <View>
          <View style={[styles.itemContainer]}>
            <Text style={styles.priceText}>Price: ₹{details?.price}</Text>
            <Text style={[styles.priceText, styles.oldPrice]}>
              ₹{details?.oldPrice}
            </Text>
          </View>
          <View style={[styles.itemContainer]}>
            <Text style={styles.priceText}>Discount:</Text>
            <Text
              style={[
                styles.priceText,
                styles.itemContainer,
                {color: THEME.COLOR_DANGER},
              ]}>
              {details?.discount} OFF
            </Text>
          </View>
        </View>
        <Pressable
          style={styles.buyNow}
          onPress={() => setModalVisible(!modalVisible)}>
          <Text style={styles.buyNowText}>Buy Now</Text>
        </Pressable>
      </View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Image
              style={styles.modalImage}
              source={{
                uri: `${details?.image}`,

                // uri: `${DOMAIN_URL}/media/${route.params.item.featured_image}`,
              }}
            />
            <Text style={styles.title} numberOfLines={1}>
              {details?.title}
            </Text>
            <View>
              <PriceModal name={'Price'} price={details.price} />
              <PriceModal name={'Internet Handling'} price={20} />
              <PriceModal name={'Total'} price={details.price + 20} />
            </View>
            <Text style={styles.title}>Apply Coupons</Text>
            <View style={styles.itemContainer}>
              <TextInput
                onChangeText={onChangeCoupons}
                style={styles.inputStyle}
              />
              <Pressable onPress={handleCoupons}>
                <Text style={[styles.buyNowText, styles.margins]}>Apply</Text>
              </Pressable>
            </View>
            <Pressable
              style={[styles.buyNow, {backgroundColor: THEME.COLOR_BLUE}]}
              onPress={() => setModalVisible(!modalVisible)}>
              <Text style={[styles.buyNowText, {color: THEME.COLOR_WHITE}]}>
                Pay Now
              </Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default PaidDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  cardHeader: {
    paddingVertical: 17,
    paddingHorizontal: 15,
    marginTop: 20,
    backgroundColor: THEME.COLOR_WHITE,
  },
  cardImage: {
    height: 300,
    width: '100%',
    marginHorizontal: 10,
    resizeMode: 'stretch',
  },
  title: {
    marginHorizontal: 5,
    color: THEME.COLOR_BLACK,
    fontWeight: THEME.FONT_WEIGHT_MEDIUM,
  },
  priceText: {
    fontSize: 20,
    fontWeight: '700',
    marginHorizontal: 10,
    color: THEME.COLOR_WHITE,
  },
  itemContainer: {
    paddingTop: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  oldPrice: {
    textDecorationLine: 'line-through',
  },
  margins: {
    marginTop: 10,
  },
  priceContainer: {
    height: 80,
    backgroundColor: THEME.COLOR_BLUE,
  },
  buyNow: {
    margin: 10,
    width: 120,
    backgroundColor: THEME.COLOR_WHITE,
    borderRadius: 10,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buyNowText: {
    fontSize: 20,
    fontWeight: '700',
    color: THEME.COLOR_BLUE,
    marginHorizontal: 20,
  },
  centeredView: {
    flex: 1,
    backgroundColor: THEME.COLOR_GRAY,
    opacity: 0.9,
    justifyContent: 'flex-end',
  },
  modalView: {
    backgroundColor: THEME.COLOR_WHITE,
    borderRadius: 20,
    padding: 20,
  },
  modalImage: {
    height: 200,
    width: '100%',
    marginHorizontal: 10,
    resizeMode: 'stretch',
    marginBottom: 20,
  },
  priceModalContainer: {
    padding: 5,
    justifyContent: 'space-around',
  },
  inputStyle: {
    width: 200,
    height: 40,
    margin: 5,
    textTransform: 'capitalize',
    borderRadius: 10,
    borderWidth: 0.5,
  },
});
