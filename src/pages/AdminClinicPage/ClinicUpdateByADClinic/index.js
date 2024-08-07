import classNames from 'classnames/bind';
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
// -----------------------------------------------------------------------//
import 'react-markdown-editor-lite/lib/index.css';
import styles from './ClinicUpdateByADClinic.module.scss';
import HeaderLite from '~/components/HeaderLite/index.';
import { useDispatch, useSelector } from 'react-redux';
import Button from '~/components/Button';
import { useEffect, useLayoutEffect, useState } from 'react';
import { loginSuccess } from '~/redux/authSlice';
import { createAxios } from '~/redux/createInstance';
import { useNavigate, useParams } from 'react-router-dom';
import ProtectedRoute from '~/routes/ProtectedRoute';
import { FaUpload } from 'react-icons/fa';
import CommonUtils from '~/utils/CommonUtils';
import Lightbox from 'react-image-lightbox';
import { toast, ToastContainer } from 'react-toastify';
import { ClipLoader } from 'react-spinners';
import { getOneClinic, getOneClinicByAdminId, updateClinic, updateClinicByAdminId } from '~/service/clinic';
import LoadingIcon from '~/components/LoadingIcon';
import AdminClinicLayout from '~/components/Layouts/AdminClinicLayout/AdminClinicLayout';
const cx = classNames.bind(styles);
function ClinicUpdateByADClinic() {
    const user = useSelector((state) => state.auth.login.currentUser);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    let axiosJWT = createAxios(user, dispatch, loginSuccess);
    const mdParser = new MarkdownIt(/* Markdown-it options */);

    const [clinicId, setClinicId] = useState('');
    const [name, setName] = useState('');
    const [address, setAddress] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [logo, setLogo] = useState('');
    const [image, setImage] = useState('');
    const [description, setDescription] = useState('');
    const [contentHTML, setcontentHTML] = useState('');
    const [contentMarkdown, setContentMarkdown] = useState('');
    const [previewImgURL, setPreviewImgURL] = useState('');
    const [isOpenPreview, setIsOpenPreview] = useState(false);

    const [previewLogoURL, setPreviewLogoURL] = useState('');
    const [isOpenPreviewLogo, setIsOpenPreviewLogo] = useState(false);

    const [submitting, setSubmitting] = useState(false);
    const [loading, setLoading] = useState(false);
    const [changedLogo, setChangedLogo] = useState(false);
    const [changedImage, setChangedImage] = useState(false);
    const handleEditorChange = ({ html, text }) => {
        setcontentHTML(html);
        setContentMarkdown(text);
    };
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
    const handleChangeLogo = async (e) => {
        setChangedLogo(true);
        try {
            let files = e.target.files;
            let file = files[0];
            if (file) {
                setLogo(await CommonUtils.toBase64(file));
                let objectUrl = URL.createObjectURL(file);
                setPreviewLogoURL(objectUrl);
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
    const openPreviewLogo = () => {
        if (previewLogoURL === '') {
            return;
        }
        setIsOpenPreviewLogo(true);
    };
    const handleSubmit = async () => {
        if (name === '' || address === '' || phoneNumber === '' || logo === '' || image === '' || description === '') {
            toast.error(<h4>Vui lòng điền đầy đủ thông tin</h4>, {
                position: toast.POSITION.TOP_RIGHT,
                autoClose: 2000,
            });
            return;
        }
        const data = {
            id: clinicId,
            name,
            phoneNumber,
            address,
            description,
            contentHTML,
            contentMarkdown,
        };

        if (changedImage === true) {
            data.image = image;
        }
        if (changedLogo === true) {
            data.logo = logo;
        }

        try {
            setSubmitting(true);
            await updateClinicByAdminId(axiosJWT, user, user.id, data);
            toast.success(<h4>Chỉnh sửa thành công : {name}</h4>, {
                position: toast.POSITION.TOP_RIGHT,
                autoClose: 2000,
            });
            setSubmitting(false);
        } catch (error) {
            toast.error(<h4>Xin lỗi! Đã có lỗi xảy ra</h4>, {
                position: toast.POSITION.TOP_RIGHT,
                autoClose: 2000,
            });
        }
        setSubmitting(false);

        window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    };
    useLayoutEffect(() => {
        const getData = async () => {
            setLoading(true);
            const data = await getOneClinicByAdminId(axiosJWT, user);
            setClinicId(data?.id);
            setName(data?.name);
            setPhoneNumber(data?.phoneNumber);
            setAddress(data?.address);
            setImage(data?.image);
            setLogo(data?.Logo);
            setPreviewImgURL(CommonUtils.toFileFromBase64(data?.image));
            setPreviewLogoURL(CommonUtils.toFileFromBase64(data?.logo));
            setcontentHTML(data?.Markdown.contentHTML);
            setContentMarkdown(data?.Markdown.contentMarkdown);
            setDescription(data?.Markdown.description);
            setLoading(false);
        };
        getData(clinicId);
    }, []);
    return (
        <AdminClinicLayout clinic>
            <div>
                <div className={cx('content', 'container')}>
                    <div className={cx('row', 'row-one')}>
                        <div className={cx('name-container', 'col-4')}>
                            <label className={cx('label')}>Tên bệnh viện, phòng khám</label>
                            <input
                                className={cx('form-control', 'input')}
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>
                        <div className={cx('name-container', 'col-2')}>
                            <label className={cx('label')}>Số điện thoại</label>
                            <input
                                className={cx('form-control', 'input')}
                                type="text"
                                value={phoneNumber}
                                onChange={(e) => setPhoneNumber(e.target.value)}
                            />
                        </div>
                        <div className={cx('name-container', 'col-6')}>
                            <label className={cx('label')}>Địa chỉ</label>
                            <input
                                className={cx('form-control', 'input')}
                                type="text"
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className={cx('row', 'row-two')}>
                        <div className="col-5" style={{ position: 'relative' }}>
                            <label className={cx('label')}>Logo</label>
                            <div className={cx('avatar-container')}>
                                <label htmlFor="inputLogoFile" className={cx('input', 'upload-avatar')}>
                                    Tải ảnh
                                    <FaUpload style={{ marginLeft: '10px' }} />
                                </label>
                                <input
                                    type="file"
                                    className={cx('form-control', 'input')}
                                    id="inputLogoFile"
                                    onChange={(e) => handleChangeLogo(e)}
                                    hidden
                                />
                                <div
                                    className={cx('avatar-preview-container')}
                                    style={{ backgroundImage: `url(${previewLogoURL})` }}
                                    onClick={openPreviewLogo}
                                ></div>
                            </div>
                        </div>
                        <div className="col-2"></div>
                        <div className="col-5">
                            <label className={cx('label')}>Ảnh thực tế</label>
                            <div className={cx('avatar-container')}>
                                <label htmlFor="inputAvatarFile" className={cx('input', 'upload-avatar')}>
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
                    </div>
                    <div className={cx('desc')}>
                        <h2>Giới thiệu</h2>
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
                            {submitting ? <ClipLoader /> : 'Lưu thông tin'}
                        </Button>
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
            {isOpenPreviewLogo ? (
                <Lightbox
                    mainSrc={previewLogoURL}
                    onCloseRequest={() => setIsOpenPreviewLogo(false)}
                    onImageLoad={() => {
                        window.dispatchEvent(new Event('resize'));
                    }}
                />
            ) : (
                <></>
            )}
            <ToastContainer />
        </AdminClinicLayout>
    );
}

export default ClinicUpdateByADClinic;
