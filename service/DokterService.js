import request from './axios'

export default class DokterService {
    static getAll() {
        return request({
            method : 'GET',
            url : '/dokter',            
        })
    }
    static getOne(id) {
        return request({
            method : 'GET',
            url : '/dokter/' + id ,
        })
    }
    static create(data) {
        return request({
            method  : 'POST',
            url     : '/dokter/create',
            data    : data,
        })
    }
    static update(id, data) {
        return request({
            method  : 'PUT',
            url     : '/dokter/update/' + id,
            data    : data,
        })
    }
    static delete(id){
        return request({
            method  : 'DELETE',
            url     : '/dokter/delete/' + id,
        })
    }
}

