import { useState } from 'react';
import classNames from 'classnames/bind';
import React from 'react';
import { ToastContainer, toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';
import styles from './ModalInfo.module.scss';
import Button from '~/components/Button';
import { MdClose } from 'react-icons/md';
import axios from 'axios';
import { createAxios } from '~/redux/createInstance';
import { loginSuccess } from '~/redux/authSlice';
import { useDispatch, useSelector } from 'react-redux';
import { deleteUser } from '~/redux/apiRequest';
import { AiFillLayout } from 'react-icons/ai';
const cx = classNames.bind(styles);
function ModalInfo({
    greenTheme = false,
    blueTheme = false,
    id,
    reload,
    submitAction,
    titleButton,
    titleHeader,
    titleBody,
    titleConfirm,
    roleId = null,
    showToast,
    data = {},
    children,
}) {
    const user = useSelector((state) => state.auth.login.currentUser);
    const dispatch = useDispatch();
    const [modal, setModal] = useState(false);
    let axiosJWT = createAxios(user, dispatch, loginSuccess);
    const toggleModal = () => {
        setModal(!modal);
    };

    if (modal) {
        document.body.classList.add(cx('active-modal'));
    } else {
        document.body.classList.remove(cx('active-modal'));
    }

    const handleSubmit = async () => {
        setModal(false);
        await submitAction(user, id, axiosJWT, roleId);
        showToast();
        await reload();
    };

    return (
        <>
            <Button
                rounded
                onClick={toggleModal}
                className={cx('btn-modal', {
                    'green-theme': greenTheme,
                    'blue-theme': blueTheme,
                })}
            >
                {'Xem thông tin '}
            </Button>

            {modal && (
                <div className={cx('modal')}>
                    <div onClick={toggleModal} className={cx('overlay')}></div>
                    <div className={cx('modal-content')}>
                        <div className={cx('modal-header')}>
                            <span className={cx('modal-title')}>{'Thông tin chi tiết'}</span>
                            <button className={cx('close-modal')} onClick={toggleModal}>
                                <MdClose className={cx('modal-icon-close')} />
                            </button>
                        </div>
                        <div className={cx('modal-body')}>
                            <div className={cx('modal-info-patient')}>
                                <h2 className={cx('header-info')}>Thông tin bệnh nhân</h2>
                                <ul className={cx('info-list')}>
                                    <li className={cx('info-item')}>
                                        <span className={cx('item-label')}>Họ và tên:</span> {data.namePatient}
                                    </li>
                                    <li className={cx('info-item')}>
                                        <span className={cx('item-label')}>Số điện thoại:</span>{' '}
                                        {data.phoneNumberPatient}
                                    </li>
                                    <li className={cx('info-item')}>
                                        <span className={cx('item-label')}>Giới tính:</span> {data.genderPatient}
                                    </li>
                                    <li className={cx('info-item')}>
                                        <span className={cx('item-label')}> Năm sinh:</span> {data.yearOfBirthPatient}
                                    </li>
                                    <li className={cx('info-item')}>
                                        <span className={cx('item-label')}>Địa chỉ:</span> Hà Nội {data.addressPatient}
                                    </li>
                                    <li className={cx('info-item')}>
                                        <span className={cx('item-label')}>Lý do khám:</span> {data.reason}
                                    </li>
                                </ul>
                            </div>
                            <div className={cx('modal-info-booking')}>
                                <h2 className={cx('header-info')}>Thông tin đặt lịch</h2>
                                <ul className={cx('info-list')}>
                                    <li className={cx('info-item')}>
                                        <span className={cx('item-label')}>Bác sĩ:</span> {data.nameDoctor}
                                    </li>
                                    <li className={cx('info-item')}>
                                        <span className={cx('item-label')}>Số điện thoại:</span>{' '}
                                        {data.phoneNumberDoctor}
                                    </li>

                                    <li className={cx('info-item')}>
                                        <span className={cx('item-label')}>Chuyên khoa: </span> {data.specialist}
                                    </li>
                                    <li className={cx('info-item')}>
                                        <span className={cx('item-label')}>Bệnh viện:</span> {data.clinic}
                                    </li>
                                    <li className={cx('info-item')}>
                                        <span className={cx('item-label')}>Địa điểm khám:</span> {data.addressClinic}
                                    </li>

                                    <li className={cx('info-item')}>
                                        <span className={cx('item-label')}>Thời gian:</span> {data.time + ' - '}
                                        {data.date}
                                    </li>
                                    <li className={cx('info-item')}>
                                        <span className={cx('item-label')}>Đặt lịch lúc:</span> {data.timeBooking}
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

export default ModalInfo;
