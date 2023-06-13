import axios from 'axios';
import {
    logOutFailed,
    logOutStart,
    logOutSuccess,
    loginFailed,
    loginStart,
    loginSuccess,
    registerFailed,
    registerStart,
    registerSuccess,
} from './authSlice';

export const loginUser = async (user, dispatch, navigate) => {
    dispatch(loginStart());
    try {
        const res = await axios.post('/api/auth/login', user);
        dispatch(loginSuccess(res.data));
        navigate('/');
    } catch (error) {
        if (error.response.status == '404') {
            dispatch(loginFailed(error.response.data));
        }
    }
};
export const registerUser = async (user, dispatch, navigate) => {
    dispatch(registerStart());
    try {
        await axios.post('/api/auth/register', user);
        dispatch(registerSuccess());
        navigate('/login');
    } catch (error) {
        dispatch(registerFailed());
    }
};

export const logOut = async (dispatch, navigate) => {
    dispatch(logOutStart());
    try {
        await axios.post('/api/auth/logout');
        dispatch(logOutSuccess());
        navigate('/login');
    } catch (error) {
        dispatch(logOutFailed());
    }
};
