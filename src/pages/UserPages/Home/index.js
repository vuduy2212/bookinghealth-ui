import Banner from './Banner';
import SliderSimple from '~/components/SliderSimple';
import { useSelector } from 'react-redux';
import {
    DATA_SLIDER_CHUYENKHOAPHOBIEN,
    DATA_SLIDER_COSOYTENOIBAT,
    DATA_SLIDER_BACSYNOIBAT,
    DATA_SLIDER_CAMNANG,
} from './dataExample';
import { useEffect, useLayoutEffect, useState } from 'react';
import dataHomePage from './apiRequestHomePage';
function Home() {
    const user = useSelector((state) => state.auth.login.currentUser);
    const [dataTopDoctor, setDataTopDoctor] = useState([]);
    useEffect(() => {
        const getDataDoctorHome = async () => {
            setDataTopDoctor(await dataHomePage.topDoctorHome(8));
        };
        getDataDoctorHome();
    }, []);
    return (
        <div>
            <Banner />
            <SliderSimple
                title="Chuyên khoa phổ biến"
                textMoreButton="Xem thêm"
                white
                data={DATA_SLIDER_CHUYENKHOAPHOBIEN}
                linkMoreBtn="/xemthem"
            />
            <SliderSimple
                paddingImg
                title="Cơ sở y tế nổi bật"
                textMoreButton="Tìm kiếm"
                grey
                data={DATA_SLIDER_COSOYTENOIBAT}
                linkMoreBtn="/xemthem"
            />
            <SliderSimple
                title="Bác sĩ nổi bật tuần qua"
                textMoreButton="Tìm kiếm"
                white
                data={dataTopDoctor}
                docterSlider
                linkMoreBtn="/xemthem"
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
