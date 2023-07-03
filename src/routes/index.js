import Home from '~/pages/UserPages/Home';
import Handbook from '~/pages/UserPages/Handbook';
import { DefaultLayout } from '~/components/Layouts';
import Login from '~/pages/UserPages/Login';
import Register from '~/pages/UserPages/Register';
import UpdateUser from '~/pages/UserPages/UpdateUser';
import UserManage from '~/pages/AdminPages/UserManage';
import PatientManage from '~/pages/AdminPages/UserManage/PatientManage';
import AdminManage from '~/pages/AdminPages/UserManage/AdminManage';
import DoctorManage from '~/pages/AdminPages/UserManage/DoctorManage';
import UnConfirmed from '~/pages/AdminPages/UserManage/UnConfirmed';
import UpdateInfo from '~/pages/DoctorPages/UpdateInfo';
// PublicRoutes: không cần đăng nhập, vẫn vào được
const publicRoutes = [
    {
        path: '/',
        component: Home,
        layout: DefaultLayout,
    },
    {
        path: '/camnang',
        component: Handbook,
        layout: DefaultLayout,
    },
    {
        path: '/hotro',
        component: Handbook,
        layout: DefaultLayout,
    },
    {
        path: '/login',
        component: Login,
        layout: null,
    },
    {
        path: '/register',
        component: Register,
        layout: null,
    },
    {
        path: '/update-user',
        component: UpdateUser,
        layout: null,
    },
];

// privateRoutes: phải đăng nhập, mới vào được

const privateRoutes = [
    // admin mới vào được
    {
        path: '/admin/patient-manage',
        component: PatientManage,
        layout: null,
    },
    {
        path: '/admin/admin-manage',
        component: AdminManage,
        layout: null,
    },
    {
        path: '/admin/doctor-manage',
        component: DoctorManage,
        layout: null,
    },
    {
        path: '/admin/auth-manage',
        component: UnConfirmed,
        layout: null,
    },

    // doctor mới vào được
    {
        path: '/doctor/update-info',
        component: UpdateInfo,
        layout: null,
    },
];

export { publicRoutes, privateRoutes };
