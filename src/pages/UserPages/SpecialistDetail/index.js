import classNames from 'classnames/bind';
//---------------------------
import style from './SpecialistDetail.module.scss';
import { useParams } from 'react-router-dom';
import HeaderLite from '~/components/HeaderLite/index.';
import { useEffect, useState } from 'react';
import { getOneSpecialist } from '~/service/specialist';
import CommonUtils from '~/utils/CommonUtils';
import Image from '~/components/Image';
import { MdPlace } from 'react-icons/md';
import ScheduleDoctor from '~/components/ScheduleDoctor';
import InfoExamination from '~/components/InfoExamination';
import { getAllDoctorOneSpecialist } from '~/service/doctor/profileDoctor';
import Button from '~/components/Button';
const cx = classNames.bind(style);
function SpecialistDetail() {
    const { id } = useParams();
    const [bg, setBg] = useState('');
    const [contentHTML, setContentHTML] = useState('');
    const [listDataDoctor, setListDataDoctor] = useState([]);
    useEffect(() => {
        const getData = async () => {
            const data = await getOneSpecialist(id);
            const dataDoctor = await getAllDoctorOneSpecialist(id);
            setContentHTML(data.Markdown?.contentHTML || '');
            setBg(CommonUtils.toFileFromBase64(data.image));
            setListDataDoctor(dataDoctor);
        };
        getData();
    }, []);
    console.log(listDataDoctor);
    return (
        <div>
            <HeaderLite />;
            <div className={cx('wrapper')}>
                <div className={cx('info-wrapper')} style={{ backgroundImage: `url(${bg})` }}>
                    <div className={cx('info-bg')}>
                        <div className="container">
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
                                                    <Image src={CommonUtils.toFileFromBase64(item?.User?.image)} />
                                                </div>
                                                <div className={cx('intro-text')}>
                                                    <span className={cx('intro-title')}>
                                                        {(item.User.positionData.value || 'Bác sỹ ') +
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
                                                            {item.User.Clinics.address}
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
                                                nameClinic={item.User.Clinics.name}
                                                address={item.User.Clinics.address}
                                                price={item.User.Clinics.Doctor_Info.price}
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

export default SpecialistDetail;
