import { useState, useEffect } from 'react';    
import Header from '../components/Header';
import SideBar from '../components/SideBar';
import doctorservice from '../services/doctorservice';
import { useNavigate } from 'react-router-dom';
import doctorvalidation from '../validation/doctorvalidation';

function AddDoctor() {
  const [user, setUser] = useState({});
  const [errors, setErrors] = useState({});
  const [doctorid, setDoctorId] = useState('');
  const navigate = useNavigate();

  const handleInput = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const validationErrors = doctorvalidation(user);
    setErrors(validationErrors);

  
    if (Object.keys(validationErrors).length === 0) {
      user.userid = doctorid;
      doctorservice
        .addDoctor(user)
        .then((resp) => {
          console.log(resp);
          alert('Doctor registered successfully');
          navigate('/doctors');
        })
        .catch((error) => console.log('Error', error));
    }
  };

  useEffect(() => {
    doctorservice.generateDoctorId().then((resp) => setDoctorId(resp.data.data));
  }, []);

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
                <h4 className='text-center p-2'>Add Doctor</h4>
                <form onSubmit={handleSubmit}>
                  <div className='row'>
                    <div className='col-sm-6 mx-auto'>
                      <div className='form-group form-row'>
                        <label className='col-sm-4 form-control-label'>Full Name</label>
                        <div className='col-sm-8'>
                          <input
                            type='text'
                            name='name'
                            value={user.name || ''}
                            onChange={handleInput}
                            className='form-control form-control-sm'
                          />
                          {errors.name && <small className='text-danger float-right'>{errors.name}</small>}
                        </div>
                      </div>
                      <div className='form-group form-row'>
                        <label className='col-sm-4 form-control-label'>Gender</label>
                        <div className='col-sm-8'>
                          <select
                            name='gender'
                            value={user.gender || ''}
                            onChange={handleInput}
                            className='form-control form-control-sm'
                          >
                            <option value=''>Select Gender</option>
                            <option>Male</option>
                            <option>Female</option>
                          </select>
                          {errors.gender && <small className='text-danger float-right'>{errors.gender}</small>}
                        </div>
                      </div>
                      <div className='form-group form-row'>
                        <label className='col-sm-4 form-control-label'>Address</label>
                        <div className='col-sm-8'>
                          <input
                            type='text'
                            name='address'
                            value={user.address || ''}
                            onChange={handleInput}
                            className='form-control form-control-sm'
                          />
                          {errors.address && <small className='text-danger float-right'>{errors.address}</small>}
                        </div>
                      </div>
                      <div className='form-group form-row'>
                        <label className='col-sm-4 form-control-label'>Age (in years)</label>
                        <div className='col-sm-8'>
                          <input
                            type='number'
                            name='age'
                            value={user.age || ''}
                            onChange={handleInput}
                            className='form-control form-control-sm'
                          />
                          {errors.age && <small className='text-danger float-right'>{errors.age}</small>}
                        </div>
                      </div>
                      <div className='form-group form-row'>
                        <label className='col-sm-4 form-control-label'>Qualification</label>
                        <div className='col-sm-8'>
                          <input
                            type='text'
                            name='qualification'
                            value={user.qualification || ''}
                            onChange={handleInput}
                            className='form-control form-control-sm'
                          />
                          {errors.qualification && (
                            <small className='text-danger float-right'>{errors.qualification}</small>
                          )}
                        </div>
                      </div>
                      <div className='form-group form-row'>
                        <label className='col-sm-4 form-control-label'>Speciality</label>
                        <div className='col-sm-8'>
                          <input
                            type='text'
                            name='speciality'
                            value={user.speciality || ''}
                            onChange={handleInput}
                            className='form-control form-control-sm'
                          />
                          {errors.speciality && <small className='text-danger float-right'>{errors.speciality}</small>}
                        </div>
                      </div>

                      <div className='form-group form-row'>
                        <label className='col-sm-4 form-control-label'>Phone</label>
                        <div className='col-sm-8'>
                          <input
                            type='text'
                            maxLength='10'
                            name='phone'
                            value={user.phone || ''}
                            onChange={handleInput}
                            className='form-control form-control-sm'
                          />
                          {errors.phone && <small className='text-danger float-right'>{errors.phone}</small>}
                        </div>
                      </div>
                      <div className='form-group form-row'>
                        <label className='col-sm-4 form-control-label'>User Id</label>
                        <div className='col-sm-8'>
                          <input
                            type='text'
                            disabled
                            value={doctorid}
                            className='form-control form-control-sm'
                          />
                        </div>
                      </div>
                      <div className='form-group form-row'>
                        <label className='col-sm-4 form-control-label'>Password</label>
                        <div className='col-sm-8'>
                          <input
                            type='password'
                            name='pwd'
                            value={user.pwd || ''}
                            onChange={handleInput}
                            className='form-control form-control-sm'
                          />
                          {errors.pwd && <small className='text-danger float-right'>{errors.pwd}</small>}
                        </div>
                      </div>
                      <button type='submit' className='btn btn-primary btn-sm float-right'>
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
  );
}

