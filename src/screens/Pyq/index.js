import { Button, FlatList, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { THEME } from '../../utils/colors'
import { getPyq } from '../../services/userApi';
import { useIsFocused } from '@react-navigation/native';
import { ROUTES } from '../../navigation/routes';


const Pyq = ({ navigation }) => {
    const [pyqData, setPyqData] = useState([]);
    const isFocused = useIsFocused()
    useEffect(() => {
        fetchPyq();
        // setCurrentAffairs(CURRENT_AFFAIRS);
    }, [isFocused]);
    const fetchPyq = async () => {
        const res = await getPyq();
        if (res?.status) {
            setPyqData(res.files);
        } else {
            console.log('err', res?.message);
        }
    };
    const handleDownload = (item) => {
        const PNQUrl = item.replace(/\\/g, '/');
        navigation.navigate(ROUTES.downloadPnq, { item: PNQUrl })
    }
    const renderItem = ({ item }) => {
        return (
            <View style={styles.renderContainer}>
                <Text style={styles.textStyle}>{item?.name}</Text>
                <View style={styles.btnStyle} >
                    <Button title='Download PDF' onPress={() => handleDownload(item?.file)} />
                </View>
            </View>
        )
    }

    return (
        <View style={styles.container}>
            <FlatList
                data={pyqData}
                renderItem={renderItem}
                keyExtractor={(item, index) => index.toString()}
            />
        </View>
    )
}

export default Pyq

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        height: 500,
        padding: 20,
        borderRadius: 10,
    },
    renderContainer: {
        width: '100%',
        minHeight: 100,
        borderWidth: 1,
        borderRadius: 10,
        marginVertical: 10,
        borderColor: THEME.COLOR_GRAY_LIGHT
    },
    textStyle: {
        fontSize: THEME.FONT_SIZE_MEDIUM,
        fontWeight: THEME.FONT_WEIGHT_MEDIUM,
        color: THEME.COLOR_BLACK,
        padding: 10,
        paddingBottom: 30,
    },
    btnStyle: {
        margin: 10,
        width: 150,
        alignSelf: 'flex-end'
    }
})