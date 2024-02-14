import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Playlist from './src/screens/Playlist';
import Dashboard from './src/screens/Dashboard';
import PlayVideo from './src/screens/PlayVideo';
import StackNavigation from './src/navigation/StackNavigation';
const App = () => {
  return (
    <NavigationContainer>
      <StackNavigation />
    </NavigationContainer>
  )
}

export default App

const styles = StyleSheet.create({})