import { BiHome, BiHomeAlt } from 'react-icons/bi';
import { Link } from 'react-router-dom';
import classNames from 'classnames/bind';
import style from './SiteMap.module.scss';
import { FaHome } from 'react-icons/fa';

const cx = classNames.bind(style);

function SiteMap() {
    return (
        <div>
            <div className={cx('container')}>
                <Link className={cx('item')} to={'/'}>
                    <FaHome style={{ marginBottom: '2px' }} />
                </Link>
                <Link className={cx('item')}>Khám chuyên khoa</Link>
                <Link className={cx('item')}>Cơ xương khớp</Link>
            </div>
        </div>
    );
}

export default SiteMap;
