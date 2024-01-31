import { useMutation } from "@tanstack/react-query";
import axios from "../axiosConfiguration";
import toast from "react-hot-toast";

const useDeleteUserHook = () => {
  return useMutation({
    mutationFn: async (id) => {
      try {
        const res = await axios.delete(`admin/deleteUser/${id}`);
        return res.data.message;
      } catch (err) {
        if (err.response) {
          throw new Error(err.response.data.message);
        } else {
          throw new Error(err.message);
        }
      }
    },
    onSuccess: (message) => {
        toast.success(message)
    }
  });
};

export default useDeleteUserHook;
