import { deleteSpecialist } from '~/service/specialist';
import { AdminLayout } from '~/components/Layouts';
import AdminTableManage from '~/components/SystemComponent/AdminTableManage/AdminTableManage';
function SpecialistManage() {
    return (
        <AdminLayout specialist={true}>
            <AdminTableManage
                typeManage={'specialist'}
                titlePage={'Quản lí chuyên khoa'}
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
                    // {
                    //     dataField: 'quantity',
                    //     text: 'Số lượng bác sĩ',
                    //     headerClasses: 'quantity-col',
                    // },
                    {
                        dataField: 'Xoa',
                        text: 'Action',
                        headerClasses: 'action-col',
                        align: 'center',
                    },
                ]}
                api="/api/specialist/get-all-no-image"
                deleteSevice={deleteSpecialist}
            />
        </AdminLayout>
    );
}

export default SpecialistManage;
