import classNames from 'classnames/bind';
import style from './MenuBanner.module.scss';
import { Link } from 'react-router-dom';
const cx = classNames.bind(style);
function MenuBannerItem({ logo, title1, title2, to }) {
    return (
        <Link to={to} className={cx('wrapper-item')}>
            <div className={cx('logo-wrapper')}>
                <img src={logo} alt="logo" className={cx('logo')}></img>
            </div>
            <h6 className={cx('title')}>{title1}</h6>
            <h6 className={cx('title')}>{title2}</h6>
        </Link>
    );
}

export default MenuBannerItem;
