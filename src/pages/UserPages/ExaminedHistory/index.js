import classNames from 'classnames/bind';
import BootstrapTable from 'react-bootstrap-table-next';
import 'react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css';
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit/dist/react-bootstrap-table2-toolkit';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import paginationFactory from 'react-bootstrap-table2-paginator';
import { ToastContainer } from 'react-toastify';

import 'flatpickr/dist/themes/material_green.css';
import 'react-toastify/dist/ReactToastify.css';
import { createAxios } from '~/redux/createInstance';
import { useDispatch, useSelector } from 'react-redux';
import { loginSuccess } from '~/redux/authSlice';
import styles from './ExaminedHistory.module.scss';
import { useLayoutEffect, useState } from 'react';

import ProtectedRoute from '~/routes/ProtectedRoute';
import ModalInfo from '~/components/SystemComponent/ModalInfo';
import { getBookingOnePatient } from '~/service/booking';
import LoadingIcon from '~/components/LoadingIcon';
import ModalResultExamined from '~/components/SystemComponent/ModalResultExamined';
const cx = classNames.bind(styles);
function ExaminedHistory() {
    let currentDate = new Date();

    const user = useSelector((state) => state.auth.login.currentUser);
    const dispatch = useDispatch();
    let axiosJWT = createAxios(user, dispatch, loginSuccess);
    const { SearchBar } = Search;
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);

    const resultFomatter = (cell, row) => {
        return (
            <ModalResultExamined
                data={products.find((item, index) => {
                    return item.id === row.id;
                })}
            ></ModalResultExamined>
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
    const getData = async () => {
        try {
            setLoading(true);
            const data = await getBookingOnePatient(axiosJWT, user);
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
            dataField: 'nameDoctor',
            text: 'Bác sĩ',
            headerClasses: cx('name-col'),
        },
        {
            dataField: 'clinic',
            text: 'Phòng khám',
            headerClasses: cx('name-col'),
        },
        {
            dataField: 'nameDoctor',
            text: 'Bác sĩ',
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
            dataField: 'status',
            text: 'Trạng thái',
            headerClasses: cx('time-col'),
        },
        {
            dataField: 'Xóa',
            text: 'Thông tin chi tiết',
            formatter: infoFomatter,
            headerClasses: cx('info-col'),
            align: 'center',
        },
    ];
    return (
        <ProtectedRoute isAllowed={!!user} redirectPath="/login">
            <div>
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
                                    <h2 className={cx('title')}>Lịch sử đặt lịch</h2>
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

export default ExaminedHistory;
