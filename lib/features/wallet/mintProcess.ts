import { RootState } from '@/lib/store'
import { PayloadAction, createSlice } from '@reduxjs/toolkit'

/**
 * 1: FrmMyOrders
 * 2: FrmSubmit
 */
export type MintProcess = {
  processState: number
  addressReceiver: string
}

const initialState: MintProcess = {
  processState: 1,
  addressReceiver: '',
}

const MintProcessSlice = createSlice({
  name: 'mintingProcess',
  initialState: initialState,
  reducers: {
    setProcessState: (state, action: PayloadAction<number>) => {
      state.processState = action.payload
    },
    setAddressReceiver: (state, action: PayloadAction<string>) => {
      state.addressReceiver = action.payload
    },
  },
})

export const selectMintProcess = (state: RootState) => state.mintingProcess.processState
export const selectAddressReceiver = (state: RootState) => state.mintingProcess.addressReceiver

export const { setProcessState, setAddressReceiver } = MintProcessSlice.actions
export default MintProcessSlice.reducer
