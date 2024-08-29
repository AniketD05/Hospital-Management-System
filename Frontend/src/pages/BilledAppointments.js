import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Header from '../components/Header'
import SideBar from '../components/SideBar'
import appointmentservice from '../services/appointmentservice'

function BilledAppointments() {
  const [data, setdata] = useState([])
  const navigate = useNavigate()
  const role=sessionStorage.getItem('role')
  const loadData = () => {
    appointmentservice.allAppointments().then((resp) => {
      setdata(resp.data)
      console.log(data)
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
              Billed Appointments
            </h4>
            <table className='table table-sm table-light table-striped table-hover'>
              <thead>
                <tr>
                  <th>Id</th>
                  <th>Patient Name</th>
                  <th>Doctor Name</th>
                  <th>Date & Time</th>
                  <th>Remarks</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {data
                  .filter((x) => x.status == 'Billed' || x.status == 'Paid')
                  .map((x) => (
                    <tr key={x.appointmentid}>
                      <td>{x.appointmentid}</td>
                      <td>{x.patient.name}</td>
                      <td>{x.doctor.name}</td>
                      <td>
                        {x.date} {x.time}
                      </td>
                      <td>{x.remarks}</td>
                      <td>{x.status}</td>
                      <td>
                        {x.status === 'Billed' && role==='Reception' ? (
                          <button
                            onClick={(e) =>
                              navigate('/createbill/' + x.appointmentid)
                            }
                            className='btn btn-primary btn-sm'
                          >
                            Create Bill
                          </button>
                        ) : (
                          <button
                            onClick={(e) =>
                              navigate('/viewbill/' + x.appointmentid)
                            }
                            className='btn btn-success btn-sm'
                          >
                            View Bill
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

export default BilledAppointments
