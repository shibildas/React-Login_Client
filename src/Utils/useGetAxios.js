import { useEffect, useState } from "react"
import axios from "../axios/axios"

const useGetAxios = (endpoint,token,props)=>{
    const [users, setUsers] = useState([]);
    useEffect(() => {
        axios.get(endpoint, {
          headers: { "x-access-admintoken": token }
        })
        .then((response) => {
          setUsers(response.data.result);
        })
        .catch((error) => {
          console.log(error);
        });
      }, [token,props]);
    
      return users;

}
export default useGetAxios