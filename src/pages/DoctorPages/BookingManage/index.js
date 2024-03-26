import classNames from 'classnames/bind';
import HeaderDoctor from '~/components/SystemComponent/HeaderSystem/HeaderDoctor';
import styles from './BookingManage.module.scss';
import ProtectedRoute from '~/routes/ProtectedRoute';
import { useSelector } from 'react-redux';
//--------------------------------------

const cx = classNames.bind(styles);
function BookingManage() {
    const user = useSelector((state) => state.auth.login.currentUser);

    return (
        <ProtectedRoute isAllowed={!!user && user.roleId === 'R2'} redirectPath="/login">
            <div>
                <HeaderDoctor />
                <div className="container">
                    <div className={cx('content')}>
                        <h1 className={cx('title')}>Quản lí đặt lịch khám</h1>
                    </div>
                </div>
            </div>
        </ProtectedRoute>
    );
}

export default BookingManage;
