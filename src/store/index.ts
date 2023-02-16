import {configureStore} from '@reduxjs/toolkit';
import {
  FLUSH,
  PAUSE,
  PERSIST,
  persistStore,
  PURGE,
  REGISTER,
  REHYDRATE,
} from 'redux-persist';

import reactotron from '@/src/utils/reactotron';

import reducer from './reducers/index';

/* to fix typescript marking this because reactotron might be undefined */
const enhancers = [];
if (reactotron && reactotron.createEnhancer) {
  enhancers.push(reactotron.createEnhancer());
}

/* configure store with all the reducers (persisted reducer) */
const store = configureStore({
  reducer,
  devTools: process.env.NODE_ENV !== 'production',
  enhancers,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      thunk: false,
      serializableCheck: {
        /* fix for issue with non-serializable values for redux-persist action */
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

/* add redux-persist to store */
const persistor = persistStore(store);

/* use for hot reloading during development build */
if (process.env.NODE_ENV !== 'production' && module.hot) {
  module.hot.accept('./index', () => store.replaceReducer(reducer));
}

/* type to use for useAppSelector */
export type RootState = ReturnType<typeof store.getState>;
/* type to use for useAppDispatch */
export type AppDispatch = typeof store.dispatch;

export {persistor};
export default store;
