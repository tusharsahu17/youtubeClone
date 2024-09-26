import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, Alert, PermissionsAndroid, Modal, Button } from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import axios from 'axios';
import { THEME } from '../../utils/colors';
import { openSettings } from 'react-native-permissions'; // Assuming you are using react-native-permissions
import { addNewPyq } from '../../services/userApi';

const AddPyq = () => {
    const [modalVisible, setModalVisible] = useState(false);

    const requestPermission = async () => {
        try {
            const permissions = [
                PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
                PermissionsAndroid.PERMISSIONS.CAMERA,
                PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
            ];

            const granted = await PermissionsAndroid.requestMultiple(permissions, {
                title: 'Storage and Camera Permission',
                message: 'App needs access to your storage and camera to pick images.',
                buttonNeutral: 'Ask Me Later',
                buttonNegative: 'Cancel',
                buttonPositive: 'OK',
            });

            return Object.values(granted).every((result) => result === PermissionsAndroid.RESULTS.GRANTED);
        } catch (err) {
            console.warn(err);
            return false;
        }
    };
    const pickImage = async () => {
        console.log('==============>rer');

        const hasPermission = await requestPermission();
        console.log('------------->', hasPermission)

        launchImageLibrary({ mediaType: 'photo' }, (response) => {
            console.log('====================>', response.assets[0])
            if (response.didCancel) {
                Alert.alert('User cancelled image picker');
            } else if (response.errorCode) {
                Alert.alert('ImagePicker Error: ', response.errorMessage);
            } else {
                uploadImage(response.assets[0]);
            }
        });
    };

    const uploadImage = async (image) => {
        const formData = new FormData();
        formData.append('file', {
            uri: image.uri,
            type: image.type,
            name: image.fileName,
        });
        try {
            console.log('formData--------------->', formData?._parts)
            // setLoader(true)
            const response = await addNewPyq(formData);
            console.log('response--------------->', response)
            if (response.status) {

            }
        }
        catch (err) {
            console.log('Error ', err)
        }
        // setLoader(false)
    };

    return (
        <View style={styles.container}>
            <Text style={styles.textStyle}>Add PYQ's</Text>
            <TouchableOpacity style={styles.uploadContainer} onPress={pickImage}>
                <Text style={styles.textStyle}>Upload Image</Text>
            </TouchableOpacity>

        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        height: 500,
        padding: 20,
        borderRadius: 10,
    },
    textStyle: {
        fontSize: THEME.FONT_SIZE_MEDIUM,
        fontWeight: THEME.FONT_WEIGHT_MEDIUM,
        color: THEME.COLOR_BLACK,
    },
    uploadContainer: {
        flexDirection: 'row',
        borderWidth: 1.5,
        borderStyle: 'dashed',
        height: 100,
        marginTop: 10,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        borderColor: THEME.COLOR_GRAY,
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)', // Semi-transparent background
    },
    modalContent: {
        width: '80%',
        padding: 20,
        backgroundColor: 'white',
        borderRadius: 10,
        alignItems: 'center',
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    modalMessage: {
        fontSize: 16,
        marginBottom: 20,
        textAlign: 'center',
    },
});

export default AddPyq;
