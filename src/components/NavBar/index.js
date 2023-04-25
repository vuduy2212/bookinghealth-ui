import classNames from 'classnames/bind';
import { FiMenu } from 'react-icons/fi';
import { Link } from 'react-router-dom';

import style from './NavBar.module.scss';
import DATA_NAVBAR from './DataNavBar';
import images from '~/assets/images';
import { useState } from 'react';
const cx = classNames.bind(style);
function Nav(Bar) {
    const [show, setShow] = useState(false);
    return (
        <div>
            <div className={cx('menu-btn')} onClick={() => setShow(true)}>
                <FiMenu />
            </div>
            {show && (
                <div>
                    <div className={cx('overlay')} onClick={() => setShow(false)}></div>
                    <div className={cx('navbar')}>
                        {DATA_NAVBAR.main.map((item, index) => {
                            return (
                                <Link
                                    onClick={() => setShow(false)}
                                    key={index}
                                    className={cx('navbar-item')}
                                    to={item.to}
                                >
                                    {item.title}
                                </Link>
                            );
                        })}
                        <div className={cx('seperate')}>VỀ BOOKINGCARE</div>
                        {DATA_NAVBAR.info.map((item, index) => {
                            return (
                                <Link
                                    onClick={() => setShow(false)}
                                    key={index}
                                    className={cx('navbar-item')}
                                    to={item.to}
                                >
                                    {item.title}
                                </Link>
                            );
                        })}
                        <div className={cx('social-media')}>
                            <img alt="social-logo" src={images.logoFacebook} className={cx('social-logo')}></img>
                            <img alt="social-logo" src={images.logoYoutube} className={cx('social-logo')}></img>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Nav;
