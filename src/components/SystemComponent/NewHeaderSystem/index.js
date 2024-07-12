import React from 'react';
import classNames from 'classnames/bind';
import { Link, useNavigate } from 'react-router-dom';
import { AiFillCaretDown } from 'react-icons/ai';

import Menu from '~/components/Popper/Menu';
import styles from './NewHeaderSystem.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { MdSupportAgent } from 'react-icons/md';
import { BiBell, BiEditAlt, BiHelpCircle, BiLogOutCircle, BiNotification } from 'react-icons/bi';
import { logOut } from '~/redux/apiRequest';
import Image from '~/components/Image';
import CommonUtils from '~/utils/CommonUtils';
import images from '~/assets/images';
import Button from '~/components/Button';

const cx = classNames.bind(styles);

export default function NewHeaderSystem() {
    const currentUser = useSelector((state) => state.auth.login.currentUser);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const MENU_ITEM_USER = [
        {
            title: 'Quản lí bệnh nhân',
            to: '/system/admin/patient-manage',
        },
        {
            title: 'Quản lí bác sĩ',
            to: '/system/admin/doctor-manage',
        },
        {
            title: 'Quản lí admin',
            to: '/system/admin/admin-manage',
        },
        {
            title: 'Yêu cầu tạo tài khoản',
            to: '/system/admin/auth-manage',
        },
    ];
    const MENU_ITEM = [
        {
            icon: <BiEditAlt />,
            title: 'Cập nhật thông tin',
            to: '/update-user',
        },
        {
            icon: <BiHelpCircle />,
            title: 'Trợ giúp',
            to: 'help',
        },
        {
            icon: <BiLogOutCircle />,
            title: 'Đăng xuất',
            onClick: () => {
                handleLogOut();
            },
        },
    ];
    const handleLogOut = () => {
        logOut(dispatch, navigate);
    };
    return (
        <header className={cx('wrapper')}>
            <div className={cx('content')}>
                <Link to={''} className={cx('logo')}>
                    <MdSupportAgent className={cx('icon-admin')} />
                    <span className={cx('title')}>Trang quản trị hệ thống</span>
                </Link>

                <div className={cx('content-right')}>
                    <div className={cx('noti')}>
                        <BiBell className={cx('noti-icon')}></BiBell>
                        <span className={cx('noti-quantity')}>3</span>
                    </div>
                    <Menu data={MENU_ITEM}>
                        <Image
                            className={cx('avatar')}
                            src={CommonUtils.toFileFromBase64(currentUser.image)}
                            fallback={images.noImage}
                            alt="avatar"
                        ></Image>
                    </Menu>
                </div>
            </div>
        </header>
    );
}
