import classNames from 'classnames/bind';
import style from './Banner.module.scss';
import Search from './Search';
import MenuBanner from './MenuBanner';
import images from '~/assets/images';
const cx = classNames.bind(style);
const MENU_LIST_DATA = [
    { logo: images.khamchuyenkhoa, title1: 'Khám', title2: 'chuyên khoa', to: '/chuyenkhoa' },
    { logo: images.khamtuxa, title1: 'Khám', title2: 'Từ xa', to: '/tuxa' },
    { logo: images.khamtongquat, title1: 'Khám', title2: 'tổng quát', to: '/tongquat' },
    { logo: images.xetnghiemyhoc, title1: 'Xét nghiệm', title2: 'y học', to: '/xet-nghiem-y-hoc' },
    { logo: images.suckhoetinhthan, title1: 'Sức khỏe', title2: 'tinh thần', to: '/suc-khoe-tinh-than' },
    { logo: images.khamnhakhoa, title1: 'Khám', title2: 'nha khoa', to: '/nhakhoa' },
    { logo: images.goiphauthuat, title1: 'Gói', title2: 'phẫu thuật', to: '/goi-phau-thuat' },
    { logo: images.sanphamyte, title1: 'Sản phẩm', title2: 'y tế', to: '/san-pham-y-te' },
    { logo: images.baitestsuckhoe, title1: 'Bài test', title2: 'sưc khỏe', to: '/bai-test' },
];
function Banner() {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('wrapper-top')}>
                <div className="container">
                    <div className={cx('banner-top')}>
                        <h1 className={cx('title1')}>NỀN TẢNG Y TẾ</h1>
                        <h1 className={cx('title2')}>CHĂM SÓC SỨC KHỎE TOÀN DIỆN</h1>
                        <Search />
                    </div>
                </div>
            </div>
            <div className={cx('wrapper-bottom')}>
                {/* <div className="container"> */}
                <MenuBanner data={MENU_LIST_DATA} />
                {/* </div> */}
            </div>
        </div>
    );
}

export default Banner;
