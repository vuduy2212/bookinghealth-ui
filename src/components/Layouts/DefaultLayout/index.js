import classNames from 'classnames/bind';

import style from './DefaultLayout.module.scss';
import Header from '~/components/Layouts/components/Header';
import Footer from '~/components/Layouts/components/Footer';
import ProtectedRoute from '~/routes/ProtectedRoute';
const cx = classNames.bind(style);
function DefaultLayout({ children }) {
    return (
        <div className={cx('wrapper')}>
            <Header />
            <div className={cx('content')}>{children}</div>
            <Footer />
        </div>
    );
}

export default DefaultLayout;
