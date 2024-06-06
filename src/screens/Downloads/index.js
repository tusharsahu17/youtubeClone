import { FlatList, StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { getPaidTests, myTestSeries } from '../../services/userApi';

import { THEME } from '../../utils/colors';
import { useIsFocused } from '@react-navigation/native';
import SubmitButton from '../../components/SubmitButton';
import { ROUTES } from '../../navigation/routes';

const Downloads = ({ navigation }) => {
  const [testData, setTestData] = useState([])
  const isFocused = useIsFocused()
  const getTest = async () => {
    const userId = "6648448c7d72455fc888b47a"
    const data = await myTestSeries(userId)
    if (data.status) {
      setTestData(data.data)
    }
  }
  useEffect(() => {
    getTest()
  }, [isFocused])
  const giveTest = (item) => {
    navigation.navigate(ROUTES.takeTest, { data: item?._id })
  }
  const renderItem = ({ item, index }) => {
    return (
      <View style={styles.itemContainer}>
        <Text style={styles.titleStyles}>{item.title}</Text>
        <Text style={styles.detailStyles}
          numberOfLines={2}>{item.description}</Text>
        <Text style={styles.detailStyles}
          numberOfLines={2}>Total Questions: 100</Text>
        <View style={styles.gaps}>
          <SubmitButton title={"Give Test"} handlePress={() => giveTest(item)} />
        </View>
      </View>
    )
  }
  return (
    <View style={styles.container}>
      <FlatList
        data={testData}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

export default Downloads;

const styles = StyleSheet.create({
  gaps: {
    margin: 10
  },
  container: {
    marginHorizontal: 10
  },
  itemContainer: {
    minHeight: 100,
    borderRadius: 10,
    marginVertical: 10,
    padding: 10,
    backgroundColor: THEME.COLOR_BLUE
  },
  titleStyles: {
    fontWeight: '700',
    fontSize: THEME.FONT_SIZE_LARGE,
    color: THEME.COLOR_WHITE
  },
  title: {
    marginHorizontal: 5,
    color: THEME.COLOR_BLACK,
    fontWeight: THEME.FONT_WEIGHT_MEDIUM,
  },
  detailStyles: {
    paddingLeft: 5,
    fontSize: THEME.FONT_SIZE_SMALL,
    color: THEME.COLOR_WHITE
  },
  viewDirection: {
    paddingLeft: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  mrpPrice: {
    textDecorationLine: 'line-through',
    color: THEME.COLOR_DANGER
  },
});
