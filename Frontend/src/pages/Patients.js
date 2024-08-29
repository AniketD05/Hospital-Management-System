import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Header from '../components/Header'
import SideBar from '../components/SideBar'
import patientservice from '../services/patientservice'

function Patients() {
  const [data, setdata] = useState([])
  const [Patients, setPatients] = useState([])
  const token = sessionStorage.getItem('token')
  const navigate=useNavigate()
  const role=sessionStorage.getItem('role')
  const [name,setname]=useState()
  

  const deletePatient=id=>{
    patientservice.deletePatientById(id).then(resp=>{
      loadData()
      alert('Patient deleted')
    })
  }

  const loadData = () => {
    console.log('Token ', token)

    patientservice.allPatients().then((resp) => {
      setPatients(resp.data.data)
      console.log(Patients) 
    })
  }

  const searchpatient=val=>{
    patientservice.allPatients().then((resp) => {
      console.log(resp.data)
      setPatients( resp.data.data.filter((patient)=>patient.name.toLowerCase().includes(val.toLowerCase()))
      )
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
          {role === 'Reception' ? (
                <Link to="/register" className='btn btn-primary float-right btn-sm m-2'>Add New</Link>  
                  ):null}
              <form className='form-inline float-right m-2'>
              <label className='mr-2'>Search Patient</label>
              <input type="text" onChange={e=>searchpatient(e.target.value)} className='form-control form-control-sm mr-2'/>
              </form>
            <h4 className='text-left p-2 border-bottom border-dark'>
              All Patients
            </h4>
            <table className='table table-sm table-light table-striped table-hover'>
              <thead>
                <tr>
                  <th>Id</th>
                  <th>Patient Name</th>
                  <th>Address</th>
                  <th>Phone</th>
                  <th>Gender</th>
                  {role === 'Reception' ? (
                  <th>Action</th>
                  ):null}
                </tr>
              </thead>
              <tbody>
                {Patients.filter(x=>x.isactive).map((x) => (
                  <tr key={x.id}>
                    <td>{x.id}</td>
                    <td>{x.name}</td>
                    <td>{x.address}</td>
                    <td>{x.phone}</td>
                    <td>{x.gender}</td>
                      {role === 'Reception' ? (
                        <>
                    <td>
                      <button onClick={e=>navigate('/editpatient',{state:x.id})} className='btn btn-sm btn-success'>Edit</button>
                      <button onClick={e=>navigate('/myappointments',{state:x.id})} className='btn btn-sm btn-primary ml-2'>Appointments</button>
                      <button onClick={e=>deletePatient(x.id)} className='btn btn-sm btn-danger ml-2'>Delete</button>
                    </td>
                      </>
                      ):null}
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

export default Patients
