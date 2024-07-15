import React, { useState, useEffect } from 'react';
import classNames from 'classnames/bind';
import styles from './NewBookingManage.module.scss';
import { AdminLayout } from '~/components/Layouts';
import Button from '~/components/Button';
import { deleteClinic, getAllClinicNoImage } from '~/service/clinic';
import ModalDelete from '~/components/SystemComponent/ModalDelete';
import { ToastContainer, toast } from 'react-toastify';
import AdminClinicLayout from '~/components/Layouts/AdminClinicLayout/AdminClinicLayout';
import { useDispatch, useSelector } from 'react-redux';
import { deleteDoctor, getAllDoctorOneClinic, getAllDoctorOneClinicNoImage } from '~/service/doctor/profileDoctor';
import { createNewMedication, deleteOneMedication, getAllMedicationOneClinic } from '~/service/medication';
//import ModalAddMedication from './ModalAddMedication';
import { loginSuccess } from '~/redux/authSlice';
import { createAxios } from '~/redux/createInstance';
import { cancelBooking, confirmBooking, getAllNewBookingOneClinic } from '~/service/booking';
import ModalInfo from '~/components/SystemComponent/ModalInfo';

const cx = classNames.bind(styles);

const NewBookingManage = () => {
    const currentUser = useSelector((state) => state.auth.login.currentUser);
    const dispatch = useDispatch();
    let axiosJWT = createAxios(currentUser, dispatch, loginSuccess);
    const [bookings, setBookings] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    const getData = async () => {
        const response = await getAllNewBookingOneClinic(axiosJWT, currentUser);
        setBookings(response);
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
        <AdminClinicLayout booking={true}>
            <div className={cx('booking-management')}>
                <div className={cx('header')}>
                    <h1>Quản lí yêu cầu đặt lịch </h1>
                    <div className={cx('actions')}>
                        <input type="text" placeholder="Search..." value={searchTerm} onChange={handleSearchChange} />
                        {/* <ModalAddMedication
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
                        ></ModalAddMedication> */}
                    </div>
                </div>
                <table className={cx('booking-table')}>
                    <thead>
                        <tr>
                            <th className={cx('column-name')}>Tên bệnh nhân</th>
                            <th className={cx('column-time')}>Khung giờ</th>
                            <th className={cx('column-date')}>Ngày</th>
                            <th className={cx('column-phone')}>Số điện thoại</th>
                            <th className={cx('header-column-info')}>Thông tin chi tiết</th>
                            <th className={cx('header-column-action')}>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {bookings
                            .filter(
                                (booking) =>
                                    booking?.namePatient?.toLowerCase().includes(searchTerm?.toLowerCase()) ||
                                    booking?.date?.toLowerCase().includes(searchTerm?.toLowerCase()),
                            )
                            .map((booking) => (
                                <tr key={booking?.id}>
                                    <td>{booking.namePatient}</td>
                                    <td>{booking.time}</td>
                                    <td>{booking.date}</td>
                                    <td className={cx('column-phone')}>{booking.phoneNumberPatient}</td>
                                    {/* <td>{booking.instructions}</td> */}
                                    <td className={cx('column-info')}>
                                        <ModalInfo blueTheme data={booking} />
                                    </td>
                                    <td className={cx('column-action')}>
                                        <ModalDelete
                                            id={booking.id}
                                            reload={getData}
                                            submitAction={cancelBooking}
                                            titleButton="Hủy"
                                            titleHeader="Xác nhận hủy lịch hẹn"
                                            titleBody="Bạn có chắc chắn muốn hủy lịch hẹn này không"
                                            titleConfirm="Hủy"
                                            showToast={() => {
                                                toast.success(<h4>Xóa thành công</h4>, {
                                                    position: toast.POSITION.TOP_RIGHT,
                                                    autoClose: 2000,
                                                });
                                            }}
                                        />
                                        <ModalDelete
                                            greenTheme
                                            id={booking.id}
                                            reload={getData}
                                            submitAction={confirmBooking}
                                            titleButton="Xác nhận"
                                            titleHeader="Xác nhận lịch hẹn"
                                            titleBody="Bạn có chắc chắn xác nhận lịch hẹn này không"
                                            titleConfirm="Xác nhận"
                                            //roleId={row.roleId}
                                            showToast={() => {
                                                toast.success(<h4>Xác nhận thành công</h4>, {
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

export default NewBookingManage;
