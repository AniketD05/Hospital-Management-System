import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Header from '../components/Header'
import SideBar from '../components/SideBar'
import appointmentservice from '../services/appointmentservice'

function Appointments() {
  const [data, setdata] = useState([])
  const token = sessionStorage.getItem('token')
  const docid = sessionStorage.getItem('id')
  const navigate = useNavigate()
  const loadData = () => {
    console.log('Token ', token)
    appointmentservice.doctorAppointments(docid).then((resp) => {
      setdata(resp.data)
      console.log(data)
    })
  }

  const handleCancel = (id) => {
    appointmentservice
      .updateAppointment({
        appointmentid: id,
        status: 'Cancelled',
        cancelby: 'Doctor',
      })
      .then((resp) => {
        alert(resp.data)
        loadData()
      })
  }

  const handleAccept = (id) => {
    appointmentservice
      .updateAppointment({
        appointmentid: id,
        status: 'Accepted',
      })
      .then((resp) => {
        alert(resp.data)
        loadData()
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
            <h4 className='text-left p-2 border-bottom border-dark'>
              Doctor Appointments
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
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {data
                  .filter(
                    (x) => x.status != 'Cancelled' && x.status != 'Billed'
                  )
                  .map((x) => (
                    <tr key={x.appointmentid}>
                      <td>{x.appointmentid}</td>
                      <td>{x.doctor.name}</td>
                      <td>{x.patient.name}</td>
                      <td>
                        {x.date} {x.time}
                      </td>
                      <td>{x.remarks}</td>
                      <td>{x.status}</td>
                      <td>
                        {x.status == 'Booked' ? (
                          <>
                            <button
                              onClick={(e) => handleAccept(x.appointmentid)}
                              className='btn btn-success btn-sm mr-2'
                            >
                              Accept
                            </button>
                            <button
                              onClick={(e) => handleCancel(x.appointmentid)}
                              className='btn btn-outline-danger btn-sm mr-2'
                            >
                              Cancel
                            </button>
                          </>
                        ) : (
                          <button
                            onClick={(e) =>
                              navigate('/treatment/' + x.appointmentid)
                            }
                            className='btn btn-primary btn-sm'
                          >
                            Details
                          </button>
                        )}
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

export default Appointments
