import { configureStore } from '@reduxjs/toolkit';

import * as app from './app';

const store = configureStore({
  reducer: {
    app: app.reducer,
  },
});

export { store, app };
