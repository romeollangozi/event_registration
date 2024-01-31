import { useMutation } from "@tanstack/react-query";
import axios from "../axiosConfiguration";
import toast from "react-hot-toast";

 
export default  function useAddEventHook() {
  return useMutation({
    mutationFn: async (formData) => {
      try {
        const res = await axios.post("createEvent", formData);
        return res.data;
      } catch (err) {
        if (err.response) {
          throw new Error(err.response.data.message);
        } else if (err.request) {
          throw new Error("No response from the server");
        } else {
          throw new Error(err.message);
        }
      }
    },
    onSuccess: (data) => {
      toast.success(data.message);
    },
  });
}
