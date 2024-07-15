import classNames from 'classnames/bind';
//---------------------------
import style from './ClinicDetail.module.scss';
import { useParams } from 'react-router-dom';
import HeaderLite from '~/components/HeaderLite/index.';
import { useEffect, useState } from 'react';
import { getOneSpecialist } from '~/service/specialist';
import CommonUtils from '~/utils/CommonUtils';
import Image from '~/components/Image';
import { MdPlace } from 'react-icons/md';
import ScheduleDoctor from '~/components/ScheduleDoctor';
import InfoExamination from '~/components/InfoExamination';
import { getAllDoctorOneClinic, getAllDoctorOneSpecialist } from '~/service/doctor/profileDoctor';
import Button from '~/components/Button';
import { getOneClinic } from '~/service/clinic';
import LazyImage from '~/components/LazyImage';
const cx = classNames.bind(style);
function ClinicDetail() {
    const { id } = useParams();
    const [name, setName] = useState('');
    const [bg, setBg] = useState('');
    const [logo, setLogo] = useState('');
    const [contentHTML, setContentHTML] = useState('');
    const [description, setDescription] = useState('');
    const [listDataDoctor, setListDataDoctor] = useState([]);
    useEffect(() => {
        window.scrollTo(0, 0);
        const getData = async () => {
            const data = await getOneClinic(id);
            const dataDoctor = await getAllDoctorOneClinic(id);
            setContentHTML(data.Markdown?.contentHTML || '');
            setDescription(data.Markdown?.description);
            setBg(CommonUtils.toFileFromBase64(data.image));
            setLogo(CommonUtils.toFileFromBase64(data.logo));
            setListDataDoctor(dataDoctor);
            setName(data.name);
        };
        getData();
    }, []);
    console.log(listDataDoctor);
    return (
        <div>
            <div className={cx('wrapper')}>
                <div>
                    <div className={cx('image-real')} style={{ backgroundImage: `url(${bg})` }}></div>
                    <div className={cx('bg-text')}>
                        <div className={cx('container')}>
                            <div className={cx('intro-avatar-clinic-container')}>
                                <div className={cx('intro-avatar-clinic', 'row')}>
                                    <div className={cx('col-3', 'fix-logo')}>
                                        <LazyImage className={cx('image-logo')} src={logo} />
                                    </div>
                                    <div className={cx('col-9')}>
                                        <div className={cx('intro-clinic')}>
                                            <span className={cx('name-clinic')}>{name}</span>
                                            <div className={cx('desc-clinic')}>{description}</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className={cx('info')}>
                                <div dangerouslySetInnerHTML={{ __html: contentHTML }}></div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={cx('doctor-bg')}>
                    <div className="container">
                        {listDataDoctor.map((item) => {
                            return (
                                <div className={cx('doctor-wrapper-item')}>
                                    <div className="row">
                                        <div className={cx('col-6', 'info-doctor-left')}>
                                            <div className={cx('intro-container')}>
                                                <div className={cx('intro-avatar')}>
                                                    <LazyImage src={CommonUtils.toFileFromBase64(item?.User?.image)} />
                                                </div>
                                                <div className={cx('intro-text')}>
                                                    <span className={cx('intro-title')}>
                                                        {(item?.User?.doctorInfo?.positionData?.value || 'Bác sỹ ') +
                                                            ' ' +
                                                            item.User.lastName +
                                                            '' +
                                                            item.User.firstName}
                                                    </span>
                                                    <div className={cx('intro-desc')}>
                                                        {item.User.Markdown.description}
                                                        <br />
                                                        <span>
                                                            {' '}
                                                            <MdPlace className={cx('icon-place')} />{' '}
                                                            {item.clinic.address}
                                                        </span>
                                                    </div>
                                                    <Button to={'/doctor-detail/' + item.User.id} primary>
                                                        Xem thêm
                                                    </Button>
                                                </div>
                                            </div>
                                        </div>
                                        <div className={cx('col-6', 'schedule')}>
                                            <ScheduleDoctor id={2} />
                                            <InfoExamination
                                                nameClinic={item.clinic.name}
                                                address={item.clinic.address}
                                                price={item.price}
                                            />
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ClinicDetail;
