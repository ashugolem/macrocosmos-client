import axios from "axios";

const getAllEmailLogs = async (scheduleData) => {
  try {
    const { token } = localStorage;
    const response = await axios({
      method: "get",
      url: `api/email-log`,
      headers: {
        token: token, 
      },
    });
    console.log(response.data);
    return { success: true, data: response.data };
  } catch (error) {
    if (error.response && error.response.data) {
      return { success: false, message: error.response.data.message || "Email-log Fetching failed" };
    } else {
      return { success: false, message: "An unknown error occurred" };
    }
  }
};

export default getAllEmailLogs;
