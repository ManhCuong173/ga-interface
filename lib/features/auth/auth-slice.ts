import { ACCESS_TOKEN_KEY } from '@/constants/auth.constant'
import { RootState } from '@/lib/store'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export type AuthState = {
  token: string
  initialized: boolean
}

const initialState: AuthState = {
  token: '',
  initialized: false,
}

const authSlice = createSlice({
  name: 'auth',
  initialState: initialState,
  reducers: {
    setToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload
      localStorage.setItem(ACCESS_TOKEN_KEY, action.payload)
    },
    setInitialized: (state, action: PayloadAction<boolean>) => {
      state.initialized = action.payload
    },
  },
})

export const selectToken = (state: RootState) => state.auth.token
export const selectInitializer = (state: RootState) => state.auth.initialized

export const { setToken, setInitialized } = authSlice.actions
export default authSlice.reducer

