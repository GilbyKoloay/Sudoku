import { configureStore, combineReducers } from '@reduxjs/toolkit';

import appReducer, * as app from './app';

export const rootReducer = combineReducers({
  app: appReducer
});

export type RootState = ReturnType<typeof rootReducer>;

export const store = configureStore({
  reducer: {
    app: appReducer
  }
});

export { app };
