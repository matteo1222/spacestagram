import { QueryFunctionContext } from 'react-query'
import { format, addDays } from 'date-fns'
import { BATCH_FETCH_DAYS } from '../constants'

const API_KEY = process.env.REACT_APP_NASA_KEY
const BASE_URL = 'https://api.nasa.gov/planetary/apod'

// TODO: write a Netlify function to make NASA API request to hide the API Key
async function checkIfTodayHasPicture() {
  const todayDate = format(new Date(), 'yyyy-MM-dd')

  const searchParams = new URLSearchParams();

  if (API_KEY) {
    searchParams.append('api_key', API_KEY)
  }
  searchParams.append('date', todayDate)

  const response = await fetch(`${BASE_URL}?${searchParams.toString()}`)
  if (response.ok) {
    return true
  }
  return false
}

export async function fetchPictures(context: QueryFunctionContext) {
  if (!context.pageParam) context.pageParam = 0
  // if today does not have picture yet, set latest date to yesterday
  let subtractDays = 0
  if (context.pageParam === 0) {
    subtractDays = await checkIfTodayHasPicture() ? 0 : 1
  }
  // startDate is the earliest date
  const startDate = format(addDays(new Date(), -BATCH_FETCH_DAYS * (context.pageParam + 1) + 1), 'yyyy-MM-dd')
  // endDate is the latest date
  const endDate = format(addDays(new Date(), -BATCH_FETCH_DAYS * context.pageParam - subtractDays), 'yyyy-MM-dd')

  const searchParams = new URLSearchParams();

  if (API_KEY) {
    searchParams.append('api_key', API_KEY)
  }
  searchParams.append('start_date', startDate)
  searchParams.append('end_date', endDate)

  const response = await fetch(`${BASE_URL}?${searchParams.toString()}`)
  if (!response.ok) {
    throw new Error('Network request does not success')
  }
  return response.json()
}