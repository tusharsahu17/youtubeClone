import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { THEME } from '../../utils/colors'
import AntDesign from 'react-native-vector-icons/AntDesign';
import { getPyq } from '../../services/userApi';
import { useIsFocused } from '@react-navigation/native';
import WebView from 'react-native-webview';


const Pyq = () => {
    const [pyqData, setPyqData] = useState([]);
    const isFocused = useIsFocused()
    useEffect(() => {
        fetchPyq();
        // setCurrentAffairs(CURRENT_AFFAIRS);
    }, [isFocused]);
    const fetchPyq = async () => {
        const res = await getPyq();
        console.log('================>', res)
        if (res?.status) {
            setPyqData(res.files);
        } else {
            console.log('err', res?.message);
        }
    };

    const renderItem = ({ item }) => {
        console.log('----------->', item)
        return (
            <View style={styles.renderContainer}>
                <Text>{item?.title}</Text>
                <Text>{item?.file}</Text>
                {/* <WebView
                    source={{ uri: pdfUrl }}
                    style={styles.webview}
                    startInLoadingState={true}
                    scalesPageToFit={true}
                /> */}
            </View>
        )
    }

    return (
        <View style={styles.container}>
            <FlatList
                horizontal={true}
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

    }
})