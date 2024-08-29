import { useState, useEffect } from 'react'
import Header from '../components/Header'
import SideBar from '../components/SideBar'
import { useNavigate } from 'react-router-dom'
import receptionservice from '../services/receptionservice'
import receptionvalidation from '../validation/receptionvalidation'

function AddReception() {
  const [user, setUser] = useState({
    name: '',
    gender: '',
    address: '',
    phone: '',
    pwd: ''
  });
  const [errors, setErrors] = useState({})
  const [receptionid, setReceptionid] = useState()
  const navigate = useNavigate()

  const handleInput = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    // Validate fields
    const validationErrors = receptionvalidation(user);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      user.userid = receptionid
      receptionservice
        .addReception(user)
        .then((resp) => {
          console.log(resp)
          alert('Reception registered successfully')
          navigate('/receptions')
        })
        .catch((error) => console.log('Error', error))
    }
  }

  useEffect(() => {
    receptionservice.generateRececptionId().then((resp) => setReceptionid(resp.data.data))
  }, [])

  return (
    <>
      <Header />
      <div className='container-fluid'>
        <div className='row'>
          <div
            className='col-sm-2 bg-transparent p-0 border-right border-primary'
            style={{ height: 'calc(100vh - 80px)' }}
          >
            <SideBar />
          </div>
          <div className='col-sm-9'>
            <div className='card shadow mx-auto mt-3'>
              <div className='card-body'>
                <h4 className='text-center p-2'>Add Reception</h4>
                <form onSubmit={handleSubmit}>
                  <div className='row'>
                    <div className='col-sm-6 mx-auto'>
                      <div className='form-group form-row'>
                        <label className='col-sm-4 form-control-label'>
                          Full Name
                        </label>
                        <div className='col-sm-8'>
                          <input
                            type='text'
                            name='name'
                            value={user.name}
                            onChange={handleInput}
                            className='form-control form-control-sm'
                          />
                          {errors?.name && (
                            <small className='text-danger float-right'>
                              {errors?.name}
                            </small>
                          )}
                        </div>
                      </div>
                      <div className='form-group form-row'>
                        <label className='col-sm-4 form-control-label'>
                          Gender
                        </label>
                        <div className='col-sm-8'>
                          <select
                            name='gender'
                            value={user.gender}
                            onChange={handleInput}
                            className='form-control form-control-sm'
                          >
                            <option value=''>Select Gender</option>
                            <option>Male</option>
                            <option>Female</option>
                          </select>
                          {errors?.gender && (
                            <small className='text-danger float-right'>
                              {errors?.gender}
                            </small>
                          )}
                        </div>
                      </div>
                      <div className='form-group form-row'>
                        <label className='col-sm-4 form-control-label'>
                          Address
                        </label>
                        <div className='col-sm-8'>
                          <input
                            type='text'
                            name='address'
                            value={user.address}
                            onChange={handleInput}
                            className='form-control form-control-sm'
                          />
                          {errors?.address && (
                            <small className='text-danger float-right'>
                              {errors?.address}
                            </small>
                          )}
                        </div>
                      </div>

                      <div className='form-group form-row'>
                        <label className='col-sm-4 form-control-label'>
                          Phone
                        </label>
                        <div className='col-sm-8'>
                          <input
                            type='text'
                            maxLength='10'
                            name='phone'
                            value={user.phone}
                            onChange={handleInput}
                            className='form-control form-control-sm'
                          />
                          {errors?.phone && (
                            <small className='text-danger float-right'>
                              {errors?.phone}
                            </small>
                          )}
                        </div>
                      </div>
                      <div className='form-group form-row'>
                        <label className='col-sm-4 form-control-label'>
                          User Id
                        </label>
                        <div className='col-sm-8'>
                          <input
                            type='text'
                            disabled
                            value={receptionid}
                            className='form-control form-control-sm'
                          />
                        </div>
                      </div>
                      <div className='form-group form-row'>
                        <label className='col-sm-4 form-control-label'>
                          Password
                        </label>
                        <div className='col-sm-8'>
                          <input
                            type='password'
                            name='pwd'
                            value={user.pwd}
                            onChange={handleInput}
                            className='form-control form-control-sm'
                          />
                          {errors?.pwd && (
                            <small className='text-danger float-right'>
                              {errors?.pwd}
                            </small>
                          )}
                        </div>
                      </div>
                      <button className='btn btn-primary btn-sm float-right'>
                        Submit
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

export default AddReception



// import { useState } from 'react'
// import Header from '../components/Header'
// import SideBar from '../components/SideBar'
// import { useNavigate } from 'react-router-dom'
// import receptionservice from '../services/receptionservice'
// import receptionvalidation from '../validation/receptionvalidation'
// import { useEffect } from 'react'

// function AddReception() {
//   const [user, setUser] = useState(null)
//   const [errors, setErrors] = useState({})
//   const [receptionid, setreceptionid] = useState()
//   const navigate = useNavigate()

//   const handleInput = (e) => {
//     setUser({ ...user, [e.target.name]: e.target.value })
//   }

//   const handleSubmit = (e) => {
//     e.preventDefault()
   
//     const validationErrors = receptionvalidation(user);
//     setErrors(validationErrors);  

//     if (Object.keys(errors).length === 0) {
//       console.log(user)
//       user.userid = receptionid
//       receptionservice
//         .addReception(user)
//         .then((resp) => {
//           console.log(resp)
//           alert('Reception registered successfully')
//           navigate('/receptions')
//         })
//         .catch((error) => console.log('Error', error))
//     }
//   }

//   useEffect(() => {
//     receptionservice.generateRececptionId().then((resp) => setreceptionid(resp.data.data))
//   }, [])

//   return (
//     <>
//       <Header />
//       <div className='container-fluid'>
//         <div className='row'>
//           <div
//             className='col-sm-2 bg-transparent p-0 border-right border-primary'
//             style={{ height: 'calc(100vh - 80px)' }}
//           >
//             <SideBar />
//           </div>
//           <div className='col-sm-9'>
//             <div className='card shadow mx-auto mt-3'>
//               <div className='card-body'>
//                 <h4 className='text-center p-2'>Add Reception</h4>
//                 <form onSubmit={handleSubmit}>
//                   <div className='row'>
//                     <div className='col-sm-6 mx-auto'>
//                       <div className='form-group form-row'>
//                         <label className='col-sm-4 form-control-label'>
//                           Full Name
//                         </label>
//                         <div className='col-sm-8'>
//                           <input
//                             type='text'
//                             name='name'
//                             value={user?.name}
//                             onChange={handleInput}
//                             className='form-control form-control-sm'
//                           />
//                           {errors?.name && (
//                             <small className='text-danger float-right'>
//                               {errors?.name}
//                             </small>
//                           )}
//                         </div>
//                       </div>
//                       <div className='form-group form-row'>
//                         <label className='col-sm-4 form-control-label'>
//                           Gender
//                         </label>
//                         <div className='col-sm-8'>
//                           <select
//                             name='gender'
//                             value={user?.gender}
//                             onChange={handleInput}
//                             className='form-control form-control-sm'
//                           >
//                             <option value=''>Select Gender</option>
//                             <option>Male</option>
//                             <option>Female</option>
//                           </select>
//                           {errors?.gender && (
//                             <small className='text-danger float-right'>
//                               {errors?.gender}
//                             </small>
//                           )}
//                         </div>
//                       </div>
//                       <div className='form-group form-row'>
//                         <label className='col-sm-4 form-control-label'>
//                           Address
//                         </label>
//                         <div className='col-sm-8'>
//                           <input
//                             type='text'
//                             name='address'
//                             value={user?.address}
//                             onChange={handleInput}
//                             className='form-control form-control-sm'
//                           />
//                           {errors?.address && (
//                             <small className='text-danger float-right'>
//                               {errors?.address}
//                             </small>
//                           )}
//                         </div>
//                       </div>

//                       <div className='form-group form-row'>
//                         <label className='col-sm-4 form-control-label'>
//                           Phone
//                         </label>
//                         <div className='col-sm-8'>
//                           <input
//                             type='text'
//                             maxLength='10'
//                             name='phone'
//                             value={user?.phone}
//                             onChange={handleInput}
//                             className='form-control form-control-sm'
//                           />
//                           {errors?.phone && (
//                             <small className='text-danger float-right'>
//                               {errors?.phone}
//                             </small>
//                           )}
//                         </div>
//                       </div>
//                       <div className='form-group form-row'>
//                         <label className='col-sm-4 form-control-label'>
//                           User Id
//                         </label>
//                         <div className='col-sm-8'>
//                           <input
//                             type='text'
//                             disabled
//                             value={receptionid}
//                             className='form-control form-control-sm'
//                           />
//                         </div>
//                       </div>
//                       <div className='form-group form-row'>
//                         <label className='col-sm-4 form-control-label'>
//                           Password
//                         </label>
//                         <div className='col-sm-8'>
//                           <input
//                             type='password'
//                             name='pwd'
//                             value={user?.pwd}
//                             onChange={handleInput}
//                             className='form-control form-control-sm'
//                           />
//                           {errors?.pwd && (
//                             <small className='text-danger float-right'>
//                               {errors?.pwd}
//                             </small>
//                           )}
//                         </div>
//                       </div>
//                       <button className='btn btn-primary btn-sm float-right'>
//                         Submit
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

// export default AddReception
