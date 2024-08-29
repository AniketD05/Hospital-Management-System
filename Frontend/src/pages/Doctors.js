import { useEffect, useState } from 'react'   
import { Link } from 'react-router-dom'
import Header from '../components/Header'
import SideBar from '../components/SideBar'
import doctorservice from '../services/doctorservice'

function Doctors() {
  const [Doctors, setDoctors] = useState([])
  const token = sessionStorage.getItem('token')

  const loadData = () => {
    console.log('Token ', token)
    doctorservice.getDoctors().then((resp) => {
      setDoctors(resp.data.data)
      console.log(Doctors)
    })
  }
  const handleDelete = (id) => {
    let result = window.confirm('Are you sure to delete this record ?')
    if (result) {
      doctorservice
        .deleteDoctor(id)
        .then((resp) => {
          alert(resp.data.data)
          console.log(resp.data)
          loadData()
        })
        .catch((error) => {
          console.log(error)
        })
    }
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
            <Link
              to='/adddoctor'
              className='float-right btn btn-sm btn-primary m-2'
            >
              Add New
            </Link>
            <h4 className='text-left p-2 border-bottom border-dark'>
              All Doctors
            </h4>
            <table className='table table-sm table-light table-striped table-hover'>
              <thead>
                <tr>
                  <th>Id</th>
                  <th>Doctor Name</th>
                  <th>Address</th>
                  <th>Qualification</th>
                  <th>Phone</th>
                  <th>Speciality</th>
                  <th>Gender</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {Doctors.filter(x=>x.isactive).map((x) => (
                  <tr key={x.id}>
                    <td>{x.id}</td>
                    <td>{x.name}</td>
                    <td>{x.address}</td>
                    <td>{x.qualification}</td>
                    <td>{x.phone}</td>
                    <td>{x.speciality}</td>
                    <td>{x.gender}</td>
                    <td>
                      <button
                        onClick={(e) =>
                          (window.location.href = '/doctors/' + x.id)
                        }
                        className='btn btn-primary mr-2 btn-sm'
                      >
                        Edit
                      </button>
                      <button
                        onClick={(e) => handleDelete(x.id)}
                        className='btn btn-danger btn-sm'
                      >
                        Delete
                      </button>
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

export default Doctors







// import { useCallback, useEffect, useState } from 'react';     // for Dotnet login
// import { Link } from 'react-router-dom';
// import Header from '../components/Header';
// import SideBar from '../components/SideBar';
// import doctorservice from '../services/doctorservice';

// function Doctors() {
//   const [doctors, setDoctors] = useState([]);
//   const token = sessionStorage.getItem('token');

//   const loadData = useCallback(() => {
//     console.log('Token:', token);
//     doctorservice.getDoctors()
//       .then((resp) => {
//         console.log('Full Response:', resp); // Log the entire response
//         // Directly set the response data assuming it's an array
//         setDoctors(resp.data);
//       })
//       .catch((error) => {
//         console.error('Error loading data:', error);
//       });
//   }, [token]);

//   const handleDelete = (id) => {
//     let result = window.confirm('Are you sure to delete this record?');
//     if (result) {
//       doctorservice
//         .deleteDoctor(id)
//         .then((resp) => {
//           alert(resp.data.message || 'Doctor deleted successfully');
//           loadData();
//         })
//         .catch((error) => {
//           console.error('Error deleting doctor:', error);
//         });
//     }
//   };

//   useEffect(() => {
//     loadData();
//   }, [loadData]);

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
//           <div className='col-sm-10'>
//             <Link
//               to='/adddoctor'
//               className='float-right btn btn-sm btn-primary m-2'
//             >
//               Add New
//             </Link>
//             <h4 className='text-left p-2 border-bottom border-dark'>
//               All Doctors
//             </h4>
//             <table className='table table-sm table-light table-striped table-hover'>
//               <thead>
//                 <tr>
//                   <th>Id</th>
//                   <th>Doctor Name</th>
//                   <th>Address</th>
//                   <th>Qualification</th>
//                   <th>Phone</th>
//                   <th>Speciality</th>
//                   <th>Gender</th>
//                   <th>Age</th>
//                   <th>Action</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {doctors.filter(x => x.isActive).map((x) => (
//                   <tr key={x.id}>
//                     <td>{x.id}</td>
//                     <td>{x.name}</td>
//                     <td>{x.address}</td>
//                     <td>{x.qualification}</td>
//                     <td>{x.phone}</td>
//                     <td>{x.speciality}</td>
//                     <td>{x.gender}</td>
//                     <td>{x.age}</td>
//                     <td>
//                       <button
//                         onClick={() => window.location.href = '/doctors/' + x.id}
//                         className='btn btn-primary mr-2 btn-sm'
//                       >
//                         Edit
//                       </button>
//                       <button
//                         onClick={() => handleDelete(x.id)}
//                         className='btn btn-danger btn-sm'
//                       >
//                         Delete
//                       </button>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }

// export default Doctors;








