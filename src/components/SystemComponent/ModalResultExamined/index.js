import { useState } from 'react';
import classNames from 'classnames/bind';
import React from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { Viewer, Worker } from '@react-pdf-viewer/core';

import '@react-pdf-viewer/core/lib/styles/index.css';
import 'react-toastify/dist/ReactToastify.css';
import styles from './ModalResultExamined.module.scss';
import Button from '~/components/Button';
import { MdClose } from 'react-icons/md';
import axios from 'axios';
import { createAxios } from '~/redux/createInstance';
import { loginSuccess } from '~/redux/authSlice';
import { useDispatch, useSelector } from 'react-redux';
import { deleteUser } from '~/redux/apiRequest';
import { AiFillLayout } from 'react-icons/ai';
import CommonUtils from '~/utils/CommonUtils';
const cx = classNames.bind(styles);
function ModalResultExamined({
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
    const stringbase64 = CommonUtils.toFileFromBase64(data.result);

    const blob = CommonUtils.base64toBlob(String(stringbase64));
    const url = URL.createObjectURL(blob);
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
                {'Xem hồ sơ khám bệnh'}
            </Button>

            {modal && (
                <div className={cx('modal')}>
                    <div onClick={toggleModal} className={cx('overlay')}></div>
                    <div className={cx('modal-content')}>
                        <div
                            style={{
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                border: '1px solid rgba(0, 0, 0, 0.3)',
                                height: '750px',
                                width: '1000px',
                            }}
                        >
                            <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js">
                                <Viewer fileUrl={url} />
                            </Worker>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

export default ModalResultExamined;
