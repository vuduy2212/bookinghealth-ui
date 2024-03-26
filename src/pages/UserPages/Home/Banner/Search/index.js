import classNames from 'classnames/bind';
import { BiSearchAlt2 } from 'react-icons/bi';
import style from './Search.module.scss';
const cx = classNames.bind(style);
function Search() {
    return (
        <div className={cx('container')}>
            <BiSearchAlt2 className={cx('search-icon')} />
            <input placeholder="Tìm kiếm gói khám, bác sĩ, ..." />
        </div>
    );
}

export default Search;
