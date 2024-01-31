import axios from "../axiosConfiguration";

export const getAllEvents = async ({queryKey}) => {
  const user = localStorage.getItem("user");
  let id = "";
  let [_, page] = queryKey
  if (user) {
    id = JSON.parse(user).id;
  }
  const res = await axios.get(`/allEvents/${page}/${id}`);
  return res.data;
};

