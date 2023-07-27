import axios from 'axios';

export const getScheduleDoctorOneDate = async (doctorId, date, schedule) => {
    const response = await axios.get(`/api/doctor/get-schedule-one-date/${doctorId}/${new Date(date).getTime()}`);
    console.log(response.data);
    const maxPatient = response.data[0] ? response.data[0].maxNumber : 2;
    const data = response.data.map((item) => item.timeType);
    const arraySchedule = schedule.map((item) => {
        if (data.includes(item.keyMap)) {
            item.isSelected = true;
        } else {
            item.isSelected = false;
        }
        return item;
    });
    return { arraySchedule, maxPatient };
};

export const saveScheduleDoctor = async (axiosJWT, user, result, date) => {
    try {
        await axiosJWT.post(
            `/api/doctor/bulk-create-schedule/${user.id}`,
            {
                arraySchedule: result,
                doctorId: user.id,
                date: new Date(date).getTime(),
            },
            {
                headers: { token: `Bearer ${user.accessToken}` },
            },
        );
    } catch (error) {}
};
