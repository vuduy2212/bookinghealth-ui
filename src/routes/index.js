import Home from '~/pages/UserPages/Home';
import Handbook from '~/pages/UserPages/Handbook';
import { DefaultLayout, DefaultLayoutLite, DoctorLayout, AdminLayout } from '~/components/Layouts';
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
import AdminHomePage from '~/pages/AdminPages/AdminHomePage/AdminHomePage';
import NewClinicManage from '~/pages/AdminPages/NewClinicManage';
import ClinicUpdateByADClinic from '~/pages/AdminClinicPage/ClinicUpdateByADClinic';
import DoctorManageByAdmin from '~/pages/AdminClinicPage/DoctorManageByAdmin';
import CreateDoctorAccount from '~/pages/AdminClinicPage/DoctorManageByAdmin/CreateDoctorAccount';
import MedicationManage from '~/pages/AdminClinicPage/MedicationManage';
import ChangePassword from '~/pages/UserPages/ChangePassword';
import AllSpecialist from '~/pages/UserPages/AllSpecialist';
import AllClinic from '~/pages/UserPages/AllClinic';
import AllDoctor from '~/pages/UserPages/AllDoctor';
import NewBookingManage from '~/pages/AdminClinicPage/NewBookingManage';
import ExaminedPatient from '~/pages/UserPages/ExaminedPatient';
import AdminClinicHomePage from '~/pages/AdminClinicPage/AdminClinicHomePage';

// PublicRoutes: không cần đăng nhập, vẫn vào được
const publicRoutes = [
    {
        path: '/',
        component: Home,
        layout: DefaultLayout,
    },
    {
        path: '/all-specialist',
        component: AllSpecialist,
        layout: DefaultLayoutLite,
    },
    {
        path: '/all-clinic',
        component: AllClinic,
        layout: DefaultLayoutLite,
    },
    {
        path: '/all-doctor',
        component: AllDoctor,
        layout: DefaultLayoutLite,
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
        path: '/booking-history', // Lịch sử khám bệnh của bệnh nhân
        component: ExaminedHistory,
        layout: DefaultLayoutLite,
    },
    {
        path: '/examined-history', // Lịch sử khám bệnh của bệnh nhân
        component: ExaminedPatient,
        layout: DefaultLayoutLite,
    },

    // admin mới vào được

    {
        path: '/system/admin/dashboard', // Trang home của admin
        component: AdminHomePage,
        layout: null,
    },

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
        component: NewClinicManage,
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

    /// Admin Clinic mới vào được
    {
        path: '/system/admin-clinic/dashboard', // Chỉnh sửa Phòng khám
        component: AdminClinicHomePage,
        layout: null,
    },
    {
        path: '/system/admin-clinic/update-clinic', // Chỉnh sửa Phòng khám
        component: ClinicUpdateByADClinic,
        layout: null,
    },
    {
        path: '/system/admin-clinic/doctor-manage', // Chỉnh sửa bác sĩ
        component: DoctorManageByAdmin,
        layout: null,
    },
    {
        path: '/system/admin-clinic/medication-manage', // Quản lí thuocs
        component: MedicationManage,
        layout: null,
    },
    {
        path: '/system/admin-clinic/create-doctor-account', // Chỉnh sửa Phòng khám
        component: CreateDoctorAccount,
        layout: null,
    },
    {
        path: '/change-password', // Thay đổi mật khẩu
        component: ChangePassword,
        layout: null,
    },
    {
        path: '/system/admin-clinic/new-booking', // Thay đổi mật khẩu
        component: NewBookingManage,
        layout: null,
    },
];

export { publicRoutes, privateRoutes };
