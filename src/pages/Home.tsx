import React from 'react'
import { fetchPictures } from '../api/fetchPictures';
import Card from '../components/Card';
import { useInfiniteQuery } from 'react-query'
import './Home.css';


export enum MediaType {
  image = 'image',
  video = 'video'
}

interface NASAResponse {
  copyright: string,
  title: string,
  url: string,
  date: string,
  explanation: string,
  media_type: MediaType
}

function Home() {
  const startDate = '2022-5-15'
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
    return [...picturesQuery.data.pages[0]].reverse().map((el: NASAResponse, idx) => (
      <Card
        key={idx}
        copyright={el.copyright}
        title={el.title}
        src={el.url}
        date={el.date}
        description={el.explanation}
        mediaType={el.media_type}
      />
    ))
  }
  return (
    <div className='Home'>
      <nav className='NavBar'>
        <h1 className='NavBar__Title'>Spacestagram</h1>
        <h2 className='NavBar__SubTitle'>Brought to you by NASA's Astronomy Picture of the Day (APOD)</h2>
      </nav>
      <main className='Card__Container'>
        {pictures()}
      </main>
    </div>
  )
}

export default Home