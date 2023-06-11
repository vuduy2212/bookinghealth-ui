import Home from '~/pages/Home';
import Handbook from '~/pages/Handbook';
import { DefaultLayout } from '~/components/Layouts';
import Login from '~/pages/Login';
import Register from '~/pages/Register';
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
];

// privateRoutes: phải đăng nhập, mới vào được
const privateRoutes = [];

export { publicRoutes, privateRoutes };
