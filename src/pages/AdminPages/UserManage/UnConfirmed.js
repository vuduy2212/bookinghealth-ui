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
import { confirmUser, deleteUser } from '~/redux/apiRequest';
const cx = classNames.bind(styles);
function UnConfirmed() {
    const user = useSelector((state) => state.auth.login.currentUser);
    const dispatch = useDispatch();
    let axiosJWT = createAxios(user, dispatch, loginSuccess);
    const { SearchBar } = Search;
    const [products, setProducts] = useState([]);
    const buttonDeleteFomatter = (cell, row) => (
        <div>
            <ModalDelete
                id={row.id}
                reload={getData}
                submitAction={deleteUser}
                titleButton="Xóa"
                titleHeader="Xác nhận xóa tài khoản"
                titleBody="Bạn có chắc chắn muốn xóa tài khoản này không"
                titleConfirm="Xóa"
                showToast={() => {
                    toast.success(<h4>Xóa thành công</h4>, {
                        position: toast.POSITION.TOP_RIGHT,
                        autoClose: 2000,
                    });
                }}
            />
            <ModalDelete
                greenTheme
                id={row.id}
                reload={getData}
                submitAction={confirmUser}
                titleButton="Xác nhận"
                titleHeader="Xác nhận tài khoản"
                titleBody="Bạn có chắc chắn xác nhận tài khoản này không"
                titleConfirm="Xác nhận"
                roleId={row.roleId}
                showToast={() => {
                    toast.success(<h4>Xác nhận thành công</h4>, {
                        position: toast.POSITION.TOP_RIGHT,
                        autoClose: 2000,
                    });
                }}
            />
        </div>
    );
    const roleFomatter = (cell, row) => {
        return <span>{cell == 'R2x' ? 'Bác sĩ' : 'Admin'}</span>;
    };
    const getData = async () => {
        try {
            const res = await axiosJWT.get(`/api/user/get-all/unconfirmed`, {
                headers: { token: `Bearer ${user.accessToken}` },
            });
            setProducts(res.data);
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
            headerClasses: cx('first-name-col'),
        },
        {
            dataField: 'firstName',
            text: 'Tên',
            headerClasses: cx('name-col'),
        },
        {
            dataField: 'phoneNumber',
            text: 'Số điện thoại',
            headerClasses: cx('first-name-col'),
        },
        {
            dataField: 'email',
            text: 'Email',
            headerClasses: cx('email-col'),
        },
        {
            dataField: 'roleId',
            text: 'Vai trò',
            sort: true,
            formatter: roleFomatter,
            headerClasses: cx('name-col'),
        },
        {
            dataField: 'Xoa',
            text: 'Action',
            formatter: buttonDeleteFomatter,
            headerClasses: cx('action-col'),
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
                                <h2 className={cx('title')}>Quản lí yêu cầu tạo tài khoản</h2>
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
                <ToastContainer />
            </div>
        </ProtectedRoute>
    );
}

export default UnConfirmed;
