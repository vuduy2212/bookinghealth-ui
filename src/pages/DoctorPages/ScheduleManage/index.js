import classNames from 'classnames/bind';
import HeaderDoctor from '~/components/SystemComponent/HeaderSystem/HeaderDoctor';
import styles from './ScheduleManage.module.scss';
import ProtectedRoute from '~/routes/ProtectedRoute';
import { useSelector } from 'react-redux';

// import style manually
import 'react-markdown-editor-lite/lib/index.css';
const cx = classNames.bind(styles);
function ScheduleManage() {
    const user = useSelector((state) => state.auth.login.currentUser);

    return (
        <ProtectedRoute isAllowed={!!user && user.roleId === 'R2'} redirectPath="/login">
            <div>
                <HeaderDoctor />
                <div className="container">
                    <div className={cx('content')}>
                        <h1 className={cx('title')}>Quản lí thời gian</h1>
                    </div>
                </div>
            </div>
        </ProtectedRoute>
    );
}

export default ScheduleManage;
