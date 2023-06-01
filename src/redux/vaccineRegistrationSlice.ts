import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from './store';

interface FormData {
  priorityType: string;
  healthInsuranceNumber: number | '';
  job: string;
  workplace: string;
  address: string;
  appointmentDate: Date | '';
  dayPhase: string;
}

const formState: FormData = {
  priorityType: '',
  healthInsuranceNumber: '',
  job: '',
  workplace: '',
  address: '',
  appointmentDate: '',
  dayPhase: ''
};

const initialState = formState;

export const vaccineRegistrationFormSlice = createSlice({
  name: 'vaccineRegistrationForm',
  initialState,
  reducers: {
    test: (state, action) => {
      return { ...state, ...action.payload };
    }
  }
});

// To able to use reducers we need to export them.
export const { test } = vaccineRegistrationFormSlice.actions;

//Selector to access bookList state.
export const selectVaccineRegistrationFormData = (state: RootState) =>
  state.vaccineRegistrationForm;

export default vaccineRegistrationFormSlice.reducer;
