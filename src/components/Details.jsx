import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { THEME } from '../utils/theme'


const Details = ({ title, data }) => {
    return (
        <View style={{ flexDirection: 'row', marginVertical: 3, }}>
            <Text style={[{ flex: 0.4 }, styles.profileDetailText]}>
                {title}
            </Text>
            <Text style={[{ flex: 0.1 }]}>
                :
            </Text>
            <Text style={[{ flex: 1 }, styles.profileDetailText]}>
                {data ? data : '-'}
            </Text>
        </View>
    )
}
export default Details

const styles = StyleSheet.create({
    profileDetailText: {
        fontSize: 15,
        color: THEME.COLOR_BLACK,
        fontWeight: THEME.FONT_WEIGHT_MEDIUM,
      },
})