import { Link } from 'react-router-dom';
import classNames from 'classnames/bind';
import style from './SliderItem.module.scss';
import images from '~/assets/images';
const cx = classNames.bind(style);
function SliderItem({ to, image, title }) {
    return (
        <div to={to} className={cx('wrapper')}>
            <img src={image} className={cx('image')} alt="anh"></img>
            <h3 className={cx('title')}>{title}</h3>
        </div>
    );
}

export default SliderItem;
