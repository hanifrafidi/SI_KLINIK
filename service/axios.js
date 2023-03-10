import axios from 'axios';

const client = (
    () => {
    return axios.create({
        baseURL: 'https://si-klinik-backend-production.up.railway.app',        
    })}
)()

const request = async (options, store) => {
    const onSuccess = (response) => {
        const { data } = response
        return data;
    }
    const onError = (error) => {
        return Promise.reject(error)
    }
    return client(options).then(onSuccess).catch(onError)
}

export default request
