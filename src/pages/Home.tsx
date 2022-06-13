import React from 'react'
import { fetchPictures } from '../api/fetchPictures';
import Card from '../components/Card';
import { useInfiniteQuery } from 'react-query'
import InfiniteScroll from 'react-infinite-scroll-component';
import './Home.css';
import { BATCH_FETCH_DAYS, EARLIEST_AVAILABLE_DATE } from '../constants';
import { addDays } from 'date-fns'
import { Oval } from  'react-loader-spinner'

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
// TODO: write a test to test it, test it
function exceedsEarliestAvailableDate(pageLength: number) {
    // calculate if the next page exceed the earliest available date
    const endDate = addDays(new Date(), -BATCH_FETCH_DAYS * pageLength)
    return endDate < new Date(EARLIEST_AVAILABLE_DATE)
}

function Home() {
  // TODO: use queryType
  const picturesQuery:any = useInfiniteQuery('pictures', fetchPictures, {
    select: data => ({
      pages: [...data.pages].reverse(),
      pageParams: [...data.pageParams].reverse(),
    }),
    getNextPageParam: (lastPage, pages) => {
      if (exceedsEarliestAvailableDate(pages.length)) {
        return undefined
      }
      return pages.length
    }
  })

  function pictures() {
    console.log('data', picturesQuery.data)
    if (picturesQuery.status === 'loading') {
      return (
        <Card />
      )
    }
    if (picturesQuery.status === 'error') {
      return <p>Error: {picturesQuery.error.message}</p>
    }
    return [...picturesQuery.data.pages.flat()].reverse().map((el: NASAResponse, idx) => (
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
        {/* <button onClick={() => picturesQuery.fetchNextPage()}>Fetch More</button> */}
        <InfiniteScroll
          dataLength={picturesQuery.data?.pages.length * BATCH_FETCH_DAYS}
          next={picturesQuery.fetchNextPage}
          hasMore={picturesQuery.hasNextPage}
          loader={<div style={{ display: 'flex', justifyContent: 'center'}}><Oval width='20' height='20' color='grey' ariaLabel='Loading'/></div>}
        >
          {pictures()}
        </InfiniteScroll>
      </main>
    </div>
  )
}

export default Home