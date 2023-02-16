import AsyncStorage from '@react-native-async-storage/async-storage';
import type {PayloadAction, Slice} from '@reduxjs/toolkit';
import {createSlice} from '@reduxjs/toolkit';
import {persistReducer} from 'redux-persist';

import {Event} from '@/src/types/event';

export type EventsState = {
  data: Event[];
  fetching: boolean;
  error: null | boolean;
  selectedEvents: Event[];
};

const initialState: EventsState = {
  data: [],
  fetching: false,
  error: null,
  selectedEvents: [],
};

export type EventsActionType = {
  data: any;
};

export const eventsSlice: Slice<EventsState> = createSlice({
  name: 'events',
  initialState,
  reducers: {
    getAllEventsRequest: (state: EventsState) => ({
      ...state,
      fetching: true,
    }),
    getAllEventsSuccess: (
      state: EventsState,
      {payload}: PayloadAction<EventsActionType>,
    ) => ({
      ...state,
      data: payload.data,
      fetching: false,
      error: false,
    }),
    getAllEventsFailure: (state: EventsState) => ({
      ...state,
      fetching: false,
      error: true,
    }),
    setSelectedEvents: (
      state: EventsState,
      {payload}: PayloadAction<Event[]>,
    ) => ({
      ...state,
      selectedEvents: payload,
    }),
  },
});

export const {
  getAllEventsRequest,
  getAllEventsSuccess,
  getAllEventsFailure,
  setSelectedEvents,
} = eventsSlice.actions;

const eventConfig = {
  key: 'event',
  version: 1,
  storage: AsyncStorage,
  /* add states here that needs to be persisted */
  whitelist: ['selectedEvents'],
};

export default persistReducer(eventConfig, eventsSlice.reducer);
