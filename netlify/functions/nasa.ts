import { Handler } from "@netlify/functions";
import fetch from "node-fetch"

const API_KEY = process.env.REACT_APP_NASA_KEY
const BASE_URL = 'https://api.nasa.gov/planetary/apod'

const handler: Handler = async (event, context) => {
  // proxy api fetch for client and add api_key
  const searchParams = new URLSearchParams();

  if (API_KEY) {
    searchParams.append('api_key', API_KEY)
  }

  let queryParams = event.queryStringParameters === null ? {} : event.queryStringParameters
  for (let [key, value] of Object.entries(queryParams)) {
    if (value === undefined) continue
    searchParams.append(key, value)
  }

  try {
    const response = await fetch(`${BASE_URL}?${searchParams.toString()}`)

    if (!response.ok) {
      return { statusCode: response.status, body: response.statusText };
    }
    const apodData = await response.json();

    return {
      statusCode: 200,
      body: JSON.stringify(apodData)
    }
  } catch (err) {
    console.log(err)
    return {
      statusCode: 500,
      body: JSON.stringify({ message: err.message })
    }
  }
};

export { handler };