import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import style from './Header.module.scss';
import images from '~/assets/images';
import MenuHeaderItem from './MenuHeaderItem';
import NavBar from '~/components/NavBar';
import Button from '~/components/Button';
import { useDispatch, useSelector } from 'react-redux';
import { logOut } from '~/redux/apiRequest';

const cx = classNames.bind(style);
function Header() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const loginState = useSelector((state) => state.auth.login);
    const handleLogOut = () => {
        logOut(dispatch, navigate);
    };
    useEffect(() => {
        setUser(loginState?.currentUser);
    }, [loginState]);
    const [user, setUser] = useState(null);
    return (
        <div className={cx('wrapper')}>
            <div className="container d-flex align-items-center">
                <div className={cx('inner')}>
                    <NavBar></NavBar>
                    <Link to={'/'}>
                        <div className={cx('logo')}>
                            <img src={images.logo} alt="BookingCare Logo"></img>
                        </div>
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
                            <span className={cx('welcome')}>Xin chào, {user?.firstName}</span>
                            <Button small primary className={cx('help-btn')} onClick={handleLogOut}>
                                Đăng xuất
                            </Button>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Header;
