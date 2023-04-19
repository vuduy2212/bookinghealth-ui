import Home from '~/pages/Home';
import Handbook from '~/pages/Handbook';
import { DefaultLayout } from '~/components/Layouts';
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
];

// privateRoutes: phải đăng nhập, mới vào được
const privateRoutes = [];

export { publicRoutes, privateRoutes };
