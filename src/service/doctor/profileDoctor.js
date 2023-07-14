import axios from 'axios';

export const getProfileDoctor = async (id) => {
    const response = await axios.get(`/api/doctor/get-profile/${id}`);
    return response.data;
};

export const UpdateProfileDoctor = async (axiosJWT, user, profileUpdated) => {
    try {
        const res = await axiosJWT.patch(`/api/doctor/update-profile/${user.id}`, profileUpdated, {
            headers: { token: `Bearer ${user.accessToken}` },
        });
    } catch (error) {}
};

export const getDetailDoctor = async (id) => {
    const response = await axios.get(`/api/doctor/get-detail-doctor/${id}`);
    return response.data;
};
