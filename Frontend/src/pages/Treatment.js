import { useEffect } from 'react'
import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Header from '../components/Header'
import SideBar from '../components/SideBar'
import appointmentservice from '../services/appointmentservice'
import treatmentservice from '../services/treatmentservice'

const Treatment = () => {
  const { aptid } = useParams('aptid')
  const [treatment, settreatment] = useState({})
  const [prescription, setprescription] = useState({})
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    treatmentservice
      .updateTreatment(aptid, treatment)
      .then((resp) => {
        alert(resp.data)
        loadData()
      })
      .catch((err) => alert(err.error))
  }

  const handlePrescriptionSubmit = (e) => {
    e.preventDefault()
    if(prescription.medicine===undefined || prescription.dosage === undefined){
      alert('Please provide medicine data')
      return
    }
    prescription.appointmentid = aptid
    treatmentservice
      .addPrescription(prescription)
      .then((resp) => {
        loadData()
        setprescription({ medicine: '', dosage: '' })
      })
      .catch((err) => alert(err.error))
  }

  const handleInput = (e) => {
    settreatment({ ...treatment, [e.target.name]: e.target.value })
  }

  const handleInput2 = (e) => {
    setprescription({ ...prescription, [e.target.name]: e.target.value })
  }

  const deletePrescription = (id) => {
    treatmentservice
      .deletePrescription(id)
      .then((resp) => loadData())
      .catch((err) => alert(err.error))
  }
  const loadData = () => {
    treatmentservice
      .getTreatmentDetails(aptid)
      .then((resp) => settreatment(resp.data))
  }
  const handleCheckOut = (id) => {
    appointmentservice
      .updateAppointment({
        appointmentid: aptid,
        status: 'Billed',
      })
      .then((resp) => {
        alert('Billed successfully')
        navigate('/appointments')
      })
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
          <div className='col-sm-9'>
            <div className='card shadow mx-auto mt-3'>
              <div className='card-body'>
                <button
                  className='btn btn-danger btn-sm float-right'
                  onClick={(e) => handleCheckOut(aptid)}
                >
                  Check Out
                </button>
                <h5 className='text-center p-2'>Patient Treatment</h5>
                <div className='form-row'>
                  <div className='col-sm-6'>
                    <div className='card shadow'>
                      <div className='card-body p-2'>
                        <h6>Treatment Details</h6>
                        <form onSubmit={handleSubmit}>
                          <div className='form-group'>
                            <label>Symptoms</label>
                            <textarea
                              className='form-control form-control-sm'
                              rows={3}
                              value={treatment?.symptoms || ''}
                              placeholder='Symptoms'
                              name='symptoms'
                              onChange={handleInput}
                            ></textarea>
                          </div>
                          <div className='form-group'>
                            <label>Diagnosis</label>
                            <textarea
                              className='form-control form-control-sm'
                              rows={3}
                              value={treatment?.diagnosis || ''}
                              placeholder='Diagnosis'
                              name='diagnosis'
                              onChange={handleInput}
                            ></textarea>
                          </div>
                          <div className='form-group'>
                            <label>Recommendations</label>
                            <textarea
                              className='form-control form-control-sm'
                              rows={3}
                              name='recommendations'
                              value={treatment?.recommendations || ''}
                              placeholder='Recommendations'
                              onChange={handleInput}
                            ></textarea>
                          </div>
                          <div className='form-group'>
                            <label>Diet</label>
                            <textarea
                              className='form-control form-control-sm'
                              rows={3}
                              name='diet'
                              value={treatment?.diet || ''}
                              placeholder='Diet'
                              onChange={handleInput}
                            ></textarea>
                          </div>
                          <button className='btn btn-success float-right btn-sm'>
                            Save Treatment
                          </button>
                        </form>
                      </div>
                    </div>
                  </div>
                  <div className='col-sm-6'>
                    <div className='card shadow'>
                      <div className='card-body p-2'>
                        <h6>Add Prescription</h6>
                        <form
                          className='form-inline form-group'
                          onSubmit={handlePrescriptionSubmit}
                        >
                          <input
                            type='text'
                            name='medicine'
                            value={prescription?.medicine || ''}
                            placeholder='Medicine Names'
                            onChange={handleInput2}
                            className='form-control form-control-sm mr-2'
                          />
                          <input
                            type='text'
                            name='dosage'
                            value={prescription?.dosage || ''}
                            placeholder='Dosage Information'
                            onChange={handleInput2}
                            className='form-control form-control-sm mr-2'
                          />
                          <button className='btn btn-success btn-sm float-right'>
                            Add
                          </button>
                        </form>
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
                                <th>Action</th>
                              </tr>
                            </thead>
                            <tbody>
                              {treatment?.prescriptions.map((x) => (
                                <tr>
                                  <td>{x.medicine}</td>
                                  <td>{x.dosage}</td>
                                  <td>
                                    <button
                                      className='btn btn-danger btn-sm'
                                      onClick={(e) => deletePrescription(x.id)}
                                    >
                                      Delete
                                    </button>
                                  </td>
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
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Treatment
