import axios from 'axios';

const getAllCode = async (type) => {
    try {
        const res = await axios.get(`/api/allcode?type=${type}`);
        return res.data;
    } catch (error) {
        console.log(error);
        return [];
    }
};
export default getAllCode;
