import AsyncStorage from '@react-native-async-storage/async-storage';
import {createAction} from '@reduxjs/toolkit';
import {AnyAction, combineReducers} from 'redux';
import {persistReducer} from 'redux-persist';

import bulletinsReducer from './bulletinsReducer';
import eventReducer from './eventsReducer';
import imagesReducer from './imagesReducer';
import schoolReducer from './schoolsReducer';
import teamReducer from './teamsReducer';
import userReducer from './userReducer';

export const mutation_types = {
  CLEAR_STATE: 'CLEAR_STATE',
};

export const clearState = createAction<number | undefined>(
  mutation_types.CLEAR_STATE,
);

const rootConfig = {
  key: 'root',
  version: 1,
  storage: AsyncStorage,
  /* add states here that needs to be persisted */
  whitelist: ['user'],
};

/* combine all reducers into single root reducer */
const reducer = combineReducers({
  schools: schoolReducer,
  teams: teamReducer,
  events: eventReducer,
  user: userReducer,
  bulletins: bulletinsReducer,
  images: imagesReducer,
});

const persistedReducer = persistReducer(rootConfig, reducer);

const rootReducer = (
  state: ReturnType<typeof persistedReducer>,
  action: AnyAction,
) => {
  if (clearState.match(action)) {
    return persistedReducer(undefined, {type: undefined});
  }

  return persistedReducer(state, action);
};

export default rootReducer;
