import React, { useEffect, useState } from 'react';
import { getOneClinic } from '~/service/clinic';
import styles from './ClinicDetailModal.module.scss';
import classNames from 'classnames/bind';
import CommonUtils from '~/utils/CommonUtils';
import LazyImage from '~/components/LazyImage';

const cx = classNames.bind(styles);

const ClinicDetailModal = ({ id, className }) => {
    const [showModal, setShowModal] = useState(false);
    const [clinic, setClinic] = useState({});

    const openModal = async () => {
        setShowModal(true);
        await getData();
    };

    const closeModal = () => {
        setShowModal(false);
    };

    const getData = async () => {
        try {
            const data = await getOneClinic(id);
            setClinic(data);
        } catch (error) {
            console.error('Error fetching clinic data:', error);
        }
    };

    useEffect(() => {
        // Fetch data when id changes
        if (showModal && id) {
            getData();
        }
    }, [id, showModal]);

    return (
        <div>
            <button className={cx(className)} onClick={openModal}>
                Xem thông tin
            </button>

            {showModal && (
                <div className={cx('modal')}>
                    <div className={cx('modal-content')}>
                        <span className={cx('close')} onClick={closeModal}>
                            &times;
                        </span>
                        <h2>Chi tiết phòng khám</h2>
                        <p>Tên: {clinic.name}</p>
                        <p>Địa chỉ: {clinic.address}</p>
                        <p>Số điện thoại: {clinic.phoneNumber}</p>
                        <h2>Thông tin hỗ trợ viên phòng khám</h2>
                        <div className={cx('section-2')}>
                            <div>
                                <p>
                                    Họ và tên : {clinic?.adminClinic?.lastName} {clinic?.adminClinic?.firstName}
                                    {clinic['adminClinic.lastName']}
                                </p>
                                <p>Email : {clinic?.adminClinic?.email}</p>
                                <p>Số điện thoại : {clinic?.adminClinic?.phoneNumber}</p>
                            </div>
                            <LazyImage
                                className={cx('clinic-logo')}
                                src={CommonUtils.toFileFromBase64(clinic.logo)}
                                alt="avatar"
                            />
                        </div>

                        {/* Add more details as needed */}
                    </div>
                </div>
            )}
        </div>
    );
};

export default ClinicDetailModal;
