import {PayloadAction, Slice} from '@reduxjs/toolkit';
import {createSlice} from '@reduxjs/toolkit';

export type UserType = 'parent' | 'catch';

export type UserState = {
  authToken?: string;
  userType?: UserType;
  userId?: number;
  isInitialized?: boolean;
};

const initialState: UserState = {};

export const userSlice: Slice<UserState> = createSlice({
  name: 'user',
  initialState,
  reducers: {
    resetUserState: () => initialState,
    setUserInfo: (state: UserState, {payload}: PayloadAction<UserState>) => ({
      ...state,
      ...payload,
    }),
    setAuthToken: (state: UserState, {payload}: PayloadAction<string>) => ({
      ...state,
      authToken: payload,
    }),
    setUserType: (state: UserState, {payload}: PayloadAction<UserType>) => ({
      ...state,
      userType: payload,
    }),
    setUserId: (state: UserState, {payload}: PayloadAction<number>) => ({
      ...state,
      userId: payload,
    }),
    setIsInitialized: (
      state: UserState,
      {payload}: PayloadAction<boolean>,
    ) => ({
      ...state,
      isInitialized: payload,
    }),
  },
});

export const {
  resetUserState,
  setUserInfo,
  setAuthToken,
  setUserType,
  setUserId,
  setIsInitialized,
} = userSlice.actions;

export default userSlice.reducer;