export default AddDoctor;






// import { useState, useEffect } from 'react';    //for springboot
// import Header from '../components/Header';
// import SideBar from '../components/SideBar';
// import doctorservice from '../services/doctorservice';
// import { useNavigate } from 'react-router-dom';
// import doctorvalidation from '../validation/doctorvalidation';

// function AddDoctor() {
//   const [user, setUser] = useState({});
//   const [errors, setErrors] = useState({});
//   const [doctorid, setDoctorId] = useState('');
//   const [loading, setLoading] = useState(true); // To handle loading state
//   const navigate = useNavigate();

//   const handleInput = (e) => {
//     setUser({ ...user, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     const validationErrors = doctorvalidation(user);
//     setErrors(validationErrors);

//     if (Object.keys(validationErrors).length === 0) {
//       user.userid = doctorid;
//       doctorservice
//         .addDoctor(user)
//         .then((resp) => {
//           console.log(resp);
//           alert('Doctor registered successfully');
//           navigate('/doctors');
//         })
//         .catch((error) => console.log('Error', error));
//     }
//   };

//   useEffect(() => {
//     doctorservice
//       .generateDoctorId()
//       .then((resp) => {
//         setDoctorId(resp.data);
//         console.log(resp.data);
//         setLoading(false); // Set loading to false after data is fetched
//       })
//       .catch((error) => {
//         console.error('Error fetching doctor ID:', error);
//         setLoading(false);
//       });
//   }, []);

//   if (loading) {
//     return <div>Loading...</div>; // Show loading state if necessary
//   }

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
//                 <h4 className='text-center p-2'>Add Doctor</h4>
//                 <form onSubmit={handleSubmit}>
//                   <div className='row'>
//                     <div className='col-sm-6 mx-auto'>
//                       <div className='form-group form-row'>
//                         <label className='col-sm-4 form-control-label'>Full Name</label>
//                         <div className='col-sm-8'>
//                           <input
//                             type='text'
//                             name='name'
//                             value={user.name || ''}
//                             onChange={handleInput}
//                             className='form-control form-control-sm'
//                           />
//                           {errors.name && <small className='text-danger float-right'>{errors.name}</small>}
//                         </div>
//                       </div>
//                       <div className='form-group form-row'>
//                         <label className='col-sm-4 form-control-label'>Gender</label>
//                         <div className='col-sm-8'>
//                           <select
//                             name='gender'
//                             value={user.gender || ''}
//                             onChange={handleInput}
//                             className='form-control form-control-sm'
//                           >
//                             <option value=''>Select Gender</option>
//                             <option>Male</option>
//                             <option>Female</option>
//                           </select>
//                           {errors.gender && <small className='text-danger float-right'>{errors.gender}</small>}
//                         </div>
//                       </div>
//                       <div className='form-group form-row'>
//                         <label className='col-sm-4 form-control-label'>Address</label>
//                         <div className='col-sm-8'>
//                           <input
//                             type='text'
//                             name='address'
//                             value={user.address || ''}
//                             onChange={handleInput}
//                             className='form-control form-control-sm'
//                           />
//                           {errors.address && <small className='text-danger float-right'>{errors.address}</small>}
//                         </div>
//                       </div>
//                       <div className='form-group form-row'>
//                         <label className='col-sm-4 form-control-label'>Age (in years)</label>
//                         <div className='col-sm-8'>
//                           <input
//                             type='number'
//                             name='age'
//                             value={user.age || ''}
//                             onChange={handleInput}
//                             className='form-control form-control-sm'
//                           />
//                           {errors.age && <small className='text-danger float-right'>{errors.age}</small>}
//                         </div>
//                       </div>
//                       <div className='form-group form-row'>
//                         <label className='col-sm-4 form-control-label'>Qualification</label>
//                         <div className='col-sm-8'>
//                           <input
//                             type='text'
//                             name='qualification'
//                             value={user.qualification || ''}
//                             onChange={handleInput}
//                             className='form-control form-control-sm'
//                           />
//                           {errors.qualification && (
//                             <small className='text-danger float-right'>{errors.qualification}</small>
//                           )}
//                         </div>
//                       </div>
//                       <div className='form-group form-row'>
//                         <label className='col-sm-4 form-control-label'>Speciality</label>
//                         <div className='col-sm-8'>
//                           <input
//                             type='text'
//                             name='speciality'
//                             value={user.speciality || ''}
//                             onChange={handleInput}
//                             className='form-control form-control-sm'
//                           />
//                           {errors.speciality && <small className='text-danger float-right'>{errors.speciality}</small>}
//                         </div>
//                       </div>

