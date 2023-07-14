import classNames from 'classnames/bind';
import styles from './AdminLayout.module.scss';
import ProtectedRoute from '~/routes/ProtectedRoute';
import { useSelector } from 'react-redux';
import HeaderAdmin from '~/components/SystemComponent/HeaderSystem/HeaderAdmin';
const cx = classNames.bind(styles);
function AdminLayout({ children }) {
    const user = useSelector((state) => state.auth.login.currentUser);
    return (
        <ProtectedRoute isAllowed={!!user && user.roleId === 'R1'} redirectPath="/login">
            <div>
                <HeaderAdmin />
                <div className={cx('container', 'content')}>{children}</div>
            </div>
        </ProtectedRoute>
    );
}

export default AdminLayout;
