import { data } from 'react-router-dom';
import Header from '../components/header/Header.tsx';
import type{ Note } from '../types/notes.tsx';
import api from './api.ts'

const getNotesReq = () => {
    console.log('notesApi')
    const token = localStorage.getItem('token');
    return api.get('/notes',{
        headers:{
            Authorization : `Bearer ${token}`
        }
    })
}

const createNotesReq = (data:Note)=>{
    console.log('post api note data..',data)
   const token = localStorage.getItem('token');
   return api.post('/notes',
    data,{

        headers:{
            Authorization : `Bearer ${token}`
        }
    }
   )
}

export { getNotesReq,createNotesReq };