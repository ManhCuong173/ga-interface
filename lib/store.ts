import homeSectionReducer from '@/lib/features/home-section/home-section-slice'
import walletReducer from '@/lib/features/wallet/wallet-slice'
import { configureStore } from '@reduxjs/toolkit'
import MintProcessSlice from './features/wallet/mintProcess';
import feeSlice from './features/wallet/fee-slice';
import marketplaceSlice from './features/marketplace/marketplace-slice';
import profileSlice from './features/profile/profile.slice';

export const makeStore = () => {
  return configureStore({
    reducer: {
      wallet: walletReducer,
      mintingProcess: MintProcessSlice,
      fee: feeSlice,
      homeSection: homeSectionReducer,
      marketplaceSlice: marketplaceSlice,
      profile: profileSlice
    },
  })
}

export type AppStore = ReturnType<typeof makeStore>
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']
