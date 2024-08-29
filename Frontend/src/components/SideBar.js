import { Link } from 'react-router-dom';

function SideBar() {
  const role = sessionStorage.getItem('role');
  const isadmin = role === 'Admin';
  const isdoctor = role === 'Doctor';
  const isreception = role === 'Reception';

  return (
    <div className='sidebar bg-light text-dark h-100 p-3 border-right'>
      <h5 className='text-center mb-4'></h5>
      <div className='list-group list-group-flush'>
        {isadmin && (
          <>
            <Link to='/doctors' className='list-group-item list-group-item-action bg-light text-dark font-weight-bold'>
              Doctors
            </Link>
            <Link to='/receptions' className='list-group-item list-group-item-action bg-light text-dark font-weight-bold'>
              Receptions
            </Link>
            <Link to='/patients' className='list-group-item list-group-item-action bg-light text-dark font-weight-bold'>
              Patients
            </Link>
            <Link to='/bills' className='list-group-item list-group-item-action bg-light text-dark font-weight-bold'>
              Bills
            </Link>
          </>
        )}

        {isdoctor && (
          <>
            <Link to='/uhome' className='list-group-item list-group-item-action bg-light text-dark font-weight-bold'>
              Profile
            </Link>
            <Link to='/patients' className='list-group-item list-group-item-action bg-light text-dark font-weight-bold'>
              Patients
            </Link>
            <Link to='/appointments' className='list-group-item list-group-item-action bg-light text-dark font-weight-bold'>
              Appointments
            </Link>
          </>
        )}

        {isreception && (
          <>
            <Link to='/uhome' className='list-group-item list-group-item-action bg-light text-dark font-weight-bold'>
              Profile
            </Link>
            <Link to='/patients' className='list-group-item list-group-item-action bg-light text-dark font-weight-bold'>
              Patients
            </Link>
            <Link to='/myappointments' className='list-group-item list-group-item-action bg-light text-dark font-weight-bold'>
              Appointments
            </Link>
            <Link to='/bills' className='list-group-item list-group-item-action bg-light text-dark font-weight-bold'>
              Bills
            </Link>
          </>
        )}
      </div>
    </div>
  );
}

export default SideBar;




// import { Link } from 'react-router-dom'

// function SideBar() {
//   const role = sessionStorage.getItem('role')
//   console.log('Role ', role)
//   const isadmin = role === 'Admin'
//   const isdoctor = role === 'Doctor'
//   const isreception = role === 'Reception'
//   return (
//     <div className='list-group list-group-flush'>
//       {isadmin ? (
//         <>
//           <Link
//             to='/doctors'
//             className='list-group-item list-group-item-action p-2 text-left'
//           >
//             Doctors
//           </Link>
//           <Link
//             to='/receptions'
//             className='list-group-item list-group-item-action p-2 text-left'
//           >
//             Receptions
//           </Link>
//           <Link
//             to='/patients'
//             className='list-group-item list-group-item-action p-2 text-left'
//           >
//             Patients
//           </Link>
//           <Link
//             to='/bills'
//             className='list-group-item list-group-item-action p-2 text-left'
//           >
//             Bills
//           </Link>
//         </>
//       ) : null}

//       {isdoctor ? (
//         <>
//           <Link
//             to='/uhome'
//             className='list-group-item list-group-item-action p-2 text-left'
//           >
//             Profile
//           </Link>
//           <Link
//             to='/patients'
//             className='list-group-item list-group-item-action p-2 text-left'
//           >
//             Patients
//           </Link>
//           <Link
//             to='/appointments'
//             className='list-group-item list-group-item-action p-2 text-left'
//           >
//             Appointments
//           </Link>          
//         </>
//       ) : null}
//       {isreception ? (
//         <>
//           <Link
//             to='/uhome'
//             className='list-group-item list-group-item-action p-2 text-left'
//           >
//             Profile
//           </Link>
//           <Link
//             to='/patients'
//             className='list-group-item list-group-item-action p-2 text-left'
//           >
//             Patients
//           </Link>          
//           <Link
//             to='/myappointments'
//             className='list-group-item list-group-item-action p-2 text-left'
//           >
//             Appointments
//           </Link>
//           <Link
//             to='/bills'
//             className='list-group-item list-group-item-action p-2 text-left'
//           >
//             Bills
//           </Link>
//         </>
//       ) : null}
//     </div>
//   )
// }

// export default SideBar



