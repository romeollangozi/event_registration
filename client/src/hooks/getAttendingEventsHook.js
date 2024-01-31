import axios from "../axiosConfiguration";

const getAttendingEventsHook = async () => {
  try {
    const res = await axios.get("attendingEvents");
    return res.data;
  } catch (err) {
    if (err.response) {
      throw new Error(err.response.data.message);
    } else {
      throw new Error(err.message);
    }
  }
};

export default getAttendingEventsHook;
