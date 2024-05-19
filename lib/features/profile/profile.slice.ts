
import { RootState } from "@/lib/store"
import { ProfileType } from "@/types/profile"
import { createSlice, PayloadAction } from '@reduxjs/toolkit';



type ProfileSlice = {
    profile: ProfileType | undefined,
}

const initialState:ProfileSlice = {
    profile: undefined 
}

const profileSlice = createSlice({
    name: 'profile',
    initialState: initialState,
    reducers: {
        setProfile: (state, action: PayloadAction<ProfileType | undefined>) => {
            state.profile = action.payload;
        }
    },
})


export const selectProfile = (state: RootState) => state.profile.profile;

export const { setProfile } = profileSlice.actions;
export default profileSlice.reducer;