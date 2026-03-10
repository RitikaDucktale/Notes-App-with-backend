import api from './api.ts';

import type{ User } from '../types/authTypes.tsx';
const signupApi = (data:User)=>{
   return  api.post('/auth/signup',data);
}

const loginApi = (data:User)=>{
    return api.post('/auth/login',data);
}
export { signupApi, loginApi};