import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    currentUser: null,
    error: null,
    loading: false,
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        signInStart: (state) => {
            state.loading=true;
        },
        signInSuccess: (state, action) => {
            state.currentUser = action.payload;
            state.loading = false;
            state.error = null;
        },
        signInFailure: (state, action) => {
            state.error = action.payload;
            state.loading = false;
        },
        updateUserStart: (state) => {
            state.loading = true;
        },
        updateUserSuccess: (state, action) => {
            state.currentUser =  action.payload;
            state.loading = false;
            state.error = null;
        },
        updateUserFalure: (state, action) => {
            state.error = action.payload;
            state.loading = false;
        },
        deleteUserStart: (state) => {
            state.loading = true;
        },
        deleteUserSuccess: (state) => {
            state.currentUser = null; //navigate to sign in
            state.loading = false;
            state.error = null;
        },
        deleteUserFalure: (state, action) => {
            state.error = action.payload;
            state.loading = false;
        },
        signOutUserStart: (state) => {
            state.loading = true;
        },
        signOutUserSuccess: (state) => {
            state.currentUser = null; //navigate to sign in
            state.loading = false;
            state.error = null;
        },
        signOutUserFalure: (state, action) => {
            state.error = action.payload;
            state.loading = false;
        },
        
    }
});

export const { signInStart, signInSuccess, signInFailure, 
    updateUserStart, updateUserSuccess, updateUserFalure,
    deleteUserStart, deleteUserSuccess, deleteUserFalure,
    signOutUserStart, signOutUserSuccess, signOutUserFalure} = userSlice.actions;  //now we can use this function in other places

export default userSlice.reducer;