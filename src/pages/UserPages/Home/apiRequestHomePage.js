import images from '~/assets/images';
import CommonUtils from '~/utils/CommonUtils';

const { default: axios } = require('axios');

const dataHomePage = {
    async topDoctorHome(limit) {
        try {
            const response = await axios.get(`/api/doctor/top-doctor-home/${limit}`);
            return response.data.map((item) => {
                return {
                    title2:
                        (item['positionData.value'] ? item['positionData.value'] : 'Bác sĩ') +
                        ': ' +
                        item.lastName +
                        ' ' +
                        item.firstName,
                    title3: 'Cơ xương khớp',
                    title4: 'Bệnh viện Hữu Nghị Việt Đức',
                    image: item.image ? CommonUtils.toFileFromBase64(item?.image) : images.noImage,
                    to: `/doctor-detail/${item.id}`,
                };
                /*
                    example data 
                    title: 'Bệnh viên Việt Đức',
                    title2: Bác sĩ Nguyễn Văn A,
                    title3: 'Cơ xương khớp',
                    image: link ảnh,
                    to: '/link',
                */
            });
        } catch (error) {
            console.log(error);
            return [];
        }
    },
};

export default dataHomePage;
