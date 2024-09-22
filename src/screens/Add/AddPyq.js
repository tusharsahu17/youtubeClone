import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, Alert, PermissionsAndroid, Modal, Button } from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import axios from 'axios';
import { THEME } from '../../utils/colors';
import { openSettings } from 'react-native-permissions'; // Assuming you are using react-native-permissions

const AddPyq = () => {
    const [modalVisible, setModalVisible] = useState(false);

    const requestPermission = async () => {
        try {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
                {
                    title: 'Storage Permission',
                    message: 'App needs access to your storage to pick images.',
                    buttonNeutral: 'Ask Me Later',
                    buttonNegative: 'Cancel',
                    buttonPositive: 'OK',
                }
            );
            return granted === PermissionsAndroid.RESULTS.GRANTED;
        } catch (err) {
            console.warn(err);
            return false;
        }
    };

    const pickImage = async () => {
        console.log('==============>rer');

        const hasPermission = await requestPermission();
        if (!hasPermission) {
            setModalVisible(true); // Show modal if permission is denied
            return;
        }

        launchImageLibrary({ mediaType: 'photo' }, (response) => {
            if (response.didCancel) {
                Alert.alert('User cancelled image picker');
            } else if (response.errorCode) {
                Alert.alert('ImagePicker Error: ', response.errorMessage);
            } else {
                uploadImage(response.assets[0]);
            }
        });
    };

    const openAppSettings = () => {
        openSettings().catch(() => Alert.alert('Unable to open settings'));
    };

    const uploadImage = async (image) => {
        const formData = new FormData();
        formData.append('file', {
            uri: image.uri,
            type: image.type,
            name: image.fileName,
        });

        try {
            await axios.post('YOUR_SERVER_URL', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            Alert.alert('Upload Successful');
        } catch (error) {
            Alert.alert('Upload Failed');
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.textStyle}>Add PYQ's</Text>
            <TouchableOpacity style={styles.uploadContainer} onPress={pickImage}>
                <Text style={styles.textStyle}>Upload Image</Text>
            </TouchableOpacity>

            <Modal
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>Permission Required</Text>
                        <Text style={styles.modalMessage}>
                            To upload images, we need access to your storage. Please grant permission in settings.
                        </Text>
                        <Button title="Open Settings" onPress={openAppSettings} />
                        <Button title="Cancel" onPress={() => setModalVisible(false)} />
                    </View>
                </View>
            </Modal>
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
