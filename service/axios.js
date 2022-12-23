import axios from 'axios';

const client = (() => {
    return axios.create({
        baseURL: 'http://localhost:5000',        
    })
})()

const request = async (options, store) => {
    const onSuccess = (response) => {
        const { data } = response
        return data;
    }
    const onError = (error) => {
        return Promise.reject(error.response)
    }
    return client(options).then(onSuccess).catch(onError)
}

export default request