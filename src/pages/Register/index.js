import classNames from 'classnames/bind';
import styles from '~/pages/Register/Register.module.scss';
import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import images from '~/assets/images';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { registerUser } from '~/redux/apiRequest';
import { useDispatch } from 'react-redux';
const cx = classNames.bind(styles);
function Register() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [showPw, setShowPw] = useState(false);
    const toggleShowPassword = () => {
        showPw ? setShowPw(false) : setShowPw(true);
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        // validate
        const validate = (input) => {
            if (input.type === 'email' || input.name === 'email') {
                if (
                    input.value
                        .trim()
                        .match(
                            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                        ) == null
                ) {
                    return false;
                }
            } else if (input.name === 'phoneNumber') {
                if (input.value.trim().match(/(84|0[3|5|7|8|9])+([0-9]{8})\b/g) == null) {
                    return false;
                }
            } else {
                if (input.value.trim() === '') {
                    return false;
                }
            }
        };
        const showValidate = (input) => {
            const thisAlert = input.parentElement;
            thisAlert.classList.add(`${cx('alert-validate')}`);
        };
        let check = true;
        const hideValidate = (input) => {
            const thisAlert = input.parentElement;

            thisAlert.classList.remove(`${cx('alert-validate')}`);
        };
        const inputList = document.querySelectorAll(`.${cx('validate-input-register')} .${cx('input100')}`);
        [...inputList].forEach((element) => {
            if (validate(element) === false) {
                showValidate(element);
                check = false;
            } else {
                hideValidate(element);
            }
            element.addEventListener('focus', () => {
                hideValidate(element);
            });
        });

        for (let i = 0; i < inputList.length; i++) {
            inputList[i].onFocus = () => {
                hideValidate(inputList[i]);
            };
        }
        // validate
        if (check === true) {
            const newUser = {
                email,
                password,
                firstName,
                lastName,
                phoneNumber,
                roldId: 'R3',
            };
            registerUser(newUser, dispatch, navigate('/login'));
        }
    };
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
                        <form onSubmit={(e) => handleSubmit(e)} className={cx('login100-form', 'validate-form')}>
                            <div className={cx('logo-container')}>
                                <Link className={cx('logo')} to={'/'}>
                                    <div>
                                        <img src={images.logo} alt="BookingCare Logo"></img>
                                    </div>
                                </Link>
                            </div>
                            <span className={cx('login100-form-title', 'p-b-43')}>Đăng ký</span>
                            <div className={cx('container-name-input')}>
                                <div
                                    className={cx('wrap-input100', 'validate-input-register', 'last-name-input')}
                                    data-validate="LastName is required"
                                >
                                    <input
                                        className={cx('input100')}
                                        type="text"
                                        name="lastName"
                                        onChange={(e) => setLastName(e.target.value)}
                                    />
                                    <span className={cx('focus-input100')}></span>
                                    <span className={cx('label-input100')}>Họ</span>
                                </div>
                                <div
                                    className={cx('wrap-input100', 'validate-input-register', 'first-name-input')}
                                    data-validate="FirstName is required"
                                >
                                    <input
                                        className={cx('input100')}
                                        type="text"
                                        name="firstName"
                                        onChange={(e) => setFirstName(e.target.value)}
                                    />
                                    <span className={cx('focus-input100')}></span>
                                    <span className={cx('label-input100')}>Tên</span>
                                </div>
                            </div>
                            <div
                                className={cx('wrap-input100', 'validate-input-register')}
                                data-validate="PhoneNumber is required: VietNam PhoneNumber"
                            >
                                <input
                                    className={cx('input100')}
                                    type="text"
                                    name="phoneNumber"
                                    onChange={(e) => setPhoneNumber(e.target.value)}
                                />
                                <span className={cx('focus-input100')}></span>
                                <span className={cx('label-input100')}>Số điện thoại</span>
                            </div>
                            <div
                                className={cx('wrap-input100', 'validate-input-register')}
                                data-validate="Valid email is required: ex@abc.xyz"
                            >
                                <input
                                    className={cx('input100')}
                                    type="text"
                                    name="email"
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                                <span className={cx('focus-input100')}></span>
                                <span className={cx('label-input100')}>Email</span>
                            </div>

                            <div
                                className={cx('wrap-input100', 'validate-input-register')}
                                data-validate="Password is required"
                            >
                                <input
                                    className={cx('input100')}
                                    type={showPw ? 'text' : 'password'}
                                    name="password"
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                                <span className={cx('focus-input100')}></span>
                                <span className={cx('label-input100')}>Password</span>
                                {password ? (
                                    showPw ? (
                                        <FaEyeSlash
                                            className={cx('show-password')}
                                            onClick={toggleShowPassword}
                                        ></FaEyeSlash>
                                    ) : (
                                        <FaEye className={cx('show-password')} onClick={toggleShowPassword}></FaEye>
                                    )
                                ) : (
                                    <></>
                                )}
                            </div>

                            <div className={cx('container-login100-form-btn')}>
                                <button className={cx('login100-form-btn')}>Đăng ký</button>
                            </div>
                            <span className={cx('login100-form-title-sub')}>
                                Bạn đã có tài khoản?
                                <Link to={'/login'} className={cx('login100-form-btn', 'register-btn')}>
                                    Đăng nhập ngay
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
