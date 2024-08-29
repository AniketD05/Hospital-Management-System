import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import Header from '../components/Header'
import SideBar from '../components/SideBar'
import appointmentservice from '../services/appointmentservice'

function MyAppointments() {
  const [data, setdata] = useState([])
  const location=useLocation()
  const [date,setdate]=useState()
  const patid = location.state
  const navigate = useNavigate()
  const loadData = () => {
    if(patid==null){
      appointmentservice.allAppointments().then(resp=>{
        setdata(resp.data)
      })
    }else{
      appointmentservice.patientAppointments(patid).then((resp) => {
        setdata(resp.data)
        console.log(data)
      })
    }
  }

  const filterData=e=>{
    e.preventDefault()
    appointmentservice.allAppointments().then(resp=>{
      const data=resp.data.filter(x=>x.date===date)
      setdata(data)

    })
  }

  useEffect(() => {
    loadData()
  }, [])
  return (
    <>
      <Header />
      <div className='container-fluid'>
        <div className='row'>
          <div
            className='col-sm-2 bg-transparent p-0 border-right border-dark'
            style={{ height: 'calc(100vh - 80px)' }}
          >
            <SideBar />
          </div>
          <div className='col-sm-10'>
            <button onClick={e=>navigate('/book',{state:patid})} className='btn btn-sm btn-primary float-right m-2'>Book Appointment</button>
            <form className='form-inline float-right m-2'>
              <label className='mr-2'>Date</label>
              <input type="date" onChange={e=>setdate(e.target.value)} className='form-control form-control-sm mr-2'/>
              <button onClick={filterData} className='btn btn-sm btn-success'>Filter</button>
            </form>
            <h4 className='text-left p-2 border-bottom border-dark'>
              Patient Appointments
            </h4>
            <table className='table table-sm table-light table-striped table-hover'>
              <thead>
                <tr>
                  <th>Id</th>
                  <th>Doctor Name</th>
                  <th>Patient Name</th>
                  <th>Date & Time</th>
                  <th>Remarks</th>
                  <th>Status</th>
                  <th>Details</th>
                </tr>
              </thead>
              <tbody>
                {data.map((x) => (
                  <tr key={x.appointmentid}>
                    <td>{x.appointmentid}</td>
                    <td>{x.doctor.name}</td>
                    <td>{x.patient.name}</td>
                    <td>
                      {x.date} {x.time}
                    </td>
                    <td>{x.remarks}</td>
                    <td>
                      {x.status}{' '}
                      {x.status == 'Cancelled' ? 'by ' + x.cancelBy : null}
                    </td>
                    <td>                      
                      {x.status === 'Paid' ? (
                        <button
                          onClick={(e) =>
                            navigate('/viewbill/' + x.appointmentid)
                          }
                          className='btn btn-success btn-sm'
                        >
                          View Details
                        </button>
                      ) : null}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  )
}

export default MyAppointments
