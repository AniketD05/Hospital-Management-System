import { useNavigate } from 'react-router-dom'

function PageNotFound() {
  const navigate = useNavigate()
  return (
    <div className='container'>
      <div className='card shadow mt-5'>
        <div className='card-body text-center'>
          <h5>This page is not available</h5>
          <button
            className='btn btn-primary mt-4'
            onClick={(e) => navigate('/')}
          >
            Click here to go home
          </button>
        </div>
      </div>
    </div>
  )
}

export default PageNotFound
