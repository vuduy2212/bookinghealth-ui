import NewHeaderSystem from '~/components/SystemComponent/NewHeaderSystem';
import classNames from 'classnames/bind';
import styles from './AdminLayout.module.scss';
import ProtectedRoute from '~/routes/ProtectedRoute';
import { useSelector } from 'react-redux';
import SideBarSystem from '~/components/SystemComponent/SideBarSystem/SideBarSystem';
const cx = classNames.bind(styles);
function AdminLayout({
    home = false,
    clinic = false,
    specialist = false,
    userPage = false,
    handbook = false,
    shop = false,
    children,
}) {
    const user = useSelector((state) => state.auth.login.currentUser);
    return (
        <ProtectedRoute isAllowed={!!user && user.roleId === 'R1'} redirectPath="/login">
            <div>
                <NewHeaderSystem></NewHeaderSystem>
                <div className={cx('content')}>
                    <SideBarSystem
                        home={home}
                        clinic={clinic}
                        specialist={specialist}
                        userPage={userPage}
                        handbook={handbook}
                        shop={shop}
                    />
                    <div className={cx('wrapper')}>{children}</div>
                </div>
            </div>
        </ProtectedRoute>
    );
}

export default AdminLayout;
