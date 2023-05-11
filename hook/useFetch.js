import { useState, useEffect } from 'react'
import axios from 'axios'
// import { RAPID_KEY } from 'react-native-dotenv'

const useFetch = (endpoint, query) => {
  const [data, setData] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)

  const options = {
    method: 'GET',
    url: `https://jsearch.p.rapidapi.com/${endpoint}`,
    params: {
      query: 'Python developer in Texas, USA',
      page: '1',
      num_pages: '1',
      ...query,
    },
    headers: {
      'X-RapidAPI-Key': '1a32828a5fmsh5d4d962a82632cap140d6bjsncdc2362587c8',
      'X-RapidAPI-Host': 'jsearch.p.rapidapi.com',
    },
  }

  const fetchData = async () => {
    setIsLoading(true)
    try {
      res = await axios.request(options)
      setData(res.data.data)
    } catch (error) {
      setError(error.message)
      alert('There is an error')
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  const refetch = () => {
    setIsLoading(true)
    fetchData()
  }

  return { data, isLoading, error, refetch }
}

export default useFetch
