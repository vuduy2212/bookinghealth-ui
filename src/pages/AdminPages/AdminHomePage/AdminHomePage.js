import React from 'react';
import classNames from 'classnames/bind';
import styles from './AdminHomePage.module.scss';
import NewHeaderSystem from '~/components/SystemComponent/NewHeaderSystem/NewHeaderSystem';
import SideBarSystem from '~/components/SystemComponent/SideBarSystem/SideBarSystem';
import { useSelector } from 'react-redux';
import { AdminLayout } from '~/components/Layouts';
import AdminTableMangage from '~/components/SystemComponent/AdminTableManage/AdminTableManage';
import { deleteClinic } from '~/service/clinic';
const cx = classNames.bind(styles);

function AdminHomePage() {
    return (
        <AdminLayout home={true}>
            <h1>Chart</h1>
        </AdminLayout>
    );
}

export default AdminHomePage;
