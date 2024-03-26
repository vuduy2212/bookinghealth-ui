import classNames from 'classnames/bind';

// -----------------------------------
import style from './InfoExamination.module.scss';
const cx = classNames.bind(style);
function InfoExamination({ nameClinic, address, price }) {
    function currencyFormat(num) {
        return num.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,') + ' vnđ';
    }
    return (
        <div className={cx('content')}>
            <div className={cx('box-1')}>
                <h4 className={cx('header')}>Địa chỉ khám</h4>
                <h4 className={cx('name-clinic')}>{nameClinic}</h4>
                <h4 className={cx('address')}>{address}</h4>
            </div>
            <h2 className={cx('price-container')}>
                GIÁ KHÁM: <span className={cx('price')}>{currencyFormat(price)}</span>
            </h2>
            <h2 className={cx('note')}>Hỗ trợ tất cả các hình thức thanh toán</h2>
        </div>
    );
}

export default InfoExamination;
