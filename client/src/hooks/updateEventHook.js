import axios from '../axiosConfiguration'


const updateEventHook = async (formData) => {
    try{
        const res = await axios.put(`updateEvent/${formData.id}`, formData)
        return res.data.message
    }catch(err){
        if(err.response){
            throw new Error(err.response.data.message)
        }else{
            throw new Error(err.message)
        }
    }
}

export default updateEventHook;