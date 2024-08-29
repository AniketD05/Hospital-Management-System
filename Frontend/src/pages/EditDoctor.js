import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Header from '../components/Header';
import SideBar from '../components/SideBar';
import doctorservice from '../services/doctorservice';
import doctorvalidation from '../validation/doctorvalidation';

function EditDoctor() {
  const [user, setUser] = useState(null);
  const [errors, setErrors] = useState({});
  const { docid } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    doctorservice
      .getDoctorDetails(docid)
      .then((resp) => {
        console.log('Doctor Info', resp.data.data);
        setUser(resp.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [docid]);

  const handleInput = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();


    const validationErrors = doctorvalidation(user);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {

      doctorservice
        .updateDoctor(docid, user)
        .then((resp) => {
          alert(resp.data);
          navigate('/doctors');
        })
        .catch((error) => {
          console.log('Error:', error);
        });
    } else {
      console.log("Form has errors, not submitting.");
    }
  };


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
                <h4 className='text-center p-2'>View/Edit Doctor</h4>
                <form onSubmit={handleSubmit}>
                  <div className='row'>
                    <div className='col-sm-6 mx-auto'>
                      <div className='form-group form-row'>
                        <label className='col-sm-4 form-control-label'>Doctor Name</label>
                        <div className='col-sm-8'>
                          <input
                            type='text'
                            name='name'
                            value={user?.name}
                            onChange={handleInput}
                            className='form-control form-control-sm'
                          />
                          {errors.name && <small className='text-danger'>{errors.name}</small>}
                        </div>
                      </div>
                      <div className='form-group form-row'>
                        <label className='col-sm-4 form-control-label'>Address</label>
                        <div className='col-sm-8'>
                          <input
                            type='text'
                            name='address'
                            value={user?.address}
                            onChange={handleInput}
                            className='form-control form-control-sm'
                          />
                          {errors.address && <small className='text-danger'>{errors.address}</small>}
                        </div>
                      </div>
                      <div className='form-group form-row'>
                        <label className='col-sm-4 form-control-label'>Speciality</label>
                        <div className='col-sm-8'>
                          <input
                            type='text'
                            name='speciality'
                            value={user?.speciality}
                            onChange={handleInput}
                            className='form-control form-control-sm'
                          />
                          {errors.speciality && <small className='text-danger'>{errors.speciality}</small>}
                        </div>
                      </div>
                      <div className='form-group form-row'>
                        <label className='col-sm-4 form-control-label'>Qualification</label>
                        <div className='col-sm-8'>
                          <input
                            type='text'
                            name='qualification'
                            value={user?.qualification}
                            onChange={handleInput}
                            className='form-control form-control-sm'
                          />
                          {errors.qualification && <small className='text-danger'>{errors.qualification}</small>}
                        </div>
                      </div>
                      <div className='form-group form-row'>
                        <label className='col-sm-4 form-control-label'>Age</label>
                        <div className='col-sm-8'>
                          <input
                            type='number'
                            name='age'
                            value={user?.age}
                            onChange={handleInput}
                            className='form-control form-control-sm'
                          />
                          {errors.age && <small className='text-danger'>{errors.age}</small>}
                        </div>
                      </div>
                      <div className='form-group form-row'>
                        <label className='col-sm-4 form-control-label'>Phone</label>
                        <div className='col-sm-8'>
                          <input
                            type='text'
                            maxLength='10'
                            name='phone'
                            value={user?.phone}
                            onChange={handleInput}
                            className='form-control form-control-sm'
                          />
                          {errors.phone && <small className='text-danger'>{errors.phone}</small>}
                        </div>
                      </div>
                      <button className='btn btn-primary btn-sm float-right'>Submit</button>
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

export default EditDoctor;






// import { useEffect, useState } from 'react'
// import { useNavigate, useParams } from 'react-router-dom'
// import Header from '../components/Header'
// import SideBar from '../components/SideBar'
// import doctorservice from '../services/doctorservice'

// function EditDoctor() {
//   const [user, setUser] = useState(null)
//   const [errors, setErrors] = useState({})
//   const { docid } = useParams('docid')
//   const navigate = useNavigate()

//   useEffect(() => {
//     doctorservice
//       .getDoctorDetails(docid)
//       .then((resp) => {
//         console.log('Doctor Info', resp.data.data)
//         setUser(resp.data.data)
//       })
//       .catch((err) => {
//         console.log(err)
//       })
//   }, [docid])

//   const handleInput = (e) => {
//     setUser({ ...user, [e.target.name]: e.target.value })
//   }

//   const validateForm = () => {
//     const newErrors = {}

//     if (!user?.name) {
//       newErrors.name = 'Doctor Name is required'
//     }
//     if (!user?.address) {
//       newErrors.address = 'Address is required'
//     }
//     if (!user?.speciality) {
//       newErrors.speciality = 'Speciality is required'
//     }
//     if (!user?.qualification) {
//       newErrors.qualification = 'Qualification is required'
//     }
//     if (!user?.phone) {
//       newErrors.phone = 'Phone number is required'
//     } else if (!/^\d{10}$/.test(user.phone)) {
//       newErrors.phone = 'Phone number must be 10 digits'
//     }

//     setErrors(newErrors)
//     return Object.keys(newErrors).length === 0
//   }

//   const handleSubmit = (e) => {
//     e.preventDefault()

//     if (validateForm()) {
//       doctorservice
//         .updateDoctor(docid, user)
//         .then((resp) => {
//           alert(resp.data)
//           navigate('/doctors')
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
//           <div className='col-sm-9'>
//             <div className='card shadow mx-auto mt-3'>
//               <div className='card-body'>
//                 <h4 className='text-center p-2'>View/Edit Doctor</h4>
//                 <form onSubmit={handleSubmit}>
//                   <div className='row'>
//                     <div className='col-sm-6 mx-auto'>
//                       <div className='form-group form-row'>
//                         <label className='col-sm-4 form-control-label'>
//                           Doctor Name
//                         </label>
//                         <div className='col-sm-8'>
//                           <input
//                             type='text'
//                             name='name'
//                             value={user?.name}
//                             onChange={handleInput}
//                             className='form-control form-control-sm'
//                           />
//                           {errors.name && (
//                             <small className='text-danger'>{errors.name}</small>
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
//                           {errors.address && (
//                             <small className='text-danger'>{errors.address}</small>
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
//                             name='speciality'
//                             value={user?.speciality}
//                             onChange={handleInput}
//                             className='form-control form-control-sm'
//                           />
//                           {errors.speciality && (
//                             <small className='text-danger'>{errors.speciality}</small>
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
//                           {errors.qualification && (
//                             <small className='text-danger'>{errors.qualification}</small>
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
//                           {errors.phone && (
//                             <small className='text-danger'>{errors.phone}</small>
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

// export default EditDoctor


// import { useEffect, useState } from 'react'
// import { useNavigate, useParams } from 'react-router-dom'
// import Header from '../components/Header'
// import SideBar from '../components/SideBar'
// import doctorservice from '../services/doctorservice'

// function EditDoctor() {
//   const [user, setUser] = useState(null)
//   const { docid } = useParams('docid')
//   const navigate = useNavigate()
//   useEffect(() => {
//     doctorservice
//       .getDoctorDetails(docid)
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

//     doctorservice
//       .updateDoctor(docid, user)
//       .then((resp) => {
//         alert(resp.data)
//         navigate('/doctors')
//       })
//       .catch((error) => console.log('Error', error))
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
//                 <h4 className='text-center p-2'>View/Edit Doctor</h4>
//                 <form onSubmit={handleSubmit}>
//                   <div className='row'>
//                     <div className='col-sm-6 mx-auto'>
//                       <div className='form-group form-row'>
//                         <label className='col-sm-4 form-control-label'>
//                           Doctor Name
//                         </label>
//                         <div className='col-sm-8'>
//                           <input
//                             type='text'
//                             name='name'
//                             value={user?.name}
//                             className='form-control form-control-sm'
//                           />
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
//                         </div>
//                       </div>
//                       <div className='form-group form-row'>
//                         <label className='col-sm-4 form-control-label'>
//                           Speciality
//                         </label>
//                         <div className='col-sm-8'>
//                           <input
//                             type='text'
//                             name='speciality'
//                             value={user?.speciality}
//                             onChange={handleInput}
//                             className='form-control form-control-sm'
//                           />
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

// export default EditDoctor
