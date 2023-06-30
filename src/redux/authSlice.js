import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        login: {
            currentUser: null,
            isFetching: false,
            error: false,
            messageError: null,
        },
        register: {
            isFetching: false,
            error: false,
            success: false,
            messageError: null,
        },
        logOut: {
            isFetching: false,
            error: false,
        },
    },
    reducers: {
        loginStart: (state) => {
            state.login.isFetching = true;
        },
        loginSuccess: (state, action) => {
            state.login.currentUser = action.payload;
            state.login.isFetching = false;
            state.login.error = false;
            state.login.messageError = null;
        },
        loginFailed: (state, action) => {
            state.login.isFetching = false;
            state.login.error = true;
            state.login.messageError = action.payload;
        },
        registerStart: (state) => {
            state.register.isFetching = true;
        },
        registerSuccess: (state, action) => {
            state.register.isFetching = false;
            state.register.error = false;
            state.login.messageError = action.null;
        },
        registerFailed: (state, action) => {
            state.register.isFetching = false;
            state.register.error = true;
            state.register.messageError = action.payload;
        },
        logOutStart: (state, action) => {
            state.logOut.isFetching = true;
        },
        logOutSuccess: (state) => {
            state.login.currentUser = null;
        },
        logOutFailed: (state) => {
            state.logOut.isFetching = false;
            state.logOut.error = true;
        },
        updateSuccess: (state, action) => {
            // state.login.currentUser = action.payload;
            Object.assign(state.login.currentUser, action.payload);
        },
    },
});
export const {
    loginStart,
    loginSuccess,
    loginFailed,
    registerStart,
    registerSuccess,
    registerFailed,
    logOutStart,
    logOutSuccess,
    logOutFailed,
    updateSuccess,
} = authSlice.actions;
export default authSlice.reducer;
