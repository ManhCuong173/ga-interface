import { RootState } from "@/lib/store"
import { PayloadAction, createSlice } from "@reduxjs/toolkit"

const initialState =  {
    btnToUsdRateData: '',
}

const FeeSlice = createSlice({
    name: 'fee',
    initialState: initialState,
    reducers: {
      setBtnToUsdRateData: (state, action: PayloadAction<string>) => {
        state.btnToUsdRateData = action.payload
      },
    },
})
  
export const selectBtnToUsdRateData = (state: RootState) => state.fee.btnToUsdRateData
export const { setBtnToUsdRateData } = FeeSlice.actions

export default FeeSlice.reducer
