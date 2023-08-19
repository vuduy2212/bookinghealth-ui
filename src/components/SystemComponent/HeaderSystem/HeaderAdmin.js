import classNames from 'classnames/bind';

import styles from './HeaderSystem.module.scss';
import { MdSupportAgent } from 'react-icons/md';
import { Link, useNavigate } from 'react-router-dom';
import MenuItem from './MenuItem';
import { AiFillCaretDown } from 'react-icons/ai';
import Menu from '~/components/Popper/Menu';
import { useDispatch, useSelector } from 'react-redux';
import { BiEditAlt, BiHelpCircle, BiHistory, BiLogOutCircle } from 'react-icons/bi';
import { logOut } from '~/redux/apiRequest';
import Image from '~/components/Image';
import images from '~/assets/images';
import CommonUtils from '~/utils/CommonUtils';
const cx = classNames.bind(styles);
function HeaderAdmin({
    booking = false,
    user = false,
    clinic = false,
    product = false,
    handbook = false,
    specialist = false,
}) {
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
                    <span className={cx('title')}>Admin Page</span>
                </Link>
                <MenuItem to="/system/admin/confirm-booking" className={booking ? 'active' : ''}>
                    Yêu cầu đặt lịch
                </MenuItem>
                <Menu data={MENU_ITEM_USER} placement="bottom-start" offset={[-18, 8]} small delayMenu={[0, 200]}>
                    <div
                        className={cx('menu-drop', {
                            ['active']: user,
                        })}
                    >
                        <span>Người dùng</span>
                        <AiFillCaretDown />
                    </div>
                </Menu>
                <MenuItem to="/system/admin/specialist" className={specialist ? 'active' : ''}>
                    Chuyên khoa
                </MenuItem>
                <MenuItem to="/system/admin/clinic" className={clinic ? 'active' : ''}>
                    Bệnh viện
                </MenuItem>

                <span className={cx('welcome')}>
                    {currentUser?.lastName && currentUser?.firstName
                        ? currentUser.lastName + ' ' + currentUser.firstName
                        : 'Xin chào'}
                </span>
                <Menu data={MENU_ITEM}>
                    <Image
                        className={cx('avatar')}
                        src={CommonUtils.toFileFromBase64(currentUser.image)}
                        fallback={images.noImage}
                        alt="avatar"
                    ></Image>
                </Menu>
            </div>
        </header>
    );
}

export default HeaderAdmin;
