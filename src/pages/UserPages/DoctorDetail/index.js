import { useParams } from 'react-router-dom';
import HeaderLite from '~/components/HeaderLite/index.';
import SiteMap from '~/components/SiteMap';
import classNames from 'classnames/bind';

import style from './DoctorDetail.module.scss';
const cx = classNames.bind(style);
function DoctorDetail() {
    let { id } = useParams();
    return (
        <div>
            <HeaderLite title="Thông tin bác sỹ chi tiết"></HeaderLite>
            <div className={cx('content', 'container')}>
                <SiteMap />
            </div>
        </div>
    );
}

export default DoctorDetail;
