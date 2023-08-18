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
        await dispatch(loginSuccess(res.data));
        if (res.data.roleId === 'R3') {
            navigate('/');
        }
        if (res.data.roleId === 'R1') {
            navigate('/system/admin/patient-manage');
        }
        if (res.data.roleId === 'R2') {
            navigate('/system/doctor/booking');
        }
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
        if (error.response.status == '404') {
            dispatch(registerFailed(error.response.data));
        }
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
export const updateSelf = async (dispatch, userUpdated, user, axiosJWT) => {
    try {
        const res = await axiosJWT.patch(`/api/user/update/${user.id}`, userUpdated, {
            headers: { token: `Bearer ${user.accessToken}` },
        });
        dispatch(updateSuccess(res.data));
    } catch (error) {}
};
export const confirmUser = async (user, id, axiosJWT, roleId) => {
    try {
        let newRoleId = '';
        if (roleId === 'R2x') {
            newRoleId = 'R2';
        }
        if (roleId === 'R1x') {
            newRoleId = 'R1';
        }
        await axiosJWT.patch(
            `/api/user/update/${id}`,
            { roleId: newRoleId },
            {
                headers: { token: `Bearer ${user.accessToken}` },
            },
        );
    } catch (error) {}
};
export const deleteUser = async (user, id, axiosJWT) => {
    try {
        await axiosJWT.delete(`/api/user/delete/${id}`, {
            headers: { token: `Bearer ${user.accessToken}` },
        });
    } catch (error) {}
};
