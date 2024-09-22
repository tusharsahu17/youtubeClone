import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import WebView from 'react-native-webview'
import { DOMAIN_URL } from '../../utils/constants'
import { THEME } from '../../utils/colors'

const DownloadPnq = ({ navigation, route }) => {
    return (
        <View>
            <Text style={styles.textStyle}>Downloading File !!!</Text>
            <WebView
                source={{ uri: `${DOMAIN_URL}/${route?.params?.item}` }}  // Dynamically load PDF URL
                style={styles.webview}
                startInLoadingState={true}
                scalesPageToFit={true}
            />
        </View>
    )
}

export default DownloadPnq

const styles = StyleSheet.create({
    textStyle: {
        fontSize: THEME.FONT_SIZE_MEDIUM,
        fontWeight: THEME.FONT_WEIGHT_MEDIUM,
        color: THEME.COLOR_BLACK,
        padding: 20
    },
    webview: {
        width: '100%',
        height: '100%',
    }
})