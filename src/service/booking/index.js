import axios from 'axios';

export const postBookAppointment = async (infoBooking) => {
    try {
        const response = await axios.post(`/api/booking/create-new-appointment`, infoBooking);
        return response.data;
    } catch (error) {
        throw new Error(error);
    }
};

export const getAllNewBooking = async (axiosJWT, user) => {
    try {
        const res = await axiosJWT.get(`/api/booking/get-all-new-appointment`, {
            headers: { token: `Bearer ${user.accessToken}` },
        });
        return res.data;
    } catch (error) {
        throw new Error(error);
    }
};
export const getAllNewBookingOneClinic = async (axiosJWT, user) => {
    try {
        const res = await axiosJWT.get(`/api/booking/get-all-new-appointment-one-clinic/:${user.clinicId}`, {
            headers: { token: `Bearer ${user.accessToken}` },
        });
        return res.data;
    } catch (error) {
        throw new Error(error);
    }
};
export const confirmBooking = async (user, id, axiosJWT) => {
    try {
        const res = await axiosJWT.patch(
            `/api/booking/confirm-booking`,
            { id },
            {
                headers: { token: `Bearer ${user.accessToken}` },
            },
        );
        return res.data;
    } catch (error) {
        throw new Error(error);
    }
};
export const cancelBooking = async (user, id, axiosJWT) => {
    try {
        const res = await axiosJWT.patch(`/api/booking/cancel-booking/${id}`, {
            headers: { token: `Bearer ${user.accessToken}` },
        });
        return res.data;
    } catch (error) {
        throw new Error(error);
    }
};
export const getConfirmedBookingOneDoctor = async (axiosJWT, user, date) => {
    try {
        const res = await axiosJWT.get(`/api/booking/get-all-confirmed-appointment/${user.id}/${date}`, {
            headers: { token: `Bearer ${user.accessToken}` },
        });
        return res.data;
    } catch (error) {
        throw new Error(error);
    }
};

export const finishedExamination = async (user, id, axiosJWT, file) => {
    try {
        const res = await axiosJWT.patch(
            `/api/booking/finish-examination`,
            { id, file },
            {
                headers: { token: `Bearer ${user.accessToken}` },
            },
        );
        return res.data;
    } catch (error) {
        throw new Error(error);
    }
};
export const getPatientExamined = async (axiosJWT, user, date) => {
    try {
        const res = await axiosJWT.get(`/api/booking/get-patient-examined-one-date/${user.id}/${date}`, {
            headers: { token: `Bearer ${user.accessToken}` },
        });
        return res.data;
    } catch (error) {
        throw new Error(error);
    }
};
export const getPatientExaminedV2 = async (axiosJWT, user, date) => {
    try {
        const res = await axiosJWT.get(`/api/booking/get-patient-examined-one-date-v2/${user.id}/${date}`, {
            headers: { token: `Bearer ${user.accessToken}` },
        });
        return res.data;
    } catch (error) {
        throw new Error(error);
    }
};
export const getBookingOnePatient = async (axiosJWT, user) => {
    try {
        const res = await axiosJWT.get(`/api/booking/get-all-booking-one-patient/${user.id}`, {
            headers: { token: `Bearer ${user.accessToken}` },
        });
        return res.data;
    } catch (error) {
        throw new Error(error);
    }
};
export const getAllExaminedOnePatient = async (id) => {
    try {
        const response = await axios.get(`/api/booking/get-all-examined-one-patient/${id}`);
        return response.data;
    } catch (error) {
        throw new Error(error);
    }
};

export const completeMedicalExamination = async (axiosJWT, user, bookingId, diagnosis, file, medications) => {
    try {
        const res = await axiosJWT.post(
            `/api/booking/complete-medical-examination`,
            {
                bookingId,
                diagnosis,
                file,
                medications,
            },
            {
                headers: { token: `Bearer ${user.accessToken}` },
            },
        );
        return res.data;
    } catch (error) {
        throw new Error(error);
    }
};
