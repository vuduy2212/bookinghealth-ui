import { useState } from 'react';
import classNames from 'classnames/bind';
import React from 'react';
import { ToastContainer, toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';
import styles from './ModalDelete.module.scss';
import Button from '~/components/Button';
import { MdClose } from 'react-icons/md';
import axios from 'axios';
import { createAxios } from '~/redux/createInstance';
import { loginSuccess } from '~/redux/authSlice';
import { useDispatch, useSelector } from 'react-redux';
import { deleteUser } from '~/redux/apiRequest';
import { AiFillLayout } from 'react-icons/ai';
const cx = classNames.bind(styles);
function ModalDelete({
    greenTheme = false,
    id,
    reload,
    submitAction,
    titleButton,
    titleHeader,
    titleBody,
    titleConfirm,
    roleId = null,
    showToast,
    date = '',
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
        console.log('date: ' + date);
        await reload(date);
    };

    return (
        <>
            <Button
                rounded
                onClick={toggleModal}
                className={cx('btn-modal', {
                    'green-theme': greenTheme,
                })}
            >
                {titleButton}
            </Button>

            {modal && (
                <div className={cx('modal')}>
                    <div onClick={toggleModal} className={cx('overlay')}></div>
                    <div className={cx('modal-content')}>
                        <div className={cx('modal-header')}>
                            <span className={cx('modal-title')}>{titleHeader}</span>
                            <button className={cx('close-modal')} onClick={toggleModal}>
                                <MdClose className={cx('modal-icon-close')} />
                            </button>
                        </div>
                        <div className={cx('modal-body')}>
                            <span className={cx('modal-desc')}>{titleBody}</span>
                        </div>
                        <div className={cx('modal-footer')}>
                            <Button rounded className={cx('modal-button-close')} onClick={toggleModal}>
                                Đóng
                            </Button>
                            <Button
                                rounded
                                className={cx('modal-button-delete', {
                                    'green-theme': greenTheme,
                                })}
                                onClick={handleSubmit}
                            >
                                {titleConfirm}
                            </Button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

export default ModalDelete;
