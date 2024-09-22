import { ScrollView, StyleSheet, Text, TextInput, ToastAndroid, View } from 'react-native'
import React, { useState } from 'react'
import { THEME } from '../../utils/colors';
import SubmitButton from '../../components/SubmitButton';
import { addFreeQuestion } from '../../services/userApi';
import { Answer, Level } from '../../utils/DataKey';
import { Dropdown } from 'react-native-element-dropdown';

const AddFreeTest = () => {
    const [question, onChangeQuestion] = useState('');
    const [option1, onChangeText1] = useState('');
    const [option2, onChangeText2] = useState('');
    const [option3, onChangeText3] = useState('');
    const [option4, onChangeText4] = useState('');
    const [answer, onChangeAnswer] = useState('');
    const [selectedAnswer, setSelectedAnswer] = useState('');
    const [level, onChangeLevel] = useState('');
    const [selectedLevel, setSelectedLevel] = useState('');
    const clearAll = () => {
        onChangeQuestion('')
        onChangeText1('')
        onChangeText2('')
        onChangeText3('')
        onChangeText4('')
        setSelectedAnswer('')
        onChangeLevel('')
        setSelectedLevel('')
    }
    const freeTest = async () => {
        const payload = {
            type: "Free",
            question: question ? question : '',
            options: {
                question: question,
                option1: option1 ? option1 : '-',
                option2: option2 ? option2 : '-',
                option3: option3 ? option3 : '-',
                option4: option4 ? option4 : '-',
            },
            answer: selectedAnswer ? selectedAnswer : 'A',
            level: selectedLevel ? selectedLevel : 'Easy'
        }
        try {
            await addFreeQuestion(payload)
                .then((res) => {
                    ToastAndroid.show(res?.msg, ToastAndroid.SHORT);
                }).catch((err) => {
                    ToastAndroid.show('Error', ToastAndroid.SHORT);
                })

        } catch {
            console.log('Error')
        }
        clearAll()
    }
    return (
        <ScrollView style={styles.container}>
            <Text style={styles.title}>Write Your Question :</Text>
            <TextInput
                style={styles.input}
                onChangeText={onChangeQuestion}
                value={question}
                multiline={true}
            />

            <Text style={styles.title}>Options :</Text>
            <View style={styles.optionContainer}>
                <Text style={styles.textStyle}>A.</Text>
                <TextInput
                    style={styles.optionBox}
                    onChangeText={onChangeText1}
                    value={option1}
                    multiline={true}
                />
            </View>
            <View style={styles.optionContainer}>
                <Text style={styles.textStyle}>B.</Text>
                <TextInput
                    style={styles.optionBox}
                    onChangeText={onChangeText2}
                    value={option2}
                    multiline={true}
                />
            </View>
            <View style={styles.optionContainer}>
                <Text style={styles.textStyle}>C.</Text>
                <TextInput
                    style={styles.optionBox}
                    onChangeText={onChangeText3}
                    value={option3}
                    multiline={true}
                />
            </View>
            <View style={styles.optionContainer}>
                <Text style={styles.textStyle}>D.</Text>
                <TextInput
                    style={styles.optionBox}
                    onChangeText={onChangeText4}
                    value={option4}
                    multiline={true}
                />
            </View>
            <View style={styles.box}>
                <Text style={[styles.textStyle]}>Select Level</Text>
                <Dropdown
                    style={styles.dropdowns}
                    selectedTextStyle={{ color: THEME.COLOR_GRAY }}
                    itemTextStyle={{ color: THEME.COLOR_GRAY }}
                    data={Level}
                    maxHeight={300}
                    labelField={'label'}
                    valueField={'value'}
                    placeholder={`Select Level`}
                    searchPlaceholder="Search..."
                    inputSearchStyle={{ color: THEME.COLOR_GRAY }}
                    value={level}
                    placeholderStyle={{
                        color: THEME.COLOR_GRAY,
                        fontSize: 14,
                        marginLeft: 10,
                        paddingHorizontal: 10
                    }}
                    onChange={item => {
                        onChangeLevel(item.value)
                        setSelectedLevel(item.label)

                    }}
                />
                <Text style={[styles.textStyle]}>Select Answer</Text>
                <Dropdown
                    style={styles.dropdowns}
                    selectedTextStyle={{ color: THEME.COLOR_GRAY }}
                    itemTextStyle={{ color: THEME.COLOR_GRAY }}
                    data={Answer}
                    maxHeight={300}
                    labelField={'label'}
                    valueField={'value'}
                    placeholder={`Select Answer`}
                    searchPlaceholder="Search..."
                    inputSearchStyle={{ color: THEME.COLOR_GRAY }}
                    value={answer}
                    placeholderStyle={{
                        color: THEME.COLOR_GRAY,
                        fontSize: 14,
                        marginLeft: 10
                    }}
                    onChange={item => {
                        onChangeAnswer(item.value)
                        setSelectedAnswer(item.label)
                    }}
                />
            </View>
            <SubmitButton title={'Submit'} handlePress={freeTest} />
            <View style={styles.bottom} />
        </ScrollView>
    )
}

export default AddFreeTest

const styles = StyleSheet.create({
    container: {
        padding: 20,
    },
    input: {
        height: 150,
        margin: 12,
        borderWidth: 0.5,
        padding: 10,
        borderRadius: 10,
        backgroundColor: THEME.COLOR_WHITE
    },
    optionBox: {
        flex: 0.93,
        height: 80,
        margin: 12,
        borderWidth: 0.5,
        padding: 10,
        borderRadius: 10,
    },
    optionContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    title: {
        color: THEME.COLOR_BLACK,
        fontSize: THEME.FONT_SIZE_LARGE,
        fontWeight: THEME.FONT_WEIGHT_BOLD,
    },
    textStyle: {
        flex: 0.07,
        color: THEME.COLOR_BLACK,
        fontSize: THEME.FONT_SIZE_MEDIUM,
        fontWeight: THEME.FONT_WEIGHT_BOLD,
    },
    box: {
        flex: 1,
        paddingVertical: 10,
        flexDirection: 'column'
    },
    bottom: {
        marginBottom: 50
    },
    dropdowns: {
        borderColor: THEME.COLOR_GRAY,
        borderWidth: 1,
        borderRadius: 5,
        height: 40,
        flex: 1,
        marginVertical: 10,
        paddingHorizontal: 10
    },
})