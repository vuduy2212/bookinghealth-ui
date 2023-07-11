import classNames from 'classnames/bind';
import { useState, useEffect } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import Lightbox from 'react-image-lightbox';
import { Buffer } from 'buffer';

import 'react-image-lightbox/style.css';
import style from './UpdateUser.module.scss';
import HeaderLite from '~/components/HeaderLite/index.';
import Button from '~/components/Button';
import { createAxios } from '~/redux/createInstance';
import { loginSuccess } from '~/redux/authSlice';
import { updateSelf } from '~/redux/apiRequest';
import ProtectedRoute from '~/routes/ProtectedRoute';
import { FaUpload } from 'react-icons/fa';
import CommonUtils from '~/utils/CommonUtils';
import getAllCode from '~/service/common/getAllCode';
const cx = classNames.bind(style);
function UpdateUser({ forDoctor = false }) {
    const navigate = useNavigate();
    const user = useSelector((state) => state.auth.login.currentUser);
    const dispatch = useDispatch();
    let axiosJWT = createAxios(user, dispatch, loginSuccess);
    const [phoneNumber, setPhoneNumber] = useState(user.phoneNumber || '');
    const [yearOfBirth, setYearOfBirth] = useState(user.yearOfBirth || '');
    const [address, setAddress] = useState(user.address || '');
    const [gender, setGender] = useState(user.gender || '');
    const [positionId, setPositionId] = useState(user.positionId || '');
    const [image, setImage] = useState(user.image);
    const [changedImage, setChangedImage] = useState(false);
    const [previewImgURL, setPreviewImgURL] = useState(() => {
        if (user?.image) {
            return CommonUtils.toFileFromBase64(user.image);
        } else {
            return '';
        }
    });
    const [isOpenPreview, setIsOpenPreview] = useState(false);
    const [positionCode, setPositionCode] = useState([]);
    const handleChangeImage = async (e) => {
        setChangedImage(true);
        try {
            let files = e.target.files;
            let file = files[0];
            if (file) {
                setImage(await CommonUtils.toBase64(file));
                let objectUrl = URL.createObjectURL(file);
                setPreviewImgURL(objectUrl);
            }
        } catch (error) {
            console.log(error);
        }
    };
    const openPreviewImage = () => {
        if (previewImgURL === '') {
            return;
        }
        setIsOpenPreview(true);
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        const userUpdated = {
            phoneNumber,
            yearOfBirth,
            address,
            gender,
            positionId,
        };
        if (changedImage === true) {
            userUpdated.image = image;
        }
        await updateSelf(dispatch, navigate, userUpdated, user, axiosJWT);
        navigate(-1);
    };

    useEffect(() => {
        const getCodeFromService = async () => {
            setPositionCode(await getAllCode('position'));
        };
        getCodeFromService();
    }, []);
    return (
        <ProtectedRoute redirectPath="/login" isAllowed={user}>
            <div className={cx('wrapper')}>
                <HeaderLite title="Cập nhật thông tin cá nhân" />
                <div className={cx('container', 'content')}>
                    <div className="row d-flex justify-content-center">
                        <div className={cx('col-12', 'col-md-10', 'd-flex', 'justify-content-center', 'boder')}>
                            <div className="col-12 col-md-10">
                                <div className={cx('form-warrper')}>
                                    <form onSubmit={(e) => handleSubmit(e)} className="row g-4">
                                        <div className="col-8 col-md-4">
                                            <label htmlFor="lastName" className={cx('form-label', 'label')}>
                                                Họ
                                            </label>
                                            <input
                                                value={user?.lastName}
                                                type="text"
                                                className={cx('form-control', 'input')}
                                                id="lastName"
                                                disabled
                                            />
                                        </div>
                                        <div className="col-4 col-md-2">
                                            <label htmlFor="firstName" className={cx('form-label', 'label')}>
                                                Tên
                                            </label>
                                            <input
                                                value={user?.firstName}
                                                type="text"
                                                className={cx('form-control', 'input')}
                                                id="firstName"
                                                disabled
                                            />
                                        </div>
                                        <div className="col-12 col-md-6">
                                            <label htmlFor="email" className={cx('form-label', 'label')}>
                                                Email
                                            </label>
                                            <input
                                                value={user?.email}
                                                type="text"
                                                className={cx('form-control', 'input')}
                                                id="email"
                                                disabled
                                            />
                                        </div>
                                        <div className="col-12 col-md-4">
                                            <label htmlFor="phone" className={cx('form-label', 'label')}>
                                                Số điện thoại
                                            </label>
                                            <input
                                                value={phoneNumber}
                                                onChange={(e) => setPhoneNumber(e.target.value)}
                                                type="text"
                                                className={cx('form-control', 'input')}
                                                id="phone"
                                            />
                                        </div>
                                        <div className=" col-12 col-md-3">
                                            <label htmlFor="inputCity" className={cx('form-label', 'label')}>
                                                Năm sinh
                                            </label>
                                            <input
                                                value={yearOfBirth}
                                                onChange={(e) => setYearOfBirth(e.target.value)}
                                                type="text"
                                                className={cx('form-control', 'input')}
                                                id="inputCity"
                                            />
                                        </div>
                                        {forDoctor ? (
                                            <div className=" col-12 col-md-4 mx-5">
                                                <label htmlFor="inputPosition" className={cx('form-label', 'label')}>
                                                    Chức danh
                                                </label>
                                                <select
                                                    value={positionId}
                                                    id="inputPosition"
                                                    className={cx('form-select', 'input')}
                                                    onChange={(e) => setPositionId(e.target.value)}
                                                >
                                                    <option value={''}>Chọn chức danh</option>
                                                    {positionCode.map((item, index) => {
                                                        return (
                                                            <option value={item.keyMap} key={index}>
                                                                {item.value}
                                                            </option>
                                                        );
                                                    })}
                                                </select>
                                            </div>
                                        ) : (
                                            <></>
                                        )}
                                        <div className=" col-12 col-md-12">
                                            <label htmlFor="inputCity" className={cx('form-label', 'label')}>
                                                Địa chỉ
                                            </label>
                                            <input
                                                value={address}
                                                onChange={(e) => setAddress(e.target.value)}
                                                type="text"
                                                className={cx('form-control', 'input')}
                                                id="inputCity"
                                            />
                                        </div>
                                        <div className="col-12 col-md-4">
                                            <label htmlFor="inputState" className={cx('form-label', 'label')}>
                                                Giới tính
                                            </label>
                                            <select
                                                value={gender}
                                                id="inputState"
                                                className={cx('form-select', 'input')}
                                                onChange={(e) => setGender(e.target.value)}
                                            >
                                                <option value={''}>Chọn giới tính</option>
                                                <option value="M">Nam</option>
                                                <option value="F">Nữ</option>
                                                <option value="O">Khác</option>
                                            </select>
                                        </div>
                                        <div className="col-12 col-md-6 mx-5">
                                            <label className={cx('form-label', 'label')}>Ảnh đại diện</label>
                                            <div className={cx('avatar-container')}>
                                                <label
                                                    htmlFor="inputAvatarFile"
                                                    className={cx('label', 'upload-avatar')}
                                                >
                                                    Tải ảnh
                                                    <FaUpload style={{ marginLeft: '10px' }} />
                                                </label>
                                                <input
                                                    type="file"
                                                    className={cx('form-control', 'input')}
                                                    id="inputAvatarFile"
                                                    onChange={(e) => handleChangeImage(e)}
                                                    hidden
                                                />
                                                <div
                                                    className={cx('avatar-preview-container')}
                                                    style={{ backgroundImage: `url(${previewImgURL})` }}
                                                    onClick={openPreviewImage}
                                                ></div>
                                            </div>
                                        </div>

                                        <div className="row d-flex justify-content-center">
                                            <div className="col-4 ">
                                                <Button rounded large type="submit" className={cx('button-submit')}>
                                                    Cập nhật
                                                </Button>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {isOpenPreview ? (
                <Lightbox
                    mainSrc={previewImgURL}
                    onCloseRequest={() => setIsOpenPreview(false)}
                    onImageLoad={() => {
                        window.dispatchEvent(new Event('resize'));
                    }}
                />
            ) : (
                <></>
            )}
        </ProtectedRoute>
    );
}

export default UpdateUser;
