import axios from "axios"
const BASE_URL="http://localhost:8080/api/patients"
class PatientService{
    register(data){
        return axios.post(BASE_URL+'/register',data)
    }

    allPatients(){
        return axios.get(BASE_URL)
    }

    getPatientDetails(id){
        return axios.get(BASE_URL+'/'+id)
    }

    generatePatientId(){
        return axios.get(BASE_URL+'/generateid');
    }

    deletePatientById(id){
        return axios.delete(BASE_URL+'/'+id)
    }

    searchPatient(name){
        return axios.get(BASE_URL+'/findByName/'+name)
    }
}

export default new PatientService()