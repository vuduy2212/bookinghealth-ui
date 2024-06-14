import classNames from 'classnames/bind';
import Tippy from '@tippyjs/react/headless';

import styles from './Menu.module.scss';
import { WrapperPopper } from '~/components/Popper';
import MenuItem from './MenuItem';
import { Fragment, useState } from 'react';
import Header from './Header';

const cx = classNames.bind(styles);
function Menu({ data = [], children, placement = 'bottom-end', offset = [18, 8], small = false, delayMenu = [0, 50] }) {
    const handleOnClick = (item) => {
        if (!!item.children) {
            setMenuList((prev) => [...prev, item.children]);
        }
    };
    const onBack = () => {
        setMenuList((prev) => prev.slice(0, prev.length - 1));
    };
    const [menuList, setMenuList] = useState([{ data }]);
    const current = menuList[menuList.length - 1];
    const renderItem = () => {
        return (
            <Fragment>
                {!!(menuList.length > 1) && (
                    <Header headerTitle={menuList[menuList.length - 1].titleHeader} onBack={onBack}></Header>
                )}
                {current.data.map((item, index) => {
                    return (
                        <MenuItem
                            key={index}
                            data={item}
                            onClick={() => {
                                if (item.onClick) {
                                    item.onClick();
                                }
                                handleOnClick(item);
                            }}
                        ></MenuItem>
                    );
                })}
            </Fragment>
        );
    };
    return (
        <Tippy
            offset={offset}
            delay={delayMenu}
            placement={placement}
            interactive
            trigger="click"
            render={(attrs) => (
                <div className={cx('wrapper')} tabIndex="-1" {...attrs}>
                    <WrapperPopper small={small}>{renderItem()}</WrapperPopper>
                </div>
            )}
            onHide={() => setMenuList((prev) => prev.slice(0, 1))}
        >
            {children}
        </Tippy>
    );
}

export default Menu;
