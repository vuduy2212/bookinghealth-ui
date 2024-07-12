import classNames from 'classnames/bind';
import style from './HeaderLite.module.scss';
import { BiArrowBack } from 'react-icons/bi';
import { Link, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
const cx = classNames.bind(style);
function HeaderLite({ title = '', className }) {
    const user = useSelector((state) => state.auth.login);

    return (
        <div className={cx('wrapper', className)}>
            <div className="container d-flex align-items-center">
                <Link to={-1} className={cx('wrapper-icon')}>
                    <BiArrowBack className={cx('back-icon')} />
                </Link>
                <span className={cx('title')}>{title}</span>
            </div>
        </div>
    );
}

export default HeaderLite;
