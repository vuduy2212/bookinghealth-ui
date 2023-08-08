import classNames from 'classnames/bind';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useLayoutEffect, useState } from 'react';
import axios from 'axios';
import Flatpickr from 'react-flatpickr';

//-------------------------------
import HeaderDoctor from '~/components/SystemComponent/HeaderSystem/HeaderDoctor';
import styles from './ScheduleManage.module.scss';
import ProtectedRoute from '~/routes/ProtectedRoute';
import 'flatpickr/dist/themes/material_green.css';
import getAllCode from '~/service/common/getAllCode';
import Button from '~/components/Button';
import { toast, ToastContainer } from 'react-toastify';
import { getScheduleDoctorOneDate, saveScheduleDoctor } from '~/service/doctor/scheduleDoctor';
import { createAxios } from '~/redux/createInstance';
import { loginSuccess } from '~/redux/authSlice';

const cx = classNames.bind(styles);
function ScheduleManage() {
    let currentDate = new Date();
    const user = useSelector((state) => state.auth.login.currentUser);
    const dispatch = useDispatch();
    let axiosJWT = createAxios(user, dispatch, loginSuccess);
    const [date, setDate] = useState(new Date().setHours(0, 0, 0, 0));
    //const [allScheduleTime, setAllScheduleTime] = useState([]);
    const [scheduleDoctor, setScheduleDoctor] = useState([]);
    const [maxPatient, setMaxPatient] = useState(2);
    const handleClickTime = (item) => {
        setScheduleDoctor((prev) => {
            return prev.map((time, element) => {
                if (time.keyMap === item.keyMap) {
                    return { ...time, isSelected: !time.isSelected };
                }
                return time;
            });
        });
    };
    const handleOnChangeDate = async (dateSelect) => {
        setDate(dateSelect);
        const response = await getScheduleDoctorOneDate(user.id, dateSelect, scheduleDoctor);
        const schedule = response.arraySchedule;
        const maxNumber = response.maxPatient;
        setScheduleDoctor(schedule);
        setMaxPatient(maxNumber);
    };
    const handleSubmit = async () => {
        if (maxPatient === '') {
            toast.error(<h4>Vui lòng chọn số bệnh nhân</h4>, {
                position: toast.POSITION.TOP_RIGHT,
                autoClose: 2000,
            });
            return;
        }
        const dataScheduleDoctor = scheduleDoctor.filter((item) => {
            return item.isSelected === true;
        });
        const result = dataScheduleDoctor.map((item) => {
            return {
                doctorId: user.id,
                date: new Date(date).getTime(),
                maxNumber: maxPatient,
                timeType: item.keyMap,
            };
        });

        // await axios.post('/api/doctor/bulk-create-schedule', {
        //     arraySchedule: result,
        //     doctorId: user.id,
        //     date: new Date(date).getTime(),
        // });
        await saveScheduleDoctor(axiosJWT, user, result, date);
        toast.success(<h4>Lưu kế hoạch khám bệnh thành công</h4>, {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 2000,
        });
    };
    useLayoutEffect(() => {
        const getRangeTime = async () => {
            let data = await getAllCode('time');
            data = data.map((item, index) => {
                return {
                    ...item,
                    isSelected: false,
                };
            });
            const response = await getScheduleDoctorOneDate(user.id, date, data);
            const schedule = response.arraySchedule;
            const maxNumber = response.maxPatient;
            setScheduleDoctor(schedule);
            setMaxPatient(maxNumber);
        };
        getRangeTime();
    }, []);
    return (
        <ProtectedRoute isAllowed={!!user && user.roleId === 'R2'} redirectPath="/login">
            <div>
                <HeaderDoctor />
                <div className="container">
                    <div className={cx('content')}>
                        <h1 className={cx('title')}>Quản lí kế hoạch khám bệnh</h1>
                        <div className="row d-flex justify-content-center">
                            <div className={cx('col-12', 'col-md-10', 'boder')}>
                                <div className={cx('wrapper-input', 'row')}>
                                    <div className={cx('wrapper-date', 'col-6')}>
                                        <div className={cx('date-container')}>
                                            <label>Chọn ngày</label>
                                            <Flatpickr
                                                value={date} // giá trị ngày tháng
                                                // các option thêm cho thư viện
                                                options={{
                                                    dateFormat: 'd-m-Y', // format ngày giờ
                                                    minDate: `${currentDate.getDate()}-${
                                                        currentDate.getMonth() + 1
                                                    }-${currentDate.getFullYear()}`,
                                                }}
                                                // event
                                                onChange={(dateSelect) => handleOnChangeDate(dateSelect)}
                                            />
                                        </div>
                                    </div>
                                    <div className={cx('wrapper-date', 'col-6')}>
                                        <label>Số lượng bệnh nhân 1 khung giờ</label>
                                        <select
                                            value={maxPatient}
                                            id="inputState"
                                            className={cx()}
                                            onChange={(e) => setMaxPatient(e.target.value)}
                                        >
                                            <option value={1}>1</option>
                                            <option value={2}>2</option>
                                            <option value={3}>3</option>
                                            <option value={4}>4</option>
                                            <option value={5}>5</option>
                                        </select>
                                    </div>
                                </div>
                                <div className={cx('range-time-container')}>
                                    {scheduleDoctor.map((item, index) => (
                                        <Button
                                            key={index}
                                            className={cx('button-time', {
                                                'active-time': item.isSelected,
                                            })}
                                            onClick={() => handleClickTime(item)}
                                        >
                                            {item.value}
                                        </Button>
                                    ))}
                                </div>
                                <div className={cx('footer')}>
                                    <Button primary large className={cx('submit')} onClick={handleSubmit}>
                                        Lưu thông tin
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <ToastContainer />
            </div>
        </ProtectedRoute>
    );
}

export default ScheduleManage;
