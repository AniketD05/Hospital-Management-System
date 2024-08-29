import { useNavigate } from 'react-router-dom'

function HomePage() {
  const navigate = useNavigate()
  return (
    <div className=''>
      <div className='jumbotron bg-transparent p-4 shadow text-center border-bottom'>
        <h4>Welcome to Hospital Management System</h4>
      </div>
      <div className='container'>
        <div className='row'>
          <div
            className='col-sm-4 mx-auto mt-5 text-center shadow p-2'
            onClick={() => navigate('login')}
          >
            <img
              src={'images/image.png'}
              className='img-thumbnail'
              style={{ height: '200px', width: '200px' }}
            />
            <h5 className='p-2'>Login</h5>
          </div>
        </div>
      </div>
    </div>
  )
}
export default HomePage
