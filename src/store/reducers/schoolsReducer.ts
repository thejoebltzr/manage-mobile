import AsyncStorage from '@react-native-async-storage/async-storage';
import type {PayloadAction, Slice} from '@reduxjs/toolkit';
import {createSlice} from '@reduxjs/toolkit';
import {persistReducer} from 'redux-persist';

import {School} from '@/src/types/school';

export type SchoolsState = {
  currentSchool?: School;
  selectedSchools: School[];
};

// Define the initial state using that type
const initialState: SchoolsState = {
  selectedSchools: [],
};

export type SchoolsActionType = {
  data: any;
};

export const schoolsSlice: Slice<SchoolsState> = createSlice({
  name: 'schools',
  initialState,
  reducers: {
    setCurrentSchool: (
      state: SchoolsState,
      {payload}: PayloadAction<School>,
    ) => {
      const isInState = state.selectedSchools.some(
        selected => selected.school_id === payload.school_id,
      );
      return {
        ...state,
        currentSchool: payload,
        selectedSchools: !isInState
          ? [...state.selectedSchools, payload]
          : state.selectedSchools,
      };
    },
    setSelectedSchools: (
      state: SchoolsState,
      {payload}: PayloadAction<School[]>,
    ) => ({
      ...state,
      selectedSchools: payload,
    }),
    toggleSelectedSchool: (
      state: SchoolsState,
      {payload}: PayloadAction<School>,
    ) => {
      const {selectedSchools} = state;
      const isInState = selectedSchools.some(
        selected => selected.school_id === payload.school_id,
      );
      return {
        ...state,
        selectedSchools: !isInState
          ? [...selectedSchools, payload]
          : selectedSchools.filter(
              selected => selected.school_id !== payload.school_id,
            ),
      };
    },
  },
});

export const {
  getAllSchoolsRequest,
  getAllSchoolsSuccess,
  getAllSchoolsFailure,
  setCurrentSchool,
  setSelectedSchools,
  toggleSelectedSchool,
} = schoolsSlice.actions;

const schoolConfig = {
  key: 'school',
  version: 1,
  storage: AsyncStorage,
  /* add states here that needs to be persisted */
  whitelist: ['currentSchool', 'selectedSchools'],
};

export default persistReducer(schoolConfig, schoolsSlice.reducer);
