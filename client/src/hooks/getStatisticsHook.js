import axios from "../axiosConfiguration";

const getStatisticsHook = async () =>{
    try{
        const res = await axios.get('admin/getStatistics');
        return res.data
    }catch(err){
        if(err.response){
            throw new Error(err.response.data.message)
        }else{
            throw new Error(err.message)
        }
    }

}

export default getStatisticsHook;

