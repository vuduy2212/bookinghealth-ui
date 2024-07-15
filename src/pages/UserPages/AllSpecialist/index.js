import React, { useState, useEffect } from 'react';
import classNames from 'classnames/bind';
import styles from './AllSpecialist.module.scss';
import { Link } from 'react-router-dom';
import axios from 'axios';
import LazyImage from '~/components/LazyImage';
import CommonUtils from '~/utils/CommonUtils';

const cx = classNames.bind(styles);

const AllSpecialist = () => {
    const [specialties, setSpecialties] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const apiUrl = '/api/specialist/get-all'; // Địa chỉ API của bạn

    useEffect(() => {
        const fetchSpecialties = async () => {
            try {
                const response = await axios.get(apiUrl);
                setSpecialties(response.data);
            } catch (error) {
                console.error('Error fetching specialties:', error);
            }
        };

        fetchSpecialties();
    }, []);

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const filteredSpecialties = specialties.filter((specialty) =>
        specialty.name.toLowerCase().includes(searchTerm.toLowerCase()),
    );

    return (
        <div className={cx('container')}>
            <h1>Danh sách tất cả chuyên khoa</h1>
            <input
                type="text"
                placeholder="Tìm kiếm chuyên khoa..."
                value={searchTerm}
                onChange={handleSearchChange}
                className={cx('search-input')}
            />
            <div className={cx('specialty-list')}>
                {filteredSpecialties.map((specialty) => (
                    <Link to={`/specialist-detail/${specialty.id}`} className={cx('specialty-item')} key={specialty.id}>
                        <LazyImage
                            className={cx('specialty-logo')}
                            src={CommonUtils.toFileFromBase64(specialty?.image)}
                            alt="image"
                        />
                        <span className={cx('specialty-name')}>{specialty.name}</span>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default AllSpecialist;
