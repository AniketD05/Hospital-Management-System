import { useEffect } from 'react'
import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import Header from '../components/Header'
import SideBar from '../components/SideBar'
import appointmentservice from '../services/appointmentservice'
import doctorservice from '../services/doctorservice'

function BookAppointment() {
  const navigate = useNavigate()
  const location = useLocation()
  const [doctors, setdoctors] = useState([])
  const [docid, setdocid] = useState('')
  const [date, setdate] = useState('')
  const [time, settime] = useState('')
  const [remarks, setremarks] = useState('')

  console.log("location patientId: ", location.state);

  const handleSubmit = (e) => {
    e.preventDefault()

    // Get today's date
    const today = new Date().toISOString().split('T')[0]

    // Check if the selected date is today or a future date
    if (date < today) {
      alert('Appointment cannot be booked for a past date.')
      return
    }

    // If the selected date is today, check if the selected time is valid
    if (date === today) {
      const currentTime = new Date().toLocaleTimeString('en-GB', { hour12: false }).slice(0, 5)
      if (time < currentTime) {
        alert('Appointment time cannot be in the past.')
        return
      }
    }

    appointmentservice
      .saveAppointment({
        doctorid: docid,
        patientid: location.state,
        date,
        time,
        remarks,
      })
      .then((resp) => {
        alert('Booked')
        navigate('/myappointments', { state: location.state })
      })
      .catch((err) => alert(err.error))
  }

  useEffect(() => {
    doctorservice.getDoctors().then((resp) => setdoctors(resp.data.data))
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
          <div className='col-sm-9'>
            <div className='card shadow mx-auto mt-3'>
              <div className='card-body'>
                <h4 className='text-center p-2'>Book Appointment</h4>
                <form onSubmit={handleSubmit}>
                  <div className='row'>
                    <div className='col-sm-6 mx-auto'>
                      <div className='form-group form-row'>
                        <label className='col-sm-4 col-form-label'>
                          Doctor
                        </label>
                        <div className='col-sm-8'>
                          <select
                            name='docid'
                            required
                            value={docid}
                            onChange={(e) => setdocid(e.target.value)}
                            className='form-control'
                          >
                            <option value=''> -- Select Doctor -- </option>
                            {doctors?.filter(x => x.isactive).map((x) => (
                              <option key={x.id} value={x.id}>{x.name}</option>
                            ))}
                          </select>
                        </div>
                      </div>
                      <div className='form-group form-row'>
                        <label className='col-sm-4 col-form-label'>Date</label>
                        <div className='col-sm-8'>
                          <input
                            type='date'
                            name='date'
                            value={date}
                            onChange={(e) => setdate(e.target.value)}
                            required
                            className='form-control'
                          />
                        </div>
                      </div>
                      <div className='form-group form-row'>
                        <label className='col-sm-4 col-form-label'>Time</label>
                        <div className='col-sm-8'>
                          <input
                            type='time'
                            name='time'
                            required
                            value={time}
                            onChange={(e) => settime(e.target.value)}
                            className='form-control'
                          />
                        </div>
                      </div>
                      <div className='form-group form-row'>
                        <label className='col-sm-4 col-form-label'>
                          Problem
                        </label>
                        <div className='col-sm-8'>
                          <input
                            type='text'
                            name='remarks'
                            required
                            value={remarks}
                            onChange={(e) => setremarks(e.target.value)}
                            className='form-control'
                          />
                        </div>
                      </div>
                      <button className='btn btn-primary float-right'>
                        Book Now
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default BookAppointment





// import { useEffect } from 'react'
// import { useState } from 'react'
// import { useLocation, useNavigate } from 'react-router-dom'
// import Header from '../components/Header'
// import SideBar from '../components/SideBar'
// import appointmentservice from '../services/appointmentservice'
// import doctorservice from '../services/doctorservice'

// function BookAppointment() {
//   const navigate = useNavigate()
//   const location=useLocation()
//   const [doctors, setdoctors] = useState([])
//   const [docid, setdocid] = useState()
//   const [date, setdate] = useState()
//   const [time, settime] = useState()
//   const [remarks, setremarks] = useState()

//   console.log("location patientId: ",location.state);
//   const handleSubmit = (e) => {
//     e.preventDefault()
//     appointmentservice
//       .saveAppointment({
//         doctorid: docid,
//         patientid: location.state,
//         date,
//         time,
//         remarks,
//       })
//       .then((resp) => {
//         alert('Booked')
//         navigate('/myappointments',{state:location.state})
//       })
//       .catch((err) => alert(err.error))
//   }
//   useEffect(() => {
//     doctorservice.getDoctors().then((resp) => setdoctors(resp.data.data))
//   }, [])
//   return (
//     <>
//       <Header />
//       <div className='container-fluid'>
//         <div className='row'>
//           <div
//             className='col-sm-2 bg-transparent p-0 border-right border-dark'
//             style={{ height: 'calc(100vh - 80px)' }}
//           >
//             <SideBar />
//           </div>
//           <div className='col-sm-9'>
//             <div className='card shadow mx-auto mt-3'>
//               <div className='card-body'>
//                 <h4 className='text-center p-2'>Book Appointment</h4>
//                 <form onSubmit={handleSubmit}>
//                   <div className='row'>
//                     <div className='col-sm-6 mx-auto'>
//                       <div className='form-group form-row'>
//                         <label className='col-sm-4 col-form-label'>
//                           Doctor
//                         </label>
//                         <div className='col-sm-8'>
//                           <select
//                             name='docid'
//                             required
//                             value={docid}
//                             onChange={(e) => setdocid(e.target.value)}
//                             className='form-control'
//                           >
//                             <option value> -- Select Doctor -- </option>
//                             {doctors?.filter(x=>x.isactive).map((x) => (
//                               <option value={x.id}>{x.name}</option>
//                             ))}
//                           </select>
//                         </div>
//                       </div>
//                       <div className='form-group form-row'>
//                         <label className='col-sm-4 col-form-label'>Date</label>
//                         <div className='col-sm-8'>
//                           <input
//                             type='date'
//                             name='date'
//                             value={date}
//                             onChange={(e) => setdate(e.target.value)}
//                             required
//                             className='form-control'
//                           />
//                         </div>
//                       </div>
//                       <div className='form-group form-row'>
//                         <label className='col-sm-4 col-form-label'>Time</label>
//                         <div className='col-sm-8'>
//                           <input
//                             type='time'
//                             name='time'
//                             required
//                             value={time}
//                             onChange={(e) => settime(e.target.value)}
//                             className='form-control'
//                           />
//                         </div>
//                       </div>
//                       <div className='form-group form-row'>
//                         <label className='col-sm-4 col-form-label'>
//                           Problem
//                         </label>
//                         <div className='col-sm-8'>
//                           <input
//                             type='text'
//                             name='remarks'
//                             required
//                             value={remarks}
//                             onChange={(e) => setremarks(e.target.value)}
//                             className='form-control'
//                           />
//                         </div>
//                       </div>
//                       <button className='btn btn-primary float-right'>
//                         Book Now
//                       </button>
//                     </div>
//                   </div>
//                 </form>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   )
// }
// export default BookAppointment
