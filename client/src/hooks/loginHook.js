import axios from "../axiosConfiguration";

const loginHook = async (state) => {
  try {
    const res = await axios.post("login", state);
    return res.data;
  } catch (error) {
    if (error.response) {
      throw new Error(error.response.data.message);
    }
    throw new Error(error.message);
  }
};

export { loginHook };
