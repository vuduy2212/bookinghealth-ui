import Home from '~/pages/UserPages/Home';
import Handbook from '~/pages/UserPages/Handbook';
import { DefaultLayout } from '~/components/Layouts';
import Login from '~/pages/UserPages/Login';
import Register from '~/pages/UserPages/Register';
import UpdateUser from '~/pages/UserPages/UpdateUser';
import UserManage from '~/pages/AdminPages/UserManage';
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
        path: '/admin/user-manager',
        component: UserManage,
        layout: null,
    },
];

export { publicRoutes, privateRoutes };
