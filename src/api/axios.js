import axios from 'axios'

const instance = axios.create({
    baseURL:'https://raicesrurals.netlify.app',
    withCredentials:true,
    
})

export default instance
