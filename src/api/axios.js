import axios from 'axios'

const instance = axios.create({
    baseURL:'https://raicesruralesb.onrender.com',
    withCredentials:true,
    
})

export default instance
