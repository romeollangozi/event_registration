import axios from "../axiosConfiguration";

const registerHook = async (state) => {
  try {
    const res = await axios.post("register", state);
    return res.data;
  } catch (error) {
    if (error.response) {
      throw new Error(error.response.data.message);
    } else {
      throw new Error(error.message);
    }
  }
};

export default registerHook;
