import React from 'react';
import classNames from 'classnames/bind';
import styles from './AdminClinicHomePage.module.scss';
import AdminClinicLayout from '~/components/Layouts/AdminClinicLayout/AdminClinicLayout';
const cx = classNames.bind(styles);

function AdminClinicHomePage() {
    return (
        <AdminClinicLayout home={true}>
            <h1>Chart</h1>
        </AdminClinicLayout>
    );
}

export default AdminClinicHomePage;
