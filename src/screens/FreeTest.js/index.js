import React, { useEffect, useState } from 'react';
import { View, Text, Pressable, Alert, StyleSheet, FlatList, ActivityIndicator } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { THEME } from '../../utils/colors';
import { getFreeTest } from '../../services/userApi';
const FreeTest = () => {
  const [answers, setAnswers] = useState([]);
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [test, setTest] = useState({ currentPage: 1, totalPages: 0, questions: [] });
  const [pageNo, setPageNo] = useState(1);
  const [loader, setLoader] = useState(false)
  const [correctAnswers, setCorrectAnswers] = useState([])
  const handleNext = () => {
    if (pageNo < test.totalPages) {
      setPageNo(pageNo + 1);
    }
  };

  const handlePrev = () => {
    if (pageNo > 1) {
      setPageNo(pageNo - 1);
    }
  };
  const handleAnswer = (questionId, option, correctOption) => {
    const newAnswers = {
      ...answers,
      [questionId]: option
    };
    const correct = {
      ...correctAnswers,
      [questionId]: correctOption
    };
    setAnswers(newAnswers);
    setCorrectAnswers(correct)
  };

  const handleSubmit = () => {
    setSubmitted(true);
    let totalScore = 0;

    // Assuming `answers` is the user's selected answers object
    // and `correctAnswers` is the provided correct answers object

    Object.entries(answers).forEach(([questionId, selectedOption]) => {
      const correctAnswer = correctAnswers[questionId];
      if (correctAnswer && correctAnswer === selectedOption) {
        totalScore += 1;
      }
    });
    setScore(totalScore);
    Alert.alert(
      'Test Submitted',
      `Your score is ${totalScore} out of ${Object.keys(correctAnswers).length}`,
    );
  };
  const getTest = async () => {
    setLoader(true)
    const response = await getFreeTest(pageNo);
    if (response.status) {
      setTest({
        currentPage: response.currentPage,
        totalPages: response.totalPages,
        questions: response.data,
      });
    }
    setLoader(false)
  };


  useEffect(() => {
    getTest();
  }, [pageNo]);

  useEffect(() => {
    if (test.questions.length && pageNo > test.totalPages) {
      setPageNo(1);
    }
  }, [test, pageNo, answers]);
  const getColor = (color) => {
    switch (color) {
      case 'Easy': return THEME.COLOR_SUCCESS
      case 'Medium': return THEME.COLOR_WARNING
      case 'Hard': return THEME.COLOR_DANGER
      default: return THEME.COLOR_WARNING
    }
  }
  const renderItem = ({ item }) => {
    if (!item) return null; // Check to ensure the item is not undefined
    return (
      <View style={styles.questionContainer}>
        <Text style={styles.questionNumber}>
          Question: {pageNo}/{test.totalPages}
        </Text>
        <View style={[styles.levelBox, { backgroundColor: getColor(item?.level) }]}>
          <Text style={[styles.questionNumber, styles.levelStyle]}>
            {item.level}
          </Text>
        </View>
        <Text style={styles.questionText}>
          {/* Q{pageNo}. */}
          {item.question}
        </Text>
        {Object.entries(item.options).map(([key, option], optionIndex) => (
          <View key={key} style={styles.optionContainer}>
            <Pressable
              style={({ pressed }) => [
                styles.optionButton,
                {
                  backgroundColor: answers[item._id] === key ? THEME.COLOR_BLUE : 'transparent',
                  borderColor: answers[item._id] === key ? THEME.COLOR_BLUE : '#ccc',
                }
              ]}
              onPress={() => handleAnswer(item._id, key, item.answer)}
              disabled={submitted}>
              <Text
                style={{
                  color: answers[item._id] === key ? THEME.COLOR_WHITE : THEME.COLOR_BLACK,
                }}>
                {String.fromCharCode(97 + optionIndex)}. {option}
              </Text>
            </Pressable>
          </View>
        ))}
      </View>
    );
  };
  return (
    <View style={styles.container}>
      {loader ?
        <View style={styles.loaders}>
          <ActivityIndicator size="large" color={THEME.COLOR_BLUE} />
        </View> :
        <FlatList
          data={test.questions}
          renderItem={renderItem}
          keyExtractor={(item, index) => item._id}
        />}
      <View style={styles.buttonContainer}>
        <Pressable
          style={({ pressed }) => [
            styles.buyNow,
            {
              backgroundColor: pressed ? THEME.COLOR_BORDER :
                (test.currentPage === 1 ? THEME.COLOR_GRAY : THEME.COLOR_BLUE),
            },
          ]}
          onPress={handlePrev}
          disabled={test.currentPage === 1 || submitted}>
          <Text style={[styles.buyNowText, { color: THEME.COLOR_WHITE }]}>
            <AntDesign
              name="left"
              style={{
                color: THEME.COLOR_WHITE,
                fontSize: 15,
              }}
            />
            Previous
          </Text>
        </Pressable>
        <Pressable
          style={({ pressed }) => [
            styles.buyNow,
            {
              backgroundColor: pressed ? THEME.COLOR_BORDER :
                (test.currentPage === test.totalPages ? THEME.COLOR_GRAY : THEME.COLOR_BLUE),
              width: 100,
            },
          ]}
          onPress={handleNext}
          disabled={test.currentPage === test.totalPages || submitted}>
          <Text style={[styles.buyNowText, { color: THEME.COLOR_WHITE }]}>
            Next
            <AntDesign
              name="right"
              style={{
                color: THEME.COLOR_WHITE,
                fontSize: 15,
              }}
            />
          </Text>
        </Pressable>
      </View>
      <Pressable
        style={({ pressed }) => [
          styles.submitButton,
          { backgroundColor: pressed ? THEME.COLOR_BORDER : THEME.COLOR_BLUE },
        ]}
        onPress={handleSubmit}
        disabled={submitted}>
        <Text style={[styles.submitButtonText, { color: THEME.COLOR_WHITE }]}>
          Submit
        </Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 10,
    marginTop: 0,
  },
  levelBox: {
    width: 80,
    alignSelf: 'flex-end',
    justifyContent: 'center',
    alignItems: 'center',
  },
  levelStyle: {
    color: THEME.COLOR_WHITE,
    textTransform: 'capitalize',
    alignSelf: 'center',
    paddingTop: 5

  },
  questionContainer: {
    marginHorizontal: 10,
    marginBottom: 20,
    padding: 20,
    borderColor: '#ccc',
    borderRadius: 10,
  },
  questionNumber: {
    alignSelf: 'flex-end',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
    color: THEME.COLOR_BLACK,
  },
  questionText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: THEME.COLOR_BLACK,
  },
  optionContainer: {
    marginBottom: 10,
  },
  optionButton: {
    padding: 10,
    borderRadius: 5,
    borderWidth: 1,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  buyNow: {
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  buyNowText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  submitButton: {
    marginTop: 20,
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  submitButtonText: {
    fontSize: 16,
    fontWeight: 'bold',

  },
  loaders: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
})
export default FreeTest