import { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import { MdClose } from 'react-icons/md';
import { useSelector, useDispatch } from 'react-redux';
import { createAxios } from '~/redux/createInstance';
import { loginSuccess } from '~/redux/authSlice';
import CommonUtils from '~/utils/CommonUtils';
import Button from '~/components/Button';
import styles from './ModalUploadResult.module.scss';
import { getAllMedicationOneClinic } from '~/service/medication';

const cx = classNames.bind(styles);

function ModalUploadResult({
    greenTheme = false,
    bookingId,
    reload,
    submitAction,
    titleButton,
    titleHeader,
    showToast,
    data = {},
    date = '',
    clinicId = '',
}) {
    const user = useSelector((state) => state.auth.login.currentUser);
    const dispatch = useDispatch();
    const [modal, setModal] = useState(false);
    const [file, setFile] = useState('');
    const [diagnosis, setDiagnosis] = useState('');
    const [medications, setMedications] = useState([]); // lưu danh sách đã chọn
    const [medicationOptions, setMedicationOptions] = useState([]); // lưu danh sách thuốc của bệnh viện
    const [currentMedication, setCurrentMedication] = useState({
        dosage: '',
        instructions: '',
        quantity: '',
    });
    const [selectedMedication, setSelectedMedication] = useState({});

    let axiosJWT = createAxios(user, dispatch, loginSuccess);

    const toggleModal = () => {
        setModal(!modal);
    };

    const handleChangeFile = async (e) => {
        try {
            let files = e.target.files;
            let file = files[0];
            if (file) {
                setFile(await CommonUtils.toBase64(file));
            }
        } catch (error) {
            console.log(error);
        }
    };

    const handleAddMedication = () => {
        if (
            selectedMedication &&
            currentMedication.dosage &&
            currentMedication.instructions &&
            currentMedication.quantity
        ) {
            setMedications([
                ...medications,
                {
                    name: JSON.parse(selectedMedication).name,
                    medicationId: JSON.parse(selectedMedication).id,
                    dosage: currentMedication.dosage,
                    instructions: currentMedication.instructions,
                    quantity: currentMedication.quantity,
                },
            ]);
            setCurrentMedication({ name: '', dosage: '', instructions: '', quantity: '' });
            setSelectedMedication('');
        } else {
            alert('Vui lòng điền đầy đủ thông tin thuốc trước khi thêm.');
        }
    };

    const handleChangeCurrentMedication = (field, value) => {
        setCurrentMedication({ ...currentMedication, [field]: value });
    };

    const handleSubmit = async () => {
        setModal(false);
        await submitAction(axiosJWT, user, bookingId, diagnosis, file, medications);
        showToast();
        await reload(date);
    };

    if (modal) {
        document.body.classList.add(cx('active-modal'));
    } else {
        document.body.classList.remove(cx('active-modal'));
    }

    useEffect(() => {
        const getData = async () => {
            const response = await getAllMedicationOneClinic(clinicId);
            setMedicationOptions(response);
        };
        getData();
    }, []);
    return (
        <>
            <Button
                onClick={toggleModal}
                className={cx('btn-modal', {
                    'green-theme': greenTheme,
                })}
            >
                {titleButton}
            </Button>

            {modal && (
                <div className={cx('modal')}>
                    <div onClick={toggleModal} className={cx('overlay')}></div>
                    <div className={cx('modal-content')}>
                        <div className={cx('modal-header')}>
                            <span className={cx('modal-title')}>{titleHeader}</span>
                            <button className={cx('close-modal')} onClick={toggleModal}>
                                <MdClose className={cx('modal-icon-close')} />
                            </button>
                        </div>
                        <div className={cx('modal-body')}>
                            <div className={cx('appointment-info')}>
                                <h2>Thông Tin Cuộc Hẹn</h2>
                                <p>
                                    <strong>Bệnh nhân:</strong> {data.namePatient}
                                </p>
                                <p>
                                    <strong>Số điện thoại:</strong> {data.phoneNumberPatient}
                                </p>
                                <p>
                                    <strong>Thời gian khám:</strong> {data.time + ' - '}
                                    {data.date}
                                </p>
                                <p>
                                    <strong>Bác sĩ:</strong> {data.nameDoctor}
                                </p>
                                <p>
                                    <strong>Chuyên khoa:</strong> {data.specialist}
                                </p>
                                <p>
                                    <strong>Lý do khám:</strong> {data.reason}
                                </p>
                            </div>
                            <form className={cx('form')}>
                                <div className={cx('form-group')}>
                                    <label className={cx('medication-header')} htmlFor="diagnosis">
                                        Chẩn đoán:
                                    </label>
                                    <textarea
                                        id="diagnosis"
                                        name="diagnosis"
                                        rows="4"
                                        value={diagnosis}
                                        onChange={(e) => setDiagnosis(e.target.value)}
                                        required
                                    ></textarea>
                                </div>

                                <div className={cx('form-group', 'file-container')}>
                                    <label className={cx('file-label')} htmlFor="resultFile">
                                        Tải lên kết quả khám chi tiết:
                                    </label>
                                    <input
                                        type="file"
                                        id="resultFile"
                                        name="resultFile"
                                        accept=".pdf,.jpg,.png"
                                        onChange={handleChangeFile}
                                        required
                                    />
                                </div>
                                <div className={cx('form-group')}>
                                    <label className={cx('medication-header')}>Đơn thuốc:</label>
                                    <div className={cx('medication-inputs')}>
                                        <select
                                            className={cx('large-inputs')}
                                            value={selectedMedication}
                                            onChange={(e) => setSelectedMedication(e.target.value)}
                                            required
                                        >
                                            <option value="">Chọn thuốc</option>
                                            {medicationOptions.map((med) => (
                                                <option
                                                    key={med.id}
                                                    value={JSON.stringify({ id: med.id, name: med.name })}
                                                >
                                                    {med.name}
                                                </option>
                                            ))}
                                        </select>
                                        <input
                                            type="text"
                                            placeholder="Liều lượng"
                                            value={currentMedication.dosage}
                                            onChange={(e) => handleChangeCurrentMedication('dosage', e.target.value)}
                                            required
                                        />
                                    </div>
                                    <div className={cx('medication-inputs')}>
                                        <input
                                            className={cx('large-inputs')}
                                            type="text"
                                            placeholder="Hướng dẫn sử dụng"
                                            value={currentMedication.instructions}
                                            onChange={(e) =>
                                                handleChangeCurrentMedication('instructions', e.target.value)
                                            }
                                            required
                                        />
                                        <input
                                            type="text"
                                            placeholder="Số lượng"
                                            value={currentMedication.quantity}
                                            onChange={(e) => handleChangeCurrentMedication('quantity', e.target.value)}
                                            required
                                        />
                                    </div>
                                    <button
                                        type="button"
                                        className={cx('btn-add-medication')}
                                        onClick={handleAddMedication}
                                    >
                                        Thêm thuốc
                                    </button>
                                    <div className={cx('medication-list')}>
                                        {medications.map((med, index) => (
                                            <div key={index} className={cx('medication-item')}>
                                                <span>{med.name}</span>
                                                <span>{med.dosage}</span>
                                                <span>{med.instructions}</span>
                                                <span>{med.quantity}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                <div className={cx('modal-footer')}>
                                    <Button rounded className={cx('modal-button-close')} onClick={toggleModal}>
                                        Đóng
                                    </Button>
                                    <Button
                                        rounded
                                        className={cx('modal-button-save', {
                                            'green-theme': greenTheme,
                                        })}
                                        onClick={handleSubmit}
                                    >
                                        Lưu Kết Quả
                                    </Button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

export default ModalUploadResult;
