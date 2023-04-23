import classNames from 'classnames/bind';
import style from './Footer.module.scss';
const cx = classNames.bind(style);
function Footer() {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('content')}>
                <div className={cx('info')}></div>
                <div className={cx('info')}></div>
                <div className={cx('info')}></div>
            </div>
            <div className={cx('footer')}></div>
        </div>
    );
}

export default Footer;
