import React, { useState, useEffect, useCallback } from 'react';
import classNames from 'classnames/bind';
import styles from './AllDoctor.module.scss';
import { Link } from 'react-router-dom';
import axios from 'axios';
import LazyImage from '~/components/LazyImage';
import CommonUtils from '~/utils/CommonUtils';
import _ from 'lodash';

const cx = classNames.bind(styles);

const AllDoctor = () => {
    const [doctors, setDoctors] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredDoctors, setFilteredDoctors] = useState([]);
    const apiUrl = '/api/doctor/get-all-doctor'; // Địa chỉ API của bạn

    useEffect(() => {
        const fetchDoctors = async () => {
            try {
                const response = await axios.get(apiUrl);
                setDoctors(response.data);
                setFilteredDoctors(response.data);
            } catch (error) {
                console.error('Error fetching doctors:', error);
            }
        };

        fetchDoctors();
    }, []);

    const filterDoctors = (term) => {
        const filtered = doctors.filter((doctor) =>
            `${doctor.lastName} ${doctor.firstName}`.toLowerCase().includes(term.toLowerCase()),
        );
        setFilteredDoctors(filtered);
    };

    const debouncedFilterDoctors = useCallback(
        _.debounce((term) => {
            filterDoctors(term);
        }, 300),
        [doctors],
    );

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
        debouncedFilterDoctors(e.target.value);
    };

    return (
        <div className={cx('container')}>
            <h1>Danh sách tất cả bác sĩ</h1>
            <input
                type="text"
                placeholder="Tìm kiếm bác sĩ..."
                value={searchTerm}
                onChange={handleSearchChange}
                className={cx('search-input')}
            />
            <div className={cx('doctor-list')}>
                {filteredDoctors.map((doctor) => (
                    <Link to={`/doctor-detail/${doctor.id}`} className={cx('doctor-item')} key={doctor.id}>
                        {/* <LazyImage
                            className={cx('doctor-image')}
                            src={CommonUtils.toFileFromBase64(doctor?.image)}
                            alt="Doctor Image"
                        /> */}
                        <div className={cx('doctor-details')}>
                            <h2 className={cx('doctor-name')}>
                                {doctor['doctorInfo.positionData.value'] || 'Bác sĩ'} {doctor.lastName}{' '}
                                {doctor.firstName}
                            </h2>
                            <p className={cx('doctor-specialist')}>{doctor['doctorInfo.specialist.name']}</p>
                            <p className={cx('doctor-hospital')}>{doctor['doctorInfo.clinic.name']}</p>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default AllDoctor;
