import { useState } from 'react';
import classNames from 'classnames/bind';
import React from 'react';
import { ToastContainer, toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';
import styles from './ModalInfoDetailClinic.module.scss';
import Button from '~/components/Button';
import { MdClose } from 'react-icons/md';
import axios from 'axios';
import { createAxios } from '~/redux/createInstance';
import { loginSuccess } from '~/redux/authSlice';
import { useDispatch, useSelector } from 'react-redux';
import { deleteUser } from '~/redux/apiRequest';
import { AiFillLayout } from 'react-icons/ai';
import Image from '~/components/Image';
import CommonUtils from '~/utils/CommonUtils';
import images from '~/assets/images';
const cx = classNames.bind(styles);
function ModalInfoDetailClinic({
    greenTheme = false,
    blueTheme = false,
    id,
    reload,
    submitAction,
    roleId = null,
    showToast,
    data = {},
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
                                <h2 className={cx('header-info')}>Thông tin chi tiết bệnh viện</h2>
                                <div className={cx('avatar')}>
                                    <Image
                                        className={cx('avatar')}
                                        src={CommonUtils.toFileFromBase64(data.logo)}
                                        fallback={images.noImage}
                                        alt="avatar"
                                    ></Image>
                                </div>
                                <ul className={cx('info-list')}>
                                    <li className={cx('info-item')}>
                                        <span className={cx('item-label')}>Tên:</span> {data.name}
                                    </li>
                                    <li className={cx('info-item')}>
                                        <span className={cx('item-label')}>Số điện thoại:</span>
                                        {data.phoneNumber}
                                    </li>
                                    <li className={cx('info-item')}>
                                        <span className={cx('item-label')}>Địa chỉ:</span> {data.address}
                                    </li>
                                </ul>
                            </div>
                            <div className={cx('modal-info-booking')}>
                                <h2 className={cx('header-info')}>Thông tin quản trị viên bệnh viện</h2>
                                <ul className={cx('info-list')}>
                                    <li className={cx('info-item')}>
                                        <span className={cx('item-label')}>Tên:</span> {data.adminClinicPhone}
                                    </li>
                                    <li className={cx('info-item')}>
                                        <span className={cx('item-label')}>Email: </span> {data.adminClinicEmail}
                                    </li>
                                    <li className={cx('info-item')}>
                                        <span className={cx('item-label')}>Số điện thoại:</span> {data.phoneClinicName}
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

export default ModalInfoDetailClinic;
