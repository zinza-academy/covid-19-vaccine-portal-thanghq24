import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from './store';
import dayjs from 'dayjs';

export interface FormData {
  priorityType: number | '';
  healthInsuranceNumber: string;
  job: string;
  workplace: string;
  address: string;
  appointmentDate: string | number | Date | dayjs.Dayjs | null | undefined;
  dayPhase: string;
}

const formState: FormData = {
  priorityType: '',
  healthInsuranceNumber: '',
  job: '',
  workplace: '',
  address: '',
  appointmentDate: null,
  dayPhase: ''
};

const initialState = formState;

export const vaccineRegistrationFormSlice = createSlice({
  name: 'vaccineRegistrationForm',
  initialState,
  reducers: {
    submitFormData: (state, action: PayloadAction<FormData>) => {
      return { ...state, ...action.payload };
    },
    resetForm: () => {
      return { ...formState };
    }
  }
});

// To able to use reducers we need to export them.
export const { submitFormData, resetForm } =
  vaccineRegistrationFormSlice.actions;

//Selector to access bookList state.
export const selectVaccineRegistrationFormData = (state: RootState) =>
  state.vaccineRegistrationForm;

export default vaccineRegistrationFormSlice.reducer;
