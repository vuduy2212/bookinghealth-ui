import axios from 'axios';

export const createNewSpecialist = async (axiosJWT, user, infoSpecialist) => {
    try {
        const response = await axiosJWT.post(`/api/specialist/create-new`, infoSpecialist, {
            headers: { token: `Bearer ${user.accessToken}` },
        });
        return response.data;
    } catch (error) {
        console.log('Error from sever - /api/specialist/create-new');
        throw new Error('Error from sever');
    }
};

export const getAllSpecialistNoImage = async () => {
    try {
        const response = await axios.get(`/api/specialist/get-all-no-image`);
        return response.data;
    } catch (error) {
        console.log('Error from sever - /api/specialist/create-new');
    }
};
export const getAllSpecialistName = async () => {
    try {
        const response = await axios.get(`/api/specialist/get-all-name`);
        return response.data;
    } catch (error) {
        console.log('Error from sever - /api/specialist/create-new');
    }
};

export const getOneSpecialist = async (id) => {
    try {
        const response = await axios.get(`/api/specialist/get-one/${id}`);
        return response.data;
    } catch (error) {
        console.log('Error from sever - /api/specialist/create-new');
    }
};

export const updateSpecialist = async (axiosJWT, user, id, specialistUpdated) => {
    try {
        const response = await axiosJWT.patch(`/api/specialist/update/${id}`, specialistUpdated, {
            headers: { token: `Bearer ${user.accessToken}` },
        });
        return response.data;
    } catch (error) {
        console.log('Error from sever - /api/specialist/update');
        throw new Error('Error from sever');
    }
};

export const deleteSpecialist = async (user, id, axiosJWT) => {
    try {
        await axiosJWT.delete(`/api/specialist/delete/${id}`, {
            headers: { token: `Bearer ${user.accessToken}` },
        });
    } catch (error) {
        console.log('Error from sever - /api/specialist/delete');
        throw new Error('Error from sever');
    }
};
