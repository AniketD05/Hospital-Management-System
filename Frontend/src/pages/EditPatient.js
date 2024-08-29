import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import SideBar from '../components/SideBar';
import patientservice from '../services/patientservice';
import patientvalidation from '../validation/patientvalidation';

function EditPatient() {
  const [user, setUser] = useState({
    name: '',
    gender: '',
    address: '',
    age: '',
    phone: '',
  });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const location = useLocation();
  const [patientid, setpatientid] = useState()
  const patid = location.state;

  useEffect(() => {
    patientservice
      .getPatientDetails(patid)
      .then((resp) => {
        console.log('Patient Info', resp.data.data);
        setUser(resp.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [patid]);

  const handleInput = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  
    // Perform validation
    const validationErrors = patientvalidation(user);
    setErrors(validationErrors);
  
    // Check for required fields
    const requiredFields = ['name', 'gender', 'address', 'age', 'phone'];
    let allFieldsFilled = true;
    const updatedErrors = { ...validationErrors };
  
    requiredFields.forEach((field) => {
      if (!user?.[field]) {
        updatedErrors[field] = 'This field is required';
        allFieldsFilled = false;
      }
    });
  
    setErrors(updatedErrors);
  
    
    if (allFieldsFilled && Object.keys(updatedErrors).length === 0) {
      console.log(user);
      user.userid = patientid;
      patientservice
        .register(user)
        .then((resp) => {
          console.log(resp);
          alert('Patient updated successfully');
          navigate('/patients');
        })
        .catch((error) => console.log('Error', error));
    } else {
      alert('Please fill all required fields correctly');
    }
  };

  return (
    <>
      <Header />
      <div className="container-fluid">
        <div className="row">
          <div
            className="col-sm-2 bg-transparent p-0 border-right border-dark"
            style={{ height: 'calc(100vh - 80px)' }}
          >
            <SideBar />
          </div>
          <div className="col-sm-6 offset-2">
            <form onSubmit={handleSubmit}>
              <div className="card shadow mx-auto mt-3">
                <div className="card-body">
                  <h4 className="text-center p-2">Patient Update</h4>
                  <div className="form-group form-row">
                    <label className="col-sm-4 form-control-label">Full Name</label>
                    <div className="col-sm-8">
                      <input
                        type="text"
                        name="name"
                        value={user.name}
                        onChange={handleInput}
                        className="form-control form-control-sm"
                      />
                      {errors.name && (
                        <small className="text-danger float-right">{errors.name}</small>
                      )}
                    </div>
                  </div>
                  <div className="form-group form-row">
                    <label className="col-sm-4 form-control-label">Gender</label>
                    <div className="col-sm-8">
                      <select
                        name="gender"
                        value={user.gender}
                        onChange={handleInput}
                        className="form-control form-control-sm"
                      >
                        <option value="">Select Gender</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                      </select>
                      {errors.gender && (
                        <small className="text-danger float-right">{errors.gender}</small>
                      )}
                    </div>
                  </div>
                  <div className="form-group form-row">
                    <label className="col-sm-4 form-control-label">Address</label>
                    <div className="col-sm-8">
                      <input
                        type="text"
                        name="address"
                        value={user.address}
                        onChange={handleInput}
                        className="form-control form-control-sm"
                      />
                      {errors.address && (
                        <small className="text-danger float-right">{errors.address}</small>
                      )}
                    </div>
                  </div>
                  <div className="form-group form-row">
                    <label className="col-sm-4 form-control-label">Age (in years)</label>
                    <div className="col-sm-8">
                      <input
                        type="number"
                        name="age"
                        value={user.age}
                        onChange={handleInput}
                        className="form-control form-control-sm"
                      />
                      {errors.age && (
                        <small className="text-danger float-right">{errors.age}</small>
                      )}
                    </div>
                  </div>
                  <div className="form-group form-row">
                    <label className="col-sm-4 form-control-label">Phone</label>
                    <div className="col-sm-8">
                      <input
                        type="text"
                        maxLength="10"
                        name="phone"
                        value={user.phone}
                        onChange={handleInput}
                        className="form-control form-control-sm"
                      />
                      {errors.phone && (
                        <small className="text-danger float-right">{errors.phone}</small>
                      )}
                    </div>
                  </div>
                  <button type="submit" className="btn btn-primary btn-sm float-right">
                    Submit
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default EditPatient;





// import { useEffect, useState } from 'react'
// import { useLocation, useNavigate } from 'react-router-dom'
// import Header from '../components/Header'
// import SideBar from '../components/SideBar'
// import patientservice from '../services/patientservice'
// import patientvalidation from '../validation/patientvalidation'

// function EditPatient() {
//   const [user, setUser] = useState(null)
//   const [errors, setErrors] = useState({})
//   const navigate = useNavigate()
//   const location = useLocation()
//   const [patientid, setpatientid] = useState()
//   const patid = location.state

//   useEffect(() => {
//     patientservice
//       .getPatientDetails(patid)
//       .then((resp) => {
//         console.log('Patient Info', resp.data.data)
//         setUser(resp.data.data)
//       })
//       .catch((err) => {
//         console.log(err)
//       })
//   }, [patid])

//   const handleInput = (e) => {
//     setUser({ ...user, [e.target.name]: e.target.value })
//   }

//   const handleSubmit = (e) => {
//     e.preventDefault()

//     // Perform validation
//     const validationErrors = patientvalidation(user)
//     setErrors(validationErrors)

//     // Check for required fields
//     const requiredFields = ['name', 'gender', 'address', 'age', 'phone']
//     let allFieldsFilled = true
//     const updatedErrors = { ...validationErrors }

//     requiredFields.forEach((field) => {
//       if (!user?.[field]) {
//         updatedErrors[field] = 'This field is required'
//         allFieldsFilled = false
//       }
//     })

//     setErrors(updatedErrors)

//     // Only submit if no validation errors
//     if (allFieldsFilled && Object.keys(updatedErrors).length === 0) {
//       console.log(user)
//       user.userid = patientid
//       patientservice
//         .register(user)
//         .then((resp) => {
//           console.log(resp)
//           alert('Patient updated successfully')
//           navigate('/patients')
//         })
//         .catch((error) => console.log('Error', error))
//     } else {
//       alert('Please fill all required fields correctly')
//     }
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
//           <div className='col-sm-6 offset-2'>
//             <form>
//               <div className='card shadow mx-auto mt-3'>
//                 <div className='card-body'>
//                   <h4 className='text-center p-2'>Patient Update</h4>
//                   <div className='form-group form-row'>
//                     <label className='col-sm-4 form-control-label'>Full Name</label>
//                     <div className='col-sm-8'>
//                       <input
//                         type='text'
//                         name='name'
//                         value={user?.name || ''}
//                         onChange={handleInput}
//                         className='form-control form-control-sm'
//                       />
//                       {errors?.name && (
//                         <small className='text-danger float-right'>{errors?.name}</small>
//                       )}
//                     </div>
//                   </div>
//                   <div className='form-group form-row'>
//                     <label className='col-sm-4 form-control-label'>Gender</label>
//                     <div className='col-sm-8'>
//                       <select
//                         name='gender'
//                         value={user?.gender || ''}
//                         onChange={handleInput}
//                         className='form-control form-control-sm'
//                       >
//                         <option value=''>Select Gender</option>
//                         <option>Male</option>
//                         <option>Female</option>
//                       </select>
//                       {errors?.gender && (
//                         <small className='text-danger float-right'>{errors?.gender}</small>
//                       )}
//                     </div>
//                   </div>
//                   <div className='form-group form-row'>
//                     <label className='col-sm-4 form-control-label'>Address</label>
//                     <div className='col-sm-8'>
//                       <input
//                         type='text'
//                         name='address'
//                         value={user?.address || ''}
//                         onChange={handleInput}
//                         className='form-control form-control-sm'
//                       />
//                       {errors?.address && (
//                         <small className='text-danger float-right'>{errors?.address}</small>
//                       )}
//                     </div>
//                   </div>
//                   <div className='form-group form-row'>
//                     <label className='col-sm-4 form-control-label'>Age (in years)</label>
//                     <div className='col-sm-8'>
//                       <input
//                         type='number'
//                         name='age'
//                         value={user?.age || ''}
//                         onChange={handleInput}
//                         className='form-control form-control-sm'
//                       />
//                       {errors?.age && (
//                         <small className='text-danger float-right'>{errors?.age}</small>
//                       )}
//                     </div>
//                   </div>
//                   <div className='form-group form-row'>
//                     <label className='col-sm-4 form-control-label'>Phone</label>
//                     <div className='col-sm-8'>
//                       <input
//                         type='text'
//                         maxLength='10'
//                         name='phone'
//                         value={user?.phone || ''}
//                         onChange={handleInput}
//                         className='form-control form-control-sm'
//                       />
//                       {errors?.phone && (
//                         <small className='text-danger float-right'>{errors?.phone}</small>
//                       )}
//                     </div>
//                   </div>
//                   <button onClick={handleSubmit} className='btn btn-primary btn-sm float-right'>
//                     Submit
//                   </button>
//                 </div>
//               </div>
//             </form>
//           </div>
//         </div>
//       </div>
//     </>
//   )
// }

// export default EditPatient




// import { useEffect, useState } from 'react'
// import { useLocation, useNavigate } from 'react-router-dom'
// import Header from '../components/Header'
// import SideBar from '../components/SideBar'
// import patientservice from '../services/patientservice'
// import patientvalidation from '../validation/patientvalidation'

// function EditPatient() {
//   const [user, setUser] = useState(null)
//   const [errors, setErrors] = useState({})
//   const navigate = useNavigate()
//   const location=useLocation()
//   const [patientid, setpatientid] = useState()
//   const patid=location.state
//   useEffect(() => {
//     patientservice
//       .getPatientDetails(patid)
//       .then((resp) => {
//         console.log('Employee Info', resp.data.data)
//         setUser(resp.data.data)
//       })
//       .catch((err) => {
//         console.log(err)
//       })
//   }, [])

//   const handleInput = (e) => {
//     setUser({ ...user, [e.target.name]: e.target.value })
//   }

//   const handleSubmit = (e) => {
//     e.preventDefault()
//     setErrors(patientvalidation(user))

//     if (Object.keys(errors).length === 0) {
//       console.log(user)
//       user.userid = patientid
//       patientservice
//         .register(user)
//         .then((resp) => {
//           console.log(resp)
//           alert('Patient updated successfully')
//           navigate('/patients')
//         })
//         .catch((error) => console.log('Error', error))
//     }
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
//           <div className='col-sm-6 offset-2'>
//             <form>
//             <div className='card shadow mx-auto mt-3'>
//               <div className='card-body'>
//                   <h4 className='text-center p-2'>Patient Update</h4>
//                   <div className='form-group form-row'>
//                     <label className='col-sm-4 form-control-label'>
//                       Full Name
//                     </label>
//                     <div className='col-sm-8'>
//                       <input
//                         type='text'
//                         name='name'
//                         value={user?.name}
//                         onChange={handleInput}
//                         className='form-control form-control-sm'
//                       />
//                       {errors?.name && (
//                         <small className='text-danger float-right'>
//                           {errors?.name}
//                         </small>
//                       )}
//                     </div>
//                   </div>
//                   <div className='form-group form-row'>
//                     <label className='col-sm-4 form-control-label'>
//                       Gender
//                     </label>
//                     <div className='col-sm-8'>
//                       <select
//                         name='gender'
//                         value={user?.gender}
//                         onChange={handleInput}
//                         className='form-control form-control-sm'
//                       >
//                         <option value=''>Select Gender</option>
//                         <option>Male</option>
//                         <option>Female</option>
//                       </select>
//                       {errors?.lname && (
//                         <small className='text-danger float-right'>
//                           {errors?.lname}
//                         </small>
//                       )}
//                     </div>
//                   </div>
//                   <div className='form-group form-row'>
//                     <label className='col-sm-4 form-control-label'>
//                       Address
//                     </label>
//                     <div className='col-sm-8'>
//                       <input
//                         type='text'
//                         name='address'
//                         value={user?.address}
//                         onChange={handleInput}
//                         className='form-control form-control-sm'
//                       />
//                       {errors?.address && (
//                         <small className='text-danger float-right'>
//                           {errors?.address}
//                         </small>
//                       )}
//                     </div>
//                   </div>
//                   <div className='form-group form-row'>
//                     <label className='col-sm-4 form-control-label'>
//                       Age (in years)
//                     </label>
//                     <div className='col-sm-8'>
//                       <input
//                         type='number'
//                         name='age'
//                         value={user?.age}
//                         onChange={handleInput}
//                         className='form-control form-control-sm'
//                       />
//                       {errors?.age && (
//                         <small className='text-danger float-right'>
//                           {errors?.age}
//                         </small>
//                       )}
//                     </div>
//                   </div>

//                   <div className='form-group form-row'>
//                     <label className='col-sm-4 form-control-label'>Phone</label>
//                     <div className='col-sm-8'>
//                       <input
//                         type='text'
//                         maxLength='10'
//                         name='phone'
//                         value={user?.phone}
//                         onChange={handleInput}
//                         className='form-control form-control-sm'
//                       />
//                       {errors?.phone && (
//                         <small className='text-danger float-right'>
//                           {errors?.phone}
//                         </small>
//                       )}
//                     </div>
//                   </div>                  
//                   <button onClick={handleSubmit} className='btn btn-primary btn-sm float-right'>
//                     Submit
//                   </button>
//                 </div>
//               </div>
//             </form>
//           </div>
//         </div>
//       </div>
//     </>
//   )
// }

// export default EditPatient
