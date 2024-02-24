import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  config: null,
};

const configSlice = createSlice({
  name: 'config',
  initialState,
  reducers: {
    setConfig: (state, action) => {
      state.config = action.payload;
    },
  },
});

export const {setConfig} = configSlice.actions;
export const selectConfig = state => state.config;
export default configSlice.reducer;
