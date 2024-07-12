import React, { useState, useEffect } from 'react';
import classNames from 'classnames/bind';
import styles from './DoctorManageByAdmin.module.scss';
import { AdminLayout } from '~/components/Layouts';
import Button from '~/components/Button';
import { deleteClinic, getAllClinicNoImage } from '~/service/clinic';
import ModalDelete from '~/components/SystemComponent/ModalDelete';
import { ToastContainer, toast } from 'react-toastify';
import DoctorDetailModal from './DoctorDetailModal';
import AdminClinicLayout from '~/components/Layouts/AdminClinicLayout/AdminClinicLayout';
import { useDispatch, useSelector } from 'react-redux';
import { deleteDoctor, getAllDoctorOneClinic, getAllDoctorOneClinicNoImage } from '~/service/doctor/profileDoctor';

const cx = classNames.bind(styles);

const DoctorManageByAdmin = () => {
    const currentUser = useSelector((state) => state.auth.login.currentUser);
    const dispatch = useDispatch();
    const [doctors, setDoctors] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    const getData = async () => {
        const data = await getAllDoctorOneClinicNoImage(currentUser?.clinicId);
        console.log(data);
        setDoctors(data);
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
        <AdminClinicLayout doctor={true}>
            <div className={cx('hospital-management')}>
                <div className={cx('header')}>
                    <h1>Quản lí bác sĩ </h1>
                    <div className={cx('actions')}>
                        <input type="text" placeholder="Search..." value={searchTerm} onChange={handleSearchChange} />
                        <Button to="/system/admin-clinic/create-doctor-account">Tạo tài khoản cho bác sĩ</Button>
                    </div>
                </div>
                <table className={cx('hospital-table')}>
                    <thead>
                        <tr>
                            <th>Tên bác sĩ</th>
                            <th>Email</th>
                            <th className={cx('column-phone')}>Số điện thoại</th>
                            <th className={cx()}>Chuyên khoa</th>
                            <th className={cx('header-column-action')}>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {doctors
                            .filter(
                                (doctor) =>
                                    doctor?.fullName?.toLowerCase().includes(searchTerm?.toLowerCase()) ||
                                    doctor?.email?.toLowerCase().includes(searchTerm?.toLowerCase()) ||
                                    doctor?.specialist?.toLowerCase().includes(searchTerm?.toLowerCase()) ||
                                    doctor.phoneNumber?.includes(searchTerm),
                            )
                            .map((doctor) => (
                                <tr key={doctor?.id}>
                                    <td>{doctor.fullName}</td>
                                    <td>{doctor.email}</td>
                                    <td className={cx('column-phone')}>{doctor.phoneNumber}</td>
                                    <td>{doctor.specialist}</td>

                                    <td className={cx('column-action')}>
                                        <DoctorDetailModal className={cx('detailClinic')} id={doctor.id} />

                                        <ModalDelete
                                            id={doctor.id}
                                            reload={getData}
                                            submitAction={deleteDoctor}
                                            titleButton="Xóa bác sĩ"
                                            titleHeader="Xác nhận xóa"
                                            titleBody={`Bạn có chắc chắn với hành động xóa bác sĩ "${doctor.fullName}" không`}
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

export default DoctorManageByAdmin;
