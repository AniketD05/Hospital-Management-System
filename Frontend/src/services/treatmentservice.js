import axios from "axios"
const BASE_URL="http://localhost:8080/api/treatments"
class TreatmentService {
    getTreatmentDetails(aptid){
        return axios.get(BASE_URL+'/'+aptid)
    }

    updateTreatment(aptid,data){
        return axios.put(BASE_URL+'/'+aptid,data)
    }

    addPrescription(data){
        return axios.post(BASE_URL+'/prescriptions',data)
    }

    deletePrescription(id){
        return axios.delete(BASE_URL+'/prescriptions/'+id)
    }
}

export default new TreatmentService()