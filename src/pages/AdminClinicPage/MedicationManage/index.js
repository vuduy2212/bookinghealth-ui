import React, { useState, useEffect } from 'react';
import classNames from 'classnames/bind';
import styles from './MedicationManage.module.scss';
import { AdminLayout } from '~/components/Layouts';
import Button from '~/components/Button';
import { deleteClinic, getAllClinicNoImage } from '~/service/clinic';
import ModalDelete from '~/components/SystemComponent/ModalDelete';
import { ToastContainer, toast } from 'react-toastify';
import AdminClinicLayout from '~/components/Layouts/AdminClinicLayout/AdminClinicLayout';
import { useDispatch, useSelector } from 'react-redux';
import { deleteDoctor, getAllDoctorOneClinic, getAllDoctorOneClinicNoImage } from '~/service/doctor/profileDoctor';
import { createNewMedication, deleteOneMedication, getAllMedicationOneClinic } from '~/service/medication';
import ModalAddMedication from './ModalAddMedication';
import { loginSuccess } from '~/redux/authSlice';
import { createAxios } from '~/redux/createInstance';

const cx = classNames.bind(styles);

const MedicationManage = () => {
    const currentUser = useSelector((state) => state.auth.login.currentUser);
    const dispatch = useDispatch();
    let axiosJWT = createAxios(currentUser, dispatch, loginSuccess);
    const [medications, setMedications] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    const getData = async () => {
        const response = await getAllMedicationOneClinic(currentUser?.clinicId);
        setMedications(response);
    };
    useEffect(() => {
        getData();
    }, []);

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const handleDelete = (id) => {
        //setDoctors(doctos.filter((hospital) => hospital.id !== id));
    };

    return (
        <AdminClinicLayout medication={true}>
            <div className={cx('hospital-management')}>
                <div className={cx('header')}>
                    <h1>Quản lí các loại thuốc </h1>
                    <div className={cx('actions')}>
                        <input type="text" placeholder="Search..." value={searchTerm} onChange={handleSearchChange} />
                        <ModalAddMedication
                            user={currentUser}
                            onSubmit={createNewMedication}
                            reload={getData}
                            axiosJWT={axiosJWT}
                            showToast={() => {
                                toast.success(<h4>Thêm thành công</h4>, {
                                    position: toast.POSITION.TOP_RIGHT,
                                    autoClose: 2000,
                                });
                            }}
                        ></ModalAddMedication>
                    </div>
                </div>
                <table className={cx('hospital-table')}>
                    <thead>
                        <tr>
                            <th>Tên thuốc</th>
                            <th>Thành phần</th>
                            <th className={cx('column-phone')}>Liều lượng</th>
                            <th className={cx()}>Hướng dẫn sử dụng</th>
                            <th className={cx('header-column-action')}>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {medications
                            .filter(
                                (medication) =>
                                    medication?.name?.toLowerCase().includes(searchTerm?.toLowerCase()) ||
                                    medication?.composition?.toLowerCase().includes(searchTerm?.toLowerCase()),
                            )
                            .map((medication) => (
                                <tr key={medication?.id}>
                                    <td>{medication.name}</td>
                                    <td>{medication.composition}</td>
                                    <td className={cx('column-phone')}>{medication.dosage}</td>
                                    <td>{medication.instructions}</td>

                                    <td className={cx('column-action')}>
                                        <ModalDelete
                                            id={medication.id}
                                            reload={getData}
                                            submitAction={deleteOneMedication}
                                            titleButton="Xóa thuốc"
                                            titleHeader="Xác nhận xóa"
                                            titleBody={`Bạn có chắc chắn với hành động xóa thuốc "${medication.name}" không`}
                                            titleConfirm="Xóa"
                                            showToast={() => {
                                                toast.success(<h4>Xóa thành công</h4>, {
                                                    position: toast.POSITION.TOP_RIGHT,
                                                    autoClose: 2000,
                                                });
                                            }}
                                        />
                                    </td>
                                </tr>
                            ))}
                    </tbody>
                </table>
            </div>
            <ToastContainer />
        </AdminClinicLayout>
    );
};

export default MedicationManage;
