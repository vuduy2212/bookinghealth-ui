import classNames from 'classnames/bind';
import style from './MenuBanner.module.scss';
import MenuBannerItem from './MenuBannerItem';
const cx = classNames.bind(style);
function MenuBanner({ data }) {
    return (
        <div className={cx('wrapper')}>
            {data.map((item, index) => {
                return (
                    <MenuBannerItem
                        logo={item.logo}
                        title1={item.title1}
                        title2={item.title2}
                        to={item.to}
                        key={index}
                    />
                );
            })}
        </div>
    );
}

export default MenuBanner;
