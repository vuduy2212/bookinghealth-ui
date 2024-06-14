import AdminTableManage from '~/components/SystemComponent/AdminTableManage/AdminTableManage';
import { deleteClinic } from '~/service/clinic';
import { AdminLayout } from '~/components/Layouts';

function ClinicManage() {
    return (
        <AdminLayout clinic={true}>
            <AdminTableManage
                typeManage={'clinic'}
                titlePage={'Quản lí bệnh viện, phòng khám'}
                columnsData={[
                    {
                        dataField: 'id',
                        text: 'STT',
                        sort: true,
                        headerClasses: 'id-col',
                    },
                    {
                        dataField: 'name',
                        text: 'Tên',
                    },
                    {
                        dataField: 'address',
                        text: 'Địa chỉ',
                        headerClasses: '',
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
            />
        </AdminLayout>
    );
}

export default ClinicManage;
