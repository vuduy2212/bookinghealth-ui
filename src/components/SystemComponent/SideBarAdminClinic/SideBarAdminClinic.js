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
    BiPhone,
    BiPlusMedical,
    BiRightArrow,
    BiUser,
} from 'react-icons/bi';
import { BsDot, BsFillHospitalFill } from 'react-icons/bs';
import styles from './SideBarAdminClinic.module.scss';
import CommonUtils from '~/utils/CommonUtils';
import images from '~/assets/images';
import Image from '~/components/Image';
import { Link } from 'react-router-dom';
import Button from '~/components/Button';
import { AiOutlineAlignRight, AiOutlineRight } from 'react-icons/ai';
const cx = classNames.bind(styles);
function SideBarAdminClinic({
    home = false,
    doctor = false,
    clinic = false,
    medication = false,
    handbook = false,
    shop = false,
    booking = false,
}) {
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
                    <span className={cx('info-role')}>
                        {currentUser.roleId == 'R4' ? 'Hỗ trợ viên phòng khám' : ''}
                    </span>
                </div>
            </div>
            <Button
                leftIcon={<BiGridAlt />}
                className={cx('button-sidebar')}
                style={{
                    backgroundColor: home ? '#4b49ac' : '',
                    color: home ? 'white' : '',
                }}
                to={'/system/admin-clinic/dashboard'}
            >
                Trang chủ
            </Button>
            <Button
                leftIcon={<BiPhone />}
                className={cx('button-sidebar')}
                to={'/system/admin-clinic/new-booking'}
                style={{
                    backgroundColor: booking ? '#4b49ac' : '',
                    color: booking ? 'white' : '',
                }}
            >
                Lịch hẹn mới
            </Button>
            <Button
                leftIcon={<BiUser />}
                className={cx('button-sidebar')}
                to={'/system/admin-clinic/doctor-manage'}
                style={{
                    backgroundColor: doctor ? '#4b49ac' : '',
                    color: doctor ? 'white' : '',
                }}
            >
                Quản lí bác sĩ
            </Button>
            <Button
                leftIcon={<BsFillHospitalFill />}
                className={cx('button-sidebar')}
                style={{
                    backgroundColor: clinic ? '#4b49ac' : '',
                    color: clinic ? 'white' : '',
                }}
                to={'/system/admin-clinic/update-clinic'}
            >
                Thông tin phòng khám
            </Button>
            <Button
                leftIcon={<BiPlusMedical />}
                className={cx('button-sidebar')}
                style={{
                    backgroundColor: medication ? '#4b49ac' : '',
                    color: medication ? 'white' : '',
                }}
                to={'/system/admin-clinic/medication-manage'}
            >
                Quản lý thuốc men
            </Button>

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

export default SideBarAdminClinic;
