import { useState } from 'react';
import classNames from 'classnames/bind';
import React from 'react';
import { ToastContainer, toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';
import styles from './ModalUploadFile.module.scss';
import Button from '~/components/Button';
import { MdClose } from 'react-icons/md';
import axios from 'axios';
import { createAxios } from '~/redux/createInstance';
import { loginSuccess } from '~/redux/authSlice';
import { useDispatch, useSelector } from 'react-redux';
import { deleteUser } from '~/redux/apiRequest';
import { AiFillLayout } from 'react-icons/ai';
import { FaUpload } from 'react-icons/fa';
import CommonUtils from '~/utils/CommonUtils';
const cx = classNames.bind(styles);
function ModalUploadFile({
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
}) {
    const user = useSelector((state) => state.auth.login.currentUser);
    const dispatch = useDispatch();
    const [modal, setModal] = useState(false);
    const [file, setFile] = useState('');
    let axiosJWT = createAxios(user, dispatch, loginSuccess);
    const toggleModal = () => {
        setModal(!modal);
    };
    const handleChangeFile = async (e) => {
        try {
            let files = e.target.files;
            let file = files[0];
            if (file) {
                setFile(await CommonUtils.toBase64(file));
                let objectUrl = URL.createObjectURL(file);
            }
        } catch (error) {
            console.log(error);
        }
    };
    if (modal) {
        document.body.classList.add(cx('active-modal'));
    } else {
        document.body.classList.remove(cx('active-modal'));
    }

    const handleSubmit = async () => {
        setModal(false);
        await submitAction(user, id, axiosJWT, file);
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
                            {/* <span className={cx('modal-desc')}>{titleBody}</span> */}
                            <h3 className={cx('title-body')}>Vui lòng tải lên hồ sơ khám bệnh</h3>
                            <div className={cx('wrapper-upload-file')}>
                                <input
                                    type="file"
                                    accept=".pdf"
                                    className={cx('form-control', 'input')}
                                    id="inputAvatarFile"
                                    onChange={(e) => handleChangeFile(e)}
                                />
                            </div>
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

export default ModalUploadFile;
