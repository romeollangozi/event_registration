import { useMutation } from "@tanstack/react-query";
import axios from "../axiosConfiguration";
import toast from "react-hot-toast";

const useDeleteEventHook = () => {
  return useMutation({
    mutationFn: async (id) => {
      try {
        const res = await axios.delete(`admin/deleteEvent/${id}`);
        return res.data.message;
      } catch (err) {
        if (err.response) {
          throw Error(err.response.data.message);
        } else {
          throw Error(err.message);
        }
      }
    },
    onSuccess: (message) => {
      toast.success(message);
    },
  });
};

export default useDeleteEventHook;