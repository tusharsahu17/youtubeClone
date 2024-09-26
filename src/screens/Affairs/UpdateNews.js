import {
    ActivityIndicator,
    FlatList,
    Image,
    StyleSheet,
    Text,
    ToastAndroid,
    TouchableOpacity,
    View,
    useWindowDimensions,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { THEME } from '../../utils/colors';
import { DOMAIN_URL } from '../../utils/constants';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import { ROUTES } from '../../navigation/routes';
import { CURRENT_AFFAIRS } from '../../utils/DataKey';
import { deleteNews, getCurrentAffairs } from '../../services/userApi';
import Feather from 'react-native-vector-icons/Feather';
import AntDesign from 'react-native-vector-icons/AntDesign';

const UpdateNews = () => {
    const { width } = useWindowDimensions();
    const [currentAffairs, setCurrentAffairs] = useState([]);
    const isFocused = useIsFocused();
    const navigation = useNavigation();
    const data = CURRENT_AFFAIRS;
    const [loader, setLoader] = useState(false)
    useEffect(() => {
        fetchCurrentAffairs();
        // setCurrentAffairs(CURRENT_AFFAIRS);
    }, [isFocused]);
    const handleEdits = async (item) => {
        navigation.navigate(ROUTES.addNews, { item, isEdit: true })
    }
    const handleDelete = async (item) => {
        setLoader(true)
        try {
            await deleteNews(item?._id).then((res) => {
                ToastAndroid.show(res?.message, ToastAndroid.SHORT)
                fetchCurrentAffairs()
            })
        }
        catch (err) {
            ToastAndroid.show(res?.message, ToastAndroid.SHORT)
        }
        setLoader(false)
    }
    const fetchCurrentAffairs = async () => {
        setLoader(true)
        const res = await getCurrentAffairs();
        if (res.status) {
            setCurrentAffairs(res.data);
        } else {
            console.log('err', res?.message);
        }
        setLoader(false)

    };
    const renderItem = ({ item }) => {
        return (
            <TouchableOpacity
                style={[styles.card]}
                onPress={() => navigation.navigate(ROUTES.news, { item })}>
                <View style={styles.icon} onPress={() => handleEdits(item)}>
                    <TouchableOpacity onPress={() => handleEdits(item)}>
                        <Feather
                            color={THEME.PRIMARY_COLOR}
                            name="edit"
                            size={25}
                            style={styles.singleIcon}

                        />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => handleDelete(item)}>
                        <AntDesign
                            color={THEME.COLOR_DANGER}
                            name="delete"
                            size={25}
                            style={styles.singleIcon}

                        />
                    </TouchableOpacity>
                </View>
                <Image
                    style={styles.cardImage}
                    source={{ uri: `${DOMAIN_URL}${item.image}` }}
                />
                <View style={styles.cardHeader}>
                    <View>
                        <Text style={styles.title} numberOfLines={2}>
                            {item.title}
                        </Text>
                        <Text style={styles.description} numberOfLines={7}>
                            {item.description}
                        </Text>
                    </View>
                </View>
            </TouchableOpacity>
        );
    };
    return (
        <>
            {loader ?
                <View style={styles.loader}>
                    <ActivityIndicator size={'large'} color={THEME.PRIMARY_COLOR} />
                </View>
                : <View style={styles.container}>
                    <FlatList
                        // horizontal={true}
                        data={currentAffairs}
                        renderItem={renderItem}
                        keyExtractor={(item, index) => index.toString()}
                    />
                </View>}
        </>
    );
};

export default UpdateNews;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 5,
        marginBottom: 20,
        alignItems: 'center'
    },
    card: {
        alignSelf: 'center',

        marginVertical: 8,
        backgroundColor: THEME.COLOR_WHITE,
        borderRadius: 10,
        width: '95%',
        elevation: 5,
    },
    cardHeader: {
        minHeight: 100,
        paddingVertical: 20,
        paddingHorizontal: 20,
        borderTopLeftRadius: 1,
        borderTopRightRadius: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    cardContent: {
        paddingVertical: 12.5,
        paddingHorizontal: 16,
    },
    cardFooter: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingBottom: 10,
    },
    cardImage: {
        height: 200,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        resizeMode: 'cover',
    },
    title: {
        color: THEME.COLOR_BLACK,
        fontSize: THEME.FONT_SIZE_LARGE,
        fontWeight: THEME.FONT_WEIGHT_MEDIUM,
    },
    icon: {
        flexDirection: 'row',
        position: 'absolute',
        right: 10,
        top: 5,
        zIndex: 1,
    },
    singleIcon: {
        margin: 5,
        height: 40,
        width: 40,
        backgroundColor: THEME.COLOR_WHITE,
        textAlignVertical: 'center',
        textAlign: 'center'
    },
    loader: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 200
    }
});
