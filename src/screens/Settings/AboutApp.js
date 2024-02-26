import {ScrollView, StyleSheet, Text, View} from 'react-native';
import React from 'react';

const AboutApp = () => {
  const AppContent = {
    title: 'About Our App',
    description: `"At competitive education center, our mission is to empower individuals on their journey of personal and professional development. We believe in the transformative power of coaching, providing users with the tools, guidance, and inspiration they need to unlock their full potential.

    Our Core Values:
    
    Empowerment: We are committed to empowering individuals to take control of their lives, set meaningful goals, and achieve sustainable growth.
    
    Accessibility: We strive to make coaching resources and insights accessible to everyone, breaking down barriers to personal development.
    
    Personalization: Recognizing the uniqueness of each individual, our coaching approach is personalized to cater to diverse needs and aspirations.
    
    Continuous Improvement: We are dedicated to continuous improvement, adapting our coaching methodologies based on user feedback and the latest insights in personal development.
    
    What Sets Us Apart:
    
    Comprehensive Coaching Programs: Our app offers a range of comprehensive coaching programs designed to address various aspects of personal and professional growth.
    
    Expert Guidance: Access expert guidance from experienced coaches who are passionate about facilitating positive change in people's lives.
    
    Interactive and Engaging Content: Engage with interactive content, exercises, and tools that enhance the coaching experience, making personal development an enjoyable journey.
    
    Our Vision:
    
    To create a global community of empowered individuals who lead fulfilling lives, achieve their goals, and inspire positive change in their communities.
    
    Join us on this transformative journey at competitive education center and embark on a path of self-discovery, growth, and success."`,
  };
  return (
    <ScrollView style={styles.container}>
      <Text>{AppContent.title}</Text>
      <Text>{AppContent.description}</Text>
    </ScrollView>
  );
};

export default AboutApp;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 20,
  },
});
