import classNames from 'classnames/bind';
import styles from '~/pages/Register/Register.module.scss';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
const cx = classNames.bind(styles);
function Register() {
    useEffect(() => {
        const handleBlur = function (item) {
            if (item.value.trim() !== '') {
                item.classList.add(cx('has-val'));
            } else {
                item.classList.remove(cx('has-val'));
            }
        };
        const input100 = document.getElementsByClassName(cx('input100'));
        for (let item of input100) {
            item.addEventListener('blur', () => {
                handleBlur(item);
            });
        }
        return () => {
            for (let item of input100) {
                item.removeEventListener('blur', () => {
                    handleBlur(item);
                });
            }
        };
    }, []);

    return (
        <div className={cx('login-page')}>
            <div className={cx('limiter')}>
                <div className={cx('container-login100')}>
                    <div className={cx('wrap-login100')}>
                        <form className={cx('login100-form', 'validate-form')}>
                            <span className={cx('login100-form-title', 'p-b-43')}>Đăng ký</span>
                            <div className={cx('container-name-input')}>
                                <div
                                    className={cx('wrap-input100', 'validate-input', 'last-name-input')}
                                    data-validate="Valid email is required: ex@abc.xyz"
                                >
                                    <input className={cx('input100')} type="text" name="last-name" />
                                    <span className={cx('focus-input100')}></span>
                                    <span className={cx('label-input100')}>Họ</span>
                                </div>
                                <div
                                    className={cx('wrap-input100', 'validate-input', 'first-name-input')}
                                    data-validate="Valid email is required: ex@abc.xyz"
                                >
                                    <input className={cx('input100')} type="text" name="first-name" />
                                    <span className={cx('focus-input100')}></span>
                                    <span className={cx('label-input100')}>Tên</span>
                                </div>
                            </div>
                            <div
                                className={cx('wrap-input100', 'validate-input')}
                                data-validate="Valid email is required: ex@abc.xyz"
                            >
                                <input className={cx('input100')} type="text" name="phone-number" />
                                <span className={cx('focus-input100')}></span>
                                <span className={cx('label-input100')}>Số điện thoại</span>
                            </div>
                            <div
                                className={cx('wrap-input100', 'validate-input')}
                                data-validate="Valid email is required: ex@abc.xyz"
                            >
                                <input className={cx('input100')} type="text" name="email" />
                                <span className={cx('focus-input100')}></span>
                                <span className={cx('label-input100')}>Email</span>
                            </div>

                            <div className={cx('wrap-input100', 'validate-input')} data-validate="Password is required">
                                <input className={cx('input100')} type="password" name="pass" />
                                <span className={cx('focus-input100')}></span>
                                <span className={cx('label-input100')}>Password</span>
                            </div>

                            <div className={cx('container-login100-form-btn')}>
                                <button className={cx('login100-form-btn')}>Đăng ký</button>
                            </div>
                            <span className={cx('login100-form-title-sub')}>
                                Bạn đã có tài khoản?
                                <Link to={'/login'} className={cx('login100-form-btn', 'register-btn')}>
                                    <Link to={'/login'}>Đăng nhập ngay</Link>
                                </Link>
                            </span>
                        </form>
                        <div className={cx('login100-more')}></div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Register;
