import classNames from 'classnames/bind';
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
// -----------------------------------------------------------------------//
import 'react-markdown-editor-lite/lib/index.css';
import styles from './SpecialistCreate.module.scss';
import HeaderLite from '~/components/HeaderLite/index.';
import { useDispatch, useSelector } from 'react-redux';
import Button from '~/components/Button';
import { useEffect, useState } from 'react';
import { loginSuccess } from '~/redux/authSlice';
import { createAxios } from '~/redux/createInstance';
import { useNavigate } from 'react-router-dom';
import ProtectedRoute from '~/routes/ProtectedRoute';
import { FaUpload } from 'react-icons/fa';
import CommonUtils from '~/utils/CommonUtils';
import Lightbox from 'react-image-lightbox';
import { toast, ToastContainer } from 'react-toastify';
import { createNewSpecialist } from '~/service/specialist';
const cx = classNames.bind(styles);
function UpdateProfile() {
    const user = useSelector((state) => state.auth.login.currentUser);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    let axiosJWT = createAxios(user, dispatch, loginSuccess);
    const mdParser = new MarkdownIt(/* Markdown-it options */);

    const [name, setName] = useState('');
    const [image, setImage] = useState('');
    const [contentHTML, setcontentHTML] = useState('');
    const [previewImgURL, setPreviewImgURL] = useState('');
    const [contentMarkdown, setContentMarkdown] = useState('');
    const [isOpenPreview, setIsOpenPreview] = useState(false);
    const handleEditorChange = ({ html, text }) => {
        setcontentHTML(html);
        setContentMarkdown(text);
    };
    const handleChangeImage = async (e) => {
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
    const handleSubmit = async () => {
        if (name === '' || image === '' || contentHTML === '') {
            toast.error(<h4>Vui lòng điền đầy đủ thông tin</h4>, {
                position: toast.POSITION.TOP_RIGHT,
                autoClose: 2000,
            });
            return;
        }
        const data = {
            name,
            image,
            contentHTML,
            contentMarkdown,
        };
        try {
            await createNewSpecialist(axiosJWT, user, data);
            toast.success(<h4>Tạo thành công {name}</h4>, {
                position: toast.POSITION.TOP_RIGHT,
                autoClose: 2000,
            });
            setName('');
            setImage('');
            setPreviewImgURL('');
            setcontentHTML('');
            setContentMarkdown('');
        } catch (error) {
            toast.error(<h4>Xin lỗi! Đã có lỗi xảy ra</h4>, {
                position: toast.POSITION.TOP_RIGHT,
                autoClose: 2000,
            });
        }

        window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    };

    return (
        <ProtectedRoute isAllowed={!!user && user.roleId === 'R1'}>
            <div>
                <HeaderLite title={`Tạo chuyên khoa`} />
                <div className={cx('content', 'container')}>
                    <div className={cx('row', 'row-one')}>
                        <div className={cx('name-container', 'col-4')}>
                            <label className={cx('label')}>Tên chuyên khoa</label>
                            <input
                                className={cx('form-control', 'input')}
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>
                        <div className="col-3"></div>
                        <div className="col-5">
                            <label className={cx('label')}>Ảnh đại diện</label>
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
                            Tạo chuyên khoa
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
            <ToastContainer />
        </ProtectedRoute>
    );
}

export default UpdateProfile;
