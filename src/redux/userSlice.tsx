import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from './store';
import dayjs from 'dayjs';

export interface UserData {
  fullName: string;
  healthInsuranceNumber: string;
  dob: string | number | Date | dayjs.Dayjs | null | undefined;
  citizenIdentification: string;
  province: string;
  district: string;
  ward: string;
}

const userData: UserData = {
  citizenIdentification: '',
  healthInsuranceNumber: '',
  fullName: '',
  dob: null,
  province: '',
  district: '',
  ward: ''
};

const initialState = userData;

export const userSlice = createSlice({
  name: 'userSlice',
  initialState,
  reducers: {
    login: (state, action: PayloadAction<UserData>) => {
      return { ...state, ...action.payload };
    },
    logout: () => {
      return { ...userData };
    }
  }
});

export const { login, logout } = userSlice.actions;

export const selectUserData = (state: RootState) => state.user;

export default userSlice.reducer;
