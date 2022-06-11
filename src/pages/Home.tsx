import React from 'react'
import { fetchPictures } from '../api/fetchPictures';
import Card from '../components/Card';
import { useInfiniteQuery } from 'react-query'

function Home() {
  const startDate = '2022-5-31'
  const endDate = '2022-6-2'
  const picturesQuery:any = useInfiniteQuery(['pictures', { startDate, endDate }], fetchPictures, {
    getNextPageParam: (lastPage: any, pages) => lastPage.cursor
  })

  function pictures() {
    console.log('data', picturesQuery.data)
    if (picturesQuery.status === 'loading') {
      return <p>Loading...</p>
    }
    if (picturesQuery.status === 'error') {
      return <p>Error: {picturesQuery.error.message}</p>
    }
    return <p>Gogo</p>
  }
  return (
    <div>
      <header>
        <h1>Spacestagram</h1>
      </header>
      <main>
        {pictures()}
      </main>
    </div>
  )
}

export default Home