import axios from "axios"
const BASE_URL="http://localhost:8080/api/billing"
class BillService {
    getBillDetails(aptid){
        return axios.get(BASE_URL+'/'+aptid)
    }

    createBill(data){
        return axios.post(BASE_URL,data)
    }
}
export default new BillService()