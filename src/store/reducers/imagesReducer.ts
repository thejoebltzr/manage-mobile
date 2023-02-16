import {createSlice, PayloadAction, Slice} from '@reduxjs/toolkit';

import {Image} from '@/src/types/Image';

export type ImagesState = {
  data: Image[];
  fetching: boolean;
  error: null | boolean;
};

const initialState: ImagesState = {
  data: [],
  fetching: false,
  error: null,
};

export type ImagesActionType = {
  data: any;
};

export const imagesSlice: Slice<ImagesState> = createSlice({
  name: 'images',
  initialState,
  reducers: {
    getAllImagesRequest: (state: ImagesState) => ({
      ...state,
      fetching: true,
      data: [],
    }),
    getAllImagesSuccess: (
      state: ImagesState,
      {payload}: PayloadAction<ImagesActionType>,
    ) => ({
      data: payload.data,
      fetching: false,
      error: false,
    }),
    getAllImagesFailure: (state: ImagesState) => ({
      ...state,
      fetching: false,
      error: true,
    }),
  },
});

export const {getAllImagesRequest, getAllImagesSuccess, getAllImagesFailure} =
  imagesSlice.actions;

export default imagesSlice.reducer;
