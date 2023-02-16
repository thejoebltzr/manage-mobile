import AsyncStorage from '@react-native-async-storage/async-storage';
import type {PayloadAction, Slice} from '@reduxjs/toolkit';
import {createSlice} from '@reduxjs/toolkit';
import {persistReducer} from 'redux-persist';

import {SelectedTeam, Team} from '@/src/types/team';

export type TeamsState = {
  data: Team[];
  fetching: boolean;
  error: null | boolean;
  selectedTeams: SelectedTeam[];
  selectedTeamId?: number;
};

// Define the initial state using that type
const initialState: TeamsState = {
  data: [],
  fetching: false,
  error: null,
  selectedTeams: [],
};

export type TeamsActionType = {
  data: any;
};

export const teamsSlice: Slice<TeamsState> = createSlice({
  name: 'teams',
  initialState,
  reducers: {
    getAllTeamsRequest: (state: TeamsState) => ({
      ...state,
      fetching: true,
    }),
    getAllTeamsSuccess: (
      state: TeamsState,
      {payload}: PayloadAction<TeamsActionType>,
    ) => ({
      ...state,
      data: payload.data,
      fetching: false,
      error: false,
    }),
    getAllTeamsFailure: (state: TeamsState) => ({
      ...state,
      fetching: false,
      error: true,
    }),
    setSelectedTeams: (
      state: TeamsState,
      {payload}: PayloadAction<Array<SelectedTeam>>,
    ) => ({
      ...state,
      selectedTeams: payload,
    }),
    setSelectedTeamId: (
      state: TeamsState,
      {payload}: PayloadAction<number>,
    ) => ({
      ...state,
      selectedTeamId: payload,
    }),
  },
});

export const {
  getAllTeamsRequest,
  getAllTeamsSuccess,
  getAllTeamsFailure,
  setSelectedTeams,
  setSelectedTeamId,
} = teamsSlice.actions;

const teamConfig = {
  key: 'teams',
  version: 1,
  storage: AsyncStorage,
  /* add states here that needs to be persisted */
  whitelist: ['selectedTeams'],
};

export default persistReducer(teamConfig, teamsSlice.reducer);
