import { useState } from 'react';
import classNames from 'classnames/bind';
import { MdClose } from 'react-icons/md';
import Button from '~/components/Button';
import styles from './ModalResult.module.scss';
import ModalResultExamined from '~/components/SystemComponent/ModalResultExamined';

const cx = classNames.bind(styles);

function ModalResult({ greenTheme = false, titleButton, titleHeader, data = {}, fileUrl, medications = [] }) {
    const [modal, setModal] = useState(false);

    const toggleModal = () => {
        setModal(!modal);
    };

    const openFile = () => {
        window.open(fileUrl, '_blank');
    };

    return (
        <>
            <Button
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
                            <div className={cx('appointment-info')}>
                                <h2>Kết quả khám bệnh</h2>
                                <p>
                                    <strong>Bệnh nhân:</strong> {data.namePatient}
                                </p>
                                <p>
                                    <strong>Số điện thoại:</strong> {data.phoneNumberPatient}
                                </p>
                                <p>
                                    <strong>Thời gian khám:</strong> {data.time + ' - '}
                                    {data.date}
                                </p>
                                <p>
                                    <strong>Bác sĩ:</strong> {data.nameDoctor}
                                </p>
                                <p>
                                    <strong>Chuyên khoa:</strong> {data.specialist}
                                </p>{' '}
                                <p>
                                    <strong>Phòng khám:</strong> {data.clinic}
                                </p>
                                <p>
                                    <strong>Lý do khám:</strong> {data.reason}
                                </p>
                            </div>
                            <div className={cx('result-info')}>
                                <h3>Chẩn đoán</h3>
                                <p>{data.diagnosis}</p>
                                <ModalResultExamined data={data}></ModalResultExamined>
                            </div>
                            <div className={cx('medication-list')}>
                                <h3>Đơn thuốc</h3>
                                <div className={cx('medication-header')}>
                                    <span>Tên thuốc</span>
                                    <span>Liều lượng</span>
                                    <span>Hướng dẫn</span>
                                    <span>Số lượng</span>
                                </div>
                                {data.prescriptions.map((med, index) => (
                                    <div key={index} className={cx('medication-item')}>
                                        <span>{med.medicationName}</span>
                                        <span>{med.dosage}</span>
                                        <span>{med.instructions}</span>
                                        <span>{med.quantity}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className={cx('modal-footer')}>
                            <Button rounded className={cx('modal-button-close')} onClick={toggleModal}>
                                Đóng
                            </Button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

export default ModalResult;
