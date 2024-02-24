import {configureStore, combineReducers} from '@reduxjs/toolkit';

import {persistReducer, persistStore} from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';

import authReducer from './auth/authSlice';
import configReducer from './config/configSlice';
import meetingReducer from './meeting/meetingSlice';

const rootPersistConfig = {
  key: 'arogyam-patient',
  version: 1,
  storage: AsyncStorage,
  whitelist: ['auth', 'config', 'meeting'],
};

const rootReducer = combineReducers({
  auth: authReducer,
  config: configReducer,
  meeting: meetingReducer,
});

const persistedReducer = persistReducer(rootPersistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);
