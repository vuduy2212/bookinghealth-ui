import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import classNames from 'classnames/bind';
import styles from './ChangePassword.module.scss';
import { createAxios } from '~/redux/createInstance';
import { loginSuccess } from '~/redux/authSlice';
import { useNavigate } from 'react-router-dom';
const cx = classNames.bind(styles);

const ChangePassword = () => {
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState('');
    const [countdown, setCountdown] = useState(null);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const currentUser = useSelector((state) => state.auth.login.currentUser);
    let axiosJWT = createAxios(currentUser, dispatch, loginSuccess);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage('');

        if (newPassword !== confirmPassword) {
            setMessage('Passwords do not match.');
            return;
        }

        try {
            const response = await axiosJWT.put(
                '/api/auth/change-password',
                { oldPassword, newPassword },
                {
                    headers: { token: `Bearer ${currentUser.accessToken}` },
                },
            );
            setMessage(response.data.message);
        } catch (error) {
            setMessage(error.response?.data?.message || 'Something went wrong.');
        }
    };

    return (
        <div className={cx('change-password-form')}>
            <h2 className={cx('header')}>Thay đổi mật khẩu</h2>
            <form onSubmit={handleSubmit} className={cx('form')}>
                <div className={cx('form-group')}>
                    <label htmlFor="oldPassword" className={cx('label')}>
                        Nhập mật khẩu cũ:
                    </label>
                    <input
                        type="password"
                        id="oldPassword"
                        value={oldPassword}
                        onChange={(e) => setOldPassword(e.target.value)}
                        className={cx('input')}
                        required
                    />
                </div>
                <div className={cx('form-group')}>
                    <label htmlFor="newPassword" className={cx('label')}>
                        Nhập mật khẩu mới:
                    </label>
                    <input
                        type="password"
                        id="newPassword"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        className={cx('input')}
                        required
                    />
                </div>
                <div className={cx('form-group')}>
                    <label htmlFor="confirmPassword" className={cx('label')}>
                        Nhập lại mật khẩu mới:
                    </label>
                    <input
                        type="password"
                        id="confirmPassword"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className={cx('input')}
                        required
                    />
                </div>
                <button type="submit" className={cx('button')}>
                    Thay đổi mật khẩu
                </button>
            </form>
            {message && <p className={cx('message')}>{message}</p>}
        </div>
    );
};

export default ChangePassword;
