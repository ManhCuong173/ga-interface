import { RootState } from '@/lib/store'
import { PayloadAction, createSlice } from '@reduxjs/toolkit'

export type WalletState = {
  address: string
  publicKey: string
}

const initialState: WalletState = {
  address: '',
  publicKey: '',
}

const walletSlice = createSlice({
  name: 'wallet',
  initialState: initialState,
  reducers: {
    setAddress: (state, action: PayloadAction<string>) => {
      state.address = action.payload
    },
    setPublicKey: (state, action: PayloadAction<string>) => {
      state.publicKey = action.payload
    },
  },
})

export const selectAddress = (state: RootState) => state.wallet.address
export const selectedPublicKey = (state: RootState) => state.wallet.publicKey

export const { setAddress, setPublicKey } = walletSlice.actions
export default walletSlice.reducer
