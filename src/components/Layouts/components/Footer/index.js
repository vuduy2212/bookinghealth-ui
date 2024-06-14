import classNames from 'classnames/bind';
import style from './Footer.module.scss';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Link } from 'react-router-dom';
import { FaCheck, FaMapMarkerAlt } from 'react-icons/fa';

import images from '~/assets/images';
import DATA_MENU from './DataMenu';
const cx = classNames.bind(style);
function Footer() {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('wrapper-top', 'py-5', 'px-3', 'px-md-0')}>
                <Container fluid="md">
                    <Row>
                        <Col xs={12} md={6}>
                            <Link to={'/'}>
                                <div className={cx('logo')}>
                                    {/* <img src={images.logo} alt="BookingCare Logo"></img> */}
                                </div>
                            </Link>
                            <h2 className={cx('name-company')}>Công ty Cổ phần Công nghệ </h2>
                            <p className={cx('address-company')}>
                                <FaMapMarkerAlt style={{ marginRight: ' 6px' }} />
                                Lô B4/D21, Khu đô thị mới Cầu Giấy, Phường Dịch Vọng Hậu, Quận Cầu Giấy, Thành phố Hà
                                Nội, Việt Nam
                            </p>
                            <p className={cx('address-company')}>
                                <FaCheck style={{ marginRight: ' 6px' }} />
                                ĐKKD số: 0106790291. Sở KHĐT Hà Nội cấp ngày 16/03/2015
                            </p>
                            <div className="mb-5 mb-md-0">
                                <img alt="" className={cx('logo-sub')} src={images.bocongthuong}></img>
                                <img alt="" className={cx('logo-sub')} src={images.bocongthuong}></img>
                            </div>
                        </Col>

                        <Col xs={12} md={3} className={cx('menu-wrapper', 'mb-5', 'mb-md-0')}>
                            {DATA_MENU.map((item, index) => (
                                <Link to={item.link} key={index} className={cx('menu-item')}>
                                    {item.title}
                                </Link>
                            ))}
                        </Col>
                        <Col xs={12} md={3}>
                            <div className={cx('contact')}>
                                <strong>Trụ sở tại Hà Nội</strong>
                                <p>
                                    Lô B4/D21, Khu đô thị mới Cầu Giấy, Phường Dịch Vọng Hậu, Quận Cầu Giấy, Thành phố
                                    Hà Nội, Việt Nam
                                </p>
                            </div>
                            {/* <div className={cx('contact')}>
                                <strong>Văn phòng tại TP Hồ Chí Minh</strong>
                                <p>Số 01, Hồ Bá Kiện, Phường 15, Quận 10</p>
                            </div> */}
                            <div className={cx('contact')}>
                                <strong>Hỗ trợ khách hàng</strong>
                                <p>support@example.vn (7h - 18h)</p>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </div>
            <div className={cx('wrapper-bottom')}>
                <Container fluid="md">
                    <Row>
                        <Col xs={8} className="h-80 h4 text-white">
                            <small>© 2024 Đặt lịch khám sức khỏe.</small>
                        </Col>
                        <Col xs={4} className="d-flex justify-content-end">
                            <img alt="social-logo" src={images.logoFacebook} className={cx('social-logo')}></img>
                            <img alt="social-logo" src={images.logoYoutube} className={cx('social-logo')}></img>
                        </Col>
                    </Row>
                </Container>
            </div>
        </div>
    );
}

export default Footer;
