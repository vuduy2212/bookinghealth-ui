import classNames from 'classnames/bind';
import BootstrapTable from 'react-bootstrap-table-next';
import 'react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css';
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit/dist/react-bootstrap-table2-toolkit';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import paginationFactory from 'react-bootstrap-table2-paginator';
import { ToastContainer, toast } from 'react-toastify';
import Flatpickr from 'react-flatpickr';

import 'flatpickr/dist/themes/material_green.css';
import 'react-toastify/dist/ReactToastify.css';
import { createAxios } from '~/redux/createInstance';
import { useDispatch, useSelector } from 'react-redux';
import { loginSuccess } from '~/redux/authSlice';
import styles from './PatientExamined.module.scss';
import { useLayoutEffect, useState } from 'react';
import HeaderAdmin from '~/components/SystemComponent/HeaderSystem/HeaderAdmin';
import ModalDelete from '~/components/SystemComponent/ModalDelete';
import ProtectedRoute from '~/routes/ProtectedRoute';
import { confirmUser, deleteUser } from '~/redux/apiRequest';
import ModalInfo from '~/components/SystemComponent/ModalInfo';
import {
    cancelBooking,
    confirmBooking,
    finishedExamination,
    getAllNewBooking,
    getConfirmedBookingOneDoctor,
    getPatientExamined,
} from '~/service/booking';
import LoadingIcon from '~/components/LoadingIcon';
import HeaderDoctor from '~/components/SystemComponent/HeaderSystem/HeaderDoctor';
import Button from '~/components/Button';
import { FaUpload } from 'react-icons/fa';
import ModalResultExamined from '~/components/SystemComponent/ModalResultExamined';
const cx = classNames.bind(styles);
function PatientExamined() {
    let currentDate = new Date();
    const [date, setDate] = useState(new Date().setHours(0, 0, 0, 0));

    const user = useSelector((state) => state.auth.login.currentUser);
    const dispatch = useDispatch();
    let axiosJWT = createAxios(user, dispatch, loginSuccess);
    const { SearchBar } = Search;
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);

    const handleOnChangeDate = async (dateSelect) => {
        setDate(new Date(dateSelect).getTime());
        getData(new Date(dateSelect).getTime());
    };

    const resultFomatter = (cell, row) => {
        return (
            <ModalResultExamined
                data={products.find((item, index) => {
                    return item.id === row.id;
                })}
            />
        );
    };

    const infoFomatter = (cell, row) => {
        return (
            <ModalInfo
                blueTheme
                data={products.find((item, index) => {
                    return item.id === row.id;
                })}
            />
        );
    };
    const getData = async (datepara) => {
        try {
            setLoading(true);
            const data = await getPatientExamined(axiosJWT, user, datepara);
            setProducts(data);
            setLoading(false);
        } catch (error) {
            console.log(error);
        }
    };
    useLayoutEffect(() => {
        getData(currentDate.setHours(0, 0, 0, 0));
    }, []);
    const columns = [
        {
            dataField: 'id',
            text: 'Id',
            sort: true,
            headerClasses: cx('id-col'),
        },
        {
            dataField: 'namePatient',
            text: 'Họ và tên',
            headerClasses: cx('name-col'),
        },
        {
            dataField: 'time',
            text: 'Khung giờ',
            headerClasses: cx('time-col'),
        },
        {
            dataField: 'date',
            text: 'Ngày',
            headerClasses: cx('time-col'),
        },

        {
            dataField: 'phoneNumberPatient',
            text: 'Số điện thoại',
            headerClasses: cx('time-col'),
        },
        {
            dataField: 'Xóa',
            text: 'Thông tin chi tiết',
            formatter: infoFomatter,
            headerClasses: cx('info-col'),
            align: 'center',
        },
        {
            dataField: 'Xoa',
            text: 'Hồ sơ khám bệnh, đơn thuốc, ...',
            formatter: resultFomatter,
            headerClasses: cx('action-col'),
            align: 'center',
        },
    ];
    return (
        <ProtectedRoute isAllowed={!!user && user.roleId === 'R2'} redirectPath="/login">
            <div>
                <HeaderDoctor booking />
                {loading ? (
                    <div className={cx('loading-container')}>
                        {' '}
                        <LoadingIcon />
                    </div>
                ) : (
                    <div className={cx('content', 'mx-5')}>
                        <ToolkitProvider bootstrap4 keyField="id" data={products} columns={columns} search>
                            {(props) => (
                                <div>
                                    <h2 className={cx('title')}>Bệnh nhân đã khám</h2>
                                    <div className={cx('wrapper-input', 'row')}>
                                        <div className={cx('wrapper-date', 'col-6')}>
                                            <div className={cx('date-container')}>
                                                <label>Chọn ngày</label>
                                                <Flatpickr
                                                    value={date} // giá trị ngày tháng
                                                    // các option thêm cho thư viện
                                                    options={{
                                                        dateFormat: 'd-m-Y', // format ngày giờ
                                                        minDate: `${currentDate.getDate()}-${
                                                            currentDate.getMonth() + 1
                                                        }-${currentDate.getFullYear()}`,
                                                    }}
                                                    // event
                                                    onChange={(dateSelect) => handleOnChangeDate(dateSelect)}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className={cx('wrapper-search', 'mx-5')}>
                                        <h4>Tìm kiếm</h4>
                                        <SearchBar
                                            {...props.searchProps}
                                            className={cx('custome-search-field')}
                                            // style={{ color: 'white' }}
                                            delay={0}
                                            placeholder="Search something"
                                        />
                                    </div>
                                    <BootstrapTable
                                        bootstrap4
                                        headerWrapperClasses={cx('header-table')}
                                        pagination={paginationFactory()}
                                        {...props.baseProps}
                                    />
                                </div>
                            )}
                        </ToolkitProvider>
                    </div>
                )}
            </div>

            <ToastContainer />
        </ProtectedRoute>
    );
}

export default PatientExamined;
