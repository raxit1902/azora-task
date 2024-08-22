// utils/apiHelper.js
import axios from "axios";

const apiHelper = async (method, url, data = null) => {
  const token = localStorage.getItem("jwtToken");
  try {
    const response = await axios({
      method,
      url,
      data,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return { data: response.data, error: null };
  } catch (error) {
    return {
      data: null,
      error: error.response ? error.response.data.message : error.message,
    };
  }
};

export default apiHelper;
