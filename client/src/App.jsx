import './App.css'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import PhoneDetails from './pages/PhoneDetails'

function App() {

  const navigate = useNavigate()

  const [phoneList, setPhoneList] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    getData()
  }, [])

  const getData = async () => {
    try {
      const response = await axios.get('http://localhost:5005/api/phones')
      
      setTimeout(() => {
        setPhoneList(response.data)
        setIsLoading(false)
      }, 500)

    } catch (error) {
      navigate('/error')
    }
  }

  if (isLoading) {
    return (
      <div>
        <h1>Loading...</h1>
      </div>
    )
  }

  return (
    <>
      <Routes>
        <Route path="/phones/:id" element={<PhoneDetails />} />
        <Route path="/error" element={<h1>Error</h1>} />
      </Routes>


      {phoneList.map(eachPhone => {
        return (
          <div key={eachPhone.id}>
            <h3>{eachPhone.name}</h3>
            <button>
              <Link to={`/phones/${eachPhone.id}`}>Detalles</Link>
            </button>
          </div>
        )
      })}
    </>
  )
}

export default App
