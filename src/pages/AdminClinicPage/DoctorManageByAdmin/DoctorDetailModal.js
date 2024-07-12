import React, { useEffect, useState } from 'react';
import { getOneClinic } from '~/service/clinic';
import styles from './DoctorDetailModal.module.scss';
import classNames from 'classnames/bind';
import CommonUtils from '~/utils/CommonUtils';
import LazyImage from '~/components/LazyImage';
import { getDetailDoctor } from '~/service/doctor/profileDoctor';
import { format } from 'date-fns';
const cx = classNames.bind(styles);

const DoctorDetailModal = ({ id, className }) => {
    const [showModal, setShowModal] = useState(false);
    const [doctor, setDoctor] = useState({});

    const openModal = async () => {
        setShowModal(true);
        await getData();
    };

    const closeModal = () => {
        setShowModal(false);
    };

    const getData = async () => {
        try {
            const data = await getDetailDoctor(id);
            console.log(data);
            setDoctor(data);
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
                        <h2>Thông tin chi tiết bác sĩ</h2>
                        <div className={cx('modal-main')}>
                            <div>
                                <p>
                                    <span> Tên:</span> {doctor?.lastName} {doctor?.firstName}
                                </p>
                                <p>
                                    <span>Năm sinh:</span> {doctor?.yearOfBirth}
                                </p>
                                <p>
                                    <span>Email:</span> {doctor?.email}
                                </p>
                                <p>
                                    <span>Số điện thoại:</span> {doctor?.phoneNumber}
                                </p>
                                <p>
                                    <span>Chuyên khoa:</span> {doctor?.doctorInfo?.specialist?.name}
                                </p>
                                <p>
                                    <span>Chức danh:</span> {doctor?.doctorInfo?.positionData?.value}
                                </p>
                                <p>
                                    <span> Ngày tạo:</span>{' '}
                                    {doctor?.createdAt
                                        ? format(new Date(doctor?.createdAt), 'dd/MM/yyyy')
                                        : 'Không có dữ liệu'}
                                </p>
                            </div>
                            <LazyImage
                                className={cx('doctor-image')}
                                src={CommonUtils.toFileFromBase64(doctor?.image)}
                                alt="avatar"
                            />
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default DoctorDetailModal;
