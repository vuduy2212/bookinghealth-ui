import classNames from 'classnames/bind';
import styles from './HeaderSystem.module.scss';
import { Link, useNavigate } from 'react-router-dom';
import MenuItem from './MenuItem';
import Menu from '~/components/Popper/Menu';
import images from '~/assets/images';
import { useDispatch, useSelector } from 'react-redux';
import { BiEditAlt, BiHelpCircle, BiHistory, BiLogOutCircle } from 'react-icons/bi';
import { logOut } from '~/redux/apiRequest';
import Image from '~/components/Image';
import CommonUtils from '~/utils/CommonUtils';
import { AiFillProfile } from 'react-icons/ai';
import { MdPassword } from 'react-icons/md';
const cx = classNames.bind(styles);
function HeaderDoctor() {
    const user = useSelector((state) => state.auth.login.currentUser);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const MENU_ITEM = [
        {
            icon: <BiEditAlt />,
            title: 'Cập nhật thông tin',
            to: '/system/doctor/update-info',
        },
        {
            icon: <AiFillProfile />,
            title: 'Cập nhật hồ sơ',
            to: '/system/doctor/update-profile',
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
            icon: <MdPassword />,
            title: 'Thay đổi mật khẩu',
            to: '/change-password',
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
                    <img src={images.doctor} className={cx('icon-doctor')}></img>
                    <span className={cx('title')}>Doctor Page</span>
                </Link>
                <MenuItem className={cx('menu-item')} to="/system/doctor/booking">
                    Yêu cầu đặt lịch
                </MenuItem>
                <MenuItem className={cx('menu-item')} to="/system/doctor/schedule">
                    Quản lí thời gian khám
                </MenuItem>
                <MenuItem className={cx('menu-item')} to="/system/doctor/patient-examined">
                    Bệnh nhân đã khám
                </MenuItem>

                <span className={cx('welcome')}>
                    {user?.lastName && user?.firstName ? user.lastName + ' ' + user.firstName : 'Xin chào'}
                </span>
                <Menu data={MENU_ITEM}>
                    <Image
                        className={cx('avatar')}
                        src={CommonUtils.toFileFromBase64(user.image)}
                        fallback={images.noImage}
                        alt="avatar"
                    ></Image>
                </Menu>
            </div>
        </header>
    );
}

export default HeaderDoctor;
