import axios from '../axiosConfiguration'

export const organizedEventsHook = async () => {
  const res = await axios.get("userEvents");
  return res.data;
};