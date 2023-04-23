import { useState } from 'react';
import Slider from 'react-slick';
import classNames from 'classnames/bind';
import SliderItem from './SliderItem';
import Button from '~/components/Button';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import style from './SliderSimple.module.scss';
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
        autoplay: 4000,
        autoplaySpeed: 5000,
        pauseOnHover: true,
        infinite: true,
        dots: true,
        speed: 500,
    };
    return (
        <div className={classes}>
            <div className="indented">
                <div className={cx('container')}>
                    <div className={cx('header')}>
                        <h1 className={cx('title')}>{title}</h1>
                        <Button to={linkMoreBtn} className={cx('more-button')}>
                            {textMoreButton}
                        </Button>
                    </div>
                    <div className={cx('content')}>
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
                                            to={item.to}
                                            image={item.image}
                                            // onClick={(e) => {
                                            //     dragging && e.preventDefault();
                                            // }}
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
        </div>
    );
}

export default SliderSimple;
