import images from '~/assets/images';
import Banner from './Banner';
import SliderSimple from '~/components/SliderSimple';
const DATA_SLIDER_CHUYENKHOAPHOBIEN = [
    {
        title: 'Cơ xương khớp',
        image: images.chuyenKhoaPhoBien.coXuongKhop,
        to: './co-xuong-khop',
    },
    {
        title: 'Cơ xương khớp',
        image: images.chuyenKhoaPhoBien.coXuongKhop,
        to: './co-xuong-khop',
    },
    {
        title: 'Cơ xương khớp',
        image: images.chuyenKhoaPhoBien.coXuongKhop,
        to: './co-xuong-khop',
    },
    {
        title: 'Cơ xương khớp',
        image: images.chuyenKhoaPhoBien.coXuongKhop,
        to: './co-xuong-khop',
    },
    {
        title: 'Cơ xương khớp',
        image: images.chuyenKhoaPhoBien.coXuongKhop,
        to: './co-xuong-khop',
    },
];
const DATA_SLIDER_COSOYTENOIBAT = [
    {
        title: 'Bệnh viện Hữu Nghị Việt Đức',
        image: images.cosoytenoibat.benhvienvietduc,
        to: './benh-vien-viet-duc',
    },
    {
        title: 'Bệnh viện Hữu Nghị Việt Đức',
        image: images.cosoytenoibat.benhvienvietduc,
        to: './benh-vien-viet-duc',
    },
    {
        title: 'Bệnh viện Hữu Nghị Việt Đức',
        image: images.cosoytenoibat.benhvienvietduc,
        to: './benh-vien-viet-duc',
    },
    {
        title: 'Bệnh viện Hữu Nghị Việt Đức',
        image: images.cosoytenoibat.benhvienvietduc,
        to: './benh-vien-viet-duc',
    },
    {
        title: 'Bệnh viện Hữu Nghị Việt Đức',
        image: images.cosoytenoibat.benhvienvietduc,
        to: './benh-vien-viet-duc',
    },
    {
        title: 'Bệnh viện Hữu Nghị Việt Đức',
        image: images.cosoytenoibat.benhvienvietduc,
        to: './benh-vien-viet-duc',
    },
    {
        title: 'Bệnh viện Hữu Nghị Việt Đức',
        image: images.cosoytenoibat.benhvienvietduc,
        to: './benh-vien-viet-duc',
    },
];
const DATA_SLIDER_BACSYNOIBAT = [
    {
        title: 'Nguyễn Duy Hưng - Da liễu',
        image: images.basinoibat.bacsytrung,
        to: './benh-vien-viet-duc',
    },
    {
        title: 'Nguyễn Duy Hưng - Da liễu',
        image: images.basinoibat.bacsytrung,
        to: './benh-vien-viet-duc',
    },
    {
        title: 'Nguyễn Duy Hưng - Da liễu',
        image: images.basinoibat.bacsytrung,
        to: './benh-vien-viet-duc',
    },
    {
        title: 'Nguyễn Duy Hưng - Da liễu',
        image: images.basinoibat.bacsytrung,
        to: './benh-vien-viet-duc',
    },
    {
        title: 'Nguyễn Duy Hưng - Da liễu',
        image: images.basinoibat.bacsytrung,
        to: './benh-vien-viet-duc',
    },
    {
        title: 'Nguyễn Duy Hưng - Da liễu',
        image: images.basinoibat.bacsytrung,
        to: './benh-vien-viet-duc',
    },
    {
        title: 'Nguyễn Duy Hưng - Da liễu',
        image: images.basinoibat.bacsytrung,
        to: './benh-vien-viet-duc',
    },
    {
        title: 'Nguyễn Duy Hưng - Da liễu',
        image: images.basinoibat.bacsytrung,
        to: './benh-vien-viet-duc',
    },
];
const DATA_SLIDER_CAMNANG = [
    {
        title: 'Mụn viêm là gì? Cách trị mụn viêm sưng to',
        image: images.camnang.mun,
        to: './benh-vien-viet-duc',
    },
    {
        title: 'Mụn viêm là gì? Cách trị mụn viêm sưng to',
        image: images.camnang.mun,
        to: './benh-vien-viet-duc',
    },
    {
        title: 'Mụn viêm là gì? Cách trị mụn viêm sưng to',
        image: images.camnang.mun,
        to: './benh-vien-viet-duc',
    },
    {
        title: 'Mụn viêm là gì? Cách trị mụn viêm sưng to',
        image: images.camnang.mun,
        to: './benh-vien-viet-duc',
    },
    {
        title: 'Mụn viêm là gì? Cách trị mụn viêm sưng to',
        image: images.camnang.mun,
        to: './benh-vien-viet-duc',
    },
    {
        title: 'Mụn viêm là gì? Cách trị mụn viêm sưng to',
        image: images.camnang.mun,
        to: './benh-vien-viet-duc',
    },
    {
        title: 'Mụn viêm là gì? Cách trị mụn viêm sưng to',
        image: images.camnang.mun,
        to: './benh-vien-viet-duc',
    },
    {
        title: 'Mụn viêm là gì? Cách trị mụn viêm sưng to',
        image: images.camnang.mun,
        to: './benh-vien-viet-duc',
    },
];
function Home() {
    return (
        <div>
            <Banner />
            <SliderSimple
                title="Chuyên khoa phổ biến"
                textMoreButton="Xem thêm"
                white
                data={DATA_SLIDER_CHUYENKHOAPHOBIEN}
            />
            <SliderSimple title="Cơ sở y tế nổi bật" textMoreButton="Tìm kiếm" grey data={DATA_SLIDER_COSOYTENOIBAT} />
            <SliderSimple
                title="Bác sĩ nổi bật tuần qua"
                textMoreButton="Tìm kiếm"
                white
                data={DATA_SLIDER_BACSYNOIBAT}
            />
            <SliderSimple title="Cẩm nang" textMoreButton="Tất cả bài viết" grey data={DATA_SLIDER_CAMNANG} />
        </div>
    );
}

export default Home;
