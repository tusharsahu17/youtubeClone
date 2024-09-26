import React, { useEffect, useLayoutEffect, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, Alert, PermissionsAndroid, Modal, Button, Image, ToastAndroid, ActivityIndicator } from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import axios from 'axios';
import { THEME } from '../../utils/colors';
import { openSettings } from 'react-native-permissions'; // Assuming you are using react-native-permissions
import { addNewPyq, editNews, postNews } from '../../services/userApi';
import { TextInput } from 'react-native';
import SubmitButton from '../../components/SubmitButton';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { ROUTES } from '../../navigation/routes';
import { DOMAIN_URL } from '../../utils/constants';
import { useIsFocused } from '@react-navigation/native';

const AddNews = ({ navigation, route }) => {
    console.log('==================>', route.params?.isEdit)
    const isFocused = useIsFocused()
    const isEdits = route.params?.isEdit
    const itemData = route?.params?.item
    const [type, setType] = useState('');
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [image, setImage] = useState([])
    const [loader, setLoader] = useState(false)
    // const requestPermission = async () => {
    //     try {
    //         const permissions = [
    //             PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
    //             PermissionsAndroid.PERMISSIONS.CAMERA,
    //             PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
    //         ];

    //         const granted = await PermissionsAndroid.requestMultiple(permissions, {
    //             title: 'Storage and Camera Permission',
    //             message: 'App needs access to your storage and camera to pick images.',
    //             buttonNeutral: 'Ask Me Later',
    //             buttonNegative: 'Cancel',
    //             buttonPositive: 'OK',
    //         });

    //         return Object.values(granted).every((result) => result === PermissionsAndroid.RESULTS.GRANTED);
    //     } catch (err) {
    //         console.warn(err);
    //         return false;
    //     }
    // };
    const pickImage = async () => {

        // await requestPermission();

        launchImageLibrary({ mediaType: 'photo' }, (response) => {
            if (response?.didCancel) {
                Alert.alert('User cancelled image picker');
            } else if (response?.errorCode) {
                Alert.alert('ImagePicker Error: ', response?.errorMessage);
            } else {
                setImage(response.assets[0]);
            }
        });
    };
    useEffect(() => {
        if (route.params?.isEdit) {
            setType(itemData?.type)
            setTitle(itemData?.title)
            setDescription(itemData?.description)
        }
    }, [isFocused])
    useLayoutEffect(() => {
        navigation.setOptions({
            title: route?.params?.isEdit ? 'Update' : 'Add News',
            headerRight: () => (
                <TouchableOpacity onPress={() => navigation.navigate(ROUTES.updateNews)}>
                    <Text style={{ color: THEME.COLOR_WHITE, marginRight: 10 }}>Update</Text>
                </TouchableOpacity>
            ),
        });
    }, [navigation]);
    const handleSubmit = async () => {
        setLoader(true)
        if (!isEdits) {
            const formData = new FormData();
            formData.append('image', {
                uri: image.uri,
                type: image.type,
                name: image.fileName,
            });
            formData.append('type', type);
            formData.append('title', title);
            formData.append('description', description);

            try {
                const response = await postNews(formData);
                if (response.status) {

                }
            }
            catch (err) {
                console.log('Error ', err)
            }
        }

        else {
            const body = {
                type: type,
                title: title,
                description: description
            }
            try {
                await editNews({ id: itemData?._id, payload: body })
                    .then((res) => {
                        ToastAndroid.show(res?.message, ToastAndroid.SHORT);
                        navigation.navigate(ROUTES.updateNews)
                    })

            }
            catch (err) {
                ToastAndroid.show(res?.message, ToastAndroid.SHORT);
                console.log('Error ', err)
            }
        }
        setLoader(false)
    };

    return (
        <>
            {loader ?
                <View>
                    <ActivityIndicator size={25} color={THEME.PRIMARY_COLOR} />
                </View>
                : <View style={styles.container}>
                    {!isEdits ? <><Text style={styles.title}>Upload Image :</Text>
                        <TouchableOpacity style={styles.uploadContainer} onPress={pickImage}>
                            <AntDesign
                                color={THEME.COLOR_GRAY}
                                name="picture"
                                size={22}
                            />
                            <Text style={styles.textStyle}> Upload</Text>
                        </TouchableOpacity></> : <></>}
                    {image?.uri && !isEdits ? <Image
                        style={styles.cardImage}
                        source={{ uri: image?.uri }}
                    /> : <></>}
                    <View style={styles.dataContainer}>
                        <Text style={styles.title}>Enter Type :</Text>
                        <TextInput
                            style={styles.input}
                            onChangeText={setType}
                            value={type}
                            multiline={true}
                        />
                        <Text style={styles.title}>Enter Title :</Text>
                        <TextInput
                            style={styles.input}
                            onChangeText={setTitle}
                            value={title}
                            multiline={true}
                        />
                        <Text style={styles.title}>Enter Description :</Text>
                        <TextInput
                            style={[styles.input, styles.desc]}
                            onChangeText={setDescription}
                            value={description}
                            multiline={true}
                        />
                    </View>
                    <View style={styles.dataContainer}>
                        <SubmitButton title={route?.params?.isEdit ? 'Update' : 'Add'} handlePress={handleSubmit}
                            bgColor={THEME.PRIMARY_COLOR} fColor={THEME.COLOR_WHITE} />
                    </View>
                </View>}
        </>
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
        color: THEME.COLOR_GRAY,
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
        backgroundColor: THEME.COLOR_WHITE
    },
    desc: {
        height: 200
    },
    input: {
        height: 50,
        marginVertical: 10,
        borderWidth: 0.5,
        padding: 10,
        borderRadius: 10,
        backgroundColor: THEME.COLOR_WHITE
    },
    title: {
        color: THEME.COLOR_BLACK,
        fontSize: THEME.FONT_SIZE_LARGE,
        fontWeight: THEME.FONT_WEIGHT_BOLD,
    },
    dataContainer: {
        marginTop: 20
    },
    cardImage: {
        marginVertical: 10,
        height: 100,
        width: 100,
        borderRadius: 10,
        resizeMode: 'contain',
    },
});

export default AddNews;
