import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import styles from './MenuItem.module.scss';
const cx = classNames.bind(styles);
function MenuItem({ children, href, to, leftIcon, rightIcon, disable = false, className, onClick, ...passProps }) {
    let Comp = 'button';
    const props = { ...passProps, onClick };
    if (href) {
        props.href = href;
        Comp = 'a';
    } else if (to) {
        props.to = to;
        Comp = Link;
    }
    const classes = cx('wrapper', {
        [className]: className,
        disable,
    });
    if (disable) {
        Object.keys(props).forEach((key) => {
            if (key.startsWith('on') && typeof props[key] === 'function') delete props[key];
        });
    }
    return (
        <Comp {...props} className={classes}>
            {leftIcon && <span className={cx('icon')}>{leftIcon}</span>}
            <span className={cx('title')}>{children}</span>
            {rightIcon && <span className={cx('icon')}>{rightIcon}</span>}
        </Comp>
    );
}

export default MenuItem;
