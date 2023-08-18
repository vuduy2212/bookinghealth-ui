import classNames from 'classnames/bind';
import moment from 'moment';
// ----------------------------------
import style from './Booking.module.scss';
import Image from '~/components/Image';
import CommonUtils from '~/utils/CommonUtils';
import { redirect, useNavigate, useParams } from 'react-router-dom';
import { useEffect, useLayoutEffect, useState } from 'react';
import { getDetailDoctor } from '~/service/doctor/profileDoctor';
import { BiUser } from 'react-icons/bi';
import { FaAddressBook, FaBookMedical, FaCalendar, FaPhone, FaUser } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { MdPlace } from 'react-icons/md';
import { IoMdMedical } from 'react-icons/io';
import Button from '~/components/Button';
import getAllCode from '~/service/common/getAllCode';
import ProtectedRoute from '~/routes/ProtectedRoute';
import { validate } from '~/middleware/validateForm';
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';
import { postBookAppointment } from '~/service/booking';
import { createAxios } from '~/redux/createInstance';
import { loginSuccess } from '~/redux/authSlice';
import { updateSelf } from '~/redux/apiRequest';
const cx = classNames.bind(style);
function Booking() {
    const navigate = useNavigate();
    const user = useSelector((state) => state.auth.login.currentUser);
    const dispatch = useDispatch();
    let axiosJWT = createAxios(user, dispatch, loginSuccess);
    // State Doctor
    let { doctorId } = useParams();
    let { date } = useParams();
    const formattedDate = moment(Number(date)).format('dddd - DD/MM/YYYY');
    let { timeType } = useParams();
    const [time, setTime] = useState('');
    const [nameDoctor, setNameDoctor] = useState('');
    const [img, setImg] = useState('');
    const [price, setPrice] = useState(0);
    const [nameClinic, setNameClinic] = useState('');
    const [specialist, setSpecialist] = useState('');
    const [addressClinic, setAddressClinic] = useState('');
    const [allScheduleTime, setAllScheduleTime] = useState([]);
    // State Patient
    const [name, setName] = useState(user?.lastName + '' + user?.firstName);
    const [phoneNumber, setPhoneNumber] = useState(user?.phoneNumber);
    const [yearOfBirth, setYearOfBirth] = useState(user?.yearOfBirth);
    const [address, setAddress] = useState(user?.address);
    const [gender, setGender] = useState(user?.gender || 'M');
    const [reason, setReason] = useState('');
    //

    const genderList = [
        {
            id: 'M',
            name: 'Nam',
        },
        {
            id: 'F',
            name: 'Nữ',
        },
        {
            id: '0',
            name: 'Khác',
        },
    ];

    function currencyFormat(num) {
        return num.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,') + ' vnđ';
    }
    function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
    const handleSubmit = async () => {
        try {
            const inputPhoneNumber = document.querySelector(`.${cx('phoneNumber')}`);
            if (validate(inputPhoneNumber) === false) {
                toast.error(<h4>Số điện thoại không hợp lệ</h4>, {
                    position: toast.POSITION.TOP_RIGHT,
                    autoClose: 2000,
                });
                return;
            }
            let inputFalse = false;
            const inputList = document.querySelectorAll(`input, textarea`);
            [...inputList].forEach((element) => {
                if (validate(element) === false) {
                    toast.error(<h4>Vui lòng điền đầy đủ thông tin</h4>, {
                        position: toast.POSITION.TOP_RIGHT,
                        autoClose: 2000,
                    });
                    inputFalse = true;
                    return;
                }
            });
            if (inputFalse === true) {
                return;
            }
            const infoBooking = {
                doctorId: Number(doctorId),
                patientId: user.id,
                statusId: 'S1',
                date,
                timeType,
                reason,
            };
            const infoPatient = {
                gender,
                phoneNumber,
                yearOfBirth,
                address,
            };
            const data = await postBookAppointment(infoBooking);
            if (data.schedule === false) {
                toast.error(<h4>{data.message}</h4>, {
                    position: toast.POSITION.TOP_RIGHT,
                    autoClose: 2000,
                });
                return;
            }
            if (data.created === true) {
                await updateSelf(dispatch, infoPatient, user, axiosJWT);
                navigate('/booking/successful-appointment');
            } else {
                toast.error(<h4>Đặt lịch khám không thành công vì bạn đã đặt lịch khám khung giờ này rồi </h4>, {
                    position: toast.POSITION.TOP_RIGHT,
                    autoClose: 3000,
                });
                await updateSelf(dispatch, infoPatient, user, axiosJWT);
            }
        } catch (error) {
            toast.error(<h4>{'Đã có lỗi xảy ra xin vui lòng Refresh trang'}</h4>, {
                position: toast.POSITION.TOP_RIGHT,
                autoClose: 3000,
            });
        }
    };
    useLayoutEffect(() => {
        window.scroll(0, 0);
        const getDataDoctor = async () => {
            const data = await getDetailDoctor(doctorId);
            setNameDoctor(`${data.positionData.value} ${data.lastName} ${data.firstName}`);
            setImg(data.image || '');
            setPrice(data.Clinics.Doctor_Info.price || 0);
            setNameClinic(data.Clinics.name || '');
            setAddressClinic(data.Clinics.address || '');
            setSpecialist(data.Specialists.name);
            const arrTime = await getAllCode('time');
            setTime(arrTime.find((item) => item.keyMap === timeType));
        };
        getDataDoctor();
    }, []);
    return (
        <ProtectedRoute isAllowed={!!user} redirectPath="/login">
            <div>
                <div className={cx('header-container', 'wrapper')}>
                    <div className={cx('header')}>
                        <div className={cx('intro-avatar')}>
                            <Image src={CommonUtils.toFileFromBase64(img)} />
                        </div>
                        <div className={cx('info-doctor')}>
                            <h2 className={cx('title')}>ĐẶT LỊCH KHÁM</h2>
                            <h3 className={cx('name-doctor')}>{nameDoctor + ' - ' + specialist}</h3>
                            <h4 className={cx('time')}>
                                {(time?.value || '') + ' - ' + capitalizeFirstLetter(formattedDate)}
                            </h4>
                            <h4 className={cx('place')}>{nameClinic + '. Địa chỉ: ' + addressClinic}</h4>
                            {/* <h4 className={cx('place')}>{addressClinic}</h4> */}
                        </div>
                    </div>
                </div>
                <div className={cx('wrapper')}>
                    <div className={cx('form-container')}>
                        <div className={cx('price-container')}>
                            <div className={cx('price-box')}>{'Giá khám: ' + currencyFormat(price)}</div>
                        </div>
                        <div className={cx('input-wrapper')}>
                            <div className={cx('input-box', 'name-input')}>
                                <span>
                                    <FaUser className={cx('icon-input')} />
                                </span>
                                <input
                                    placeholder="Họ và tên"
                                    type="text"
                                    className={cx('')}
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    disabled
                                />
                            </div>
                            {/* <p>Nếu bạn muốn đặt hộ người thân, hãy đăng xuất và tạo 1 tài khoản khác cho người thân</p> */}
                        </div>
                        <div className={cx('gender-wrapper')}>
                            {genderList.map((item) => (
                                <div key={item.id} className={cx('gender-item')}>
                                    <input
                                        type="radio"
                                        id={item.id}
                                        checked={gender === item.id}
                                        onChange={() => setGender(item.id)}
                                    />
                                    <label htmlFor={item.id}>{item.name}</label>
                                </div>
                            ))}
                        </div>
                        <div className={cx('input-wrapper')}>
                            <div className={cx('input-box')}>
                                <span>
                                    <FaPhone className={cx('icon-input')} />
                                </span>
                                <input
                                    name="phoneNumber"
                                    placeholder="Số điện thoại"
                                    type="text"
                                    className={cx('phoneNumber')}
                                    value={phoneNumber}
                                    onChange={(e) => setPhoneNumber(e.target.value)}
                                />
                            </div>
                            <p>Kiểm tra thật kỹ số điện thoại</p>
                        </div>
                        <div className={cx('input-wrapper')}>
                            <div className={cx('input-box')}>
                                <span>
                                    <FaCalendar className={cx('icon-input')} />
                                </span>
                                <input
                                    placeholder="Năm sinh"
                                    type="text"
                                    className={cx()}
                                    value={yearOfBirth}
                                    onChange={(e) => setYearOfBirth(e.target.value)}
                                />
                            </div>
                        </div>
                        <div className={cx('input-wrapper')}>
                            <div className={cx('input-box')}>
                                <span>
                                    <MdPlace className={cx('icon-input')} />
                                </span>
                                <input
                                    placeholder="Địa chỉ"
                                    type="text"
                                    className={cx()}
                                    value={address}
                                    onChange={(e) => setAddress(e.target.value)}
                                />
                            </div>
                        </div>
                        <div className={cx('input-wrapper')}>
                            <div className={cx('input-box')}>
                                <span>
                                    <FaBookMedical className={cx('icon-input')} />
                                </span>
                                <textarea
                                    placeholder="Lý do khám"
                                    type="text"
                                    className={cx()}
                                    value={reason}
                                    onChange={(e) => setReason(e.target.value)}
                                />
                            </div>
                        </div>
                        <div className={cx('pay-container')}>
                            <h4 className={cx('pay-method-title')}>Hình thức thanh toán</h4>
                            <div className={cx('pay-method')}>
                                <input type="radio" defaultChecked />
                                <span>Thanh toán sau tại cơ sở y tế</span>
                            </div>
                            <div className={cx('pay-price')}>
                                <div className={cx('pay-price-row')}>
                                    <span>Giá khám</span>
                                    <span>{currencyFormat(price)}</span>
                                </div>
                                <div className={cx('pay-price-row')}>
                                    <span>Phí đặt lịch</span>
                                    <span>{'Miễn phí'}</span>
                                </div>
                                <div className={cx('pay-price-row', 'pay-price-row-end')}>
                                    <span>Tổng cộng</span>
                                    <span>{currencyFormat(price)}</span>
                                </div>
                            </div>
                        </div>
                        <div className={cx('note-container')}>
                            <h4 className={cx('note-sub')}>
                                Quý khách vui lòng điền đầy đủ thông tin để tiết kiệm thời gian làm thủ tục khám
                            </h4>
                            <div className={cx('note-main')}>
                                <h4>LƯU Ý</h4>
                                <p>
                                    Thông tin anh/chị cung cấp sẽ được sử dụng làm hồ sơ khám bệnh, khi điền thông tin
                                    anh/chị vui lòng:
                                </p>
                                <ul>
                                    <li>Ghi rõ họ và tên, viết hoa những chữ cái đầu tiên, ví dụ: Trần Văn Phú </li>
                                    <li>
                                        Điền đầy đủ, đúng và vui lòng kiểm tra lại thông tin trước khi ấn "Xác nhận"
                                    </li>
                                </ul>
                            </div>
                            <Button large className={cx('button-submit')} onClick={handleSubmit}>
                                Xác nhận đặt khám
                            </Button>
                            <span className={cx('term-of-use')}>
                                Bằng việc xác nhận đặt khám, bạn đã hoàn toàn đồng ý với Điều khoản sử dụng dịch vụ của
                                chúng tôi.
                            </span>
                        </div>
                    </div>
                </div>
                <ToastContainer />
            </div>
        </ProtectedRoute>
    );
}

export default Booking;
