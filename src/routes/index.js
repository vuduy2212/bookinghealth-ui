import Home from '~/pages/UserPages/Home';
import Handbook from '~/pages/UserPages/Handbook';
import { DefaultLayout, DefaultLayoutLite, DoctorLayout } from '~/components/Layouts';
import Login from '~/pages/UserPages/Login';
import Register from '~/pages/UserPages/Register';
import UpdateUser from '~/pages/UserPages/UpdateUser';
import PatientManage from '~/pages/AdminPages/UserManage/PatientManage';
import AdminManage from '~/pages/AdminPages/UserManage/AdminManage';
import DoctorManage from '~/pages/AdminPages/UserManage/DoctorManage';
import UnConfirmed from '~/pages/AdminPages/UserManage/UnConfirmed';
import UpdateInfo from '~/pages/DoctorPages/UpdateInfo';
import DoctorDetail from '~/pages/UserPages/DoctorDetail';
import ScheduleManage from '~/pages/DoctorPages/ScheduleManage';
import BookingManage from '~/pages/DoctorPages/BookingManage';
import UpdateProfile from '~/pages/DoctorPages/UpdateProfile';
import SpecialistManage from '~/pages/AdminPages/SpecialistManage';
import ClinicManage from '~/pages/AdminPages/ClinicManage';
import HandbookManage from '~/pages/AdminPages/HandbookManage';
import ClinicCreate from '~/pages/AdminPages/ClinicCreate';
import SpecialistCreate from '~/pages/AdminPages/SpecialistCreate';
import SpecialistUpdate from '~/pages/AdminPages/SpecialistUpdate';
import ClinicUpdate from '~/pages/AdminPages/ClinicUpdate';
import Booking from '~/pages/UserPages/Booking';
import BookingSuccess from '~/pages/UserPages/BookingSuccess';
import BookingManageAdmin from '~/pages/AdminPages/BookingManageAdmin';
import BookingManageDoctor from '~/pages/DoctorPages/BookingManageDoctor';
import PatientExamined from '~/pages/DoctorPages/PatientExamined';
import ExaminedHistory from '~/pages/UserPages/ExaminedHistory';
import SpecialistDetail from '~/pages/UserPages/SpecialistDetail';
import ClinicDetail from '~/pages/UserPages/ClinicDetail';

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
    {
        path: '/doctor-detail/:id',
        component: DoctorDetail,
        layout: null,
    },
    {
        path: '/specialist-detail/:id',
        component: SpecialistDetail,
        layout: null,
    },
    {
        path: '/clinic-detail/:id',
        component: ClinicDetail,
        layout: DefaultLayoutLite,
    },
    {
        path: '/booking/:doctorId/:date/:timeType',
        component: Booking,
        layout: DefaultLayout,
    },
    {
        path: '/booking/successful-appointment',
        component: BookingSuccess,
        layout: DefaultLayout,
    },
];

// privateRoutes: phải đăng nhập, mới vào được

const privateRoutes = [
    {
        path: '/examination-history', // Quản lí bệnh nhân
        component: ExaminedHistory,
        layout: DefaultLayoutLite,
    },

    // admin mới vào được
    {
        path: '/system/admin/patient-manage', // Quản lí bệnh nhân
        component: PatientManage,
        layout: null,
    },
    {
        path: '/system/admin/admin-manage', // Quản lí admin
        component: AdminManage,
        layout: null,
    },
    {
        path: '/system/admin/doctor-manage', // Quản lí bác sĩ
        component: DoctorManage,
        layout: null,
    },
    {
        path: '/system/admin/auth-manage', // Quản lí tạo tài khoản
        component: UnConfirmed,
        layout: null,
    },
    // Chuyên khoa-------------------------------------------------------------------------------------------
    {
        path: '/system/admin/specialist', // Quản lí chuyên khoa
        component: SpecialistManage,
        layout: null,
    },
    {
        path: '/system/admin/create-specialist', // Tạo chuyên khoa
        component: SpecialistCreate,
        layout: null,
    },
    {
        path: '/system/admin/update-specialist/:specialistId', // Chỉnh sửa chuyên khoa
        component: SpecialistUpdate,
        layout: null,
    },
    // Phòng khám-------------------------------------------------------------------------------------------
    {
        path: '/system/admin/clinic', // Quản lí Phòng khám
        component: ClinicManage,
        layout: null,
    },
    {
        path: '/system/admin/create-clinic', // Tạo Phòng khám
        component: ClinicCreate,
        layout: null,
    },
    {
        path: '/system/admin/update-clinic/:clinicId', // Chỉnh sửa Phòng khám
        component: ClinicUpdate,
        layout: null,
    },
    // Bài viết-------------------------------------------------------------------------------------------
    {
        path: '/system/admin/handbook',
        component: HandbookManage,
        layout: null,
    },

    {
        path: '/system/admin/confirm-booking',
        component: BookingManageAdmin,
        layout: null,
    },

    // doctor mới vào được
    {
        path: '/system/doctor/booking',
        component: BookingManageDoctor,
        layout: null,
    },
    {
        path: '/system/doctor/patient-examined',
        component: PatientExamined,
        layout: null,
    },
    {
        path: '/system/doctor/schedule',
        component: ScheduleManage,
        layout: null,
    },
    {
        path: '/system/doctor/update-info',
        component: UpdateInfo,
        layout: null,
    },
    {
        path: '/system/doctor/update-profile',
        component: UpdateProfile,
        layout: null,
    },
];

export { publicRoutes, privateRoutes };
