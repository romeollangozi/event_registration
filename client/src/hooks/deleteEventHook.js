import axios from "../axiosConfiguration";
import toast from "react-hot-toast";

const deleteEventHook = async (id) => {
  try {
    const res = await axios.delete(`deleteEvent/${id}`);
    toast.success(res.data.message);
    return res.data;
  } catch (error) {
    if (error.response) {
      throw new Error(error.response.data.message);
    }
    throw new Error(error.message);
  }
};

export default deleteEventHook;
