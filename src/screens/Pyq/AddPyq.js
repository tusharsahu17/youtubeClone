import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { THEME } from '../../utils/colors'
import AntDesign from 'react-native-vector-icons/AntDesign';

const AddPyq = () => {
    const handleUploadPdf = async () => {

    }
    const handleUpload = async () => {

    }
    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.uploadBox} onPress={handleUploadPdf}>
                <AntDesign
                    style={styles.icon}
                    name={'pdffile1'} />
                <Text style={styles.textStyle}>Upload PDF</Text>
            </TouchableOpacity>
            <View style={styles.btStyle}>
                <Text style={[styles.textStyle, { color: THEME.COLOR_WHITE }]}>Upload PDF</Text>
            </View>
        </View>
    )
}
export default AddPyq

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        height: 500,
        padding: 20,
        borderWidth: 1,
        borderRadius: 10,
        borderColor: THEME.COLOR_GRAY_LIGHT
    },
    uploadBox: {
        padding: 20,
        height: 150,
        borderWidth: 1.5,
        borderRadius: 10,
        backgroundColor: THEME.COLOR_GRAY_LIGHT,
        borderColor: THEME.COLOR_GRAY,
        borderStyle: 'dashed',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: "row"
    },
    textStyle: {
        fontSize: THEME.FONT_SIZE_SMALL
    },
    icon: {
        color: THEME.COLOR_GRAY,
        fontSize: 20,
        paddingRight: 10
    },
    btStyle: {
        height: 40,
        width: 100,
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
        marginTop: 100,
        backgroundColor: THEME.PRIMARY_COLOR,
        fonColor: THEME.COLOR_WHITE
    }
})