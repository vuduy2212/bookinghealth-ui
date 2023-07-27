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
import styles from './AdminPageMangage.module.scss';
import { useLayoutEffect, useState } from 'react';
import HeaderAdmin from '~/components/SystemComponent/HeaderSystem/HeaderAdmin';
import ModalDelete from '~/components/SystemComponent/ModalDelete';
import ProtectedRoute from '~/routes/ProtectedRoute';
import { deleteUser } from '~/redux/apiRequest';
import Button from '~/components/Button';
import axios from 'axios';
const cx = classNames.bind(styles);
function AdminPageMangage({ typeManage, titlePage, columnsData, api }) {
    const user = useSelector((state) => state.auth.login.currentUser);
    const dispatch = useDispatch();
    let axiosJWT = createAxios(user, dispatch, loginSuccess);
    const { SearchBar } = Search;
    const [products, setProducts] = useState([]);
    const buttonDeleteFomatter = (cell, row) => (
        <div>
            <Button className={cx('button-edit')} rounded to={`/system/admin/update-specialist/${row.id}`}>
                Chỉnh sửa
            </Button>
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
            const res = await axios.get(api);
            setProducts(res.data);
        } catch (error) {
            console.log(error);
        }
    };
    useLayoutEffect(() => {
        getData();
    }, []);
    const columns = columnsData.map((item, index) => {
        if (item?.headerClasses) {
            item.headerClasses = cx(item.headerClasses);
        }
        if (item.text === 'Action') {
            item.formatter = buttonDeleteFomatter;
        }
        return item;
    });
    return (
        <ProtectedRoute isAllowed={!!user && user.roleId === 'R1'} redirectPath="/login">
            <div>
                <HeaderAdmin
                    specialist={typeManage === 'specialist'}
                    clinic={typeManage === 'clinic'}
                    handbook={typeManage === 'handbook'}
                />
                <div className={cx('content', 'container')}>
                    <ToolkitProvider bootstrap4 keyField="id" data={products} columns={columns} search>
                        {(props) => (
                            <div>
                                <h2 className={cx('title')}>{titlePage}</h2>
                                <div className={cx('box-table-header')}>
                                    <Button className={cx('create-button')} to={'/system/admin/create-specialist'}>
                                        Thêm chuyên khoa
                                    </Button>
                                    <div className={cx('wrapper-search')}>
                                        <h4>Tìm kiếm</h4>
                                        <SearchBar
                                            {...props.searchProps}
                                            className={cx('custome-search-field')}
                                            // style={{ color: 'white' }}
                                            delay={0}
                                            placeholder="Search somthing"
                                        />
                                    </div>
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

export default AdminPageMangage;
