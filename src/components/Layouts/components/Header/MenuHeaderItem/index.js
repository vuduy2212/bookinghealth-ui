import { Link } from 'react-router-dom';
import classNames from 'classnames/bind';
import style from './MenuHeaderItem.module.scss';
const cx = classNames.bind(style);

function MenuHeaderItem({ title, desc, to }) {
    return (
        <Link to={to} className={cx('wrapper')}>
            <h5 className={cx('title')}>{title}</h5>
            <span className={cx('desc')}>{desc}</span>
        </Link>
    );
}

export default MenuHeaderItem;
