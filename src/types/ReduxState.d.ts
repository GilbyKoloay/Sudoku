import { combineReducers } from '@reduxjs/toolkit';

import { reducer } from '../redux/app';

const reducers = combineReducers({
  app: reducer,
});

type ReduxState = ReturnType<typeof reducers>;

export default ReduxState;
