import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { RootState } from '@/lib/store'

export type HomeSection = {
  active: string
}

const initialState: HomeSection = {
  active: '',
}

const homeSectionSlice = createSlice({
  name: 'header',
  initialState: initialState,
  reducers: {
    setActiveSection: (state, action: PayloadAction<string>) => {
      state.active = action.payload
    },
  },
})

export const selectActiveSection = (state: RootState) => state.homeSection.active

export const { setActiveSection } = homeSectionSlice.actions
export default homeSectionSlice.reducer
