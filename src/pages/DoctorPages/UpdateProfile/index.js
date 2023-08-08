import classNames from 'classnames/bind';
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import React from 'react';
import Select from 'react-select';
import CurrencyInput from 'react-currency-input-field';
// -----------------------------------------------------------------------//
import 'react-markdown-editor-lite/lib/index.css';
import styles from './UpdateProfile.module.scss';
import HeaderLite from '~/components/HeaderLite/index.';
import { useDispatch, useSelector } from 'react-redux';
import Button from '~/components/Button';
import { useEffect, useState } from 'react';
import { getProfileDoctor, updateProfileDoctor } from '~/service/doctor/profileDoctor';
import { loginSuccess } from '~/redux/authSlice';
import { createAxios } from '~/redux/createInstance';
import { useNavigate } from 'react-router-dom';
import ProtectedRoute from '~/routes/ProtectedRoute';
import { getAllClinicName } from '~/service/clinic';
import { getAllSpecialistNoImage } from '~/service/specialist';
import LoadingIcon from '~/components/LoadingIcon';
import { ToastContainer, toast } from 'react-toastify';
const cx = classNames.bind(styles);
function UpdateProfile() {
    const user = useSelector((state) => state.auth.login.currentUser);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    let axiosJWT = createAxios(user, dispatch, loginSuccess);
    const mdParser = new MarkdownIt(/* Markdown-it options */);

    // State
    const [clinicId, setClinicId] = useState('');
    const [specialistId, setSpecialistId] = useState('');
    const [price, setPrice] = useState('');
    const [description, setDescription] = useState('');
    const [contentHTML, setcontentHTML] = useState('');
    const [contentMarkdown, setcontentMarkdown] = useState('');
    const [allClinic, setAllClinic] = useState([]);
    const [allSpecialist, setAllSpecialist] = useState([]);

    const [loading, setLoading] = useState(false);
    // State

    const optionsClinic = allClinic.map((element, index) => {
        return {
            value: element.id,
            label: element.name,
        };
    });
    const optionsSpecialist = allSpecialist.map((element, index) => {
        return {
            value: element.id,
            label: element.name,
        };
    });
    const handleEditorChange = ({ html, text }) => {
        setcontentHTML(html);
        setcontentMarkdown(text);
    };
    const handleSubmit = async () => {
        if (clinicId === '' || specialistId === '' || !!price === false || contentMarkdown === '') {
            toast.error(<h4>Vui lòng điền đầy đủ thông tin</h4>, {
                position: toast.POSITION.TOP_RIGHT,
                autoClose: 2000,
            });
            return;
        } else {
            if (Number(price) > 1000000 || Number(price) < 100000) {
                toast.error(<h4>Giá khám phải lớn hơn 100,000đ và nhỏ hơn 1,000,000đ</h4>, {
                    position: toast.POSITION.TOP_RIGHT,
                    autoClose: 2000,
                });
                return;
            }
            const data = {
                clinicId,
                specialistId,
                price: Number(price),
                description,
                contentMarkdown,
                contentHTML,
            };
            console.log(data);
            try {
                await updateProfileDoctor(axiosJWT, user, data);
                toast.success(<h4>{'Cập nhật hồ sơ thành công'}</h4>, {
                    position: toast.POSITION.TOP_RIGHT,
                    autoClose: 2000,
                });
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
            setLoading(true);
            const data = await getProfileDoctor(user.id);
            console.log(data);
            const dateAllCLinic = await getAllClinicName();
            const dataAllSpecialist = await getAllSpecialistNoImage();
            setClinicId(data.clinicId || '');
            setSpecialistId(data.specialistId || '');
            setPrice(String(data.price) || '');
            setDescription(data.description || '');
            setcontentMarkdown(data.contentMarkdown || '');
            setcontentHTML(data.contentHTML || '');
            setAllClinic(dateAllCLinic);
            setAllSpecialist(dataAllSpecialist);
            setLoading(false);
        };
        getData();
    }, []);
    return (
        <ProtectedRoute isAllowed={user.roleId === 'R2'}>
            <div>
                <HeaderLite title={`Cập nhật hồ sơ bác sĩ : \u00A0${user.lastName} ${user.firstName}`} />

                <div className={cx('content', 'container')}>
                    {loading ? (
                        <div className={cx('container-loading-icon')}>
                            <LoadingIcon />
                        </div>
                    ) : (
                        <>
                            <div className={cx('row', 'row-one')}>
                                <div className={cx('name-container', 'col-5')}>
                                    <span className={cx('label')}>Bệnh viện đang công tác</span>
                                    <Select
                                        className={cx('select-container')}
                                        options={optionsClinic}
                                        placeholder={'Chọn bệnh viện'}
                                        value={optionsClinic.find((element) => {
                                            return element.value === clinicId;
                                        })}
                                        onChange={(option) => setClinicId(option.value)}
                                    />
                                </div>
                                <div className={cx('name-container', 'col-4')}>
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
                                <div className={cx('name-container', 'col-3')}>
                                    <span className={cx('label')}>Giá khám</span>
                                    {/* <input className={cx('form-control', 'input')} placeholder="đ" type="text" /> */}
                                    <CurrencyInput
                                        className={cx('input-price')}
                                        id="input-example"
                                        name="input-name"
                                        placeholder="Nhập giá khám (vnđ)"
                                        decimalsLimit={1}
                                        suffix=" VNĐ"
                                        value={price}
                                        onValueChange={(value, name) => setPrice(value)}
                                    />
                                    ;
                                </div>
                            </div>
                            {/* <div className={cx('note')}>
                        <h2>Ghi chú</h2>
                        <textarea value={description} onChange={(e) => setDescription(e.target.value)} />
                    </div> */}
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
                                    Cập nhật
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

export default UpdateProfile;
