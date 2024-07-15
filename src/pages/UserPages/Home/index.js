import Banner from './Banner';
import SliderSimple from '~/components/SliderSimple';

import classNames from 'classnames/bind';
import styles from './Home.module.scss';
import { useSelector } from 'react-redux';
import {
    DATA_SLIDER_CHUYENKHOAPHOBIEN,
    DATA_SLIDER_COSOYTENOIBAT,
    DATA_SLIDER_BACSYNOIBAT,
    DATA_SLIDER_CAMNANG,
} from './dataExample';
import { useEffect, useLayoutEffect, useState } from 'react';
import dataHomePage from './apiRequestHomePage';
import { Puff } from 'react-loading-icons';
import { AiOutlineLoading, AiOutlineLoading3Quarters } from 'react-icons/ai';
import { FaTruckLoading } from 'react-icons/fa';
import TailSpin from 'react-loading-icons/dist/esm/components/tail-spin';
import { BrowserRouter as Router, Route, Switch, useLocation, useHistory } from 'react-router-dom';
const cx = classNames.bind(styles);
function Home() {
    const user = useSelector((state) => state.auth.login.currentUser);
    const [dataTopDoctor, setDataTopDoctor] = useState([]);
    const [dataTopSpecialist, setDataTopSpecialist] = useState([]);
    const [dataTopClinic, setDataTopClinic] = useState([]);
    const [loading, setLoading] = useState(false);

    /// fix cuộn lên đầu
    const ScrollToTop = () => {
        const { pathname } = useLocation();

        useEffect(() => {
            window.scrollTo(0, 0); // Cuộn lên đầu trang khi chuyển đổi route
        }, [pathname]);

        return null;
    };
    //
    useEffect(() => {
        window.scrollTo(0, 0);
        const getDataDoctorHome = async () => {
            setLoading(false);
            const dataTopDoctorHome = await dataHomePage.topDoctorHome(8);
            const dataTopSpecialistHome = await dataHomePage.topSpecialistHome(8);
            const dataTopClinicHome = await dataHomePage.topClinicHome(4);
            setDataTopDoctor(dataTopDoctorHome);
            setDataTopSpecialist(dataTopSpecialistHome);
            setDataTopClinic(dataTopClinicHome);
            setLoading(false);
        };
        getDataDoctorHome();
    }, []);

    return (
        <div className={cx('wrapper')}>
            {loading ? (
                <div
                    className={cx('loader-container', {
                        active: loading,
                    })}
                >
                    <div className={cx('spinner')}></div>
                </div>
            ) : (
                <></>
            )}
            <Banner />
            <SliderSimple
                title="Chuyên khoa khám bệnh"
                textMoreButton="Xem thêm"
                white
                data={dataTopSpecialist}
                linkMoreBtn="/all-specialist"
            />
            <SliderSimple
                clinicSlider
                paddingImg
                title="Cơ sở y tế "
                textMoreButton="Tìm kiếm"
                grey
                data={dataTopClinic}
                linkMoreBtn="/all-clinic"
            />

            <SliderSimple
                title="Bác sĩ"
                textMoreButton="Tìm kiếm"
                white
                data={dataTopDoctor}
                docterSlider
                linkMoreBtn="/all-doctor"
            />
            <SliderSimple
                title="Cẩm nang"
                textMoreButton="Tất cả bài viết"
                grey
                data={DATA_SLIDER_CAMNANG}
                handbookSlider
                linkMoreBtn="/xemthem"
            />
        </div>
    );
}

export default Home;
