import axios from 'axios';

export const getAllMedicationOneClinic = async (id) => {
    try {
        const response = await axios.get(`/api/medication/get-all-medication-one-clinic/${id}`);
        return response.data;
    } catch (error) {
        console.log('Error from sever - /api/specialist/create-new');
    }
};

export const createNewMedication = async (user, dataNewMedication, axiosJWT) => {
    try {
        await axiosJWT.post(`/api/medication/create-new-medication/${user.clinicId}`, dataNewMedication, {
            headers: { token: `Bearer ${user.accessToken}` },
        });
    } catch (error) {
        throw new Error('Error from sever -- /api/doctor/create-doctor-account');
    }
};

export const deleteOneMedication = async (user, id, axiosJWT) => {
    try {
        await axiosJWT.delete(`/api/medication/delete-one-medication/${id}`, {
            headers: { token: `Bearer ${user.accessToken}` },
        });
    } catch (error) {
        throw new Error('Error from sever -- /api/medication/delete-one-medicationt');
    }
};
