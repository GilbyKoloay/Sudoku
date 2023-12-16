import { createSlice } from '@reduxjs/toolkit';

const dark = '#171717';
const light = '#f5f5f5';

type GameMode = 'Easy' | 'Medium' | 'Hard';
type PrimaryColor = typeof dark | typeof light;
type SecondaryColor = typeof light | typeof dark;

export const appSlice = createSlice({
  name: 'app',
  initialState: {
    gameMode: <GameMode>'Medium',
    primaryColor: <PrimaryColor>dark,
    secondaryColor: <SecondaryColor>light,
  },
  reducers: {
    switchGameMode: state => {
      if (state.gameMode === 'Easy') state.gameMode = 'Medium';
      else if (state.gameMode === 'Medium') state.gameMode = 'Hard';
      else if (state.gameMode === 'Hard') state.gameMode = 'Easy';
    },
    switchTheme: state => {
      if (state.primaryColor === dark) {
        state.primaryColor = light;
        state.secondaryColor = dark;
      } else {
        state.primaryColor = dark;
        state.secondaryColor = light;
      }
    },
  },
});

export const { switchGameMode, switchTheme } = appSlice.actions;
export default appSlice.reducer;
