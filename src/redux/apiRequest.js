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
    updateSuccess,
} from './authSlice';
import { useSelector } from 'react-redux';

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
export const updateUser = async (dispatch, navigate, userUpdated, user, axiosJWT) => {
    try {
        const res = await axiosJWT.patch(`/api/user/update/${user.id}`, userUpdated, {
            headers: { token: `Bearer ${user.accessToken}` },
        });
        dispatch(updateSuccess(res.data));
        navigate('/');
    } catch (error) {}
};
export const deleteUser = async (user, id, axiosJWT) => {
    try {
        await axiosJWT.delete(`/api/user/delete/${id}`, {
            headers: { token: `Bearer ${user.accessToken}` },
        });
    } catch (error) {}
};
