import classNames from 'classnames/bind';
import styles from './Menu.module.scss';
import { IoIosArrowBack } from 'react-icons/io';
const cx = classNames.bind(styles);
function Header({ headerTitle, onBack = () => {} }) {
    return (
        <header className={cx('header-wrapper')}>
            <button className={cx('header-back-btn')} onClick={onBack}>
                <IoIosArrowBack></IoIosArrowBack>
            </button>
            <h3 className={cx('title')}>{headerTitle}</h3>
        </header>
    );
}

export default Header;
