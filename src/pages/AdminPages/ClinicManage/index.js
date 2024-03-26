import AdminPageMangage from '~/components/SystemComponent/AdminPageMangage';
import { deleteClinic } from '~/service/clinic';

function ClinicManage() {
    return (
        <AdminPageMangage
            typeManage={'clinic'}
            titlePage={'Quản lí bệnh viện, phòng khám'}
            columnsData={[
                {
                    dataField: 'id',
                    text: 'ID',
                    sort: true,
                    headerClasses: 'id-col',
                },
                {
                    dataField: 'name',
                    text: 'Tên',
                },
                {
                    dataField: 'quantity',
                    text: 'Số lượng bác sĩ',
                    headerClasses: 'quantity-col-small',
                },
                {
                    dataField: 'address',
                    text: 'Địa chỉ',
                    headerClasses: '',
                },
                {
                    dataField: 'phoneNumber',
                    text: 'Số điện thoại',
                    headerClasses: 'quantity-col-small',
                },
                {
                    dataField: 'Xoa',
                    text: 'Action',
                    headerClasses: 'action-col',
                    align: 'center',
                },
            ]}
            api="/api/clinic/get-all-no-image"
            deleteSevice={deleteClinic}
        ></AdminPageMangage>
    );
}

export default ClinicManage;
