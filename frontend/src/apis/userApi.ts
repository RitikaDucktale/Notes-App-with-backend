import { data } from "react-router-dom";
import api from "./api";

const userInfoReq = ()=>{
    const token = localStorage.getItem('token');
    return api.get('/user',{
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

const postUserProfileReq = (formData:FormData)=>{
  const token = localStorage.getItem('token');
  return api.post('/user/profile',formData,{
        headers: {
           "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${token}`,
    }
  })
} 

export { userInfoReq, postUserProfileReq};