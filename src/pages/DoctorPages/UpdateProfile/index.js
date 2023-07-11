import classNames from 'classnames/bind';
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
// -----------------------------------------------------------------------//
import 'react-markdown-editor-lite/lib/index.css';
import styles from './UpdateProfile.module.scss';
import HeaderLite from '~/components/HeaderLite/index.';
import { useDispatch, useSelector } from 'react-redux';
import Button from '~/components/Button';
import { useEffect, useState } from 'react';
import { getProfileDoctor, UpdateProfileDoctor } from '~/service/doctor/profileDoctor';
import { loginSuccess } from '~/redux/authSlice';
import { createAxios } from '~/redux/createInstance';
import { useNavigate } from 'react-router-dom';
const cx = classNames.bind(styles);
function UpdateProfile() {
    const user = useSelector((state) => state.auth.login.currentUser);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    let axiosJWT = createAxios(user, dispatch, loginSuccess);
    const mdParser = new MarkdownIt(/* Markdown-it options */);
    const handleEditorChange = ({ html, text }) => {
        setcontentHTML(html);
        setcontentMarkdown(text);
    };
    const [description, setDescription] = useState('');
    const [contentHTML, setcontentHTML] = useState('');
    const [contentMarkdown, setcontentMarkdown] = useState('');
    const handleSubmit = async () => {
        await UpdateProfileDoctor(axiosJWT, user, {
            description,
            contentHTML,
            contentMarkdown,
        });
        navigate(-1);
    };
    useEffect(() => {
        const getData = async () => {
            const data = await getProfileDoctor(user.id);
            setDescription(data.description || '');
            setcontentMarkdown(data.contentMarkdown || '');
        };
        getData();
    }, []);
    return (
        <div>
            <HeaderLite title={`Cập nhật hồ sơ bác sĩ : \u00A0${user.lastName} ${user.firstName}`} />
            <div className={cx('content', 'container')}>
                <div className={cx('desc')}>
                    <h2>Cập nhật phần giới thiệu</h2>
                    <textarea value={description} onChange={(e) => setDescription(e.target.value)} />
                </div>
                <div className={cx('detail-info')}>
                    <h2>Cập nhật thông tin chi tiết </h2>
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
            </div>
        </div>
    );
}

export default UpdateProfile;
