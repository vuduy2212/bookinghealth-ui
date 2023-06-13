import classNames from 'classnames/bind';
import styles from './Menu.module.scss';
import Button from '~/components/Button';
const cx = classNames.bind(styles);
const emptyFunction = () => {};
function MenuItem({ data, onClick = emptyFunction }) {
    const classes = cx('item', { separate: data.separat });
    return (
        <Button leftIcon={data.icon} to={data.to} className={classes} onClick={() => onClick()}>
            {data.title}
        </Button>
    );
}

export default MenuItem;
