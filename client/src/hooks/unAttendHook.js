import axios from '../axiosConfiguration'
import toast from 'react-hot-toast';

const unAttendHook= async (id) => {
    try{
    const res = await axios.delete(`/unattend/${id}`);
    toast.success(res.data.message);
    return res.data.message
    }catch(err){
        if(err.response){
            throw new Error(err.response.data.message)
        }else{
            throw new Error(err.message)
        }
    }
}

export default unAttendHook