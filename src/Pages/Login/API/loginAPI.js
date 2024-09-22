import axios from "axios";

const loginAPI = async (auth) => {
  try {
    const { email, password } = auth;
    const response = await axios({
      method: "post",
      url: `api/users/login`,
      data: {
        email,
        password,
      },
    });
    return response.data;
  } catch (error) {
    if (error.response && error.response.data) {
      return { success: false, message: error.response.data.message || "Login failed" };
    } else {
      return { success: false, message: "An unknown error occurred" };
    }
  }
};

export default loginAPI;
