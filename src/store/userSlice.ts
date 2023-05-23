import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { RootState } from './store'

export interface UserState {
  email: string,
  name: string
}

const initialState: UserState = {
  email: '',
  name: ''
}

export const userSlice
 = createSlice({
  name: 'user',
  initialState,
  reducers: {
    resetState: (state) => {
      state = initialState
    },
    setEmail: (state, action: PayloadAction<string>) => {
      state.email = action.payload
    },
    setName: (state, action: PayloadAction<string>) => {
      state.name = action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const { resetState, setEmail, setName } = userSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const selectEmail = (state: RootState) => state.user.email
export const selectName = (state: RootState) => state.user.name

export default userSlice.reducer
