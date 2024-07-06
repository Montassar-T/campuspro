import axios from 'axios';
import Cookies from 'js-cookie';

const baseURL = 'http://localhost:4200';

const api = axios.create({
    baseURL,
    
});

api.interceptors.request.use(
    (config) => {
      const token = Cookies.get('accessToken');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

const login= async (email, password)=>{
    try {
        const response = await api.post('/auth/login', { email, password });
        console.log(response.data)
        return response.data;

    } catch (error) {
        throw new Error(`Error during login: ${error.message}`);
    }
}


const   fetchListWorkers = async()=>{
    try{
        const response = await api.get('/workers');
        return response.data;
    }catch(err){
        throw new Error(`Error during fetching workers: ${error.message}`);
    }
}

const   fetchListAbsence = async()=>{
    try{
        const response = await api.get('/absence');
        return response;
    }catch(err){
        throw new Error(`Error during absences: ${error.message}`);
    }
}
 

const deleteWork = async (id)=>{
    try{
        const response = await api.delete(`/workers/delete/${id}`)
        return response.data;
    }catch(err){
        throw new Error(`Error deleting worker: ${error.message}`)
    }

}


const addWorker = async()=>{
    const response = await api.post(`workers/add`)
}
export {fetchListWorkers, login, fetchListAbsence, deleteWork}
