import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { LOGO } from '../../utils/images'
import { THEME } from '../../utils/theme'
import { VERSION_NAME } from '../../utils/constants'

const Splash = () => {
    return (
        <View style={styles.mainContainer}>
            <Image
                resizeMode='contain'
                source={LOGO}
                style={{
                    width: 300, height: 300,
                }}
            />
            <Text style={[styles.textStyle,{fontSize:20}]}>!! Welcome !!</Text>

            <Text style={styles.textStyle}>Version {VERSION_NAME}</Text>
        </View>
    )
}

export default Splash

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        alignSelf: 'center',        
        justifyContent: "center",
    },
    textStyle: {
        color: THEME.THEME_COLOUR,
        alignSelf: 'center'
    }
})