//                       <div className='form-group form-row'>
//                         <label className='col-sm-4 form-control-label'>Phone</label>
//                         <div className='col-sm-8'>
//                           <input
//                             type='text'
//                             maxLength='10'
//                             name='phone'
//                             value={user.phone || ''}
//                             onChange={handleInput}
//                             className='form-control form-control-sm'
//                           />
//                           {errors.phone && <small className='text-danger float-right'>{errors.phone}</small>}
//                         </div>
//                       </div>
//                       <div className='form-group form-row'>
//                         <label className='col-sm-4 form-control-label'>User Id</label>
//                         <div className='col-sm-8'>
//                           <input
//                             type='text'
//                             disabled
//                             value={doctorid}
//                             className='form-control form-control-sm'
//                           />
//                         </div>
//                       </div>
//                       <div className='form-group form-row'>
//                         <label className='col-sm-4 form-control-label'>Password</label>
//                         <div className='col-sm-8'>
//                           <input
//                             type='password'
//                             name='pwd'
//                             value={user.pwd || ''}
//                             onChange={handleInput}
//                             className='form-control form-control-sm'
//                           />
//                           {errors.pwd && <small className='text-danger float-right'>{errors.pwd}</small>}
//                         </div>
//                       </div>
//                       <button type='submit' className='btn btn-primary btn-sm float-right'>
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
//   );
// }

// export default AddDoctor;











































// import { useState } from 'react'
// import Header from '../components/Header'
// import SideBar from '../components/SideBar'
// import doctorservice from '../services/doctorservice'
// import { useNavigate } from 'react-router-dom'
// import doctorvalidation from '../validation/doctorvalidation'
// import { useEffect } from 'react'

// function AddDoctor() {
//   const [user, setUser] = useState(null)
//   const [errors, setErrors] = useState({})
//   const [doctorid, setdoctorid] = useState()
//   const navigate = useNavigate()

//   const handleInput = (e) => {
//     setUser({ ...user, [e.target.name]: e.target.value })
//   }

//   const handleSubmit = (e) => {
//     e.preventDefault()
//     setErrors(doctorvalidation(user))

//     if (Object.keys(errors).length === 0) {
//       console.log(user)
//       user.userid = doctorid
//       doctorservice
//         .addDoctor(user)
//         .then((resp) => {
//           console.log(resp)
//           alert('Doctor registered successfully')
//           navigate('/doctors')
//         })
//         .catch((error) => console.log('Error', error))
//     }
//   }

//   useEffect(() => {
//     doctorservice.generateDoctorId().then((resp) => setdoctorid(resp.data.data))
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
//                 <h4 className='text-center p-2'>Add Doctor</h4>
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
//                           {errors?.lname && (
//                             <small className='text-danger float-right'>
//                               {errors?.lname}
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
//                           Age (in years)
//                         </label>
//                         <div className='col-sm-8'>
//                           <input
//                             type='number'
//                             name='age'
//                             value={user?.age}
//                             onChange={handleInput}
//                             className='form-control form-control-sm'
//                           />
//                           {errors?.age && (
//                             <small className='text-danger float-right'>
//                               {errors?.age}
//                             </small>
//                           )}
//                         </div>
//                       </div>
//                       <div className='form-group form-row'>
//                         <label className='col-sm-4 form-control-label'>
//                           Qualification
//                         </label>
//                         <div className='col-sm-8'>
//                           <input
//                             type='text'
//                             name='qualification'
//                             value={user?.qualification}
//                             onChange={handleInput}
//                             className='form-control form-control-sm'
//                           />
//                           {errors?.qualification && (
//                             <small className='text-danger float-right'>
//                               {errors?.qualification}
//                             </small>
//                           )}
//                         </div>
//                       </div>
//                       <div className='form-group form-row'>
//                         <label className='col-sm-4 form-control-label'>
//                           Speciality
//                         </label>
//                         <div className='col-sm-8'>
//                           <input
//                             type='text'
//                             maxLength='10'
//                             name='speciality'
//                             value={user?.speciality}
//                             onChange={handleInput}
//                             className='form-control form-control-sm'
//                           />
//                           {errors?.speciality && (
//                             <small className='text-danger float-right'>
//                               {errors?.speciality}
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
//                             value={doctorid}
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

// export default AddDoctor
