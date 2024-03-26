import HeaderDoctor from '~/components/SystemComponent/HeaderSystem/HeaderDoctor';
import classNames from 'classnames/bind';
import styles from './DoctorLayout.module.scss';
import ProtectedRoute from '~/routes/ProtectedRoute';
import { useSelector } from 'react-redux';
const cx = classNames.bind(styles);
function DoctorLayout({ children }) {
    const user = useSelector((state) => state.auth.login.currentUser);
    return (
        <ProtectedRoute isAllowed={!!user && user.roleId === 'R2'} redirectPath="/login">
            <div>
                <HeaderDoctor></HeaderDoctor>
                <div className={cx('container', 'content')}>{children}</div>
            </div>
        </ProtectedRoute>
    );
}

export default DoctorLayout;
