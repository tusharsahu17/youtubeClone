import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  allMeeting: null,
};

const meetingSlice = createSlice({
  name: 'meeting',
  initialState,
  reducers: {
    setMeeting: (state, action) => {
      state.allMeeting = action.payload;
    },
  },
});

export const {setMeeting} = meetingSlice.actions;
export const selectMeeting = state => state.meeting;
export default meetingSlice.reducer;
