import axios from 'axios';

export const createNewSpecialist = async (axiosJWT, user, infoSpecialist) => {
    try {
        const response = await axiosJWT.post(`/api/specialist/create-new`, infoSpecialist, {
            headers: { token: `Bearer ${user.accessToken}` },
        });
        return response.data;
    } catch (error) {
        console.log('Error from sever - /api/specialist/create-new');
    }
};

export const getAllSpecialist = async () => {
    try {
        const response = await axios.get(`/api/specialist/get-all`);
        return response.data;
    } catch (error) {
        console.log('Error from sever - /api/specialist/create-new');
    }
};
