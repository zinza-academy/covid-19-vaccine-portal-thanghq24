import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from './store';
import dayjs from 'dayjs';

export interface Role {
  id: number;
  name: string;
}
export interface UserData {
  fullName: string;
  healthInsuranceNumber: string;
  dob: string | number | Date | dayjs.Dayjs | null | undefined;
  gender: string | null;
  citizenIdentification: string;
  province: number | string;
  district: number | string;
  ward: number | string;
  roles: Role[];
}

export interface PersonalInfoFormData {
  citizenIdentification: string;
  healthInsuranceNumber: string;
  fullName: string;
  dob: string | number | Date | dayjs.Dayjs | null | undefined;
  gender: string | null;
  province: number | string;
  district: number | string;
  ward: number | string;
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
  ward: '',
  roles: []
};

const initialState = { isAuthenticated: false, user: userData };

export const userSlice = createSlice({
  name: 'userSlice',
  initialState,
  reducers: {
    login: (state, action: PayloadAction<UserData>) => {
      state.isAuthenticated = true;
      state.user = action.payload;
      return state;
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = userData;
      return state;
    },
    updateUserData: (state, action: PayloadAction<PersonalInfoFormData>) => {
      state.user = { ...state.user, ...action.payload };
      return state;
    }
  }
});

export const { login, logout, updateUserData } = userSlice.actions;

export const selectUserData = (state: RootState) => state.user.user;
export const selectAuthState = (state: RootState) => state.user.isAuthenticated;

export default userSlice.reducer;
