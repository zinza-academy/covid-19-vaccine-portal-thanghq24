import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from './store';
import dayjs from 'dayjs';

export interface UserData {
  fullName: string;
  healthInsuranceNumber: string;
  dob: string | number | Date | dayjs.Dayjs | null | undefined;
  gender: string | null;
  citizenIdentification: string;
  province: string;
  district: string;
  ward: string;
}

export interface PersonalInfoFormData {
  citizenIdentification: string;
  fullName: string;
  dob: string | number | Date | dayjs.Dayjs | null | undefined;
  gender: string | null;
  province: string;
  district: string;
  ward: string;
}

interface PasswordFormData {
  password: string;
  confirmPassword: string;
}

const userData: UserData = {
  citizenIdentification: '',
  healthInsuranceNumber: '',
  fullName: '',
  dob: null,
  gender: null,
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
    logout: (state) => {
      state = userData;
      return state;
    },
    updateUserData: (state, action: PayloadAction<PersonalInfoFormData>) => {
      return { ...state, ...action.payload };
    }
  }
});

export const { login, logout, updateUserData } = userSlice.actions;

export const selectUserData = (state: RootState) => state.user;

export default userSlice.reducer;
