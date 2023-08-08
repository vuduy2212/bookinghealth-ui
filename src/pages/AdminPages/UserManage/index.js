import classNames from 'classnames/bind';
import BootstrapTable from 'react-bootstrap-table-next';
import 'react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css';
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit/dist/react-bootstrap-table2-toolkit';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import paginationFactory from 'react-bootstrap-table2-paginator';
import { ToastContainer, toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';
import { createAxios } from '~/redux/createInstance';
import { useDispatch, useSelector } from 'react-redux';
import { loginSuccess } from '~/redux/authSlice';
import styles from './UserManger.module.scss';
import { useLayoutEffect, useState } from 'react';
import HeaderAdmin from '~/components/SystemComponent/HeaderSystem/HeaderAdmin';
import ModalDelete from '~/components/SystemComponent/ModalDelete';
import ProtectedRoute from '~/routes/ProtectedRoute';
import { deleteUser } from '~/redux/apiRequest';
import LoadingIcon from '~/components/LoadingIcon';
const cx = classNames.bind(styles);
function UserManage({ typeUser }) {
    const user = useSelector((state) => state.auth.login.currentUser);
    const dispatch = useDispatch();
    let axiosJWT = createAxios(user, dispatch, loginSuccess);
    const { SearchBar } = Search;
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const buttonDeleteFomatter = (cell, row) => (
        <div>
            <ModalDelete
                id={row.id}
                reload={getData}
                submitAction={deleteUser}
                titleButton="Xóa"
                titleHeader="Xác nhận xóa"
                titleBody="Bạn có chắc chắn với hành động xóa này không"
                titleConfirm="Xóa"
                showToast={() => {
                    toast.success(<h4>Xóa thành công</h4>, {
                        position: toast.POSITION.TOP_RIGHT,
                        autoClose: 2000,
                    });
                }}
            />
        </div>
    );
    const getData = async () => {
        try {
            setLoading(true);
            const res = await axiosJWT.get(`/api/user/get-all/${typeUser}`, {
                headers: { token: `Bearer ${user.accessToken}` },
            });
            setProducts(res.data);
            setLoading(false);
        } catch (error) {
            console.log(error);
        }
    };
    useLayoutEffect(() => {
        getData();
    }, []);
    const columns = [
        {
            dataField: 'id',
            text: 'ID',
            sort: true,
            headerClasses: cx('id-col'),
        },
        {
            dataField: 'lastName',
            text: 'Họ',
        },
        {
            dataField: 'firstName',
            text: 'Tên',
            headerClasses: cx('name-col'),
        },
        {
            dataField: 'phoneNumber',
            text: 'Số điện thoại',
        },
        {
            dataField: 'email',
            text: 'Email',
            headerClasses: cx('email-col'),
        },
        {
            dataField: 'yearOfBirth',
            text: 'Năm sinh',
            headerClasses: cx('yearOfBirth-col'),
        },
        {
            dataField: 'address',
            text: 'Địa chỉ',
            headerClasses: cx('address-col'),
        },
        {
            dataField: 'gender',
            text: 'Giới tính',
            headerClasses: cx('gender-col'),
        },
        {
            dataField: 'Xoa',
            text: 'Action',
            headerClasses: cx('action-col'),
            formatter: buttonDeleteFomatter,
            align: 'center',
        },
    ];
    return (
        <ProtectedRoute isAllowed={!!user && user.roleId === 'R1'} redirectPath="/login">
            <div>
                <HeaderAdmin user />
                <div className={cx('content', 'mx-5')}>
                    <ToolkitProvider bootstrap4 keyField="id" data={products} columns={columns} search>
                        {(props) => (
                            <div>
                                <h2 className={cx('title')}>
                                    Quản lí{' '}
                                    {typeUser === 'patient' ? 'Bệnh nhân' : typeUser === 'admin' ? 'Admin' : 'Bác sĩ'}
                                </h2>
                                <div className={cx('wrapper-search', 'mx-5')}>
                                    <h4>Tìm kiếm</h4>
                                    <SearchBar
                                        {...props.searchProps}
                                        className={cx('custome-search-field')}
                                        // style={{ color: 'white' }}
                                        delay={0}
                                        placeholder="Search somthing"
                                    />
                                </div>
                                {loading ? (
                                    <LoadingIcon />
                                ) : (
                                    <BootstrapTable
                                        bootstrap4
                                        headerWrapperClasses={cx('header-table')}
                                        pagination={paginationFactory()}
                                        {...props.baseProps}
                                    />
                                )}
                            </div>
                        )}
                    </ToolkitProvider>
                </div>
                <ToastContainer />
            </div>
        </ProtectedRoute>
    );
}

export default UserManage;
