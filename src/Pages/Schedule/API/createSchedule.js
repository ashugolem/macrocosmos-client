import axios from "axios";

const CreateSchedule = async (scheduleData) => {
  try {
    const { token } = localStorage;
    const response = await axios({
      method: "post",
      url: `api/schedule/`,
      headers: {
        token: token, 
      },
      data: scheduleData,
    });

    return { success: true, data: response.data };
  } catch (error) {
    if (error.response && error.response.data) {
      return { success: false, message: error.response.data.message || "Schedule creation failed" };
    } else {
      return { success: false, message: "An unknown error occurred" };
    }
  }
};

export default CreateSchedule;
