import classNames from 'classnames/bind';
import React, { useEffect, useLayoutEffect, useState } from 'react';
import moment from 'moment/moment';
import localization from 'moment/locale/vi';
import axios from 'axios';
// -----------------------------------

import style from './ScheduleDoctor.module.scss';
import { BiCalendar, BiMouse, BiPointer } from 'react-icons/bi';
import { FaCalendar, FaMousePointer, FaRegHandPointUp } from 'react-icons/fa';
import Button from '../Button';
import { MdAdsClick } from 'react-icons/md';
const cx = classNames.bind(style);
function ScheduleDoctor({ id }) {
    const [arrDate, setArrDate] = useState([]);
    const [arrTime, setArrTime] = useState([]);
    const [date, setDate] = useState(moment(new Date()).startOf('day').valueOf());
    const handleChangeDate = async (e) => {
        setDate(e.target.value);
        const response = await axios.get(`/api/doctor/get-schedule-one-date/${id}/${e.target.value}`);
        const data = response.data;
        setArrTime(data);
    };
    useLayoutEffect(() => {
        const arrDate = [];
        for (let i = 0; i < 7; i++) {
            let object = {};
            if (i == 0) {
                object.label = 'Hôm nay - ' + moment(new Date()).add(i, 'days').format('DD/MM');
            } else {
                object.label = moment(new Date()).add(i, 'days').format('dddd - DD/MM');
            }
            object.value = moment(new Date()).add(i, 'days').startOf('day').valueOf();
            arrDate.push(object);
        }
        setArrDate(arrDate);
    }, []);
    useEffect(() => {
        const getDataToday = async () => {
            const response = await axios.get(`/api/doctor/get-schedule-one-date/${id}/${date}`);
            const data = response.data;
            setArrTime(data);
        };
        getDataToday();
    }, []);
    function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
    return (
        <div className={cx('wrapper')}>
            <div className={cx('date-container')}>
                <select className={cx('select-date')} value={date} onChange={(e) => handleChangeDate(e)}>
                    {arrDate.map((item, index) => {
                        return (
                            <option key={index} value={item.value}>
                                {item.label}
                            </option>
                        );
                    })}
                </select>
            </div>
            <span className={cx('title-schedule')}>
                <BiCalendar className={cx('icon-calendar')}></BiCalendar>
                LỊCH KHÁM
            </span>
            <div className={cx('schedule-time')}>
                {arrTime.length > 0 ? (
                    arrTime.map((item) => {
                        return (
                            <Button
                                to={`/booking/${item.doctorId}/${date}/${item.timeType}`}
                                className={cx('schedule-time-item')}
                                key={item.id}
                            >
                                {item.timeTypeData.value}
                            </Button>
                        );
                    })
                ) : (
                    <span className={cx('no-time-title')}>
                        Bác sĩ không có lịch khám ngày:{' '}
                        {capitalizeFirstLetter(moment.unix(date / 1000).format('dddd - DD/MM'))}
                        <br />
                        Vui lòng chọn ngày khác !
                    </span>
                )}
            </div>
            <span className={cx('instruct-title')}>
                Chọn <FaRegHandPointUp /> và đặt (Phí đặt lịch 0đ)
            </span>
        </div>
    );
}

export default ScheduleDoctor;
