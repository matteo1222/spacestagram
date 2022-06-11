import React from 'react'
import { fetchPictures } from '../api/fetchPictures';
import Card from '../components/Card';
import { useInfiniteQuery } from 'react-query'
import './Home.css';


interface NASAResponse {
  copyright: string,
  title: string,
  url: string,
  date: string,
  explanation: string
}

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
    return [...picturesQuery.data.pages[0]].reverse().map((el: NASAResponse) => (
      <Card title={el.title} imgSrc={el.url} date={el.date} description={el.explanation} />
    ))
  }
  return (
    <div className='Home'>
      <nav className='NavBar'>
        <h1 className='NavBar__Title'>Spacestagram</h1>
      </nav>
      <main className='Card__Container'>
        {pictures()}
      </main>
    </div>
  )
}

export default Home