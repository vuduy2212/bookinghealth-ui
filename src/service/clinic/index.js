import axios from 'axios';

export const createNewClinic = async (axiosJWT, user, infoClinic) => {
    try {
        const response = await axiosJWT.post(`/api/clinic/create-new`, infoClinic, {
            headers: { token: `Bearer ${user.accessToken}` },
        });
        return response.data;
    } catch (error) {
        console.log('Error from sever - /api/clinic/create-new');
        throw new Error('Error from sever');
    }
};

export const getAllClinicNoImage = async () => {
    try {
        const response = await axios.get(`/api/clinic/get-all-no-image`);
        return response.data;
    } catch (error) {
        console.log('Error from sever - /api/clinic/get-all');
    }
};
export const getAllClinicName = async () => {
    try {
        const response = await axios.get(`/api/clinic/get-all-name`);
        return response.data;
    } catch (error) {
        console.log('Error from sever - /api/clinic/get-all');
    }
};

export const getOneClinic = async (id) => {
    try {
        const response = await axios.get(`/api/clinic/get-one/${id}`);
        return response.data;
    } catch (error) {
        console.log('Error from sever - /api/clinic/create-new');
    }
};

export const updateClinic = async (axiosJWT, user, id, ClinicUpdated) => {
    try {
        const response = await axiosJWT.patch(`/api/Clinic/update/${id}`, ClinicUpdated, {
            headers: { token: `Bearer ${user.accessToken}` },
        });
        return response.data;
    } catch (error) {
        console.log('Error from sever - /api/clinic/update');
        throw new Error('Error from sever');
    }
};

export const deleteClinic = async (user, id, axiosJWT) => {
    try {
        await axiosJWT.delete(`/api/clinic/delete/${id}`, {
            headers: { token: `Bearer ${user.accessToken}` },
        });
    } catch (error) {
        console.log('Error from sever - /api/clinic/delete');
        throw new Error('Error from sever');
    }
};
