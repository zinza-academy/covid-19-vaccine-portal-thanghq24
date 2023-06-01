import { configureStore } from '@reduxjs/toolkit';
import { vaccineRegistrationFormSlice } from './vaccineRegistrationSlice';

export const store = configureStore({
  reducer: {
    vaccineRegistrationForm: vaccineRegistrationFormSlice.reducer
  }
});

export type RootState = ReturnType<typeof store.getState>; // A global type to access reducers types
export type AppDispatch = typeof store.dispatch;
