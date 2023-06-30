import classNames from 'classnames/bind';
import { useState, useEffect } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import style from './UpdateUser.module.scss';
import HeaderLite from '~/components/HeaderLite/index.';
import Button from '~/components/Button';
import { createAxios } from '~/redux/createInstance';
import { loginSuccess } from '~/redux/authSlice';
import { updateSelf } from '~/redux/apiRequest';
import ProtectedRoute from '~/routes/ProtectedRoute';
const cx = classNames.bind(style);
function UpdateUser() {
    const navigate = useNavigate();
    const user = useSelector((state) => state.auth.login.currentUser);
    const dispatch = useDispatch();
    let axiosJWT = createAxios(user, dispatch, loginSuccess);
    const [phoneNumber, setPhoneNumber] = useState(user?.phoneNumber);
    const [yearOfBirth, setYearOfBirth] = useState(user?.yearOfBirth);
    const [address, setAddress] = useState(user?.address);
    const [gender, setGender] = useState(user?.gender);
    const handleSubmit = async (e) => {
        e.preventDefault();
        const userUpdated = {
            phoneNumber,
            yearOfBirth,
            address,
            gender,
        };
        await updateSelf(dispatch, navigate, userUpdated, user, axiosJWT);
        navigate('/');
    };

    return (
        <ProtectedRoute redirectPath="/login" isAllowed={user}>
            <div className={cx('wrapper')}>
                <HeaderLite title="Cập nhật thông tin cá nhân" />
                <div className={cx('container', 'content')}>
                    <div className="row d-flex justify-content-center">
                        <div className={cx('col-12', 'col-md-10', 'd-flex', 'justify-content-center', 'boder')}>
                            <div className="col-12 col-md-10">
                                <div className={cx('form-warrper')}>
                                    <form onSubmit={(e) => handleSubmit(e)} className="row g-4">
                                        <div className="col-8 col-md-4">
                                            <label htmlFor="lastName" className={cx('form-label', 'label')}>
                                                Họ
                                            </label>
                                            <input
                                                value={user?.lastName}
                                                type="text"
                                                className={cx('form-control', 'input')}
                                                id="lastName"
                                                disabled
                                            />
                                        </div>
                                        <div className="col-4 col-md-2">
                                            <label htmlFor="firstName" className={cx('form-label', 'label')}>
                                                Tên
                                            </label>
                                            <input
                                                value={user?.firstName}
                                                type="text"
                                                className={cx('form-control', 'input')}
                                                id="firstName"
                                                disabled
                                            />
                                        </div>
                                        <div className="col-12 col-md-6">
                                            <label htmlFor="email" className={cx('form-label', 'label')}>
                                                Email
                                            </label>
                                            <input
                                                value={user?.email}
                                                type="text"
                                                className={cx('form-control', 'input')}
                                                id="email"
                                                disabled
                                            />
                                        </div>
                                        <div className="col-12 col-md-4">
                                            <label htmlFor="phone" className={cx('form-label', 'label')}>
                                                Số điện thoại
                                            </label>
                                            <input
                                                value={phoneNumber}
                                                onChange={(e) => setPhoneNumber(e.target.value)}
                                                type="text"
                                                className={cx('form-control', 'input')}
                                                id="phone"
                                            />
                                        </div>
                                        <div className=" col-12 col-md-3">
                                            <label htmlFor="inputCity" className={cx('form-label', 'label')}>
                                                Năm sinh
                                            </label>
                                            <input
                                                value={yearOfBirth}
                                                onChange={(e) => setYearOfBirth(e.target.value)}
                                                type="text"
                                                className={cx('form-control', 'input')}
                                                id="inputCity"
                                            />
                                        </div>
                                        <div className=" col-12 col-md-12">
                                            <label htmlFor="inputCity" className={cx('form-label', 'label')}>
                                                Địa chỉ
                                            </label>
                                            <input
                                                value={address}
                                                onChange={(e) => setAddress(e.target.value)}
                                                type="text"
                                                className={cx('form-control', 'input')}
                                                id="inputCity"
                                            />
                                        </div>
                                        <div className="col-12 col-md-4">
                                            <label htmlFor="inputState" className={cx('form-label', 'label')}>
                                                Giới tính
                                            </label>
                                            <select
                                                value={gender}
                                                id="inputState"
                                                className={cx('form-select', 'input')}
                                                onChange={(e) => setGender(e.target.value)}
                                            >
                                                <option value={''}>Chọn giới tính</option>
                                                <option value="M">Nam</option>
                                                <option value="F">Nữ</option>
                                                <option value="O">Khác</option>
                                            </select>
                                        </div>

                                        <div className="row d-flex justify-content-center">
                                            <div className="col-4 ">
                                                <Button rounded large type="submit" className={cx('button-submit')}>
                                                    Cập nhật
                                                </Button>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </ProtectedRoute>
    );
}

export default UpdateUser;
