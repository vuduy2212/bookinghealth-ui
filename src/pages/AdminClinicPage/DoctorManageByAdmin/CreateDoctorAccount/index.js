import classNames from 'classnames/bind';
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import React from 'react';
import Select from 'react-select';
import CurrencyInput from 'react-currency-input-field';
// -----------------------------------------------------------------------//
import 'react-markdown-editor-lite/lib/index.css';
import styles from './CreateDoctorAccount.module.scss';
import HeaderLite from '~/components/HeaderLite/index.';
import { useDispatch, useSelector } from 'react-redux';
import Button from '~/components/Button';
import { useEffect, useState } from 'react';
import { createDoctorAccount, getProfileDoctor, updateProfileDoctor } from '~/service/doctor/profileDoctor';
import { loginSuccess } from '~/redux/authSlice';
import { createAxios } from '~/redux/createInstance';
import { useNavigate } from 'react-router-dom';
import ProtectedRoute from '~/routes/ProtectedRoute';
import { getAllClinicName } from '~/service/clinic';
import { getAllSpecialistNoImage } from '~/service/specialist';
import LoadingIcon from '~/components/LoadingIcon';
import { ToastContainer, toast } from 'react-toastify';
import getAllCode from '~/service/common/getAllCode';
const cx = classNames.bind(styles);
function CreateDoctorAccount() {
    const user = useSelector((state) => state.auth.login.currentUser);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    let axiosJWT = createAxios(user, dispatch, loginSuccess);
    const mdParser = new MarkdownIt(/* Markdown-it options */);

    // State
    const [specialistId, setSpecialistId] = useState('');
    const [description, setDescription] = useState('');
    const [contentHTML, setcontentHTML] = useState('');
    const [contentMarkdown, setcontentMarkdown] = useState('');
    const [allSpecialist, setAllSpecialist] = useState([]);
    const [positionId, setPositionId] = useState(user?.positionId || '');
    const [positionCode, setPositionCode] = useState([]);

    const [firstNameDoctor, setFirstNameDoctor] = useState('');
    const [lastNameDoctor, setLastNameDoctor] = useState('');
    const [phoneNumberDoctor, setPhoneNumberDoctor] = useState('');
    const [emailDoctor, setEmailDoctor] = useState('');
    const [loading, setLoading] = useState(false);
    // State

    const optionsSpecialist = allSpecialist.map((element, index) => {
        return {
            value: element.id,
            label: element.name,
        };
    });
    const optionPosition = positionCode.map((element, index) => {
        return {
            value: element.keyMap,
            label: element.value,
        };
    });
    const handleEditorChange = ({ html, text }) => {
        setcontentHTML(html);
        setcontentMarkdown(text);
    };
    const handleSubmit = async () => {
        if (
            firstNameDoctor === '' ||
            lastNameDoctor === '' ||
            emailDoctor === '' ||
            phoneNumberDoctor === '' ||
            specialistId === ''
        ) {
            toast.error(<h4>Vui lòng điền đầy đủ thông tin</h4>, {
                position: toast.POSITION.TOP_RIGHT,
                autoClose: 2000,
            });
            return;
        } else {
            const data = {
                firstName: firstNameDoctor,
                lastName: lastNameDoctor,
                email: emailDoctor,
                phoneNumber: phoneNumberDoctor,
                clinicId: user.clinicId,
                specialistId,
                positionId,
                description,
                contentMarkdown,
                contentHTML,
            };
            try {
                await createDoctorAccount(user, data, axiosJWT);
                toast.success(<h4>{'Cập nhật hồ sơ thành công'}</h4>, {
                    position: toast.POSITION.TOP_RIGHT,
                    autoClose: 2000,
                });
                setFirstNameDoctor('');
                setLastNameDoctor('');
                setEmailDoctor('');
                setPhoneNumberDoctor('');
                setSpecialistId('');
                setPositionCode('');
                setDescription('');
                setcontentHTML('');
                setcontentMarkdown('');
            } catch (error) {
                toast.error(<h4>{'Fetch Error'}</h4>, {
                    position: toast.POSITION.TOP_RIGHT,
                    autoClose: 2000,
                });
            }
        }
    };
    useEffect(() => {
        const getData = async () => {
            const dataAllSpecialist = await getAllSpecialistNoImage();
            setAllSpecialist(dataAllSpecialist || []);
        };
        getData();
        const getCodeFromService = async () => {
            setPositionCode(await getAllCode('position'));
        };
        getCodeFromService();
    }, []);
    return (
        <ProtectedRoute isAllowed={user.roleId === 'R4'}>
            <div>
                <HeaderLite className={cx('header')} title={`Tạo tài khoản cho bác sĩ - ${user.clinicName}`} />

                <div className={cx('content', 'container')}>
                    {loading ? (
                        <div className={cx('container-loading-icon')}>
                            <LoadingIcon />
                        </div>
                    ) : (
                        <>
                            <div className={cx('row', 'row-admin')}>
                                <div className={cx('last-name-container', 'col-3')}>
                                    <label className={cx('label')}>Họ </label>
                                    <input
                                        className={cx('form-control', 'input')}
                                        type="text"
                                        value={lastNameDoctor}
                                        onChange={(e) => setLastNameDoctor(e.target.value)}
                                    />
                                </div>
                                <div className={cx('name-container', 'col-2')}>
                                    <label className={cx('label')}>Tên</label>
                                    <input
                                        className={cx('form-control', 'input')}
                                        type="text"
                                        value={firstNameDoctor}
                                        onChange={(e) => setFirstNameDoctor(e.target.value)}
                                    />
                                </div>
                                <div className={cx('name-container', 'col-4')}>
                                    <label className={cx('label')}>Email</label>
                                    <input
                                        className={cx('form-control', 'input')}
                                        type="text"
                                        value={emailDoctor}
                                        onChange={(e) => setEmailDoctor(e.target.value)}
                                    />
                                </div>
                                <div className={cx('name-container', 'col-3')}>
                                    <label className={cx('label')}>Số điện thoại</label>
                                    <input
                                        className={cx('form-control', 'input')}
                                        type="text"
                                        value={phoneNumberDoctor}
                                        onChange={(e) => setPhoneNumberDoctor(e.target.value)}
                                    />
                                </div>
                            </div>
                            <div className={cx('row', 'row-one')}>
                                <div className={cx('name-container', 'col-6')}>
                                    <span className={cx('label')}>Chuyên khoa</span>
                                    <Select
                                        className={cx('select-container')}
                                        options={optionsSpecialist}
                                        placeholder={'Chọn chuyên khoa'}
                                        value={optionsSpecialist.find((element) => {
                                            return element.value === specialistId;
                                        })}
                                        onChange={(option) => setSpecialistId(option.value)}
                                    />
                                </div>

                                <div className={cx('name-container', 'col-6')}>
                                    <span className={cx('label')}>Chức danh</span>
                                    <Select
                                        className={cx('select-container')}
                                        options={optionPosition}
                                        placeholder={'Chọn chức danh'}
                                        value={optionPosition.find((element) => {
                                            return element.value == positionId;
                                        })}
                                        onChange={(option) => setPositionId(option.value)}
                                    />
                                </div>
                            </div>

                            <div className={cx('desc')}>
                                <span className={cx('label')}>Giới thiệu</span>
                                <textarea value={description} onChange={(e) => setDescription(e.target.value)} />
                            </div>
                            <div className={cx('detail-info')}>
                                <h2>Thông tin chi tiết </h2>
                                <MdEditor
                                    style={{ height: '500px' }}
                                    renderHTML={(text) => mdParser.render(text)}
                                    value={contentMarkdown}
                                    onChange={handleEditorChange}
                                />
                            </div>
                            <div className={cx('footer')}>
                                <Button rounded large className={cx('button-submit')} onClick={handleSubmit}>
                                    Tạo tài khoản
                                </Button>
                            </div>
                        </>
                    )}
                </div>
                <ToastContainer />
            </div>
        </ProtectedRoute>
    );
}

export default CreateDoctorAccount;
