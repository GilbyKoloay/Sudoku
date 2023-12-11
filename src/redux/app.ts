import { createSlice } from '@reduxjs/toolkit';

type Mode = 'Easy' | 'Medium' | 'Hard';
type PrimaryColor = '#171717' | '#f5f5f5';
type SecondaryColor = '#f5f5f5' | '#171717';

export const appSlice = createSlice({
  name: 'app',
  initialState: {
    mode: <Mode>('Medium'),
    primaryColor: <PrimaryColor>('#171717'),
    secondaryColor: <SecondaryColor>('#f5f5f5')
  },
  reducers: {
    switchMode: (state) => {
      if (state.mode === 'Easy') state.mode = 'Medium';
      else if (state.mode === 'Medium') state.mode = 'Hard';
      else if (state.mode === 'Hard') state.mode = 'Easy';
    },
    switchTheme: (state) => {
      if (state.primaryColor === '#171717') {
        state.primaryColor = '#f5f5f5';
        state.secondaryColor = '#171717';
      }
      else {
        state.primaryColor = '#171717';
        state.secondaryColor = '#f5f5f5';
      }
    }
  }
});

export const { switchMode, switchTheme } = appSlice.actions;
export default appSlice.reducer;
