import { useEffect } from 'react'
import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Header from '../components/Header'
import SideBar from '../components/SideBar'
import billservice from '../services/billservice'
import treatmentservice from '../services/treatmentservice'

const ViewBill = () => {
  const { aptid } = useParams('aptid')
  const [treatment, settreatment] = useState({})
  const [bill, setbill] = useState({})
  const [total, settotal] = useState()

  const loadData = () => {
    treatmentservice
      .getTreatmentDetails(aptid)
      .then((resp) => settreatment(resp.data))
    billservice.getBillDetails(aptid).then((resp) => setbill(resp.data))
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
            <div className='card shadow mx-auto mt-3'>
              <div className='card-body'>
                <h5 className='text-center p-2'>Patient Bill</h5>
                <div className='form-row'>
                  <div className='col-sm-6'>
                    <div className='card shadow'>
                      <div className='card-body p-2'>
                        <h6>Patient Details</h6>
                        <table className='table table-sm'>
                          <tbody>
                            <tr>
                              <th>Name</th>
                              <th>{treatment?.appointment?.patient?.name}</th>
                              <th>Address</th>
                              <th>
                                {treatment?.appointment?.patient?.address}
                              </th>
                            </tr>
                            <tr>
                              <th>Gender</th>
                              <th>{treatment?.appointment?.patient?.gender}</th>
                              <th>Age</th>
                              <th>
                                {treatment?.appointment?.patient?.age} years
                              </th>
                            </tr>
                            <tr>
                              <th>Phone No</th>
                              <th>{treatment?.appointment?.patient?.phone}</th>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                    <div className='card shadow mt-2'>
                      <div className='card-body p-2'>
                        <h6>Treatment Details</h6>
                        <table className='table table-sm'>
                          <tbody>
                            <tr>
                              <th>Doctor</th>
                              <th>{treatment?.appointment?.doctor?.name}</th>
                            </tr>
                            <tr>
                              <th>Appointment date</th>
                              <th>{treatment?.appointment?.date}</th>
                            </tr>
                            <tr>
                              <th>Symptoms</th>
                              <th>{treatment?.symptoms}</th>
                            </tr>
                            <tr>
                              <th>Diagnosis</th>
                              <th>{treatment?.diagnosis}</th>
                            </tr>
                            <tr>
                              <th>Diet</th>
                              <th>{treatment?.diet}</th>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                  <div className='col-sm-6'>
                    <div className='card shadow'>
                      <div className='card-body p-2'>
                        <h6>Prescription Details</h6>
                        {treatment?.prescriptions?.length > 0 ? (
                          <table className='table table-sm table-bordered'>
                            <thead>
                              <tr>
                                <th>Medicine</th>
                                <th>Dosage</th>
                              </tr>
                            </thead>
                            <tbody>
                              {treatment?.prescriptions.map((x) => (
                                <tr key={x.id}>
                                  <td>{x.medicine}</td>
                                  <td>{x.dosage}</td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        ) : (
                          <h6 className='text-danger p-2'>
                            No Prescription Defined
                          </h6>
                        )}
                      </div>
                    </div>
                    <div className='card shadow mt-2'>
                      <div className='card-body p-2'>
                        <h6>Billing Details</h6>
                        <table className='table table-sm'>
                          <tbody>
                            <tr>
                              <th>Doctor Charges</th>
                              <th>{bill?.doctorcharges}</th>
                            </tr>
                            <tr>
                              <th>Prescription Charges</th>
                              <th>{bill?.prescriptioncharges}</th>
                            </tr>
                          </tbody>
                          <tfoot>
                            <tr>
                              <th>Total</th>
                              <th>
                                {parseInt(bill.doctorcharges || 0) +
                                  parseInt(bill.prescriptioncharges || 0) +
                                  parseInt(bill.roomcharges || 0)}
                              </th>
                            </tr>
                          </tfoot>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default ViewBill
