import { useQuery } from '@tanstack/react-query'
import axios from '../axiosConfiguration'


const getAllUsers = () => {
    return useQuery({
        queryKey: ['allUsers'],
        queryFn: async () => {
            try{
                const res = await axios.get('admin/allUsers')
                return res.data
            }catch(err){
                if(err.response){
                    throw new Error(err.response.data.message)
                }else{
                    throw new Error(err.message)
                }
            }
        }
    })
}

export default getAllUsers;