import React, { useState, useEffect } from 'react';
import classNames from 'classnames/bind';
import styles from './NewClinicManage.module.scss';
import { AdminLayout } from '~/components/Layouts';
import Button from '~/components/Button';
import { deleteClinic, getAllClinicNoImage } from '~/service/clinic';
import ModalDelete from '~/components/SystemComponent/ModalDelete';
import { ToastContainer, toast } from 'react-toastify';
import ClinicDetailModal from './ClinicDetailModal ';

const cx = classNames.bind(styles);

const NewClinicManage = () => {
    const [hospitals, setHospitals] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [newHospital, setNewHospital] = useState({
        name: '',
        address: '',
        phoneNumber: '',
    });
    const getData = async () => {
        const data = await getAllClinicNoImage();
        setHospitals(data);
    };
    useEffect(() => {
        getData();
    }, []);

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const handleDelete = (id) => {
        setHospitals(hospitals.filter((hospital) => hospital.id !== id));
    };

    const handleDetail = (id) => {
        alert('Show details for hospital ID: ' + id);
    };

    return (
        <AdminLayout clinic={true}>
            <div className={cx('hospital-management')}>
                <div className={cx('header')}>
                    <h1>Quản lí phòng khám, bệnh viện</h1>
                    <div className={cx('actions')}>
                        <input type="text" placeholder="Search..." value={searchTerm} onChange={handleSearchChange} />
                        <Button to="/system/admin/create-clinic">Thêm phòng khám</Button>
                    </div>
                </div>
                <table className={cx('hospital-table')}>
                    <thead>
                        <tr>
                            <th>Tên phòng khám</th>
                            <th>Địa chỉ</th>
                            <th className={cx('column-phone')}>SĐT hỗ trợ viên</th>
                            <th className={cx('header-column-action')}>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {hospitals
                            .filter(
                                (hospital) =>
                                    hospital.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                    hospital.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                    hospital.phoneNumber.includes(searchTerm),
                            )
                            .map((hospital) => (
                                <tr key={hospital.id}>
                                    <td>{hospital.name}</td>
                                    <td>{hospital.address}</td>
                                    <td className={cx('column-phone')}>{hospital.phoneNumber}</td>
                                    <td className={cx('column-action')}>
                                        <ClinicDetailModal className={cx('detailClinic')} id={hospital.id} />

                                        <ModalDelete
                                            id={hospital.id}
                                            reload={getData}
                                            submitAction={deleteClinic}
                                            titleButton="Xóa phòng khám"
                                            titleHeader="Xác nhận xóa"
                                            titleBody={`Bạn có chắc chắn với hành động xóa phòng khám "${hospital.name}" không`}
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
        </AdminLayout>
    );
};

export default NewClinicManage;
