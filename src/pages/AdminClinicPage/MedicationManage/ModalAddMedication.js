import React, { useState } from 'react';
import classNames from 'classnames/bind';
import styles from './ModalAddMedication.module.scss';

const cx = classNames.bind(styles);

const ModalAddMedication = ({ user, onSubmit, reload, axiosJWT, showToast }) => {
    const [showModal, setShowModal] = useState(false);
    const [name, setName] = useState('');
    const [composition, setComposition] = useState('');
    const [dosage, setDosage] = useState('');
    const [instructions, setInstructions] = useState('');

    const handleOpenModal = () => {
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
        resetForm();
    };

    const handleSubmit = async () => {
        await onSubmit(user, { name, composition, dosage, instructions }, axiosJWT);
        showToast();
        await reload();
        handleCloseModal();
    };

    const resetForm = () => {
        setName('');
        setComposition('');
        setDosage('');
        setInstructions('');
    };

    return (
        <>
            <button className={cx('button-open')} onClick={handleOpenModal}>
                Thêm thuốc
            </button>
            {showModal && (
                <div className={cx('modal')}>
                    <div className={cx('modal-content')}>
                        <h2>Thêm thuốc mới</h2>
                        <div className={cx('form-group')}>
                            <label>Tên thuốc:</label>
                            <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
                        </div>
                        <div className={cx('form-group')}>
                            <label>Thành phần:</label>
                            <input type="text" value={composition} onChange={(e) => setComposition(e.target.value)} />
                        </div>
                        <div className={cx('form-group')}>
                            <label>Liều lượng:</label>
                            <input type="text" value={dosage} onChange={(e) => setDosage(e.target.value)} />
                        </div>
                        <div className={cx('form-group')}>
                            <label>Hướng dẫn sử dụng:</label>
                            <input type="text" value={instructions} onChange={(e) => setInstructions(e.target.value)} />
                        </div>
                        <div className={cx('form-actions')}>
                            <button onClick={handleSubmit}>Thêm</button>
                            <button onClick={handleCloseModal}>Hủy</button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default ModalAddMedication;
