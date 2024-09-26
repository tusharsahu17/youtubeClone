import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { ROUTES } from '../../navigation/routes'
import { THEME } from '../../utils/colors'
import AntDesign from 'react-native-vector-icons/AntDesign';

const Add = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={() => navigation.navigate(ROUTES.addFreeTest)}>
                <View style={styles.itemStyle}>
                    <Text style={styles.textStyle}>Add Free Test</Text>
                    <AntDesign
                        size={30}
                        style={styles.icon}
                        name={'arrowright'}
                    />
                </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate(ROUTES.addPyq)}>
                <View style={styles.itemStyle}>
                    <Text style={styles.textStyle}>Add PYQ</Text>
                    <AntDesign
                        size={30}
                        style={styles.icon}
                        name={'arrowright'}
                    />
                </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate(ROUTES.addNews)}>
                <View style={styles.itemStyle}>
                    <Text style={styles.textStyle}>Add News</Text>
                    <AntDesign
                        size={30}
                        style={styles.icon}
                        name={'arrowright'}
                    />
                </View>
            </TouchableOpacity>
        </View>
    )
}

export default Add

const styles = StyleSheet.create({
    container: {
        flex: 1,
        height: 500,
        padding: 20,
        borderRadius: 10,
    },
    textStyle: {
        fontSize: THEME.FONT_SIZE_MEDIUM,
        fontWeight: THEME.FONT_WEIGHT_MEDIUM,
        color: THEME.COLOR_BLACK,
    },
    itemStyle: {
        borderWidth: 1,
        height: 80,
        padding: 20,
        borderColor: THEME.COLOR_GRAY,
        justifyContent: 'center',
        marginVertical: 10
    },
    icon: {
        color: THEME.PRIMARY_COLOR,
        alignSelf: 'flex-end',
        bottom: 20
    }
})