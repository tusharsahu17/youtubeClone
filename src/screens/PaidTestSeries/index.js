import {
  Alert,
  FlatList,
  Image,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {getPaidTests} from '../../services/userApi';
import {THEME} from '../../utils/colors';
import {moneyFormat} from '../../utils/formatter';
import SubmitButton from '../../components/SubmitButton';
import {INTERNET_CHARGE} from '../../utils/DataKey';
import {DOMAIN_URL} from '../../utils/constants';
import WebView from 'react-native-webview';

const PaidTestSeries = () => {
  const [testData, setTestData] = useState([]);
  const [modalVisible, setModalVisible] = useState([]);
  const [selectedItem, setSelectedItems] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);

  const [viewHtml, setViewHtml] = useState(false);
  const webViewRef = useRef(null);
  const user = '6648448c7d72455fc888b47a';
  const courseId = selectedItem._id;

  const navigateState = async navState => {
    if (navState?.url?.includes('payment/validate')) {
      const {data} = await axios.get(`${navState?.url}`);
      if (data.status) Alert.alert(data?.message);
      else Alert.alert('Error:');
      setViewHtml(false);
    }
  };

  const getTest = async () => {
    const data = await getPaidTests();
    if (data.status) {
      setTestData(data.data);
    }
  };
  const handleBuyNow = item => {
    setSelectedItems(item);
    setTotalAmount(item.price + INTERNET_CHARGE);
    setModalVisible(!modalVisible);
  };
  const handlePayNow = () => {
    setViewHtml(true);
  };

  useEffect(() => {
    getTest();
  }, []);
  const renderItem = ({item, index}) => {
    return (
      <View style={styles.itemContainer}>
        <Text style={styles.titleStyles}>{item.title}</Text>
        <Text style={styles.detailStyles} numberOfLines={2}>
          {item.description}
        </Text>
        <Text style={styles.detailStyles} numberOfLines={2}>
          Total Questions: 100
        </Text>
        <View style={styles.viewDirection}>
          <Text style={styles.titleStyles}>{moneyFormat(item.price)}</Text>
          <Text style={[styles.titleStyles, styles.mrpPrice]}>
            {moneyFormat(item.price)}
          </Text>
          <Text style={styles.titleStyles}></Text>
          <SubmitButton
            title={'Buy Now'}
            handlePress={() => handleBuyNow(item)}
          />
        </View>
      </View>
    );
  };
  const PriceModal = ({name, price}) => {
    return (
      <View style={[styles.itemPriceContainer, styles.priceModalContainer]}>
        <Text style={{flex: 0.5}}>{name}</Text>
        <Text style={{flex: 0.5}}>₹{price}</Text>
      </View>
    );
  };
  return (
    <>
      {viewHtml ? (
        <View
          style={{
            flex: 1,
          }}>
          {console.log(
            '================================>',
            `${DOMAIN_URL}/payments/pay-testseries/${user}/${courseId}/`,
          )}
          <WebView
            ref={webViewRef}
            source={{
              uri: `${DOMAIN_URL}/payments/pay-testseries/${user}/${courseId}/`,
            }}
            originWhitelist={['*']}
            scalesPageToFit={false}
            onNavigationStateChange={navigateState}
          />
        </View>
      ) : (
        <View style={styles.container}>
          <FlatList
            data={testData}
            renderItem={renderItem}
            keyExtractor={item => item.id}
          />
          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
              setModalVisible(!modalVisible);
            }}>
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <Text style={styles.title} numberOfLines={1}>
                  {selectedItem.title}
                </Text>

                <View style={styles.priceDivision}>
                  <PriceModal name={'Price'} price={selectedItem.price} />
                  <PriceModal
                    name={'Internet Handling'}
                    price={INTERNET_CHARGE}
                  />
                  <View
                    style={{
                      width: '60%',
                      borderWidth: 0.5,
                      borderStyle: 'dashed',
                    }}></View>
                  <PriceModal name={'Total'} price={totalAmount} />
                </View>

                <Text style={styles.title}>Apply Coupons</Text>
                <View style={styles.itemPriceContainer}>
                  <TextInput
                    // onChangeText={onChangeCoupons}
                    style={styles.inputStyle}
                  />
                  <SubmitButton title={'Apply '} handlePress={handlePayNow} />
                </View>
                <SubmitButton title={'Pay Now'} handlePress={handlePayNow} />
              </View>
            </View>
          </Modal>
        </View>
      )}
    </>
  );
};

export default PaidTestSeries;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 10,
  },
  itemContainer: {
    minHeight: 100,
    borderRadius: 10,
    marginVertical: 10,
    padding: 10,
    backgroundColor: THEME.COLOR_BLUE,
  },
  titleStyles: {
    fontWeight: '700',
    fontSize: THEME.FONT_SIZE_LARGE,
    color: THEME.COLOR_WHITE,
  },
  title: {
    marginHorizontal: 5,
    color: THEME.COLOR_BLACK,
    fontWeight: THEME.FONT_WEIGHT_MEDIUM,
  },
  detailStyles: {
    paddingLeft: 5,
    fontSize: THEME.FONT_SIZE_SMALL,
    color: THEME.COLOR_WHITE,
  },
  viewDirection: {
    paddingLeft: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  mrpPrice: {
    textDecorationLine: 'line-through',
    color: THEME.COLOR_DANGER,
  },
  centeredView: {
    flex: 1,
    backgroundColor: THEME.COLOR_GRAY,
    opacity: 0.9,
    padding: 10,
    justifyContent: 'center',
  },
  modalView: {
    backgroundColor: THEME.COLOR_WHITE,
    borderRadius: 20,
    padding: 20,
    height: 300,
  },
  priceModalContainer: {
    padding: 5,
    justifyContent: 'space-around',
  },
  inputStyle: {
    flex: 1,
    height: 40,
    paddingLeft: 10,
    marginRight: 20,
    borderRadius: 10,
    borderWidth: 1,
    backgroundColor: THEME.COLOR_WHITE,
    borderColor: THEME.COLOR_GRAY_LIGHT,
  },
  itemPriceContainer: {
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  priceDivision: {
    marginVertical: 10,
  },
});
