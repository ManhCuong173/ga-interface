
import { RootState } from "@/lib/store";
import { ItemMarket } from "@/types/market"
import { createSlice, PayloadAction } from '@reduxjs/toolkit';


export type MarketPlace = {
    item: ItemMarket | null
}


const initialState: MarketPlace = {
    item: null,
}

const marketplaceSlice = createSlice({
    name: 'marketplace',
    initialState: initialState,
    reducers: {
        setItemBought: (state, action: PayloadAction<ItemMarket>) =>{
            state.item = action.payload;
        }
    }
})

export const { setItemBought } = marketplaceSlice.actions;

export const selectItemBought = (state: RootState) => state.marketplaceSlice.item;


export default marketplaceSlice.reducer;