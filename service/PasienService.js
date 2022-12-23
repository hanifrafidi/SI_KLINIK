import request from './axios'

export default class PasienService {
    static getAll() {
        return request({
            method : 'GET',
            url : '/pasien',            
        })
    }
    static getOne(id) {
        return request({
            method : 'GET',
            url : '/pasien/' + id ,
        })
    }
    static create(data) {
        return request({
            method  : 'POST',
            url     : '/pasien/create',
            data    : data,
        })
    }
    static update(id, data) {
        return request({
            method  : 'UPDATE',
            url     : '/pasien/update/' + id,
            data    : data,
        })
    }
    static delete(id){
        return request({
            method  : 'DELETE',
            url     : '/pasien/delete/' + id,
        })
    }
}

