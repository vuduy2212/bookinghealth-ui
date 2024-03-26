import classNames from 'classnames/bind';
import style from './Popper.module.scss';
const cx = classNames.bind(style);
function Wrapper({ small = false, children }) {
    return (
        <div
            className={cx('wrapper', {
                ['small']: small,
            })}
        >
            {children}
        </div>
    );
}

export default Wrapper;
