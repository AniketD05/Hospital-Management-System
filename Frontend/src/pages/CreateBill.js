import { useEffect } from 'react'
import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Header from '../components/Header'
import SideBar from '../components/SideBar'
import billservice from '../services/billservice'
import treatmentservice from '../services/treatmentservice'

const CreateBill = () => {
  const { aptid } = useParams('aptid')
  const [treatment, settreatment] = useState({})
  const [bill, setbill] = useState({})
  const [total, settotal] = useState()
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    bill.appointmentid = aptid
    billservice
      .createBill(bill)
      .then((resp) => {
        alert(resp.data)
        navigate('/bills')
      })
      .catch((err) => alert(err.error))
  }

  const handleInput = (e) => {
    setbill({ ...bill, [e.target.name]: e.target.value })
  }

  const loadData = () => {
    treatmentservice
      .getTreatmentDetails(aptid)
      .then((resp) => settreatment(resp.data))
  }

  useEffect(() => {
    loadData()
  }, [])
  useEffect(() => {
    settotal(
      parseInt(bill.doctorcharges || 0) +
        parseInt(bill.prescriptioncharges || 0) +
        parseInt(bill.roomcharges || 0)
    )
  }, [bill])
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
                <h5 className='text-center p-2'>Create Patient Bill</h5>
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
                    <div className='card shadow'>
                      <div className='card-body p-2'>
                        <h6>Treatment Details</h6>
                        <table className='table table-sm'>
                          <tbody>
                            <tr>
                              <th>Doctor</th>
                              <th>{treatment?.appointment?.doctor?.name}</th>
                            </tr>
                            <tr>
                              <th>Appointment Date</th>
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
                              <th>Symptoms</th>
                              <th>{treatment?.symptoms}</th>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
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
                  </div>
                  <div className='col-sm-6'>
                    <div className='card shadow'>
                      <div className='card-body p-2'>
                        <h6>Billing Details</h6>
                        <div className='form-group form-row'>
                          <label className='col-sm-4'>Doctor Charges</label>
                          <div className='col-sm-8'>
                            <input
                              type='text'
                              name='doctorcharges'
                              value={bill?.doctorcharges || ''}
                              placeholder='Doctor Charges'
                              onChange={handleInput}
                              className='form-control form-control-sm'
                            />
                          </div>
                        </div>                        
                        <div className='form-group form-row'>
                          <label className='col-sm-4'>
                            Prescription Charges
                          </label>
                          <div className='col-sm-8'>
                            <input
                              type='text'
                              name='prescriptioncharges'
                              value={bill?.prescriptioncharges || ''}
                              placeholder='Prescription Charges'
                              onChange={handleInput}
                              className='form-control form-control-sm'
                            />
                          </div>
                        </div>
                        <div className='form-group form-row'>
                          <label className='col-sm-4'>Total Charges</label>
                          <div className='col-sm-8'>
                            <input
                              type='text'
                              value={total || ''}
                              disabled
                              className='form-control form-control-sm'
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    {total > 0 ? (
                      <div className='card shadow mt-2'>
                        <div className='card-body p-2'>
                          <h6>Payment Information</h6>
                          <div className='form-group form-row'>
                            <label className='col-sm-4'>Card No</label>
                            <div className='col-sm-8'>
                              <input
                                type='text'
                                name='cardno'
                                maxLength={16}
                                value={bill?.cardno || ''}
                                placeholder='Card No'
                                onChange={handleInput}
                                className='form-control form-control-sm'
                              />
                            </div>
                          </div>
                          <div className='form-group form-row'>
                            <label className='col-sm-4'>Name on Card</label>
                            <div className='col-sm-8'>
                              <input
                                type='text'
                                name='nameoncard'
                                value={bill?.nameoncard || ''}
                                placeholder='Name on Card'
                                onChange={handleInput}
                                className='form-control form-control-sm'
                              />
                            </div>
                          </div>

                          <button
                            onClick={handleSubmit}
                            className='btn btn-success btn-sm float-right'
                          >
                            Pay Now
                          </button>
                        </div>
                      </div>
                    ) : null}
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

export default CreateBill
