import AdminPageMangage from '~/components/SystemComponent/AdminPageMangage';

function SpecialistManage() {
    return (
        <AdminPageMangage
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
                {
                    dataField: 'quantity',
                    text: 'Số lượng bác sĩ',
                    headerClasses: 'quantity-col',
                },
                {
                    dataField: 'Xoa',
                    text: 'Action',
                    headerClasses: 'action-col',
                    //formatter: buttonDeleteFomatter,
                    align: 'center',
                },
            ]}
            api="/api/specialist/get-all"
        ></AdminPageMangage>
    );
}

export default SpecialistManage;
