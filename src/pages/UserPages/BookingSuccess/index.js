import { BiLike } from 'react-icons/bi';
import classNames from 'classnames/bind';

//----------------------------
import style from './BookingSuccess.module.scss';
const cx = classNames.bind(style);

function BookingSuccess() {
    window.scroll(0, 0);
    return (
        <div>
            <div className={cx('success-container')}>
                <BiLike className={cx('like-icon')}></BiLike>
                <h1>Đặt lịch khám thành công</h1>
                <h4 className={cx('note')}>Quý khách vui lòng chú ý điện thoại sẽ có hỗ trợ viên gọi điện xác nhận.</h4>
                <h4 className={cx('note')}>Hướng dẫn đi khám chi tiết sẽ được hỗ trợ viên hướng dẫn.</h4>
                <h4 className={cx('thanks')}>Xin cảm ơn quý khách đã sử dụng dịch vụ của chúng tôi!</h4>
            </div>
        </div>
    );
}

export default BookingSuccess;
