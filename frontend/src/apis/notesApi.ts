import api from './Api.ts'

const notesApi = () => {
    console.log('notesApi')
    const token = localStorage.getItem('token');
    return api.get('/notes',{
        headers:{
            Authorization : `Bearer ${token}`
        }
    })
}

export default notesApi;