import axios from "axios";
const BASE_URL="http://localhost:8080/api/receptions"
class ReceptionService {
    getReceptions(){
        return axios.get(BASE_URL)
    }

    addReception(data){
        return axios.post(BASE_URL,data)
    }

    updateRececption(id,data){
        return axios.put(BASE_URL+'/'+id,data)
    }

    deleteRececption(id){
        return axios.delete(BASE_URL+'/'+id)
    }

    getRececptionDetails(id){
        return axios.get(BASE_URL+'/'+id)
    }

    generateRececptionId(){
        return axios.get(BASE_URL+'/generateid');
    }
}

export default new ReceptionService()