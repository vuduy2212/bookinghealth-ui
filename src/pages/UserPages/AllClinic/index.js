import React, { useState, useEffect } from 'react';
import classNames from 'classnames/bind';
import styles from './AllClinic.module.scss';
import { Link } from 'react-router-dom';
import axios from 'axios';
import LazyImage from '~/components/LazyImage';
import CommonUtils from '~/utils/CommonUtils';

const cx = classNames.bind(styles);

const AllClinic = () => {
    const [clinics, setClinics] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const apiUrl = '/api/clinic/get-all-clinic'; // Địa chỉ API của bạn

    useEffect(() => {
        const fetchClinics = async () => {
            try {
                const response = await axios.get(apiUrl);
                setClinics(response.data);
            } catch (error) {
                console.error('Error fetching clinics:', error);
            }
        };

        fetchClinics();
    }, []);

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const filteredClinics = clinics.filter(
        (clinic) =>
            clinic.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            clinic.address.toLowerCase().includes(searchTerm.toLowerCase()),
    );

    return (
        <div className={cx('container')}>
            <h1>Danh sách tất cả phòng khám</h1>
            <input
                type="text"
                placeholder="Tìm kiếm phòng khám..."
                value={searchTerm}
                onChange={handleSearchChange}
                className={cx('search-input')}
            />
            <div className={cx('clinic-list')}>
                {filteredClinics.map((clinic) => (
                    <Link to={`/clinic-detail/${clinic.id}`} className={cx('clinic-item')} key={clinic.id}>
                        <LazyImage
                            className={cx('clinic-image')}
                            src={CommonUtils.toFileFromBase64(clinic?.logo)}
                            alt="image"
                        />

                        <div className={cx('clinic-details')}>
                            <h2 className={cx('clinic-name')}>{clinic.name}</h2>
                            <p className={cx('clinic-address')}>{clinic.address}</p>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default AllClinic;
