import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import styles from '~/components/Button/Button.module.scss';
import images from '~/assets/images';
const cx = classNames.bind(styles);
function Button({
    children,
    href,
    to,
    small = false,
    medium = false,
    large = false,
    primary = false,
    outline = false,
    rounded = false,
    leftIcon,
    rightIcon,
    disable = false,
    className,
    onClick,
    ...passProps
}) {
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
        primary,
        outline,
        rounded,
        small,
        medium,
        large,
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

export default Button;
