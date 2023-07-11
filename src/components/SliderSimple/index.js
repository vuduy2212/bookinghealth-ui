import { useState } from 'react';
import Slider from 'react-slick';
import classNames from 'classnames/bind';
import SliderItem from './SliderItem';
import Button from '~/components/Button';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import style from './SliderSimple.module.scss';
import { Col } from 'react-bootstrap';
const cx = classNames.bind(style);

function SliderSimple({
    title,
    textMoreButton,
    data = [],
    grey = false,
    white = true,
    paddingImg = false,
    docterSlider = false,
    handbookSlider = false,
    linkMoreBtn,
    ...props
}) {
    const [location, setLocation] = useState({
        clientXonMouseDown: null,
        clientYonMouseDown: null,
    });
    const handleOnMouseDown = (e) => {
        setLocation({
            clientXonMouseDown: e.clientX,
            clientYonMouseDown: e.clientY,
        });
    };

    const handleOnClick = (e) => {
        e.stopPropagation();
        if (location.clientXonMouseDown !== e.clientX || location.clientYonMouseDown !== e.clientY) {
            e.preventDefault();
        }
    };
    const classes = cx('wrapper', {
        grey,
        white,
    });

    const settings = {
        slidesToShow: handbookSlider ? 2 : 4,
        slidesToScroll: handbookSlider ? 2 : 4,
        autoplay: true,
        autoplaySpeed: 5000,
        pauseOnHover: true,
        infinite: true,
        dots: true,
        speed: 500,
        responsive: [
            {
                breakpoint: 1199,
                settings: {
                    slidesToShow: handbookSlider ? 1 : 4,
                    slidesToScroll: handbookSlider ? 1 : 4,
                    infinite: true,
                    dots: true,
                },
            },
            {
                breakpoint: 991,
                settings: {
                    slidesToShow: handbookSlider ? 1 : 3,
                    slidesToScroll: handbookSlider ? 1 : 3,
                    infinite: true,
                    dots: true,
                },
            },
            {
                breakpoint: 767,
                settings: {
                    slidesToShow: handbookSlider ? 1 : 2,
                    slidesToScroll: handbookSlider ? 1 : 2,
                    infinite: true,
                    dots: false,
                },
            },
        ],
    };

    return (
        <div className={classes}>
            <div className="container-md">
                <div className={cx('header', 'row', 'pt-0', 'pb-md-5')}>
                    <h1 className={cx('title', 'col-8')}>{title}</h1>
                    <div className="col-4" style={{ textAlign: 'end', position: 'relative' }}>
                        <Button to={linkMoreBtn} className={cx('more-button')}>
                            {textMoreButton}
                        </Button>
                    </div>
                </div>
                <div className={cx('content', 'row')}>
                    <Slider {...settings}>
                        {data.map((item, index) => {
                            return (
                                <div key={index}>
                                    <SliderItem
                                        docterSlider={docterSlider}
                                        handbookSlider={handbookSlider}
                                        paddingImg={paddingImg}
                                        title={item.title}
                                        title2={item.title2}
                                        title3={item.title3}
                                        title4={item.title4}
                                        to={item.to}
                                        image={item.image}
                                        onMouseDown={(e) => handleOnMouseDown(e)}
                                        onClick={(e) => handleOnClick(e)}
                                    />
                                </div>
                            );
                        })}
                    </Slider>
                </div>
            </div>
        </div>
    );
}

export default SliderSimple;
