import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from './store';
import dayjs from 'dayjs';
import { WardResponse } from '@src/hooks/useProvinces';

export interface Role {
  id: number;
  name: string;
}
export interface FullRelationUserData {
  id: number;
  fullName: string;
  email: string;
  healthInsuranceNumber: string;
  dob: string | number | Date | dayjs.Dayjs | null | undefined;
  gender: string;
  citizenIdentification: string;
  roles: Role[];
  ward: WardResponse;
}

export interface UserData {
  id: number | null;
  fullName: string;
  email: string;
  healthInsuranceNumber: string;
  dob: string | number | Date | dayjs.Dayjs | null | undefined;
  gender: string | null;
  citizenIdentification: string;
  roles: Role[];
  ward: WardResponse | null;
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
  id: null,
  email: '',
  citizenIdentification: '',
  healthInsuranceNumber: '',
  fullName: '',
  dob: null,
  gender: null,
  ward: null,
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
    }
  }
});

export const { login, logout } = userSlice.actions;

export const selectUserData = (state: RootState) => state.user.user;
export const selectAuthState = (state: RootState) => state.user.isAuthenticated;

export default userSlice.reducer;
