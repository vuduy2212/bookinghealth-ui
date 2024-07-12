import React, { useState } from 'react';
import classNames from 'classnames/bind';
import { useSelector } from 'react-redux';
import {
    BiArrowFromRight,
    BiArrowToRight,
    BiBook,
    BiBookOpen,
    BiBroadcast,
    BiCart,
    BiChevronRight,
    BiDockTop,
    BiDotsHorizontal,
    BiEditAlt,
    BiGrid,
    BiGridAlt,
    BiGridSmall,
    BiHelpCircle,
    BiHistory,
    BiLogOutCircle,
    BiMenu,
    BiPlusMedical,
    BiRightArrow,
    BiUser,
} from 'react-icons/bi';
import { BsDot, BsFillHospitalFill } from 'react-icons/bs';
import styles from './SideBarSystem.module.scss';
import CommonUtils from '~/utils/CommonUtils';
import images from '~/assets/images';
import Image from '~/components/Image';
import { Link } from 'react-router-dom';
import Button from '~/components/Button';
import { AiOutlineAlignRight, AiOutlineRight } from 'react-icons/ai';
const cx = classNames.bind(styles);
function SideBarSystem({
    home = false,
    clinic = false,
    specialist = false,
    userPage = false,
    handbook = false,
    shop = false,
}) {
    const [isOpenMenuUser, setIsOpenMenuUser] = useState(false);
    const currentUser = useSelector((state) => state.auth.login.currentUser);
    return (
        <div className={cx('container')}>
            <div className={cx('info-box')}>
                <div className={cx('avatar')}>
                    <Image
                        className={cx('avatar')}
                        src={CommonUtils.toFileFromBase64(currentUser.image)}
                        fallback={images.noImage}
                        alt="avatar"
                    ></Image>
                </div>
                <div className={cx('info')}>
                    <span className={cx('info-name')}>{currentUser.lastName + ' ' + currentUser.firstName}</span>
                    <span className={cx('info-role')}>{currentUser.roleId == 'R1' ? 'Quản trị viên' : ''}</span>
                </div>
            </div>
            <Button
                leftIcon={<BiGridAlt />}
                className={cx('button-sidebar')}
                style={{
                    backgroundColor: home ? '#4b49ac' : '',
                    color: home ? 'white' : '',
                }}
                to={'/system/admin/dashboard'}
            >
                Trang chủ
            </Button>
            <Button
                leftIcon={<BsFillHospitalFill />}
                className={cx('button-sidebar')}
                style={{
                    backgroundColor: clinic ? '#4b49ac' : '',
                    color: clinic ? 'white' : '',
                }}
                to={'/system/admin/clinic'}
            >
                Quản lí phòng khám
            </Button>
            <Button
                leftIcon={<BiPlusMedical />}
                className={cx('button-sidebar')}
                style={{
                    backgroundColor: specialist ? '#4b49ac' : '',
                    color: specialist ? 'white' : '',
                }}
                to={'/system/admin/specialist'}
            >
                Chuyên khoa
            </Button>
            <Button
                leftIcon={<BiUser />}
                rightIcon={<AiOutlineRight className={cx('arrow-right')} />}
                className={cx('button-sidebar')}
                onClick={() => setIsOpenMenuUser(!isOpenMenuUser)}
                style={{
                    backgroundColor: userPage ? '#4b49ac' : '',
                    color: userPage ? 'white' : '',
                }}
            >
                <span className={cx('button-sidebar-title')}>Người dùng</span>
            </Button>
            {isOpenMenuUser && (
                <div className={cx('menu-two-user')}>
                    <Button leftIcon={<BsDot />} className={cx('button-sidebar')} to={'/system/admin/patient-manage'}>
                        Quản lí bệnh nhân
                    </Button>
                    <Button leftIcon={<BsDot />} className={cx('button-sidebar')} to={'/system/admin/doctor-manage'}>
                        Quản lí bác sĩ
                    </Button>
                </div>
            )}
            <Button
                leftIcon={<BiBookOpen />}
                className={cx('button-sidebar')}
                style={{
                    backgroundColor: handbook ? '#4b49ac' : '',
                    color: handbook ? 'white' : '',
                }}
            >
                bài viết
            </Button>
            <Button
                leftIcon={<BiCart />}
                className={cx('button-sidebar')}
                style={{
                    backgroundColor: shop ? '#4b49ac' : '',
                    color: shop ? 'white' : '',
                }}
            >
                Thiết bị y tế
            </Button>
        </div>
    );
}

export default SideBarSystem;
