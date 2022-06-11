
const API_KEY = process.env.REACT_APP_NASA_KEY
const BASE_URL = 'https://api.nasa.gov/planetary/apod'
// TODO: write a Netlify function to make NASA API request to hide the API Key

interface Params {
  // queryKey: [ string, { startDate: string, endDate: string } ]
  queryKey: any
}

export async function fetchPictures(params: Params) {
  const [_key, { startDate, endDate }] = params.queryKey
  const response = await fetch(`${BASE_URL}?api_key=${API_KEY}&start_date=${startDate}&end_date=${endDate}`)
  if (!response.ok) {
    throw new Error('Network response does not success')
  }
  return response.json()
}