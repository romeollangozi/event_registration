import axios from "../axiosConfiguration";

export const addParticipant = async (eventId) => {
  try {
    const res = await axios.post("addParticipant", {data:{eventId: eventId, user: localStorage.getItem('user')} });
    return res.data
  } catch (err) {
    if (err.response) {
      throw new Error(err.response.data.message);
    } else if (err.request) {
      throw new Error("No response from the server");
    } else {
      throw new Error(err.message);
    }
  }
};
