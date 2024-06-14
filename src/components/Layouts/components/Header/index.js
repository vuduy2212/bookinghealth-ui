import classNames from 'classnames/bind';
import { useEffect, useLayoutEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import style from './Header.module.scss';
import images from '~/assets/images';
import MenuHeaderItem from './MenuHeaderItem';
import NavBar from '~/components/NavBar';
import Button from '~/components/Button';
import { useDispatch, useSelector } from 'react-redux';
import { logOut } from '~/redux/apiRequest';
import { BiEditAlt, BiHelpCircle, BiHistory, BiLogOutCircle } from 'react-icons/bi';
import Menu from '~/components/Popper/Menu';
import Image from '~/components/Image';
import CommonUtils from '~/utils/CommonUtils';
import { FiSettings } from 'react-icons/fi';
import { FaFileMedicalAlt } from 'react-icons/fa';
const cx = classNames.bind(style);
function Header() {
    const [user, setUser] = useState(null);
    const MENU_ITEM = [
        {
            icon: <BiEditAlt />,
            title: 'Cập nhật thông tin',
            to: '/update-user',
        },
        {
            icon: <BiHistory />,
            title: 'Lịch sử khám bệnh',
            to: '/examination-history',
        },
        {
            icon: <BiHelpCircle />,
            title: 'Trợ giúp',
            to: 'help',
        },
        {
            icon: <FiSettings />,
            title: 'Admin Page',
            to: '/system/admin/patient-manage',
        },
        {
            icon: <FaFileMedicalAlt />,
            title: 'Doctor Page',
            to: '/system/doctor/booking',
        },
        {
            icon: <BiLogOutCircle />,
            title: 'Đăng xuất',
            onClick: () => {
                handleLogOut();
            },
        },
    ];

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const loginState = useSelector((state) => state.auth.login);
    const handleLogOut = () => {
        logOut(dispatch, navigate);
    };
    useLayoutEffect(() => {
        setUser(loginState?.currentUser);
    }, [loginState]);
    return (
        <div className={cx('wrapper')}>
            <div className="container d-flex align-items-center">
                <div className={cx('inner')}>
                    <NavBar></NavBar>
                    <Link to={'/'}>
                        <div className={cx('logo')}>{/* <img src={images.logo} alt="BookingCare Logo"></img> */}</div>
                    </Link>
                    <div className={cx('menu-header', 'd-none', 'd-xl-flex')}>
                        <MenuHeaderItem title="Chuyên khoa" desc="Tìm bác sĩ theo chuyên khoa" to="/chuyenkhoa" />
                        <MenuHeaderItem title="Cơ sở y tế" desc="Chọn bệnh viện phòng khám" to="/co-so-y-te" />
                        <MenuHeaderItem title="Bác sĩ" desc="Chọn bác sĩ giỏi" to="/bacsi" />
                        <MenuHeaderItem title="Gói khám" desc="Khám sức khỏe tổng quát" to="/kham-tong-quat" />
                    </div>
                    {/* <Link to={'/hotro'} }>
                        <BsQuestionCircleFill />
                        <span className={cx('help-btn-title')}>Hỗ trợ</span>
                    </Link> */}
                    {!user ? (
                        <>
                            <Button small primary className={cx('help-btn')} to={'/login'}>
                                Đăng nhập
                            </Button>
                            <Button small primary className={cx('help-btn')} to={'/register'}>
                                Đăng ký
                            </Button>
                        </>
                    ) : (
                        <>
                            <span className={cx('welcome')}>
                                {user.lastName && user.firstName ? user.lastName + ' ' + user.firstName : 'Xin chào'}
                            </span>
                            <Menu data={MENU_ITEM}>
                                <Image
                                    className={cx('avatar')}
                                    src={CommonUtils.toFileFromBase64(user.image)}
                                    fallback={images.noImage}
                                    alt="avatar"
                                ></Image>
                            </Menu>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Header;
