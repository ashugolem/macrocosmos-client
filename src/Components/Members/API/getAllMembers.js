import axios from "axios";

const getAllMembers = async () => {
  try {
    const response = await axios({
      method: "get",
      url: `api/users/`,
      headers: {
        'token': localStorage.getItem('token')
      }
    });
    return response.data;
  } catch (error) {
    if (error.response && error.response.data) {
      return { success: false, code: error.response.data.code || 0,  message: error.response.data.message || "Failed to Fetch all members" };
    } else {
      return { success: false, message: "An unknown error occurred" };
    }
  }
};

export default getAllMembers;
