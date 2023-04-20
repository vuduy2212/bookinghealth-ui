import Slider from 'react-slick';
import classNames from 'classnames/bind';
import style from './SliderSimple.module.scss';
import SliderItem from './SliderItem';
import Button from '~/components/Button';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
const cx = classNames.bind(style);
function SliderSimple({ title, textMoreButton, data = [], grey = false, white = true }) {
    const classes = cx('wrapper', {
        grey,
        white,
    });
    const settings = {
        slidesToShow: 4,
        slidesToScroll: 4,
        autoplay: true,
        autoplaySpeed: 5000,
        pauseOnHover: true,
    };
    return (
        <div className={classes}>
            <div className="indented">
                <div className={cx('container')}>
                    <div className={cx('header')}>
                        <h1 className={cx('title')}>{title}</h1>
                        <Button className={cx('more-button')}>{textMoreButton}</Button>
                    </div>
                    <div className={cx('content')}>
                        <Slider {...settings}>
                            {data.map((item, index) => {
                                return (
                                    <div key={index}>
                                        <SliderItem title={item.title} to={item.to} image={item.image} />
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
