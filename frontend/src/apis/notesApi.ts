import { data } from 'react-router-dom';
import Header from '../components/header/Header.tsx';
import type{ Note } from '../types/notes.tsx';
import api from './api.ts'



const getNotesReq = () => {
    const token = localStorage.getItem('token');
    console.log('notesApi')
    return api.get('/notes',{
        headers:{
            Authorization : `Bearer ${token}`
        }
    })
}

const createNotesReq = (data:Note)=>{
    const token = localStorage.getItem('token');
    console.log('post api note data..',data)
   return api.post('/notes',
    data,{

        headers:{
            Authorization : `Bearer ${token}`
        }
    }
   )
}

const editNotesReq = (id:String,data:Note)=>{
    const token = localStorage.getItem('token');
    return api.put(`/notes/${id}`,data,{
                headers:{
            Authorization : `Bearer ${token}`
        }
    });
}

const deleteNotesReq = (id:String)=>{
    const token = localStorage.getItem('token');
    return api.delete(`/notes/${id}`,
        {
                headers:{
            Authorization : `Bearer ${token}`
        }
    }
    );
}

const favsToggleReq = (id:String,data:Note)=>{
    const token = localStorage.getItem('token');
    return api.patch(`/notes/${id}`,data,
              {
                headers:{
            Authorization : `Bearer ${token}`
        }
    }  
    )
}

export { getNotesReq,createNotesReq ,editNotesReq, deleteNotesReq, favsToggleReq };