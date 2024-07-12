import AdminTableManage from '~/components/SystemComponent/AdminTableManage/AdminTableManage';
import { deleteClinic } from '~/service/clinic';
import { AdminLayout } from '~/components/Layouts';
import ModalInfo from '~/components/SystemComponent/ModalInfo';
function ClinicManage() {
    const infoFomatter = (cell, row) => {
        return (
            <ModalInfo
                blueTheme
                // data={products.find((item, index) => {
                //     return item.id === row.id;
                // })}
            />
        );
    };
    return (
        <AdminLayout clinic={true}>
            <AdminTableManage
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
                        headerClasses: 'address-col ',
                    },
                    {
                        dataField: 'phoneNumber',
                        text: 'Tên',
                        headerClasses: 'name-col',
                    },
                    {
                        dataField: 'address',
                        text: 'Địa chỉ',
                        headerClasses: 'address-col ',
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
