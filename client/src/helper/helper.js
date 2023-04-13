import axios from 'axios';


/**Make API request to*/

export async function autheticate(username){
    try{
        return await axios.post('/api')
    }catch(error){
        return {error: "Username doesn't exist...!"}
    }
}


