import classNames from 'classnames/bind';
import styles from './AdminClinicLayout.module.scss';
import ProtectedRoute from '~/routes/ProtectedRoute';
import { useSelector } from 'react-redux';
import NewHeadeAdminClinic from '~/components/SystemComponent/NewHeadeAdminClinic';
import SideBarAdminClinic from '~/components/SystemComponent/SideBarAdminClinic/SideBarAdminClinic';
const cx = classNames.bind(styles);
function AdminClinicLayout({
    home = false,
    doctor = false,
    clinic = false,
    specialist = false,
    userPage = false,
    handbook = false,
    shop = false,
    children,
}) {
    const user = useSelector((state) => state.auth.login.currentUser);
    return (
        <ProtectedRoute isAllowed={!!user && user.roleId === 'R4'} redirectPath="/login">
            <div>
                <NewHeadeAdminClinic></NewHeadeAdminClinic>
                <div className={cx('content')}>
                    <SideBarAdminClinic
                        home={home}
                        clinic={clinic}
                        specialist={specialist}
                        userPage={userPage}
                        handbook={handbook}
                        shop={shop}
                        doctor={doctor}
                    />
                    <div className={cx('wrapper')}>{children}</div>
                </div>
            </div>
        </ProtectedRoute>
    );
}

export default AdminClinicLayout;
