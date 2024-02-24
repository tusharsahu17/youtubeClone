import { StatusBar, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import StackNavigation from './src/navigation/StackNavigation';
import { ThemeProvider } from '@rneui/themed';
import { THEME } from './src/utils/colors';
import { PersistGate } from 'redux-persist/integration/react';
import { Provider as StoreProvider } from 'react-redux';
import { persistor, store } from './src/features/store';
const App = () => {
  return (
    <StoreProvider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ThemeProvider>
          <StatusBar
            backgroundColor={THEME.COLOR_BLUE}
            barStyle={'light-content'}
          />
          <NavigationContainer>
            <StackNavigation />
          </NavigationContainer>
        </ThemeProvider>
      </PersistGate>
    </StoreProvider>

  )
}

export default App

const styles = StyleSheet.create({})