import React from 'react';
import classNames from 'classnames/bind';
import styles from './AdminHomePage.module.scss';
import { AdminLayout } from '~/components/Layouts';
const cx = classNames.bind(styles);

function AdminHomePage() {
    return (
        <AdminLayout home={true}>
            <h1>Chart</h1>
        </AdminLayout>
    );
}

export default AdminHomePage;
