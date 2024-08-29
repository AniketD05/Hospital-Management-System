import axios from 'axios'
import { useEffect, useState } from 'react'
import Header from '../components/Header'
import SideBar from '../components/SideBar'
import doctorservice from '../services/doctorservice'
import receptionservice from '../services/receptionservice'

function UserHome() {
  const cid = sessionStorage.getItem('id')
  const [empInfo, setempInfo] = useState()
  const [error, setError] = useState(null); 
  const role = sessionStorage.getItem('role')
  useEffect(() => {
    if (role === 'Doctor') {
      doctorservice
        .getDoctorDetails(cid)
        .then((resp) => {
          console.log('Info', resp.data.data)
          setempInfo(resp.data.data)
        })
        .catch((err) => {
          console.log(err)
        })
    }
    if (role === 'Reception') {
      receptionservice
        .getRececptionDetails(cid)
        .then((resp) => {
          console.log('Info', resp.data.data)
          setempInfo(resp.data.data)
        })
        .catch((err) => {
          console.log(err)
        })
    }
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
          <div className='col-sm-6 p-3'>
            <div className='card shadow'>
              <div className='card-header'>
                <h5>Profile</h5>
              </div>
              <div className='card-body'>
                <table className='table table-borderless'>
                  <tbody>
                    <tr>
                      <th>Name</th>
                      <th>{empInfo?.name}</th>
                    </tr>
                    <tr>
                      <th>Address</th>
                      <th>{empInfo?.address}</th>
                    </tr>
                    <tr>
                      <th>Phone</th>
                      <th>{empInfo?.phone}</th>
                    </tr>
                    <tr>
                      <th>Role</th>
                      <th>{role}</th>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default UserHome
