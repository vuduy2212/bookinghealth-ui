import classNames from 'classnames/bind';
import style from './SliderItem.module.scss';
import { Link } from 'react-router-dom';
import LazyBackground from '~/components/LazyBackground';
const cx = classNames.bind(style);
function SliderItem({
    to,
    image,
    title,
    paddingImg,
    docterSlider = false,
    handbookSlider = false,
    clinicSlider = false,
    title2,
    title3,
    title4,
    onClick,
    ...props
}) {
    //const textTitle = title ? `${title} ${!!title2 ? title2 : ''}`;
    return (
        <Link
            draggable="false"
            onClick={onClick}
            to={to}
            className={cx('wrapper', {
                docterSlider,
                handbookSlider,
                clinicSlider,
            })}
            {...props}
        >
            <LazyBackground
                src={image}
                className={cx('image-container', {
                    paddingImg,
                })}
            />

            {title && <h3 className={cx('title')}>{title}</h3>}
            {title2 && <h3 className={cx('title')}>{title2}</h3>}
            {title3 && <h4 className={cx('decs')}>{title3}</h4>}
            {title4 && <h4 className={cx('decs')}>{title4}</h4>}
        </Link>
    );
}

export default SliderItem;
