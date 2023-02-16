import {createSlice, PayloadAction, Slice} from '@reduxjs/toolkit';

import {Bulletin} from '@/src/types/Bulletin';

import {EventsActionType} from './eventsReducer';

export type BulletinsState = {
  data: Bulletin[];
  fetching: boolean;
  error: null | boolean;
};

const initialState: BulletinsState = {
  data: [],
  fetching: false,
  error: null,
};

export type BulletinsActionType = {
  data: any;
};

export const bulletinsSlice: Slice<BulletinsState> = createSlice({
  name: 'bulletins',
  initialState,
  reducers: {
    getAllBulletinsRequest: (state: BulletinsState) => ({
      ...state,
      fetching: true,
    }),
    getAllBulletinsSuccess: (
      state: BulletinsState,
      {payload}: PayloadAction<EventsActionType>,
    ) => ({
      data: payload.data,
      fetching: false,
      error: false,
    }),
    getAllBulletinsFailure: (state: BulletinsState) => ({
      ...state,
      fetching: false,
      error: true,
    }),
  },
});

export const {
  getAllBulletinsRequest,
  getAllBulletinsSuccess,
  getAllBulletinsFailure,
} = bulletinsSlice.actions;

export default bulletinsSlice.reducer;
