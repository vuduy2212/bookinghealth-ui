import { useParams } from 'react-router-dom';
import HeaderLite from '~/components/HeaderLite/index.';
import SiteMap from '~/components/SiteMap';
import classNames from 'classnames/bind';

import style from './DoctorDetail.module.scss';
import Image from '~/components/Image';
import { useEffect, useState } from 'react';
import { getDetailDoctor } from '~/service/doctor/profileDoctor';
import CommonUtils from '~/utils/CommonUtils';
import ScheduleDoctor from '~/components/ScheduleDoctor';
import InfoExamination from '~/components/InfoExamination';
const cx = classNames.bind(style);
function DoctorDetail() {
    let { id } = useParams();
    const [name, setName] = useState('');
    const [img, setImg] = useState('');
    const [desc, setDesc] = useState('');
    const [profile, setProfile] = useState('');
    useEffect(() => {
        const getDataDoctor = async () => {
            const data = await getDetailDoctor(id);
            setName(`${data.positionData.value} ${data.lastName} ${data.firstName}`);
            setImg(data.image || '');
            setDesc(data.Markdown.description || '');
            setProfile(data.Markdown.contentHTML || '');
        };
        getDataDoctor();
    }, []);
    return (
        <div>
            <HeaderLite title="Thông tin bác sỹ chi tiết"></HeaderLite>
            <div className={cx('content', 'container')}>
                <SiteMap />
                <div className={cx('intro-container')}>
                    <div className={cx('intro-avatar')}>
                        <Image src={CommonUtils.toFileFromBase64(img)} />
                    </div>
                    <div className={cx('intro-text')}>
                        <span className={cx('intro-title')}>{name}</span>
                        <div className={cx('intro-desc')}>{desc}</div>
                    </div>
                </div>
                <div className={cx('booking-container')}>
                    <div className={cx('row')}>
                        <div className={cx('col-7', 'content-left')}>
                            <ScheduleDoctor id={id} />
                        </div>
                        <div className={cx('col-5', 'content-right')}>
                            <InfoExamination />
                        </div>
                    </div>
                </div>
            </div>
            <div className={cx('profile-container')}>
                <div className="container">
                    <div className={cx('profile')}>
                        <div dangerouslySetInnerHTML={{ __html: profile }}></div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default DoctorDetail;
