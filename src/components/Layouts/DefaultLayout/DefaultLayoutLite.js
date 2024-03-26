import classNames from 'classnames/bind';
import style from './DefaultLayout.module.scss';
import Header from '~/components/Layouts/components/Header';
import Footer from '~/components/Layouts/components/Footer';
const cx = classNames.bind(style);
function DefaultLayoutLite({ children }) {
    return (
        <div className={cx('wrapper')}>
            <Header lite />
            <div className={cx('content')}>{children}</div>
        </div>
    );
}

export default DefaultLayoutLite;
