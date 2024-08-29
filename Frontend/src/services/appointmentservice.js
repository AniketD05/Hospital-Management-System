import axios from "axios"
const BASE_URL="http://localhost:8080/api/appointments"
class AppointmentService {
    saveAppointment(data){
        return axios.post(BASE_URL,data);
    }

    allAppointments(){
        return axios.get(BASE_URL)
    }

    patientAppointments(patid){
        return axios.get(BASE_URL+'/patients/'+patid)
    }

    searchAppointments(date){
        return axios.get(BASE_URL+'/filter?date='+date)
    }

    doctorAppointments(docid){
        return axios.get(BASE_URL+'/doctors/'+docid)
    }

    getAppointmentDetails(id){
        return axios.get(BASE_URL+'/'+id)
    }

    updateAppointment(data){
        return axios.post(BASE_URL+'/updatestatus',data)
    }
}

export default new AppointmentService()