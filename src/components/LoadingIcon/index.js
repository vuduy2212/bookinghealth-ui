import { ClipLoader } from 'react-spinners';
import classNames from 'classnames/bind';
import styles from './LoadingIcon.module.scss';
const cx = classNames.bind(styles);
function LoadingIcon() {
    return (
        <div className={cx('loading-container')}>
            <ClipLoader color="#36d7b7" size={60} />
        </div>
    );
}

export default LoadingIcon;
