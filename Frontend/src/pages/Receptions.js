// import { useEffect, useState } from 'react'
// import { Link, useNavigate } from 'react-router-dom'
// import Header from '../components/Header'
// import SideBar from '../components/SideBar'
// import receptionservice from '../services/receptionservice'

// function Receptions() {
//   const [receptions, setReceptions] = useState([])
//   const [loading, setLoading] = useState(true)
//   const [error, setError] = useState(null)
//   const navigate = useNavigate()

  // const loadData = () => {
  //   receptionservice.getReceptions()
  //     .then((resp) => {
  //       setReceptions(resp.data.data || [])  // Ensure default to empty array if data is undefined
  //       console.log(resp.data.data)  // Log the response data
  //       setLoading(false)
  //     })
  //     .catch((err) => {
  //       setError('Failed to fetch data')
  //       setLoading(false)
  //       console.log(err)
  //     })
  // }

//   const handleDelete = (id) => {
//     let result = window.confirm('Are you sure to delete this record?')
//     if (result) {
//       receptionservice.deleteReception(id)
//         .then(() => {
//           alert('Reception deleted successfully')
//           loadData()
//         })
//         .catch((error) => {
//           console.log(error)
//           alert('Failed to delete reception')
//         })
//     }
//   }

//   useEffect(() => {
//     loadData()
//   }, [])

//   if (loading) return <div>Loading...</div>
//   if (error) return <div>{error}</div>

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
//               to='/addreception'
//               className='float-right btn btn-sm btn-primary m-2'
//             >
//               Add New
//             </Link>
//             <h4 className='text-left p-2 border-bottom border-dark'>
//               All Receptions
//             </h4>
//             <table className='table table-sm table-light table-striped table-hover'>
//               <thead>
//                 <tr>
//                   <th>Id</th>
//                   <th>Name</th>
//                   <th>Address</th>
//                   <th>Phone</th>
//                   <th>Gender</th>
//                   <th>Action</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {receptions.filter(x => x.isactive).map((x) => (
//                   <tr key={x.id}>
//                     <td>{x.id}</td>
//                     <td>{x.name}</td>
//                     <td>{x.address}</td>
//                     <td>{x.phone}</td>
//                     <td>{x.gender}</td>
//                     <td>
//                       <button
//                         onClick={() => navigate('/editreception', { state: x.id })}
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
//   )
// }

// export default Receptions


import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Header from '../components/Header'
import SideBar from '../components/SideBar'
import receptionservice from '../services/receptionservice'

function Receptions() {
  const [Receptions, setReceptions] = useState([])
  const navigate=useNavigate()
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const loadData = () => {
    receptionservice.getReceptions()
      .then((resp) => {
        setReceptions(resp.data.data || [])  // Ensure default to empty array if data is undefined
        console.log(resp.data.data)  // Log the response data
        setLoading(false)
      })
      .catch((err) => {
        setError('Failed to fetch data')
        setLoading(false)
        console.log(err)
      })
  }
  const handleDelete = (id) => {
    let result = window.confirm('Are you sure to delete this record ?')
    if (result) {
      receptionservice
        .deleteRececption(id)
        .then((resp) => {
          alert('Reception deleted successfully')
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
              to='/addreception'
              className='float-right btn btn-sm btn-primary m-2'
            >
              Add New
            </Link>
            <h4 className='text-left p-2 border-bottom border-dark'>
              All Receptions
            </h4>
            <table className='table table-sm table-light table-striped table-hover'>
              <thead>
                <tr>
                  <th>Id</th>
                  <th>Name</th>
                  <th>Address</th>
                  <th>Phone</th>
                  <th>Gender</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {Receptions.filter(x=>x.isactive).map((x) => (
                  <tr key={x.id}>
                    <td>{x.id}</td>
                    <td>{x.name}</td>
                    <td>{x.address}</td>
                    <td>{x.phone}</td>
                    <td>{x.gender}</td>
                    <td>
                      <button
                        onClick={(e) =>
                          navigate('/editreception',{state:x.id})
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

export default Receptions
