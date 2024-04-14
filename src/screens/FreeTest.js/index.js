import React, {useState} from 'react';
import {View, Text, Pressable, Alert, StyleSheet} from 'react-native';
import {TEST} from '../../utils/DataKey';
import {THEME} from '../../utils/colors';

const FreeTest = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);

  const handleNext = () => {
    setCurrentQuestionIndex(prevIndex =>
      prevIndex < TEST.questions.length - 1 ? prevIndex + 1 : prevIndex,
    );
    setSelectedOption(null); // Reset selected option when moving to the next question
  };

  const handlePrev = () => {
    setCurrentQuestionIndex(prevIndex =>
      prevIndex > 0 ? prevIndex - 1 : prevIndex,
    );
    setSelectedOption(null); // Reset selected option when moving to the previous question
  };

  const handleAnswer = option => {
    const newAnswers = [...answers];
    const currentQuestion = TEST.questions[currentQuestionIndex];
    const answerIndex = newAnswers.findIndex(
      ans => ans.question_id === currentQuestion.question_id,
    );
    if (answerIndex !== -1) {
      newAnswers[answerIndex].selected_option = option;
    } else {
      newAnswers.push({
        question_id: currentQuestion.question_id,
        selected_option: option,
      });
    }
    setAnswers(newAnswers);
    setSelectedOption(option); // Set the selected option
  };

  const handleSubmit = () => {
    setSubmitted(true);
    let totalScore = 0;
    answers.forEach(answer => {
      const question = TEST.questions.find(
        q => q.question_id === answer.question_id,
      );
      if (question.correct_answer === answer.selected_option) {
        totalScore += 1;
      }
    });
    setScore(totalScore);
    Alert.alert(
      'Test Submitted',
      `Your score is ${totalScore} out of ${TEST.questions.length}`,
      answers,
    );
  };

  const currentQuestion = TEST.questions[currentQuestionIndex];

  return (
    <View style={styles.container}>
      <View style={styles.questionContainer}>
        <Text style={styles.questionText}>{currentQuestion.question_text}</Text>
        {currentQuestion.options.map((option, index) => (
          <View key={index} style={styles.optionContainer}>
            <Pressable
              style={({pressed}) => [
                styles.optionButton,
                {
                  backgroundColor:
                    selectedOption === option
                      ? THEME.COLOR_BLUE
                      : 'transparent',
                },
                {borderWidth: 0.2},
              ]}
              onPress={() => handleAnswer(option)}
              disabled={submitted}>
              <Text>{option}</Text>
            </Pressable>
          </View>
        ))}
      </View>
      <View style={styles.buttonContainer}>
        <Pressable
          style={({pressed}) => [
            styles.buyNow,
            {
              backgroundColor: pressed ? THEME.COLOR_BORDER : THEME.COLOR_BLUE,
            },
          ]}
          onPress={handlePrev}
          disabled={currentQuestionIndex === 0 || submitted}>
          <Text style={[styles.buyNowText, {color: THEME.COLOR_WHITE}]}>
            Previous
          </Text>
        </Pressable>
        <Pressable
          style={({pressed}) => [
            styles.buyNow,
            {
              backgroundColor: pressed ? THEME.COLOR_BORDER : THEME.COLOR_BLUE,
              width: 100,
            },
            {
              backgroundColor:
                currentQuestionIndex === TEST.questions.length - 1
                  ? THEME.COLOR_GRAY
                  : THEME.COLOR_BLUE,
            },
          ]}
          onPress={
            currentQuestionIndex === TEST.questions.length - 1
              ? null
              : handleNext
          }
          disabled={submitted}>
          <Text style={[styles.buyNowText, {color: THEME.COLOR_WHITE}]}>
            Next
          </Text>
        </Pressable>
      </View>
      <Pressable
        style={({pressed}) => [
          styles.submitButton,
          {backgroundColor: pressed ? THEME.COLOR_BORDER : THEME.COLOR_BLUE},
        ]}
        onPress={handleSubmit}
        disabled={submitted}>
        <Text style={[styles.submitButtonText, {color: THEME.COLOR_WHITE}]}>
          Submit
        </Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 20,
  },
  questionContainer: {
    marginBottom: 20,
    padding: 20,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
  },
  questionText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  optionContainer: {
    marginBottom: 10,
  },
  optionButton: {
    padding: 10,
    borderRadius: 5,
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
});

export default FreeTest;
