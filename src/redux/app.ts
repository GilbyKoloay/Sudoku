import { createSlice } from '@reduxjs/toolkit';

import { colors } from '../constants';
import { GameMode } from '../types';

const appSlice = createSlice({
  name: 'app',
  initialState: {
    gameMode: <GameMode>'Medium',
    primaryColor: colors.darkest,
    secondaryColor: colors.light,
  },
  reducers: {
    switchGameMode: state => {
      if (state.gameMode === 'Easy') state.gameMode = 'Medium';
      else if (state.gameMode === 'Medium') state.gameMode = 'Hard';
      else if (state.gameMode === 'Hard') state.gameMode = 'Easy';
    },
    switchTheme: state => {
      if (state.primaryColor === colors.darkest) {
        state.primaryColor = colors.lightest;
        state.secondaryColor = colors.dark;
      } else {
        state.primaryColor = colors.darkest;
        state.secondaryColor = colors.light;
      }
    },
  },
});

export const reducer = appSlice.reducer;
export const { switchGameMode, switchTheme } = appSlice.actions;
