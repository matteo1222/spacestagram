import { QueryFunctionContext } from "react-query"

const API_KEY = process.env.REACT_APP_NASA_KEY
const BASE_URL = 'https://api.nasa.gov/planetary/apod'
// TODO: write a Netlify function to make NASA API request to hide the API Key

interface PictureQueryFunctionContext extends QueryFunctionContext {
  queryKey: [string, { startDate: string, endDate: string }]
}

// TODO: figure out Typescript context type
export async function fetchPictures(context: any) {
  console.log('context', context)
  const [, { startDate, endDate }] = context.queryKey
  const response = await fetch(`${BASE_URL}?api_key=${API_KEY}&start_date=${startDate}&end_date=${endDate}`)
  if (!response.ok) {
    throw new Error('Network response does not success')
  }
  return response.json()
}