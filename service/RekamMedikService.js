import request from './axios'

export default class ReKamMedikService {
    static getAll() {
        return request({
            method : 'GET',
            url : '/rekam_medik',            
        })
    }
    static getOne(id) {
        return request({
            method : 'GET',
            url : '/rekam_medik/' + id ,
        })
    }
    static getByPasien(id_pasien) {
        return request({
            method : 'GET',
            url : '/rekam_medik/pasien/' + id_pasien,            
        })
    }    
    static create(data) {
        return request({
            method  : 'POST',
            url     : '/rekam_medik/create',
            data    : data,
        })
    }
    static update(id_rekam, data) {
        return request({
            method  : 'UPDATE',
            url     : '/rekam_medik/update/' + id_rekam,
            data    : data,
        })
    }
    static delete(id_rekam){
        return request({
            method  : 'DELETE',
            url     : '/rekam_medik/delete/' + id_rekam,
        })
    }
}

