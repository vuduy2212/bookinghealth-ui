/* eslint-disable jsx-a11y/anchor-is-valid */
import classNames from 'classnames/bind';
import styles from '~/pages/Login/Login.module.scss';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
const cx = classNames.bind(styles);
function Login() {
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
                            <span className={cx('login100-form-title', 'p-b-43')}>Đăng nhập</span>

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

                            <div className={cx('flex-sb-m w-full', 'p-t-3', 'p-b-32', 'wrapper-checkbox-forgot')}>
                                <div className={cx('contact100-form-checkbox')}>
                                    <input
                                        className={cx('input-checkbox100')}
                                        id="ckb1"
                                        type="checkbox"
                                        name="remember-me"
                                    />
                                    <label className={cx('label-checkbox100')} htmlFor="ckb1">
                                        Remember me
                                    </label>
                                </div>

                                <div>
                                    <a href="#" className={cx('txt1')}>
                                        Forgot Password?
                                    </a>
                                </div>
                            </div>

                            <div className={cx('container-login100-form-btn')}>
                                <button className={cx('login100-form-btn')}>Đăng nhập</button>
                            </div>
                            <span className={cx('login100-form-title-sub')}>
                                Bạn chưa có tài khoản?
                                <Link to={'/register'} className={cx('login100-form-btn', 'register-btn')}>
                                    <Link to={'/register'}>Đăng ký ngay</Link>
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

export default Login;
