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
const cx = classNames.bind(styles);
function HeaderAdmin({
    schedule = false,
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
            to: '/update-user',
        },
        {
            title: 'Quản lí bác sĩ',
            to: '/history-user',
        },
        {
            title: 'Quản lí admin',
            to: 'help',
        },
    ];
    const MENU_ITEM = [
        {
            icon: <BiEditAlt />,
            title: 'Cập nhật thông tin',
            to: '/update-user',
        },
        {
            icon: <BiHistory />,
            title: 'Lịch sử khám bệnh',
            to: '/history-user',
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
                <MenuItem to="/admin/schedule" className={schedule ? 'active' : ''}>
                    Đơn đặt lịch
                </MenuItem>
                <Menu data={MENU_ITEM_USER} placement="bottom-start" offset={[-18, 8]} small>
                    <div
                        className={cx('menu-drop', {
                            ['active']: user,
                        })}
                    >
                        <span>Người dùng</span>
                        <AiFillCaretDown />
                    </div>
                </Menu>
                <MenuItem to="/admin/specialist" className={specialist ? 'active' : ''}>
                    Chuyên khoa
                </MenuItem>
                <MenuItem to="/admin/clinic" className={clinic ? 'active' : ''}>
                    Bệnh viện
                </MenuItem>
                <MenuItem to="/admin/product" className={product ? 'active' : ''}>
                    Sản phẩm
                </MenuItem>
                <MenuItem to="/admin/handbook" className={handbook ? 'active' : ''}>
                    Bài viết
                </MenuItem>

                <span className={cx('welcome')}>
                    {currentUser?.lastName && currentUser?.firstName
                        ? currentUser.lastName + ' ' + currentUser.firstName
                        : 'Xin chào'}
                </span>
                <Menu data={MENU_ITEM}>
                    <Image className={cx('avatar')} src="" fallback={images.noImage} alt="avatar"></Image>
                </Menu>
            </div>
        </header>
    );
}

export default HeaderAdmin;
