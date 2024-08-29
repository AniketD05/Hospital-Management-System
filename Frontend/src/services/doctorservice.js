import axios from "axios";
const BASE_URL="http://localhost:8080/api/doctors"
class DoctorService {
    getDoctors(){
        return axios.get(BASE_URL)
    }

    addDoctor(data){
        return axios.post(BASE_URL,data)
    }

    updateDoctor(id,data){
        return axios.put(BASE_URL+'/'+id,data)
    }

    deleteDoctor(id){
        return axios.delete(BASE_URL+'/'+id)
    }

    getDoctorDetails(id){
        return axios.get(BASE_URL+'/'+id)
    }

    generateDoctorId(){
        return axios.get(BASE_URL+'/generateid');
    }
}

export default new DoctorService()